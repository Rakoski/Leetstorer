import {createRoot} from "react-dom/client";
import {CounterButton} from "../CounterButton";
import Header from "./index.tsx";
import {describe, it} from "jest"

describe("CounterButton", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const root = createRoot(div);
        root.render(<Header />);
        root.unmount();
    });
});