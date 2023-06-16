import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Result() {
    const location = useLocation();
    const { title, content } = location.state;

    const navigate = useNavigate();
    const toHome = (e) => {
        
        navigate('/');   
    };

    return (<>
        <div>
            {/* TODO: Add spectrum */}
            <h1>spectrum</h1>
            <h2>This article is 80% likely to be true.</h2>
            <p>Title: {title}</p>
            <p>Content: {content}</p>
        </div>
        <button onClick={ toHome }>Return to home page</button>
        </>
    );
}
