import { createRoot } from "react-dom/client";
import { CounterButton } from ".";

function handleOnClick () {
  console.log("Button clicked")
}

describe("CounterButton", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<CounterButton  onClick={handleOnClick} isLoginComponent={false}/>);
    root.unmount();
  });
});
