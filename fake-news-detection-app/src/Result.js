import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';


export default function Result() {
    const location = useLocation();
    console.log(location); // state is always null so can't pass title and content

    const navigate = useNavigate();
    

    return <>
    {/* TODO: Add spectrum */}
    <h2>This article is 80% likely to be true.</h2>
    {/* TODO: Add title and content passed from Home page. */}
    <h3></h3>
    <p></p>
    <button onClick={()=>{navigate('../');}}>Return to home page</button>
    </>
}