import { useNavigate } from 'react-router-dom';
import './Learn.css';

export default function Learn() {
    const navigate = useNavigate();

    const toHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <>
            <div className='learnsPage'>
                <div className="dropdown">
                    <button>☰</button>
                    <div className="dropdown-content">
                        <a href="/">Home</a>

                        <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK" target="_blank" rel="noopener noreferrer">Feedback</a>
                        <a href="/learn">Learn More</a>
                        <a href="/credits">Credits</a>
                    </div>
                </div>

                <ul class="red-colon">
                    <h2>Learn More</h2>
                    <h4>Model Types</h4>
                    <li  class="red-colon">Long Short-Term Memory (LSTM): This is a type of recurrent neural network that solves the <a href="https://en.wikipedia.org/wiki/Vanishing_gradient_problem"
                        target="_blank" rel="noopener noreferrer">
                        <u>vanishing gradient problem</u> &rarr;</a></li>
                    <br></br>
                    <li>An Ensemble("together") Model is a machine learning model that combines the predicitions of multiple models to achieve better performance </li>
                    <br></br>
                    <ul>
                        
                    {/* <li>An Ensemble Model is a machine learning model that combines the predictions of multiple models to achieve better performance.</li> */}
                    {/* <br></br> */}

                    <li>Our Models work best on Twitter tweets and are less reliable for other news sources. This is due to our training data sets.</li>
                    <br></br>

                    <h4>Sentiment Types</h4>

                    <li>Sentiment in text is a measure of different feelings present in the content. A higher value for a given feeling indicates stronger presence</li>
                    <li>  The Vader Score, Afinn Score, Pattern score and TextBlob Score are an overall sentiment indicator. They range from negative, neutral to positive.</li>
                    <li> The Majority Voting result is the overall sentiment prediction obtained by combining all our measures of sentiment analysis</li>
                    </ul>

                    <button className='button' onClick={toHome}>Return to home page</button>
                </ul>
            </div>
        </>
    );
}