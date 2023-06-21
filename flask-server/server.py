from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# members from front-end
@app.route('/api/submit', methods=['POST'])
def submit_data():
    # Handle POST request 
    title = request.json.get('title')
    content = request.json.get('content')

    # Process the form data
    # TODO

    # Return a response
    response = {
        'message': 'Form data received :)',
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
