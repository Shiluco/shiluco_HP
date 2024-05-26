// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["chunk-74SHYG65.js", "chunk-YSLWII7P.js", "chunk-ZJNTSUWQ.js"],
  },
});
