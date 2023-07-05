import React, { useState } from 'react';
import './App.css';

function App() {
  const [lists, setLists] = useState([]);

  const [truthfulnessScore, setTruthfulnessScore] = useState(null);
  const [isFake, setIsFake] = useState(false);
  const [textInput, setTextInput] = useState('');

  const openTabs = (url) => {
    for (const link of url) {
      window.open(link, "_blank");
    }
  };

  const handleSubmit = () => {
    // Simulate fetching the truthfulness score based on the submitted text
    fetch("http://127.0.0.1:5000/api/submit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: textInput, content: textInput }),
    })
    .then((response) => response.json())
    .then((data) => {
      setTruthfulnessScore(Math.round((1 - data.is_fake) * 100));
      setIsFake(data.is_fake === 1);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <h3>Enter your text</h3>
      <div>
        <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {truthfulnessScore !== null && (
        <div className="score-container">
          <p>Truthfulness Score: {truthfulnessScore}</p>
          <p>Is Fake: {isFake.toString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
