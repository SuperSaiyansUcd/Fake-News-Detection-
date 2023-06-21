import { useLocation, useNavigate } from 'react-router-dom';
import LineSpectrum from './components/LineSpectrum';
import { useState, useEffect } from "react";

export default function Result() {
    const location = useLocation();
    const title = location.state.title;
    const content = location.state.content;
 
    const navigate = useNavigate();
    const toHome = (e) => {  
        e.preventDefault();
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
        if (title !== "") { 
            navigate('/');   
        }
    };
    const [data, setData] = useState([{}])

    useEffect(() => {
      fetch("http://127.0.0.1:5000/members").then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data, "hi")
        }
      )
    }, [])

    const truthfulnessScore = 80; // Value will come from the model
    const truthfulnessScoreValidated = validateTruthScore(truthfulnessScore);

    const conditionMap = [
        { range: [0, 10], text: 'This is very likely fake news' },
        { range: [11, 20], text: 'This is likely fake news' },
        { range: [21, 40], text: 'This could be fake news' },
        { range: [41, 60], text: 'Undetermined whether this is real or fake news' },
        { range: [61, 80], text: 'This could be authentic news' },
        { range: [81, 90], text: 'This is likely authentic news' },
        { range: [91, 100], text: 'This is very likely authentic news' },
    ];
      
    // keep result text a const for security
    const resultText = conditionMap
    .reverse()
    .find(({ range }) => {
    const [min, max] = range;
    return truthfulnessScoreValidated >= min && truthfulnessScoreValidated <= max;
    })?.text || 'Error - Currently unable to judge the articles authenticity';

    function validateTruthScore(truthfulnessScore) {
    if (truthfulnessScore >= 0 && truthfulnessScore <= 100) {
        return truthfulnessScore;
    }
    return -1;
    }

    return (<>
        <div>
            
            {(typeof data.members === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.members.map((members,i) => (
                    <p key={i}>{members}</p>
                ))
            )}

            <LineSpectrum value={truthfulnessScoreValidated} />
            <h2>{resultText}</h2>
            <p>Title: </p>
            <p>{title}</p>
            <p>Content: </p>
            <p>{content}</p>
        </div>
        <button onClick={ toHome }>Return to home page</button>
        </>
    );

    function validateTruthScore(truthfulnessScore) {
        if (truthfulnessScore >= 0 && truthfulnessScore <= 100) {
          return truthfulnessScore;
        }
        return -1;
      }
      
}
