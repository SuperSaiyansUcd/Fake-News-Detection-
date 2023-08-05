import { useLocation, useNavigate } from 'react-router-dom';
import LineSpectrum from './components/LineSpectrum';
import { useState, useEffect } from "react";
import RadarCharts from './components/RadarChart';
import SimpleBarChart from './components/BarChartz';
import './Results.css';

export default function Result() {
    const location = useLocation();
    const title = location.state.title;
    const content = location.state.content;
    // sentiment types = [anger, disgust, fear, joy, neutral, sadness, -surprise]
    const [emotions, setEmotions] = useState({});
    const [afinnScore, setAfinnScore] = useState(0); // -infinity to +infinity
    const [patternScore, setPatternScore] = useState(0); // -1 to 1
    const [vaderScore, setVaderScore] = useState(0); // -1 to 1
    const [textblobScore, setTextblobScore] = useState(0); // -1 to 1
    const [majorityVoting, setMajorityVoting] = useState(""); // positive, negative or neutral
    const [loading, setLoading] = useState(false);

    // TO-DO    currently not in use - require ground truth scores 
        // const [precision, setPrecision] = useState(0);
        // const [recall, setRecall] = useState(0);
        // const [accuracy, setAccuracy] = useState(0);
        // const [f1_score, setF1Score] = useState(0);
    let processedAfinnScore = afinnScore
    if(processedAfinnScore > 1){
        processedAfinnScore = 1
    }else if(processedAfinnScore < -1){
        processedAfinnScore = -1
    }
    const [modelPrediction, setModelPrediction] = useState('');
    let emotionsArray = [];
    const scoresData = [
        { name: 'Afinn Score', Sentiment_Score: processedAfinnScore },
        { name: 'Pattern Score', Sentiment_Score: patternScore },
        { name: 'Vader Score', Sentiment_Score: vaderScore },
        { name: 'TextBlob Score', Sentiment_Score: textblobScore },
    ];
    Object.entries(emotions).forEach(([emotion, score]) => {
        if (score < 0.1) {
            score = 0.1;
        }
        emotionsArray.push({ name: ' ' + emotion, value: score.toFixed(2) });
    });

    console.log(emotionsArray);

    const navigate = useNavigate();
    const toHome = (e) => {
        e.preventDefault();
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
        if (content !== "") {
            navigate('/');
        }
    };

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState({});

    useEffect(() => {
        setLoading(true);
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
                // TO-DO    currently not in use - require ground truth scores 
                    // setPrecision(data.precision);
                    // setRecall(data.recall);
                    // setAccuracy(data.accuracy);
                    // setF1Score(data.f1);
                const modelPredictionLabel = data.is_fake === 0 ? 'Fake News' : 'Real News';
                setModelPrediction(modelPredictionLabel);
                setLoading(false);
                // console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [title, content]);


    // const [showComponent, setShowComponent] = useState(false);
    // useEffect(() => {
    //     const delay = 65;
    //     const timer = setTimeout(() => {
    //         setShowComponent(true);
    //     }, delay);
    //     return () => clearTimeout(timer);
    // }, []);




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
                    <h2 style={{ fontSize: '34px', color: '#FFFFFF', fontWeight: 'bold' }}>Model Prediction: {modelPrediction}</h2>
                    <LineSpectrum value={50} majorityVoting={majorityVoting} />
                </div>
                <div className='part2'>
                    {!loading ? (
                        <>
                            <RadarCharts data={emotionsArray} />
                            <SimpleBarChart data={scoresData} />
                        </>
                    ) : (
                        <div className="loading-spinner">.......Loading Model Data.......</div>
                    )}
                    
                    <span className="learn-more-link" role="img" aria-label="Learn More">&#9432;</span>
                    <div class="info">
                        <h2>Learn More</h2>
                        <ul>
                            <h4>Model Types</h4>
                            <li>Long Short-Term Memory (LSTM): This is a type of recurrent neural network that solves the "vanishing gradient problem"
                                : a challenge in training deep neural networks where the gradients become extremely small during backpropagation. This occurs when the activation functions saturate, causing gradients to approach zero as they propagate backward through the network. As a result, the network struggles to learn and update the weights effectively in the early layers, hindering deep models' ability to learn complex patterns. </li>
                            
                            <li>An Ensemble("together") Model is a machine learning model that combines the predicitions of multiple models to achieve better performance </li>
                            
                            
                                
                            {/* <li>An Ensemble Model is a machine learning model that combines the predictions of multiple models to achieve better performance.</li> */}
                            {/* <br></br> */}

                            <li>Our Models work best on Twitter tweets and are less reliable for other news sources. This is due to our training data sets.</li>
                        </ul>
                        <ul>

                            <h4>Sentiment Types</h4>

                            <li>Sentiment in text is a measure of different feelings present in the content. A higher value for a given feeling indicates stronger presence</li>
                            <li>The Vader Score, Afinn Score, Pattern score and TextBlob Score are an overall sentiment indicator. They range from negative, neutral to positive.</li>
                            <li>The Majority Voting result is the overall sentiment prediction obtained by combining all our measures of sentiment analysis</li>
                            
                        </ul>
                    </div>
                    
                    
                </div>
                <div className='part3'>
                    <p>- Title -</p>
                    <p className='box1'>{title}</p>
                    <p>- Content -</p>
                    <p className='box2'>{content}</p>
                    {/* <p>Model Prediction: {modelPrediction}</p> */}
                    {/* Display emotions and sentiment scores */}
                    {/* <p>Emotions:</p> */}
                    {/* Display individual rows for each emotion */}
                    {/* {Object.entries(emotions).map(([emotion, score]) => (
                    <p key={emotion}>{emotion}: {score.toFixed(2)}</p>
                    ))}
    
                    <p>Afinn Score: {afinnScore}</p>
                    <p>Pattern Score: {patternScore}</p>
                    <p>Vader Score: {vaderScore}</p>
                    <p>TextBlob Score: {textblobScore}</p>
                    <p>Majority Voting: {majorityVoting}</p> */}
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
