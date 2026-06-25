import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
// In production (GitHub Pages project site) assets live under
// /next-sense-bic-design-system/; in dev we stay at / so the local server keeps
// working at localhost:5173.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/next-sense-bic-design-system/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
