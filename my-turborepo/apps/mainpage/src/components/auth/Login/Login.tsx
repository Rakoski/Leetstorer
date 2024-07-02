import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import LoginMutation from "../../../mutations/LoginMutation.ts";
import Cookies from 'js-cookie';

function LoginPage({ setIsLoggedIn }: {setIsLoggedIn: (isLoggedIn: boolean) => void }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            return;
        }
        LoginMutation(email, password.toString(), (userId: string, token: string) => {
            Cookies.set("GC_USER_ID", userId);
            Cookies.set("GC_AUTH_TOKEN", token);
            setIsLoggedIn(true);
        }, () => {
            window.alert("Invalid email or password")
        });
    };

    const loginFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />,
    ];

    return (
        <div>
            <ArticleComponent
                title="Sign in to Leetstorer"
                fields={loginFields}
                onClick={handleLogin}
                isLoginComponent={true}
                buttonPhrase={"Login"}
                articleUnderPhrase="Forgot your password?"
                hrefTo="/send-token"
            />
        </div>
    );
}

export default LoginPage;
