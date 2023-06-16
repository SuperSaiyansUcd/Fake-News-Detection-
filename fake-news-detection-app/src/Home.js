import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Home() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
    const toResult = (e) => {
        e.preventDefault();
        if (title !== "") {
            navigate('/result', { state: { title, content } }); // Pass object , in the future this will be a json object
        }
    };

    return (
        <>
            <h1>Fake News Detector</h1>
            <form onSubmit={toResult}> {/* Add input validation and onSubmit event handler to pass json to backend */}
                <div>
                    <label htmlFor="inbox1">Title:</label>
                    <input
                        value={title}
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <label htmlFor="inbox2">Content:</label>
                    <textarea
                        value={content}
                        type="text"
                        onChange={e => setContent(e.target.value)}
                        className="input-box"
                    />
                </div>
                <div>
                    <input
                        className="button"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </>
    );
}
