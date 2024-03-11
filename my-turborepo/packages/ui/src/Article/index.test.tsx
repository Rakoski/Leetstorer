import { createRoot } from "react-dom/client";
import { ArticleComponent } from ".";

function onClick() {
    console.log("Counter button clicked on Article component!")
}

describe("CounterButton", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const root = createRoot(div);
        root.render(<ArticleComponent  fields={[]} title={"title"} isLoginComponent={false} onClick={onClick}/>);
        root.unmount();
    });
});
