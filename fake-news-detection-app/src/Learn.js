import { useNavigate } from 'react-router-dom';
import './Learn.css';
import matrixImage from './Images/matrix.png';

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

                <ul>
                    <h2>Learn More</h2>
                    <h4>Model Types</h4>
                    <li>Long Short-Term Memory (LSTM): This is a type of recurrent neural network that solves the <a href="https://en.wikipedia.org/wiki/Vanishing_gradient_problem"
                        target="_blank" rel="noopener noreferrer">
                        <u>vanishing gradient problem</u> &rarr;</a></li>
                    <br></br>
                    <li>An Ensemble("together") Model is a machine learning model that combines the predicitions of multiple models to achieve better performance </li>
                    <br></br>
                    <li>Our Models work best on twitter tweets and are less reliable for other news sources. This is due to our training data sets</li>

                    <br></br><br></br>
                    <h4>Parameter Types</h4>


                    <ul>
                        <img src={matrixImage} alt="Confusion Matrix" />
                        <br></br>
                        <a href="https://www.researchgate.net/figure/Calculation-of-Precision-Recall-and-Accuracy-in-the-confusion-matrix_fig3_336402347" target="_blank" rel="noopener noreferrer"><u>Matrix Link</u></a>


                    </ul>
                    <button className='button' onClick={toHome}>Return to home page</button>
                </ul>
            </div>
        </>
    );
}