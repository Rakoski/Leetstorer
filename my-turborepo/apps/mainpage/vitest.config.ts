import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from "vite-plugin-relay";

export default defineConfig({
    plugins: [react(), relay],
    test: {
        globals: true,
        environment: 'jsdom',
        hookTimeout: 600000,
        testTimeout: 600000,
    },
});