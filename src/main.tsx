import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const container = document.querySelector<HTMLDivElement>("#app");

if (!container) {
  throw new Error("Root element #app was not found.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
