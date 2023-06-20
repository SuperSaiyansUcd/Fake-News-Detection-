from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# members
@app.route("/members")
def members():
    return {"members": ["mem1", "mem2"]}

if __name__ == "__main__":
    app.run(debug=True)
