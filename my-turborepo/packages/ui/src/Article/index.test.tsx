import { createRoot } from "react-dom/client";
import { ArticleComponent } from ".";

describe("CounterButton", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        const root = createRoot(div);
        root.render(<ArticleComponent  fields={[]} title={"title"} onSubmit={null}/>);
        root.unmount();
    });
});
