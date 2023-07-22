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
                <div className='part1'>
                    <h2>Credits</h2>
                </div>
                <ul className='part2'>
                    <li>Homepage picture 1 - Photo by Mika Baumeister on Unsplash</li>
                    <li>Homepage picture 2 - Photo by Hayden Walker on Unsplash</li>
                    <li>Result page picture - Photo by Annie Spratt on Unsplash</li>
                    <li>Contact page picture - Photo by Worshae on Unsplash</li>
                    <li>Credits page picture - Photo by Rishabh Sharma on Unsplash</li>
                </ul>
                <p>
                    Appreciations to our UCD and Microsoft mentors for guiding us throughout the project
                </p>
                <div className='part3'>
                    <button className='button' onClick={toHome}>Return to home page</button>
                </div>
            </div>
        </>
    );
}
