import { useState } from "react";
import "../Article/index.css"

export function CounterButton({onClick}: () => void): JSX.Element {

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
