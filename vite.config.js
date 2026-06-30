import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      "@": resolve("src"),
      "@assets": resolve("src/assets"),
      "@src": resolve("src"),
    },
  },
});