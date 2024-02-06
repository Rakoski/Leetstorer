import {useState} from "react";
import {InputField} from "@repo/ui/src/InputField";
import {ArticleComponent} from "@repo/ui/src/Article";
import {Link} from "@repo/ui";

function RegistrationPage(): JSX.Element {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleRegistration = () => {
        console.log("User registered:", { username, email });
    };

    const registrationFields = [
        <InputField key="username" label={"Username"} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />,
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />,
    ];

    return <ArticleComponent title="Sign up for LeetStorer!" fields={registrationFields} onSubmit={handleRegistration} isLoginComponent={false} />;
}

export default RegistrationPage;