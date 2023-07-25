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

    const navigate = useNavigate();
    const toHome = (e) => {
        e.preventDefault();
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
        if (content !== "") {
            navigate('/');
        }
    };

    const [sentimentScores, setSentimentScores] = useState([]);
    const [data, setData] = useState({});
    const [precision, setPrecision] = useState(0);
    const [recall, setRecall] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [f1_score, setF1Score] = useState(0);

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
                setSentimentScores(data.sentiment_scores);
                setData(data);
                setPrecision(data.precision);
                setRecall(data.recall);
                setAccuracy(data.accuracy);
                setF1Score(data.f1);
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

    const truthfulnessScore = data.truthfulness_score;

    const isFake = truthfulnessScore < 0.5;
    const resultText =
    truthfulnessScore < 0.5
      ? 'This is very likely fake news'
      : 'This is very likely authentic news';

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
                    <h2 style={{ fontSize: '34px', color: '#FFFFFF', fontWeight: 'bold' }}>{resultText}</h2>
                    <LineSpectrum value={truthfulnessScore*100} />
                </div>
                <div className='part2'>
                    <h2>{resultText}</h2>
                    {/* to edit radar chart inputs */}
                    {/* MAKE SURE TO SCALE VALUES */}
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
                </div>
                <div className='part3'>
                    <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK"
                        target="_blank"
                        rel="noopener noreferrer">
                        <button className='button'>Give Feedback</button></a>
                    <button className='button' onClick={toHome}>Return Home</button>
                </div>

                <div className='sentiment-scores'>
                    <h3>Sentiment Scores</h3>
                    {sentimentScores.map((score, index) => (
                        <p key={index}>Sentence {index + 1}: {score.toFixed(2)}</p>
                    ))}
                </div>
            </div>
        </>
    );
}
