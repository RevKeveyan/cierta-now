import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastProvider } from "./context/toatsContext";
import { FormProvider } from "./context/FormContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <ToastProvider>
        <FormProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FormProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
