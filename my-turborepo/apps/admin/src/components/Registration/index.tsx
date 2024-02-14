import { useState } from "react";
import { InputField } from "@repo/ui/src/InputField";
import { ArticleComponent } from "@repo/ui/src/Article";
import { GC_AUTH_TOKEN, GC_USER_ID } from "../../constants.ts";
import CreateUserMutation from "../../mutations/CreateUserMutation.ts";
import LoginMutation from "../../mutations/LoginMutation.ts";

function RegistrationPage({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleRegistration = () => {
        setLoading(true);
        CreateUserMutation(username, email, password, (userId, token) => {
            saveUserData(userId, token);
            setIsLoggedIn(true);
        }, (error) => {
            alert("Error in registration")
        });
    };

    const saveUserData = (id: string, token: string) => {
        localStorage.setItem(GC_USER_ID, id)
        localStorage.setItem(GC_AUTH_TOKEN, token)
    }

    const registrationFields = [
        <InputField key="username" label={"Username"} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />,
        <InputField key="email" label={"Email"} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />,
        <InputField key="password" label={"Password"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />,
    ];

    return (
        <div>
            <ArticleComponent title="Sign up for LeetStorer!" fields={registrationFields} onClick={handleRegistration} isLoginComponent={false} />
        </div>
    );
}

export default RegistrationPage;
