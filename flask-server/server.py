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
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the saved model
model = load_model('model.h5')
tokenizer = Tokenizer()
max_seq_length = 49  # Define the maximum sequence length used during training

nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    # Convert text to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)

    # Remove special characters and numbers
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\d+", "", text)

    # Tokenize the text
    tokens = word_tokenize(text)

    # Remove stop words
    tokens = [token for token in tokens if token not in stop_words]

    # Join the tokens back into a single string
    preprocessed_text = " ".join(tokens)

    return preprocessed_text

@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Handle POST request 
    title = request.json.get('title')
    content = request.json.get('content')

    # Process the form data
    preprocessed_content = preprocess_text(content)

    # Perform sentiment analysis using TextBlob
    sentiment_score = TextBlob(preprocessed_content).sentiment.polarity

    # Tokenize and pad the text
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    # Make predictions
    prediction = model.predict(text_sequence)
    is_fake = int(prediction > 0.5)

    # Return the prediction and sentiment analysis score
    response = {
        'message': 'Form data received :)',
        'title': title,
        'content': content,
        'is_fake': is_fake,
        'sentiment_score': sentiment_score
    }
    return jsonify(response), 200

@app.route("/members")
def members():
    
    return jsonify({"members": ["mem1", "mem2"]})

if __name__ == "__main__":
    app.run(debug=True)
