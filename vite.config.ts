import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// base "./" = relative asset paths, so it works on any GitHub Pages URL (no repo name needed)
export default defineConfig({ base: "./", plugins: [react()] });
