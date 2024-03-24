import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import ProblemInfo from "./ProblemInfo";
import AddProblem from "./AddProblem";
import Layout from "@repo/ui/src/Layout";
import EditProblem from "./EditProblem";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={!isLoggedIn ? <RegistrationPage setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/dashboard" />} />
                <Route path="/" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isLoggedIn ? <Layout><Dashboard /></Layout> : <Navigate to="/" />} />
                <Route path="/info" element={isLoggedIn ? <Layout><ProblemInfo /></Layout> : <Navigate to="/" />} />
                <Route path="/add" element={isLoggedIn ? <Layout><AddProblem /></Layout> : <Navigate to="/" />} />
                <Route path="/edit" element={isLoggedIn ? <Layout><EditProblem /></Layout> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;