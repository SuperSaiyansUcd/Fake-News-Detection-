import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { Link, useSearchParams } from 'react-router-dom';


const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams()


    const navigate = useNavigate();

    const ModelEnum = {
        BERT: "BERT",
        ENSEMBLE: "ENSEMBLE",
        LSTM: "LSTM"
    };

    const toResult = (e) => {
        e.preventDefault();

        const selectedButton = e.nativeEvent.submitter.id;
        let modelParam;

        if (selectedButton === "button1") {
            modelParam = ModelEnum.LSTM;
        } else if (selectedButton === "button2") {
            modelParam = ModelEnum.ENSEMBLE;
        }
        // to remove debug print 
        console.log(modelParam);

        if (content === null || content.trim().length === 0) {
            setError(true);
        } else {
            setError(false);
            localStorage.setItem('title', title);
            localStorage.setItem('content', content);

            console.log("Request Body:", { title, content, modelParam });
            axios.post('http://127.0.0.1:5000/api/submit', { title, content, modelParam }, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                    navigate('/result', { state: { title, content, modelParam } });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const toUrlResult = (e) => {
        e.preventDefault();

        if (url === null || url.trim().length === 0) {
            setUrlError(true);
        } else {
            setUrlError(false);
            setApiError(false);
            setLoading(true);

            axios.post('http://127.0.0.1:5000/api/webscrap', { url })
                .then((response) => {
                    if (response) {
                        setTitle(response.data.title);
                        setContent(response.data.main_text);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setApiError(true);
                    setUrlError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        const storedTitle = localStorage.getItem('title');
        const storedContent = localStorage.getItem('content');
        const queryContent = searchParams.get('text')


        if (storedTitle !== null) {
            setTitle(storedTitle);
        }
        if(queryContent !== null) {
            setContent(queryContent);
            window.scrollTo({
                top: 1500,
                behavior: 'smooth',
            });
        }
        else if (storedContent !== null) {
            setContent(storedContent);
        }
    }, [searchParams]);
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
                            <button onClick={scrollToLast}>Try it out!</button>
                        </h1>
                    </div>
                </div>
            </section>
            <section id="section2" className="section">
                <form onSubmit={toUrlResult}>
                    <div className="form-container">
                        <label htmlFor="urlInput">P A S T E  -  U R L - BETA FEATURE </label>
                        <input
                            type="text"
                            id="urlInput"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className={urlError ? "errorUrl" : "input-box"}
                        />
                        {urlError ? <div className="error-message">Invalid URL</div> : null}
                        <input
                            className="button"
                            type="submit"
                            id="button1"
                            title="Get Text from URL via web scraping"
                            value="Get Text from URL"
                        />
                        {loading ? <div className="loading-spinner">Loading...</div> : null}
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
                            value="Submit"
                            title="Long short-term memory Machine Learning Model"
                        />
                        {/* <input
                            className="button"
                            type="submit"
                            id="button2"
                            value="Use Ensemble Model"
                            title="Ensemble Machine Learning Model"
                        /> */}
                        <Link to="/learn" className="learn-more-link">
                            <span role="img" aria-label="Learn More">&#9432;</span>
                        </Link>
                    </div>
                </form>
                <footer>
                    &copy; 2023 SuperSaiyans. All rights reserved.
                </footer>
            </section>
            {apiError && <div className="error-message">Error: Invalid response from the API.</div>}
        </>
    );
};

export default Home;
