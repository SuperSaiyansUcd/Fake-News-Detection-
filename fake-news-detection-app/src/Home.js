import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const toResult = (e) => {
        e.preventDefault();

        if (content === null) {
            setError(true);
        } else if ((content !== null && content.trim().length === 0)) {
            setError(true);
        } else {
            // Send data using axios
            setError(false);
            axios
                .post('http://127.0.0.1:5000/api/submit', { title, content })
                .then((response) => {
                    // Handle the backend
                    // console.log(response.data);
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
        if (storedTitle !== "" || storedContent !== "") {
            setTitle(storedTitle);
            setContent(storedContent);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);
    }, [title, content]);

    useEffect(() => {

        // console.log("not null")
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

    const scrollToLast = () => {
        window.scrollTo({
            top: 1500,
            behavior: 'smooth',
        });
    };


    return (
        <>

<nav role="navigation">
  <div id="menuToggle">
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
      <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK"><li>Give Feedback</li></a>
      <a href="Credits"><li>Credits</li></a>
    </ul>
  </div>
</nav>
            <section id="section1" className="section">
                <div className="dropdown">
                    <button>☰</button>
                    <div className="dropdown-content">
                        <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_1ZKfSS8zuQDJtOK"
                            target="_blank">Feedback</a>
                        <a href="/credits">Credits</a>
                    </div>
                </div>
                <div className="container">
                    <div className="try-it-out-banner">

                        <h1 onClick={scrollToLast} className="animated-heading">
                            Fake News Detector
                            <button onClick={scrollToLast} >try it out</button>
                        </h1>
                    </div>
                </div>
            </section>
            <section id="section2" className="section">
                <form onSubmit={toResult}>
                    <div>
                        <label htmlFor="inbox0">U R L</label>
                        <input
                            value={url}
                            type="text"
                            onChange={e => setUrl(e.target.value)}
                            className="input-box"
                        />
                    </div>
                    <div>
                        <label htmlFor="inbox1">T I T L E</label>
                        <input
                            value={title}
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            className="input-box"
                            placeholder="..." 
                        />
                    </div>
                    <div>
                        <label htmlFor="inbox2">Content</label>
                        <textarea
                            value={content}
                            type="text"
                            onChange={e => setContent(e.target.value)}
                            className={error ? "error" : "input-box"}
                            placeholder="cannot be empty"
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
}
