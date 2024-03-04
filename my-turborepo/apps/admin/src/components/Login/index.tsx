import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import LoginMutation from "../../mutations/LoginMutation.ts";

function LoginPage({ setIsLoggedIn }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        LoginMutation(email, password.toString(), (userId, token) => {
            localStorage.setItem("GC_USER_ID", userId)
            localStorage.setItem("GC_AUTH_TOKEN", token)
            setIsLoggedIn(true);
        }, (error) => {
            alert("Incorrect email or password.")
        });
    };

    const loginFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />,
    ];

    return (
        <div>
            <ArticleComponent title="Sign in to Leetstorer" fields={loginFields} onClick={handleLogin} isLoginComponent={true} />
        </div>
    );
}

export default LoginPage;
