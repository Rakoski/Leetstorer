import * as React from "react";
import "./styles.css";
import {CounterButton, Link} from "@repo/ui";
import {InputField} from "@repo/ui/src/InputField";

function RegistrationPage(): JSX.Element {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleRegistration = () => {
        console.log("User registered:", { username, email });
    };

    return (
        <div className="container">
            <h1 className="title">Sign up for LeetStorer!</h1>
            <form onSubmit={handleRegistration}>
                <label>
                    <InputField
                        label={"Email"}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    <InputField
                        label={"Password"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <CounterButton />
            </form>
            <p className="description">
                Built With{" "}
                <Link href="https://turbo.build/repo" newTab>
                    Turborepo
                </Link>
                {" & "}
                <Link href="https://vitejs.dev/" newTab>
                    Vite
                </Link>
            </p>
        </div>
    );
}

export default RegistrationPage;
