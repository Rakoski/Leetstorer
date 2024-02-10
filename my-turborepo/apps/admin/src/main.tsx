import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app.tsx";
import "./index.css";

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RelayEnvironmentProvider>
  );
} else {
  throw new Error("Could not find root element");
}
