import { useState } from "react";
import "./styles.css";

interface CounterButtonProps {
    onClick: () => void | null;
    isLoginComponent: boolean;
}

export function CounterButton({onClick, isLoginComponent}: CounterButtonProps): JSX.Element {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            onClick && onClick();
            setClicked(false);
        }, 500);
    };

    return (
        <button
            onClick={handleClick}
            className={clicked ? "clicked" : ""}
            style={{
                background: "black",
                fontSize: "16px",
                color: "white",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "0.25rem",
                display: "inline-block",
                cursor: "pointer",
            }}
            type="button"
        >
            {isLoginComponent ? "Login" : "Register"}
        </button>
    );
}
