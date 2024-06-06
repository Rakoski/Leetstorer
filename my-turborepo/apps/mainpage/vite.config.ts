import relay from "vite-plugin-relay";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [relay, react()]
});
