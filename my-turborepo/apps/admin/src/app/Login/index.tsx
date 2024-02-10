import React, { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (email && password) {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                login(email: "${email}", password: "${password}") {
                                    userId
                                    token
                                    tokenExpiration
                                }
                            }
                        `
                    }),
                });

                const { data, errors } = await response.json();

                if (errors) {
                    console.error("Error occurred during login:", errors[0].message);
                } else {
                    const { userId, token, tokenExpiration } = data.login;
                    console.log("Login successful");
                    console.log("User ID:", userId);
                    console.log("Token:", token);
                    console.log("Token Expiration:", tokenExpiration);
                    navigate("/register");
                }
            } else {
                console.error("Email and password are required.");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
        }
    };

    const loginFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />,
    ];

    return (
        <ArticleComponent title="Sign in on LeetStorer" fields={loginFields} onClick={handleLogin} isLoginComponent={true} />
    );
}

export default LoginPage;
