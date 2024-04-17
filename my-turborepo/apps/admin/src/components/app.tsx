import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./Registration";
import LoginPage from "./Login";
import Dashboard from "./Dashboard";
import ProblemInfo from "./ProblemInfo";
import AddProblem from "./AddProblem";
import Layout from "@repo/ui/src/Layout";
import EditProblem from "./EditProblem";
import Cookies from "js-cookie";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const PrivateRoute = ({ element, ...props }) => {
        return isLoggedIn ? element : <Navigate to="/" />;
    };

    const PublicRoute = ({ element, redirectTo, ...props }) => {
        return !isLoggedIn ? element : <Navigate to={redirectTo} />;
    };

    const handleLogout = () => {
        Cookies.remove("GC_USER_ID");
        Cookies.remove("GC_AUTH_TOKEN");
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/register"
                    element={<PublicRoute element={<RegistrationPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                />
                <Route
                    path="/"
                    element={<PublicRoute element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                />
                <Route path="/dashboard" element={<PrivateRoute element={<Layout onLogout={handleLogout}><Dashboard /></Layout>} />} />
                <Route path="/info" element={<PrivateRoute element={<Layout onLogout={handleLogout}><ProblemInfo /></Layout>} />} />
                <Route path="/add" element={<PrivateRoute element={<Layout onLogout={handleLogout}><AddProblem /></Layout>} />} />
                <Route path="/edit" element={<PrivateRoute element={<Layout onLogout={handleLogout}><EditProblem /></Layout>} />} />
            </Routes>
        </Router>
    );
}

export default App;
