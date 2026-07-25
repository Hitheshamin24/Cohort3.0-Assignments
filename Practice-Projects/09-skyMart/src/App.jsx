import React from "react";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AppRoutes from "./routes/AppRoutes";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <div className="h-screen font-syne">
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </div>
  );
};

export default App;
