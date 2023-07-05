import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import Popup from "./Popup";
import "./index.css";

const App = () => {
  const location = useLocation();

  // Check if the app is running as a Chrome extension
  const isExtension = location.pathname.startsWith("/popup");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        {isExtension && <Route path="/popup" element={<Popup />} />}
      </Routes>
    </Router>
  );
};

export default App;
