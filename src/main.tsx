import React from "react";
import ReactDOM from "react-dom";
import { Alert } from "./components/alert/Alert";

import "~/main.css";

function renderAtRoot(app: React.ReactElement) {
  ReactDOM.render(
    <React.StrictMode>{app}</React.StrictMode>,
    document.getElementById("root")
  );
}

async function main() {
  try {
    const entry = import.meta.env.VITE_APP_ENTRY;
    if (!entry) {
      throw new Error("Invalid app entry has been provided");
    }

    const App = (await import(/* @vite-ignore */ `${entry}/index.ts`)).default;
    renderAtRoot(<App />);
  } catch (error) {
    console.error(error);
    renderAtRoot(<Alert error={error.message} />);
  }
}

main();
