import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      closeButton={false}
      autoClose={1500}
      newestOnTop
      theme="dark"
      toastStyle={{
        background: "#1f1f1f",
        color: "#fff",
        border: "1px solid #3f3f46",
        borderRadius: "16px",
        minHeight: "48px",
        boxShadow: "0 8px 20px rgba(0,0,0,.35)",
      }}
    />
  </AuthProvider>,
);
