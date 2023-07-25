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
                    <h2>Acknowledgements</h2>
                </div>
                <ul className='part2'>
                    <li>Homepage picture 1 - Photo by Mika Baumeister on Unsplash</li>
                    <li>Homepage picture 2 - Photo by Hayden Walker on Unsplash</li>
                    <li>Result page picture - Photo by Annie Spratt on Unsplash</li>
                    <li>Credits page picture - Photo by Rishabh Sharma on Unsplash</li>
                </ul>
                <p>
                    Special thanks to our UCD and Microsoft mentors for their invaluable guidance and support throughout the module
                </p>
                <div className='part3'>
                    <button className='button' onClick={toHome}>Return to home page</button>
                </div>
            </div>
        </>
    );
}
