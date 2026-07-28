import React from "react";
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
