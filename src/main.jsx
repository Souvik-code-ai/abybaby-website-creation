import { createRoot } from "react-dom/client";
import App from "./App";
import Canonical from "./Canonical";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
createRoot(document.getElementById("root")).render(
    <HelmetProvider>
<BrowserRouter>
<Canonical/>
    <App />
  </BrowserRouter>,
    </HelmetProvider>
  
);
