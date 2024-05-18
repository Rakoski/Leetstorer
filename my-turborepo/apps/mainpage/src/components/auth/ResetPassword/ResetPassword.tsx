import React, {Fragment, useState} from "react";
import { InputField } from "@repo/ui/src/InputField";
import {CounterButton} from "@repo/ui/src/LoginRegisterButton";
import {Link} from "@repo/ui/src/Link";
import {ArticleComponent} from "@repo/ui/src/SignInPagesArticle";

function resetPasswordPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSendEmail = () => {
        if (!email || !password) {
            return;
        }
    };

    const resetPasswordFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />,
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
