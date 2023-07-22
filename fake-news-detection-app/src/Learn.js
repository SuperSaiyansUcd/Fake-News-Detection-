import { useNavigate } from 'react-router-dom';
import './Credit.css';

export default function Credits() {
    const navigate = useNavigate();

    const toHome = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <>
            <div className='creditsPage'>
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
                    <h2>Learn More</h2>
                </div>
                <ul className='part2'>
                    <h4>Model Types</h4>
                <li>Long Short-Term Memory (LSTM): This is a type of recurrent neural network that solves the <a href="https://en.wikipedia.org/wiki/Vanishing_gradient_problem" target="_blank"><u>vanishing gradient problem</u></a></li>
                    <li>An Ensemble Model is a machine learning model that combines the predicitions of multiple models to achieve better performance </li>
                    <li>Our "Ensemble"(together) Model makes use of  </li>
                </ul>

                <ul className='part2'>
                    <h4>Parameter Types</h4>
                    <li>Homepage picture 1 - Photo by Mika Baumeister on Unsplash</li>
                </ul>
                <div className='part3'>
                    <button className='button' onClick={toHome}>Return to home page</button>
                </div>
            </div>
        </>
    );
}
