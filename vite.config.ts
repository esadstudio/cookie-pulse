import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const pagesBase = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base: pagesBase,
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer", "process"],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
});
