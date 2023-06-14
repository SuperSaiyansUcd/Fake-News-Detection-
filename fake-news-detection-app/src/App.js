import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("Button clicked:", text);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fake News Detector</h1>
        <div className="LineSpectrum"></div>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Paste Text Here"
        />
        <button onClick={handleButtonClick}>Submit</button>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
