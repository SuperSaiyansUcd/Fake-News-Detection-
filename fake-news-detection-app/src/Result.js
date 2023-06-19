import { useLocation, useNavigate } from 'react-router-dom';

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

    return (<>
        <div>
            {/* TODO: Add spectrum */}
            <h1>TODO: spectrum</h1>
            <h2>This article is 80% likely to be true.</h2>
            <p>Title: </p>
            <p>{title}</p>
            <p>Content: </p>
            <p>{content}</p>
        </div>
        <button onClick={ toHome }>Return to home page</button>
        </>
    );
}
