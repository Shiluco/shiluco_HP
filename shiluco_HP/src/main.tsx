import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// サービスワーカーの登録
const updateSW = registerSW({
  onNeedRefresh() {
    // 更新が必要な場合の処理を追加
    const userConfirmed = window.confirm(
      "新しいバージョンがあります。更新しますか?"
    );
    if (userConfirmed) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    // オフラインで準備が整った場合の処理
    console.log("オフラインで準備が整いました。");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
