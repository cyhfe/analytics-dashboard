import * as React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

const element = document.getElementById("root") as HTMLDivElement;
const root = createRoot(element);
root.render(<App />);
