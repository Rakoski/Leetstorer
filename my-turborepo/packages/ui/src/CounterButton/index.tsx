import { useState } from "react";
import "../Article/index.css"

interface CounterButtonProps {
    onClick: () => void | null;
}

export function CounterButton({onClick}: CounterButtonProps): JSX.Element {

  return (
        <button
          onClick={onClick}
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
          Register
        </button>
  );
}
