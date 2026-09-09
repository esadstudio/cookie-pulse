import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { WalletProviders } from "./components/WalletProviders";
import "./index.css";

if (!("popover" in HTMLElement.prototype)) {
  void import("@oddbird/popover-polyfill");
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Cookie Pulse root element is missing");
}

createRoot(root).render(
  <StrictMode>
    <WalletProviders>
      <App />
    </WalletProviders>
  </StrictMode>,
);
