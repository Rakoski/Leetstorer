import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import {GC_AUTH_TOKEN, GC_USER_ID} from "../../constants.ts";
import LoginMutation from "../../mutations/LoginMutation.ts";

function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = () => {
        LoginMutation(email, password.toString(), (userId, token) => {
            _saveUserData(userId, token)
            console.log("user id: ", userId)
            console.log(localStorage.getItem(GC_AUTH_TOKEN))
            console.log(localStorage.getItem(GC_USER_ID))
            console.log("Login Success!")
        })
    }

    const _saveUserData = (id: string, token: string) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

    const loginFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />,
    ];

    return (
        <div>
            <ArticleComponent title="Sign in on LeetStorer" fields={loginFields} onClick={handleLogin} isLoginComponent={true} />
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

export default LoginPage;
