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
from cleantext import clean

def remove_comments(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    comments = soup.find_all(class_='comment')  # Replace 'class_' with the appropriate class or tag representing comments
    for comment in comments:
        comment.extract()
    cleaned_text = soup.get_text(separator=' ')

    cleaned_nocomments_body_text = clean(cleaned_text, 
                    fix_unicode=True,               
                    to_ascii=True,                  
                    lower=True,                     
                    no_line_breaks=True,            
                    no_urls=True,                   
                    no_emails=True,                 
                    no_phone_numbers=True,          
                    no_numbers=True,                
                    no_digits=True,                 
                    no_currency_symbols=True,       
                    no_punct=True,                  
                    replace_with_punct="",          
                    replace_with_url="<URL>",
                    replace_with_email="<EMAIL>",
                    replace_with_phone_number="<PHONE>",
                    replace_with_number="<NUMBER>",
                    replace_with_digit="0",
                    replace_with_currency_symbol="<CUR>",
                    lang="en"                       
                    )
    return cleaned_nocomments_body_text

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/favicon.ico')
def favicon():
    return ''


def clean_text(text):
    text = text.lower()

    text = re.sub(r"http\S+|www\S+|https\S+", "", text, flags=re.MULTILINE)

    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\d+", "", text)

    tokens = word_tokenize(text)

    tokens = [token for token in tokens if token not in stop_words]

    preprocessed_text = " ".join(tokens)

    processed_text = remove_comments(preprocessed_text)

    return processed_text


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
            body_text = clean_text(soup.find('body').get_text())
            body_text = re.sub(r'\?.*$', '', body_text)
            main_text = body_text.strip() if body_text else "Text content not found"
            data['main_text'] = main_text
        else:
            data['title'] = "URL empty"
            data['main_text'] = ""
    except requests.exceptions.RequestException as e:
        print("Error fetching the URL:", e)
        return jsonify({"error": "Failed to fetch the URL"}), 500

    return jsonify(data), 200



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

    preprocessed_content = clean_text(content)
    tokenizer.fit_on_texts([preprocessed_content])
    text_sequence = tokenizer.texts_to_sequences([preprocessed_content])
    text_sequence = pad_sequences(text_sequence, maxlen=max_seq_length)

    prediction = model.predict(text_sequence)
    is_fake = int(prediction[0][0] > 0.5)

    # debug prints
    print("Title:", title)
    print("Content:", content)
    print("Preprocessed Content:", preprocessed_content)
    print("Prediction:", prediction)
    print("Is Fake:", is_fake)
    print("using ", model, "Model type")

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
