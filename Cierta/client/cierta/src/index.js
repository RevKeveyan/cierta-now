import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormSelectionProvider } from "./context/formContext";
import { ToastProvider } from "./context/toatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FormSelectionProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </FormSelectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
