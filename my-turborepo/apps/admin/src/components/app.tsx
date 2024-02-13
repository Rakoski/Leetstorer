import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import { GC_AUTH_TOKEN, GC_USER_ID } from "../constants.ts";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handlePopState = () => {
            if (!history.state && isLoggedIn) {
                localStorage.removeItem(GC_USER_ID);
                localStorage.removeItem(GC_AUTH_TOKEN);
                setIsLoggedIn(false);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isLoggedIn]);


    return (
        <Router>
            <Routes>
                <Route path="/register" element={!isLoggedIn ? <RegistrationPage /> : <Navigate to="/dashboard" />} />
                <Route path="/" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
