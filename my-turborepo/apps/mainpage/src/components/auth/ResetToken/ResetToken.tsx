import React, {useState} from "react";
import { InputField } from "@repo/ui/src/InputField";
import {ArticleComponent} from "@repo/ui/src/SignInPagesArticle";
import requestPasswordResetMutation from "../../../mutations/RequestPasswordResetMutation.ts";

function resetPasswordPage() {
    const [email, setEmail] = useState("");

    const handleSendEmail = () => {
        if (!email) {
            return;
        }
        requestPasswordResetMutation(email, () => {
            alert("Email sent! Check your inbox for updates!")
        }, (error: unknown) => {
            alert("Error in reseting password")
        })
    };

    const resetPasswordFields = [
        <InputField
            key="email"
            label={"Email"}
            type="email"
            value={email}
            onChange={(event) => {
                setEmail(event.target.value)
            }}
        />,
    ];

    return (
        <div>
            <ArticleComponent
                title="Reset your password"
                fields={resetPasswordFields}
                onClick={handleSendEmail}
                isLoginComponent={false}
                buttonPhrase={"Send Reset Password Email"}
                articleUnderPhrase="Back to login"
                hrefTo="/"
            />
        </div>
    );
}

export default resetPasswordPage;
