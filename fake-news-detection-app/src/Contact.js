import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Contact() {
    const navigate = useNavigate();

    const toHome = (e) => {  
        e.preventDefault();        
        navigate('/');   
    };

    const toForm = (e) => {
        window.open("https://www.google.com", '_blank');
    }

    return (<>
        <div className='contactPage'>
            <h2>Contact Us</h2>
            <div className='buttons'>     
                <input
                    className="button"
                    type="submit"
                    id="button1"
                    value="Google Form"
                    onClick={ toForm }
                />
                <input
                    className="button"
                    type="submit"
                    id="button2"
                    value="Return Home"
                    onClick={ toHome }
                />        
            </div>
        </div>
        
        </>
    );
}