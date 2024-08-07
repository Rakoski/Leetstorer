    import React, {useState, useEffect, ReactElement} from "react";
    import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
    import RegistrationPage from "./auth/Registration/Registration.tsx";
    import LoginPage from "./auth/Login/Login.tsx";
    import Dashboard from "./afterLogin/Dashboard/Dashboard.tsx";
    import ProblemInfo from "./afterLogin/ProblemInfo/ProblemInfo.tsx";
    import AddProblem from "./afterLogin/AddProblem/AddProblem.tsx";
    import Layout from "@repo/ui/src/Layout";
    import EditProblem from "./afterLogin/EditProblem/EditProblem.tsx";
    import Cookies from "js-cookie";
    import ResetPassword from "./auth/ResetPassword/ResetPassword.tsx";
    import ResetToken from "./auth/ResetToken/ResetToken.tsx";

    function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const userId = Cookies.get("GC_USER_ID");
            const authToken = Cookies.get("GC_AUTH_TOKEN");
            if (userId && authToken) {
                setIsLoggedIn(true);
            }
        }, []);

        const PrivateRoute = ({ element }: {element: ReactElement}) => {
            return isLoggedIn ? element : <Navigate to="/" />;
        };

        const PublicRoute = ({ element, redirectTo }: {element: ReactElement; redirectTo: string}) => {
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
                        path="/"
                        element={<PublicRoute element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                    />
                    <Route
                        path="/register"
                        element={<PublicRoute element={<RegistrationPage setIsLoggedIn={setIsLoggedIn} />} redirectTo="/dashboard" />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<PublicRoute element={<ResetPassword />} redirectTo={"/dashboard"} />}
                    />
                    <Route
                        path="/send-token"
                        element={<PublicRoute element={<ResetToken />} redirectTo={"/dashboard"}/>}
                    />
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
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        );
    }

    export default App;
