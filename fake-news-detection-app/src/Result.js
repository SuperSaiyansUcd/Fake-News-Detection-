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



    let truthfulnessScore = Math.round((1 - data.is_fake) * 100);
    const isFake = data.is_fake === 1;
    if(isFake){
        truthfulnessScore = 20;
    }else{
        truthfulnessScore = 82
    }

    const conditionMap = [
        { range: [0, 10], text: 'This is very likely fake news' },
        { range: [11, 20], text: 'This is likely fake news' },
        { range: [21, 40], text: 'This could be fake news' },
        { range: [41, 60], text: 'Undetermined whether this is real or fake news' },
        { range: [61, 80], text: 'This could be authentic news' },
        { range: [81, 90], text: 'This is likely authentic news' },
        { range: [91, 100], text: 'This is very likely authentic news' },
    ];

    const resultText = conditionMap
            .reverse()
            .find(({ range }) => {
                const [min, max] = range;
                return truthfulnessScore >= min && truthfulnessScore <= max;
            })?.text || 'Error - Currently unable to judge the article\'s authenticity';

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
                <h2 style={{ fontSize: '34px', color: '#FFFFFF', fontWeight: 'bold' }}>{resultText}</h2>
                <LineSpectrum value={truthfulnessScore} />
            </div>
            <div className='part2'>
                <h2>{resultText}</h2>
                {/* to edit radar chart inputs */}
                {/* MAKE SURE TO SCALE VALUES */}
                <RadarCharts Precision={1} Score={3} Recall={2} Accuracy={2} />
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

        </div>
    </>
    );
}
