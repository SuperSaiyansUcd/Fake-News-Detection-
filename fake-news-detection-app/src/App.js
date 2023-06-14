import React, { useState } from "react";
import "./App.css";

function App() {
  // react hook for button
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("event triggered - add new page with spectrum output ", text);
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
      </header>
    </div>
  );
}

export default App;
