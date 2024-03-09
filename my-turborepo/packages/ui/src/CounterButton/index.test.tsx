import { createRoot } from "react-dom/client";
import { CounterButton } from ".";
import {describe, it} from "jest"

function handleOnClick () {
  console.log("Button clicked")
}

describe("CounterButton", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<CounterButton  onClick={handleOnClick}/>);
    root.unmount();
  });
});
