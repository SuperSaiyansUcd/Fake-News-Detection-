import "./index.css"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import Credits from "./Credits";
import Learn from "./Learn";
import React from "react";

  // backend data https://github.com/miguelgrinberg/react-flask-app
export default function App() {

  return (
  <Router>
    <Routes>       
      <Route path="/" element={<Home/>} />   
      <Route path="/result" element={<Result/>} />
      <Route path="/learn" element={<Learn/>} />
      <Route path="/credits" element={<Credits/>} />
    </Routes>
  </Router>
  );
}

