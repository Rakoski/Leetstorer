import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { InputField } from ".";
import { createRoot } from "react-dom/client";

describe("InputField", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");

        act(() => {
            const root = createRoot(div);
            root.render(<InputField label="Test Label" />);
        });

        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders with the provided label", () => {
        const div = document.createElement("div");

        act(() => {
            const root = createRoot(div);
            root.render(<InputField label="Email" />);
        });

        const labelElement = div.querySelector("label");
        expect(labelElement?.textContent).toBe("Email:");

        ReactDOM.unmountComponentAtNode(div);
    });
});
