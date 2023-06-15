import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from "react"


export default function Home() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate();
    const toResult = () => {
        if (title != null) {
            navigate('Result', { title, content } );
            // ISSUE: title & content are always null
        }
        
    }

    return <>
    <h1>Fake News Detector</h1>
    <form> 
        <div>
            <label htmlFor="inbox1">Title:</label>
            {/* TODO: Inputs Validation */}
            <input value={title} type="text" onChange={e=>setTitle(e.target.value)} className="input-box"/>
        </div>
        <div> 
            <label htmlFor="inbox2">Content:</label>
            <textarea value={content} type="text" onChange={e=>setContent(e.target.value)} className="input-box"/>
        </div>
        <div>
            <input className="button" type="submit" value="Submit"
                    onClick={()=>{ toResult() }} />
        </div>
    </form>
    </>


}