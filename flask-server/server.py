from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# members from front-end
@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Handle the POST request and process the form data
    title = request.json.get('title')
    content = request.json.get('content')

    # Process the form data
    # ...

    # Return a response
    response = {
        'message': 'Form data received successfully',
        'title': title,
        'content': content
    }
    return jsonify(response), 200

# members to frontend
@app.route("/members")
def members():
    return jsonify({"members": ["mem1", "mem2"]})

if __name__ == "__main__":
    app.run(debug=True)
