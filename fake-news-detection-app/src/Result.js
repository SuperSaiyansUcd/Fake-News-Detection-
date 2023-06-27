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

    const truthfulnessScore = Math.round((1 - data.is_fake) * 100);
    const isFake = data.is_fake === 1;

    const conditionMap = [
        { range: [0, 10], text: 'This is very likely fake news' },
        { range: [11, 20], text: 'This is likely fake news' },
        { range: [21, 40], text: 'This could be fake news' },
        { range: [41, 60], text: 'Undetermined whether this is real or fake news' },
        { range: [61, 80], text: 'This could be authentic news' },
        { range: [81, 90], text: 'This is likely authentic news' },
        { range: [91, 100], text: 'This is very likely authentic news' },
    ];

    const resultText = isFake
        ? 'This is very likely fake news'
        : conditionMap
              .reverse()
              .find(({ range }) => {
                  const [min, max] = range;
                  return truthfulnessScore >= min && truthfulnessScore <= max;
              })?.text || 'Error - Currently unable to judge the article\'s authenticity';

// <<<<<<< HEAD
//     return (
//         <>
//             <div>
//                 {(typeof data.is_fake === 'undefined') ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <>
//                         <p>Truthfulness Score: {truthfulnessScore}</p>
//                         <LineSpectrum value={truthfulnessScore} />
//                         <h2>{resultText}</h2>
//                         <p>Title:</p>
//                         <p>{title}</p>
//                         <p>Content:</p>
//                         <p>{content}</p>
//                     </>
//                 )}
//             </div>
//             <button onClick={toHome}>Return to home page</button>
// =======
    return (<>
        <div className='resultPage'>
            <div className='part1'>
                <LineSpectrum value={truthfulnessScore} />
                <h2>{resultText}</h2>
            </div>
            <div className='part2'>
                <p>Title: </p>
                <p className='box1'>{title}</p>
                <p>Content: </p>
                <p className='box2'>{content}</p>
            </div>
            <div className='part3'>
                <button className='button' onClick={ toHome }>Return to home page</button>
            </div>
            
        </div>
        
{/* >>>>>>> a19d68f (improve layout) */}
        </>
    );
}
