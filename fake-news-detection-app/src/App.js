import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Result from "./Result";
import ExtensionPopup from './ExtensionPopup';
import "./index.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Route path="/popup" element={<ExtensionPopup />} /> {/* Add the route for the extension popup */}
    </Router>
  );
};

export default App;