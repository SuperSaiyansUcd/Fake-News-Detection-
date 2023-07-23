from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
import requests
from bs4 import BeautifulSoup
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/favicon.ico')
def favicon():
    return ''


def preprocess_text(text):
    text = text.lower()

    text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)

    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\d+", "", text)

    tokens = word_tokenize(text)

    tokens = [token for token in tokens if token not in stop_words]

    preprocessed_text = " ".join(tokens)

    return preprocessed_text


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

    print("Scraped text content:", text_content) 
    return jsonify({"text_content": text_content}), 200



@app.route('/api/submit', methods=['POST'])
def submit_data():
    data = request.json  
    modelParam = data.get('modelParam') 

    model = Bidirectional_LSTM_model
    max_seq_length = max_seq_length_model
    if modelParam == "LSTM":
        model = ensemble_model
        max_seq_length = max_seq_length_lstm

    title = data.get('title')
    content = data.get('content')
    
    
    preprocessed_content = preprocess_text(content)

    tokenizer.fit_on_texts([preprocessed_content])
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    prediction = model.predict(text_sequence)
    is_fake = int(prediction[0][0] > 0.5)

    # debug prints
    # print("Title:", title)
    # print("Content:", content)
    # print("Preprocessed Content:", preprocessed_content)
    # print("Prediction:", prediction)
    # print("Is Fake:", is_fake)
    # print("using ", model, "Model type")

    response = {
        'message': 'Form data received :)',
        'title': title,
        'content': content,
        'is_fake': is_fake,
        'sentiment_score': float(prediction[0][0])
    }
    return jsonify(response), 200


if __name__ == "__main__":
    # Load the saved model
    ensemble_model = load_model('model.h5')
    Bidirectional_LSTM_model = load_model('Bi_dir_LSTM_model.h5')
    ensemble_model.summary()
    Bidirectional_LSTM_model.summary()

    tokenizer = Tokenizer()
    max_seq_length_model = 100 
    max_seq_length_lstm = 49


    nltk.download('stopwords')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))

    # Run the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)
