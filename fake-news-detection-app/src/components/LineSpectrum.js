import React from 'react';
import './LineSpectrum.css';

const LineSpectrum = ({ value }) => {
    const spectrumWidth = 100;
    const arrowPosition = (value / 100) * spectrumWidth;

    return (
        <div className="spectrum-container">
            <div className="line-spectrum" />
            <div className="arrow" style={{ left: `${arrowPosition}%` }} />
        </div>
    );
};

export default LineSpectrum;