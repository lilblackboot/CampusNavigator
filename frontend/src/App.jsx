import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
       
      </Routes>
    </Router>
  );
}

export default App;
