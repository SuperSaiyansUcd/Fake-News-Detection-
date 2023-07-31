import { useLocation, useNavigate } from 'react-router-dom';
import LineSpectrum from './components/LineSpectrum';
import { useState, useEffect } from "react";
import RadarCharts from './components/RadarChart';
import './Results.css';
import { Link } from 'react-router-dom';

export default function Result() {
    const location = useLocation();
    const title = location.state.title;
    const content = location.state.content;
    const [emotions, setEmotions] = useState({});
    const [afinnScore, setAfinnScore] = useState(0);
    const [patternScore, setPatternScore] = useState(0);
    const [vaderScore, setVaderScore] = useState(0);
    const [textblobScore, setTextblobScore] = useState(0);
    const [majorityVoting, setMajorityVoting] = useState("");
    const [precision, setPrecision] = useState(0);
    const [recall, setRecall] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [f1_score, setF1Score] = useState(0);
    const [modelPrediction, setModelPrediction] = useState('');


    const navigate = useNavigate();
    const toHome = (e) => {
        e.preventDefault();
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
        if (content !== "") {
            navigate('/');
        }
    };

    const [data, setData] = useState({});

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setEmotions(data.emotions);
                setAfinnScore(data.afinn_score);
                setPatternScore(data.pattern_score);
                setVaderScore(data.vader_score);
                setTextblobScore(data.textblob_score);
                setMajorityVoting(data.majority_voting);
                
                setPrecision(data.precision);
                setRecall(data.recall);
                setAccuracy(data.accuracy);
                setF1Score(data.f1);
                const modelPredictionLabel = data.is_fake === 0 ? 'Fake News' : 'Real News';
                setModelPrediction(modelPredictionLabel);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [title, content]);


    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => {
        const delay = 65;
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, delay);
        return () => clearTimeout(timer);
    }, []);



    
//     const truthfulnessScore = data.truthfulness_score;
//     const truthfulnessScorePercentage = (truthfulnessScore * 100).toFixed(2);
//     let resultText;
//     const conditionMap = [
//   { range: [0, 0.25], text: 'This is highly likely fake news' },
//   { range: [0.26, 0.50], text: 'This is likely fake news' },
//   { range: [0.51, 0.75], text: 'This is likely authentic news' },
//   { range: [0.76, 1], text: 'This is very likely authentic news' },
// ];

//    resultText = conditionMap
//     .reverse()
//     .find(({ range }) => {
//       const [min, max] = range;
//       return truthfulnessScore >= min && truthfulnessScore <= max;
//     })?.text || 'Error - Currently unable to judge the article\'s authenticity';

if (!showComponent) {
  return null;
}

return (<>
    <div className='resultPage'>
        <div className="dropdown">
            <button>☰</button>
            <div className="dropdown-content">
                <a href="/">Home</a>

                <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK" target="_blank" rel="noopener noreferrer">Feedback</a>
                <a href="/learn">Learn More</a>
                <a href="/credits">Credits</a>
            </div>
        </div>
        <div className='part1'>
            <h2 style={{ fontSize: '34px', color: '#FFFFFF', fontWeight: 'bold' }}>{"resultText"}</h2>
            <LineSpectrum value={50} />
        </div>
        <div className='part2'>
            {/* <h2>{resultText}</h2> */}
            {/* to edit radar chart inputs - ground truth  values unattainable right now so we are putting this on hold until then*/}
            {/* <RadarCharts Precision={precision} Score={f1_score} Recall={recall} Accuracy={accuracy} /> */}
            <RadarCharts Precision={precision} Score={f1_score} Recall={recall} Accuracy={accuracy} />
            <Link to="/learn" className="learn-more-link">
                <span role="img" aria-label="Learn More">&#9432;</span>
            </Link>
        </div>
        <div className='part3'>
                <p>- Title -</p>
                <p className='box1'>{title}</p>
                <p>- Content -</p>
                <p className='box2'>{content}</p>
                <p>Model Prediction: {modelPrediction}</p>
                {/* Display emotions and sentiment scores */}
                <p>Emotions:</p>
                {/* Display individual rows for each emotion */}
                {Object.entries(emotions).map(([emotion, score]) => (
                <p key={emotion}>{emotion}: {score.toFixed(2)}</p>
                ))}

                <p>Afinn Score: {afinnScore}</p>
                <p>Pattern Score: {patternScore}</p>
                <p>Vader Score: {vaderScore}</p>
                <p>TextBlob Score: {textblobScore}</p>
                <p>Majority Voting: {majorityVoting}</p>
            </div>
            <div className='part3'>
                <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK"
                    target="_blank"
                    rel="noopener noreferrer">
                    <button className='button'>Give Feedback</button></a>
                <button className='button' onClick={toHome}>Return Home</button>
            </div>

        </div>
    </>
    );
}
