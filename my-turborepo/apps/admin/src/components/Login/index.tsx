import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import {GC_AUTH_TOKEN, GC_USER_ID} from "../../constants.ts";
import LoginMutation from "../../mutations/LoginMutation.ts";

function LoginPage({ setIsLoggedIn }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        LoginMutation(email, password.toString(), (userId, token) => {
            saveUserData(userId, token);
            setIsLoggedIn(true);
        }, (error) => {
            alert("Error in Logging in.")
        });
    };

    const saveUserData = (id: string, token: string) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

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
