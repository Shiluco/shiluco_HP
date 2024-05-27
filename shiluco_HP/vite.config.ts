import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Swipe→JUMP",
        short_name: "SwipeJUMP",
        description: "Swipe to jump to your destination!",
        theme_color: "#ffffff",
        icons: [], // アイコンを空にする
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["chunk-74SHYG65.js", "chunk-YSLWII7P.js", "chunk-ZJNTSUWQ.js"],
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
