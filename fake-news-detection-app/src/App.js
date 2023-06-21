import "./index.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import React, {useState, useEffect } from "react";

  // backend data https://github.com/miguelgrinberg/react-flask-app
export default function App() {

  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5000/members").then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data, "hi")
  //     }
  //   )
  // }, [])

  return (
  <Router>
    <Routes>       
      <Route path="/" element={<Home/>} />   
      <Route path="/result" element={<Result/>} />
    </Routes>
  </Router>
  );
}

