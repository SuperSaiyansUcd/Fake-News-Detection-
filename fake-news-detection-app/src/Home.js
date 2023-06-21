import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const toResult = (e) => {
    e.preventDefault();
    if (title !== '') {
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
    if (storedTitle !== null && storedContent !== null) {
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

  return (
    <>
      <h1>Fake News Detector</h1>
      <form onSubmit={toResult}>
        <div>
          <label htmlFor="inbox1">Title:</label>
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="input-box"
          />
        </div>
        <div>
          <label htmlFor="inbox2">Content:</label>
          <textarea
            value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
            className="input-box"
          />
        </div>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
