import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// Monte l'application React dans l'élément DOM avec id="root"
createRoot(document.getElementById("root")).render(<App />);
