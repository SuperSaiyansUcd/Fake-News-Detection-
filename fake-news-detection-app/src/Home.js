import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const toResult = (e) => {
        e.preventDefault();

        if (content === null || content.trim().length === 0) {
            setError(true);
        } else {
            setError(false);
            axios.post('http://127.0.0.1:5000/api/submit', { title, content })
                .then((response) => {
                    navigate('/result', { state: { title, content } });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        const storedTitle = localStorage.getItem('title');
        const storedContent = localStorage.getItem('content');
        if (storedTitle !== null || storedContent !== null) {
            setTitle(storedTitle);
            setContent(storedContent);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
    }, [title, content]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            localStorage.removeItem('title');
            localStorage.removeItem('content');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/', { state: { url } });
    };

    const scrollToLast = () => {
        window.scrollTo({
            top: 1500,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <section id="section1" className="section">
                <div className="dropdown">
                    <button>☰</button>
                    <div className="dropdown-content">
                        <a href="/">Home</a>

                        <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK" target="_blank" rel="noopener noreferrer">Feedback</a>
                        <a href="/learn">Learn More</a>
                        <a href="/credits">Credits</a>
                    </div>
                </div>
                <div className="container">
                    <div className="try-it-out-banner">
                        <h1 onClick={scrollToLast} className="animated-heading">
                            Fake News Detector
                            <button onClick={scrollToLast}>Try it out !</button>
                        </h1>
                    </div>
                </div>
            </section>
            <section id="section2" className="section">
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label htmlFor="urlInput">P A S T E  -  U R L:</label>
                        <input
                            type="text"
                            id="urlInput"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="input-box"
                        />
                        <input
                            className="button"
                            type="submit"
                            id="button1"
                            title="Get Text from URL via web scraping"
                            value="Get Text from URL"
                        />
                    </div>
                </form>
                <form onSubmit={toResult}>
                    <div>
                        <label htmlFor="inbox1">T I T L E</label>
                        <input
                            value={title}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-box"
                            placeholder="..."
                        />
                    </div>
                    <div>
                        <label htmlFor="inbox2">C O N T E N T</label>
                        <textarea
                            value={content}
                            type="text"
                            onChange={(e) => setContent(e.target.value)}
                            className={error ? "error" : "input-box"}
                            placeholder="Enter Content"
                        />
                    </div>
                    <div>
                        <input
                            className="button"
                            type="submit"
                            id="button1"
                            title="Bidirectional Encoder Representations Machine Learning Model"
                            value="Use BERT Model"
                        />
                        <input
                            className="button"
                            type="submit"
                            id="button2"
                            value="Use LSTM Model"
                            title="Long short-term memory Machine Learning Model"
                        />
                    </div>
                </form>
                <footer>
                    &copy; 2023 SuperSaiyans. All rights reserved.
                </footer>
            </section>
        </>
    );
};

export default Home;
