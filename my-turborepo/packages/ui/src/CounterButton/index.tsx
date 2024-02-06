import { useState } from "react";
import "../Article/index.css"

export function CounterButton(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
        <button
          onClick={() => {
            setCount((c) => c + 1);
          }}
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
