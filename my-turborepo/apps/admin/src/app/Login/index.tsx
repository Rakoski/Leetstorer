import {useState} from "react";
import {InputField} from "@repo/ui/src/InputField";
import {ArticleComponent} from "@repo/ui/src/Article";

function LoginPage(): JSX.Element {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        console.log("User registered:", { email });
    };

    const loginFields = [
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />,
    ];

    return <ArticleComponent title="Sign in on LeetStorer" fields={loginFields} onSubmit={handleLogin} isLoginComponent={true} />;
}

export default LoginPage;