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
      toastClassName={() =>
        "bg-zinc-900 border flex gap-2 p-2 border-zinc-700 rounded-2xl text-white shadow-lg"
      }
      bodyClassName={() => "text-sm font-medium"}
    />
  </AuthProvider>,
);
