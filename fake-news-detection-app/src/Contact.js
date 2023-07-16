import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Contact() {
    const navigate = useNavigate();

    const toHome = (e) => {  
        e.preventDefault();        
        navigate('/');   
    };

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const sendMail = (e) => {
        if (name === null || message === null) {
            setError(true);
        } else if ((name !== null && name.trim().length === 0) ||
                    (message !== null && message.trim().length === 0)) {
            setError(true);
        } else{
            setError(false);

        }
    }

    

    return (<>
        <div className='contactPage'>
            <h2>Contact Us</h2>
            <form > 
                <div>
                    <label htmlFor="inbox1">-Name-</label>
                    <input
                        value={name || ""}
                        type="text"
                        onChange={e => setName(e.target.value)}
                        className={error? "error" : "input-box"}
                    />
                </div>
                <div>
                    <label htmlFor="inbox2">-Message-</label>
                    <textarea
                        value={message || ""}
                        type="text"
                        onChange={e => setMessage(e.target.value)}
                        className={error? "error" : "input-box"}
                    />
                </div>
                <div>
                    <input
                        className="button"
                        type="submit"
                        id="button1"
                        value="Submit"
                        onClick={ sendMail }
                    />
                    <input
                        className="button"
                        type="submit"
                        id="button2"
                        value="Return"
                        onClick={ toHome }
                    />
                </div>
            </form>
        </div>
        
        </>
    );
}