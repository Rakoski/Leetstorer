import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let toggleLoggedIn = false;

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/" element={<LoginPage toggleLoggedIn={toggleLoggedIn} />} />
                <Route path="/login" element={<LoginPage toggleLoggedIn={toggleLoggedIn} />} />
            </Routes>
        </Router>
    );
}

function Dashboard() {
    return <h2>Dashboard</h2>;
}

export default App;
