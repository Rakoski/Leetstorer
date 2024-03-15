import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import ProblemInfo from "./ProblemInfo";
import AddProblem from "./AddProblem";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <Router>
            <Routes>
                <Route path="/register" element={!isLoggedIn ? <RegistrationPage setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/dashboard" />} />
                <Route path="/" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/problem-info" element={isLoggedIn ? <ProblemInfo /> : <Navigate to="/" />} />
                <Route path="/add" element={isLoggedIn ? <AddProblem /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
