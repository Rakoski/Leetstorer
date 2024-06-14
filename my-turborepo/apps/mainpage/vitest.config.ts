/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from "vite-plugin-relay";

export default defineConfig({
    plugins: [react(), relay],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
    },
});