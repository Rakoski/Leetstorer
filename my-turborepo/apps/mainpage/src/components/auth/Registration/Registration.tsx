import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "../../../../../../packages/ui/src/Article";
import CreateUserMutation from "../../../mutations/CreateUserMutation.ts";
import Cookies from 'js-cookie';
import loginMutation from "../../../mutations/LoginMutation.ts";

function RegistrationPage({ setIsLoggedIn }: { setIsLoggedIn: (isLoggedIn: boolean) => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const validateFields = () => {
        if (!email || !password || !username) {
            window.alert("All fields are required.");
            return false;
        }

        // Starts with any alphanumeric character
        // Contains an @ symbol
        // checks for any alphanumeric character (both lower and upper case), dot (.), or hyphen (-) after the @ symbol.
        // ends with a dot (.) followed by two or more alphabetic characters (both lower and upper case).
        // The dollar sign ($) means end of line.
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            window.alert("Invalid email address.");
            return false;
        }
        if (password.length < 6) {
            window.alert("Invalid Password. Password must be at least 6 characters long.")
        }
        return true;
    }

    const handleRegistration = () => {
        if (!validateFields()) {
            return;
        }
        setLoading(true);
        CreateUserMutation(
            username,
            email,
            password,
            () => {
                loginMutation(email, password, (userId: string, token: string) => {
                    Cookies.set("GC_USER_ID", userId);
                    Cookies.set("GC_AUTH_TOKEN", token);
                    setIsLoggedIn(true);
                    setLoading(false);
                }, () => {
                    window.alert("Error in logging in");
                    setLoading(false);
                })
            },
            () => {
                window.alert("Error in user registration");
                setLoading(false);
            }
        );
    };

    const registrationFields = [
        <InputField key="username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />,
        <InputField key="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />,
        <InputField key="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />,
    ];

    return (
        <div>
            <ArticleComponent
                title="Sign in to Leetstorer"
                fields={registrationFields}
                onClick={handleRegistration}
                isLoginComponent={false}
                buttonPhrase={"Register"}
                articleUnderPhrase="Back to Login"
                hrefTo="/"
            />
        </div>
    );
}

export default RegistrationPage;
