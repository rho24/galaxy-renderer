import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Galaxy from "./Galaxy";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Galaxy />
  </React.StrictMode>
);
