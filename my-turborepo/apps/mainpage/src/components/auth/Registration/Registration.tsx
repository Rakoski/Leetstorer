import React, { Fragment, useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/SignInPagesArticle";
import CreateUserMutation from "../../../mutations/CreateUserMutation.ts";
import Cookies from 'js-cookie';
import loginMutation from "../../../mutations/LoginMutation.ts";

function RegistrationPage({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegistration = () => {
        if (!email || !password || !username) {
            return;
        }
        setLoading(true);
        CreateUserMutation(
            username,
            email,
            password,
            (userId, token) => {
                loginMutation(email, password, (userId, token) => {
                    Cookies.set("GC_USER_ID", userId);
                    Cookies.set("GC_AUTH_TOKEN", token);
                    setIsLoggedIn(true);
                    setLoading(false);
                }, onerror => {
                    console.log("error in logging in after registration")
                })
            },
            (error) => {
                alert(error);
                setLoading(false);
            }
        );
    };

    const registrationFields = [
        <InputField key="username" label={"Username"} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />,
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />,
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
