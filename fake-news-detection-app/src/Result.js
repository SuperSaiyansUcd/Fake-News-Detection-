import { useLocation, useNavigate } from 'react-router-dom';
import LineSpectrum from './components/LineSpectrum';
import { useState, useEffect } from 'react';
import RadarChart from './components/RadarChart';
import './Results.css';

export default function Result() {
  const location = useLocation();
  const title = location.state?.title || '';
  const content = location.state?.content || '';

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setShowComponent(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [title, content]);

  const truthfulnessScore = Math.round((1 - data?.is_fake) * 100);
  const isFake = data?.is_fake === 1;
  const sentiment = data?.sentiment_score;

  const conditionMap = {
    0: { text: 'This is very likely fake news' },
    1: { text: 'This is likely fake news' },
    2: { text: 'This could be fake news' },
    3: { text: 'Undetermined whether this is real or fake news' },
    4: { text: 'This could be authentic news' },
    5: { text: 'This is likely authentic news' },
    6: { text: 'This is very likely authentic news' },
  };

  const resultText = conditionMap[truthfulnessScore]?.text || "Error - Currently unable to judge the article's authenticity";

  const sentimentColor =
    sentiment > 0.7
      ? 'green'
      : sentiment < 0.3
      ? 'red'
      : 'gray';

  if (!showComponent) {
    return null;
  }

  return (
    <div className='resultPage'>
      <div className='part1'>
        <h2 style={{ fontSize: '34px', color: '#FFFFFF', fontWeight: 'bold' }}>{resultText}</h2>
        <LineSpectrum value={truthfulnessScore} />
      </div>
      <div className='part2'>
        <h2 style={{ color: sentimentColor }}>Sentiment Analysis Score: {sentiment}</h2>
        <RadarChart />
      </div>
      <div className='part3'>
        <p>- Title -</p>
        <p className='box1'>{title}</p>
        <p>- Content -</p>
        <p className='box2'>{content}</p>
      </div>
      <div className='part3'>
        <button className='button' onClick={() => navigate('/')}>Return Home</button>
      </div>
    </div>
  );
}
