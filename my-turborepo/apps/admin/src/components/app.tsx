import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={!isLoggedIn ? <RegistrationPage /> : <Navigate to="/" />} />
                <Route path="/login" element={!isLoggedIn ? <LoginPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
