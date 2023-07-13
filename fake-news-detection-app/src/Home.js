import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const toResult = (e) => {
    e.preventDefault();

    if (content === null) {
        alert('Content field cannot be empty!!');
    } else if ((content !== null && content.trim().length === 0)) {
        console.log(title)
        console.log(title.trim())
        console.log(content)
        console.log(content.trim())
        alert('Content field cannot be empty!!');
    } else {
      // Send data using axios
      axios
        .post('http://127.0.0.1:5000/api/submit', { title, content })
        .then((response) => {
          // Handle the backend
          console.log(response.data);
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
            <section id="section1" className="section">
                <h1 onClick={scrollToLast}>Fake News Detector</h1>
            </section>  
            <section id="section2" className="section">
                <form onSubmit={toResult}> {/* Add input validation and onSubmit event handler to pass json to backend */}
                    <div>
                        <label htmlFor="inbox1">Title:</label>
                        <input
                            value={title || ""}
                            type="text"
                            onChange={e => setTitle(e.target.value)}
                            className="input-box"
                        />
                    </div>
                    <div>
                        <label htmlFor="inbox2">Content:</label>
                        <textarea
                            value={content || ""}
                            type="text"
                            onChange={e => setContent(e.target.value)}
                            className="input-box"
                            placeholder="Cannot be empty" 
                        />
                    </div>
                    <div>
                        <input
                            className="button"
                            type="submit"
                            id="button1"
                            value="Check with model 1"
                        />
                        <input
                            className="button"
                            type="submit"
                            id="button2"
                            value="Check with model 2"
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
