from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
from keras.models import load_model
from keras_preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
import requests
from bs4 import BeautifulSoup

from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.metrics import  f1_score, precision_score, accuracy_score, recall_score


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/favicon.ico')
def favicon():
    return ''

def preprocess_text(text, max_seq_length):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\d+", "", text)
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in stop_words]
    preprocessed_text = " ".join(tokens)
    return preprocessed_text[:max_seq_length]

@app.route('/api/webscrap', methods=['POST'])
def submit_URL():
    url = request.json.get('url')
    text_content = ""
    try:
        response = requests.get(url)
        response.raise_for_status()
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            text_content = soup.get_text()
            text_content = text_content.strip()
        else:
            text_content = "URL empty"
    except requests.exceptions.RequestException as e:
        print("Error fetching the URL:", e)
        return jsonify({"error": "Failed to fetch the URL"}), 500

    return jsonify({"text_content": text_content}), 200

@app.route('/api/sentiment', methods=['POST'])
def get_sentiment_scores():
    data = request.get_json()
    content = data.get('content')
    sentiment_analyzer = SentimentIntensityAnalyzer()
    sentiment_scores = [sentiment_analyzer.polarity_scores(sentence)['compound'] for sentence in nltk.sent_tokenize(content)]
    return jsonify({'sentiment_scores': sentiment_scores})

@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json  
    modelParam = data.get('modelParam') 
    model = ensemble_model
    max_seq_length = max_seq_length_lstm
    
    # if modelParam == "LSTM":
    #    model = Bidirectional_LSTM_model
    #    max_seq_length = max_seq_length_model    

    title = data.get('title')
    content = data.get('content')

    preprocessed_content = preprocess_text(content, max_seq_length)

    tokenizer.fit_on_texts([preprocessed_content])
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    prediction = model.predict(text_sequence)
    truthfulness_score = prediction[0][0]

    sentiment_analyzer = SentimentIntensityAnalyzer()
    sentiment_scores = [sentiment_analyzer.polarity_scores(sentence)['compound'] for sentence in nltk.sent_tokenize(content)]
    
    threshold = 0.5

    # Calculate the evaluation metrics
    y_true = [1 if truthfulness_score >= threshold else 0]
    y_pred = [1 if prediction[0][0] >= threshold else 0]
    y_pred_binary = np.round(y_pred)


    # Log the values to check if they are valid
    print("y_true:", y_true)
    print("y_pred:", y_pred)
    print("Prediction:", prediction)
    print("Truthfulness Score:", truthfulness_score)

    precision = precision_score(y_pred_binary,y_true, zero_division=1)
    recall = recall_score( y_pred_binary,y_true, zero_division=1)
    f1 = f1_score(y_pred_binary,y_true,  zero_division=1)
    accuracy = accuracy_score( y_pred_binary,y_true)
    
    result = {
        'title': title,
        'content': content,
        'truthfulness_score': float(truthfulness_score),
        'sentiment_scores': sentiment_scores,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'accuracy': accuracy,
    }
    return jsonify(result)

if __name__ == "__main__":
    # Load the saved model
    ensemble_model = load_model('model.h5')
    # Bidirectional_LSTM_model = load_model('Bidirectional_LSTM.h5')
    ensemble_model.summary()
    # Bidirectional_LSTM_model.summary()

    tokenizer = Tokenizer()
    # max_seq_length_model = 50 
    max_seq_length_lstm = 49

    nltk.download('stopwords')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))

    # Run the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)
