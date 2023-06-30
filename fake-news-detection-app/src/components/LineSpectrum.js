import React from 'react';
import './LineSpectrum.css';

const LineSpectrum = ({ value }) => {
  const spectrumWidth = 100;
  const arrowPosition = (value / 100) * spectrumWidth;

  return (
    <div className="spectrum-container">
      <div className="line-spectrum" />
      <div className="arrow" style={{ left: `${arrowPosition}%` }}>
        <div className="arrow-triangle"></div>
        <div className="arrow-rectangle"></div>
        <div className="value">{value}%</div>
      </div>
    </div>
  );
};

export default LineSpectrum;
