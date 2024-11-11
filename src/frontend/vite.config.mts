import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
    build: {
        outDir: './build',
        emptyOutDir: true,
    },
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
    },
})
