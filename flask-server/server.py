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

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/favicon.ico')
def favicon():
    # Return the favicon file here
    # You can also just return an empty response (no favicon) to get rid of the 404 error.
    return ''


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


@app.route('/api/webscrap', methods=['POST'])
def submit_URL():
    # Handle POST request
    url = request.json.get('url')
    text_content = ""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if there was an error with the request
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            text_content = soup.get_text()
            text_content = text_content.strip()
        else:
            text_content = "URL empty"
    except requests.exceptions.RequestException as e:
        # If there's an error with the request, print the error message and return a 500 response
        print("Error fetching the URL:", e)
        return jsonify({"error": "Failed to fetch the URL"}), 500

    print("Scraped text content:", text_content)  # Debug statement to check the scraped content
    return jsonify({"text_content": text_content}), 200



@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Handle POST request
    title = request.json.get('title')
    content = request.json.get('content')

    # Process the form data
    preprocessed_content = preprocess_text(content)

    # Tokenize and pad the text
    tokenizer.fit_on_texts([preprocessed_content])
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    # Make predictions
    prediction = model.predict(text_sequence)
    is_fake = int(prediction[0][0] > 0.5)

    # Print debug statements
    print("Title:", title)
    print("Content:", content)
    print("Preprocessed Content:", preprocessed_content)
    print("Prediction:", prediction)
    print("Is Fake:", is_fake)

    # Return the prediction and sentiment analysis score
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
    model = load_model('model.h5')
    tokenizer = Tokenizer()
    max_seq_length = 49  # Define the maximum sequence length used during training

    nltk.download('stopwords')
    nltk.download('punkt')
    stop_words = set(stopwords.words('english'))

    # Run the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)
