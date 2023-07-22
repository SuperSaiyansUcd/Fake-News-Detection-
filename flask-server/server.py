from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
import joblib
from keras.models import load_model
from keras_preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer

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

@app.route('/api/submit', methods=['POST'])
def submit_data():
    title = request.json.get('title')
    content = request.json.get('content')

    preprocessed_content = preprocess_text(content)

    tokenizer.fit_on_texts([preprocessed_content])
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    prediction = model.predict(text_sequence)
    is_fake = int(prediction[0][0] > 0.5)

    response = {
        'message': 'Form data received :)',
        'title': title,
        'content': content,
        'is_fake': is_fake,
        'sentiment_score': float(prediction[0][0])
    }
    return jsonify(response), 200


if __name__ == "__main__":
    model = load_model('Bi_dir_LSTM_model.h5')
    tokenizer = Tokenizer()
    max_seq_length = 100

    nltk.download('stopwords')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))

    app.run(host='0.0.0.0', port=5000, debug=True)
