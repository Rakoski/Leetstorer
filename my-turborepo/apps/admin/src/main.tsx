import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "./RelayEnvironment.ts";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app.tsx";
import "./index.css";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const el = document.getElementById("root");

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});
if (el) {
  const root = createRoot(el);
  root.render(
    <RelayEnvironmentProvider environment={RelayEnvironment}>
        <ApolloProvider client={client}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ApolloProvider>
    </RelayEnvironmentProvider>
  );
} else {
  throw new Error("Could not find root element");
}