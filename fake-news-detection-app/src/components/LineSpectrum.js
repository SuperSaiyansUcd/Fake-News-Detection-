import React from 'react';
import './LineSpectrum.css';

const LineSpectrum = ({ majorityVoting }) => {
  const spectrumWidth = 100;
  let value = 50;
  if(majorityVoting.toLowerCase() == 'positive'){
    value = 90;
  }else if(majorityVoting.toLowerCase() == 'negative'){
    value = 10;
  }
  const arrowPosition = (value / 100) * spectrumWidth;

  return (
    <div className="spectrum-container">
      <div className="line-spectrum" />
      <div className="arrow" style={{ left: `${arrowPosition}%` }}>
        <div className="arrow-triangle"></div>
        <div className="arrow-rectangle"></div>
        <div className="value">{majorityVoting}</div>
      </div>
    </div>
  );
};

export default LineSpectrum;
