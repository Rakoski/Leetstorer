import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./auth/Registration/Registration.tsx";
import LoginPage from "./auth/Login/Login.tsx";
import Dashboard from "./afterLogin/Dashboard";
import ProblemInfo from "./afterLogin/ProblemInfo";
import AddProblem from "./afterLogin/AddProblem";
import Layout from "@repo/ui/src/Layout";
import EditProblem from "./afterLogin/EditProblem";
import Cookies from "js-cookie";
import ResetPassword from "./auth/ResetPassword/ResetPassword.tsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = Cookies.get("GC_USER_ID");
        const authToken = Cookies.get("GC_AUTH_TOKEN");
        if (userId && authToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const PrivateRoute = ({ element }) => {
        return isLoggedIn ? element : <Navigate to="/" />;
    };

    const PublicRoute = ({ element, redirectTo }) => {
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
                    path="/dashboard"
                    element={<PrivateRoute element={<Layout onLogout={handleLogout}><Dashboard /></Layout>} />}
                />
                <Route
                    path="/info"
                    element={<PrivateRoute element={<Layout onLogout={handleLogout}><ProblemInfo /></Layout>} />}
                />
                <Route
                    path="/add"
                    element={<PrivateRoute element={<Layout onLogout={handleLogout}><AddProblem /></Layout>} />}
                />
                <Route
                    path="/edit"
                    element={<PrivateRoute element={<Layout onLogout={handleLogout}><EditProblem /></Layout>} />}
                />
                <Route
                    path="/register"
                    element={<PublicRoute element={<RegistrationPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                />
                <Route
                    path="/"
                    element={<PublicRoute element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                />
                <Route
                    path="/resetpassword"
                    element={<PublicRoute element={<ResetPassword setIsLoggedIn={setIsLoggedIn} />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
