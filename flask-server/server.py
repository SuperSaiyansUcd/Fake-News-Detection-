from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from afinn import Afinn
from pattern.en import sentiment as pattern_sentiment
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from textblob import TextBlob
import torch
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from keras.layers import Input, Embedding, LSTM, Dense, concatenate, Bidirectional
# sklearn is deprecated - use pip3 install scikit-learn
from sklearn.metrics import  f1_score, precision_score, accuracy_score, recall_score
import requests
from keras.models import Model
from bs4 import BeautifulSoup, Comment
from cleantext import clean

def remove_comments(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    comments = soup.findAll(string=lambda string:isinstance(string, Comment))
    for comment in comments:
        comment.extract()

    for class_name in ['comment', 'comments', 'replies']:
        elements = soup.find_all(class_=class_name)
        for element in elements:
            element.decompose()

    cleaned_text = soup.get_text(separator=' ')

    return cleaned_text

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/favicon.ico')
def favicon():
    return ''

# Load emotion prediction model
emotion_model_name = "j-hartmann/emotion-english-roberta-large"
emotion_tokenizer = AutoTokenizer.from_pretrained(emotion_model_name)
emotion_model = AutoModelForSequenceClassification.from_pretrained(emotion_model_name)

# Create fake news detection model
def create_fake_news_model():
    max_len_text = 49
    num_emotions = 7  # number of emotion features
    num_scores = 4  #  number of sentiment score features
    num_words = 169377
      
    embedding_dim = 100 

    input_content = Input(shape=(max_len_text,), dtype='int32')
    input_emotions = Input(shape=(num_emotions,), dtype='int32')
    input_scores = Input(shape=(num_scores,), dtype='float32')

    content_embedding = Embedding(input_dim=num_words, output_dim=embedding_dim, input_length=max_len_text)(input_content)
    content_lstm = Bidirectional(LSTM(128))(content_embedding)

    emotions_dense = Dense(64, activation='relu')(input_emotions)
    scores_dense = Dense(64, activation='relu')(input_scores)

    merged = concatenate([content_lstm, emotions_dense, scores_dense])
    dense = Dense(64, activation='relu')(merged)
    output = Dense(1, activation='sigmoid')(dense)

    model = Model(inputs=[input_content, input_emotions, input_scores], outputs=output)
    return model

fake_news_model = create_fake_news_model()
fake_news_model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
fake_news_model.load_weights('fake_news_detection_LSTM.h5')

max_len_text = 49
tokenizer = Tokenizer()

nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(stopwords.words('english'))

@app.route('/api/webscrap', methods=['POST'])
def submit_URL():
    url = request.json.get('url')
    data = {}

    try:
        response = requests.get(url)
        response.raise_for_status()
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            # Scrape title
            title_tag = soup.find('title')
            title = title_tag.text.strip() if title_tag else "Title not found"
            data['title'] = title

            # Scrape main text content
            body_text = remove_comments(soup.find('body').get_text())
            body_text = re.sub(r'\?.*$', '', body_text)
            main_text = body_text.strip() if body_text else "Text content not found"
            data['main_text'] = main_text
        else:
            return jsonify({"error": "URL response status code was not 200"}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(data), 200


@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json  
    # modelParam = data.get('modelParam') 

    title = data.get('title')
    content = data.get('content')

    # Clean the content text
    preprocessed_content= content
    # Sentiment Analysis
    afinn = Afinn()
    afinn_score = afinn.score(preprocessed_content)
    pattern_score = pattern_sentiment(preprocessed_content)[0]
    vader_analyzer = SentimentIntensityAnalyzer()
    vader_score = vader_analyzer.polarity_scores(preprocessed_content)
    vader_compound = vader_score['compound']
    textblob_score = TextBlob(preprocessed_content).sentiment.polarity

    # Tokenize the content text using the fake news detection model tokenizer
    sequences = tokenizer.texts_to_sequences([content])
    input_content = pad_sequences(sequences, maxlen=max_len_text)

    # Use Hugging Face emotion model to predict emotions
    emotion_inputs = emotion_tokenizer([content], padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        emotion_outputs = emotion_model(**emotion_inputs)
    emotion_predictions = torch.softmax(emotion_outputs.logits, dim=1).squeeze().tolist()

    emotions = {
        'anger': emotion_predictions[0],
        'disgust': emotion_predictions[1],
        'fear': emotion_predictions[2],
        'joy': emotion_predictions[3],
        'neutral': emotion_predictions[4],
        'sadness': emotion_predictions[5],
        'surprise': emotion_predictions[6],
    }

    # Combine emotion predictions with other features
    emotions_values = list(emotions.values())
    emotion_features = [int(val > 0.5) for val in emotions_values]

    # Prepare input data for fake news detection model
    input_emotions = np.array(emotion_features).reshape(1, -1)
    input_scores = np.array([afinn_score, pattern_score, vader_compound, textblob_score]).reshape(1, -1)

    # input_features = np.concatenate((input_emotions, input_scores), axis=1)
    # Perform prediction using the fake news detection model
    threshold =0.65
    prediction = fake_news_model.predict([input_content, input_emotions, input_scores])
    is_fake = int(prediction[0][0] > threshold)
    truthfulness_score = prediction[0][0]
    tp = int(is_fake == 1)
    fp = int(is_fake == 0)
    tn = 0 if (fp == 1) else 1
    fn = 0 if (tp == 1) else 1

    # Avoid division by zero
    if (tp + fp) != 0:
        precision = tp / (tp + fp)
    else:
        precision = 0
    if (tp + fn) != 0:
        recall = tp / (tp + fn)
    else:
        recall = 0
    accuracy = (tp + tn) / (tp + tn + fp + fn)

    # Calculate F1-score
    if (precision + recall) != 0:
        f1 = 2 * (precision * recall) / (precision + recall)
    else:
        f1 = 0

    num_pos = sum(score > 0 for score in [afinn_score, pattern_score, vader_compound, textblob_score])
    num_neg = sum(score < 0 for score in [afinn_score, pattern_score, vader_compound, textblob_score])
    num_neutral = 4 - num_pos - num_neg

    if num_pos > num_neg and num_pos > num_neutral:
        majority_voting = "Positive"
    elif num_neg > num_pos and num_neg > num_neutral:
        majority_voting = "Negative"
    else:
        majority_voting = "Neutral"

    # debug prints
    print("Title:", title)
    print("Content:", content)
    print("Preprocessed Content:", preprocessed_content)
    print("Prediction:", prediction)
    print("Is Fake:", is_fake)
    # print("using ", model, "Model type")
    print('tp', tp),
    print('fp', fp),        
    print('tn', tn),        
    print('fn', fn),        
    print("Prediction:", prediction)
    print("Truthfulness Score:", truthfulness_score)
    print("precision:", precision)
    print("recall:", recall)
    print("f1:", f1)
    print("accuracy:", accuracy)

    num_pos = sum(score > 0 for score in [afinn_score, pattern_score, vader_compound, textblob_score])
    num_neg = sum(score < 0 for score in [afinn_score, pattern_score, vader_compound, textblob_score])
    num_neutral = 4 - num_pos - num_neg

    if num_pos > num_neg and num_pos > num_neutral:
        majority_voting = "Positive"
    elif num_neg > num_pos and num_neg > num_neutral:
        majority_voting = "Negative"
    else:
        majority_voting = "Neutral"

    response = {
        'title': title,
        'content': content,
        'is_fake': is_fake,
        'truthfulness_score': float(prediction[0][0]),
        'emotions': emotions,
        'afinn_score': afinn_score,
        'pattern_score': pattern_score,
        'vader_score': vader_compound,
        'textblob_score': textblob_score,
        'majority_voting': majority_voting,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'accuracy': accuracy,
    }
    return jsonify(response), 200


if __name__ == "__main__":
    # Load the saved model
    ensemble_model = load_model('model.h5')
    Bidirectional_LSTM_model = load_model('model.h5')
    ensemble_model.summary()
    Bidirectional_LSTM_model.summary()

    tokenizer = Tokenizer()
    max_seq_length_model = 49 
    max_seq_length_lstm = 49


    nltk.download('stopwords')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))

    # Run the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)
