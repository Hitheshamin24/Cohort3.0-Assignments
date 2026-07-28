import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router";
import CartDrawer from "../components/cart/CartDrawer";

const MainLayout = () => {
  return (
    <div className="bg-[#0d0d0d]">
      <Navbar />
      <CartDrawer />
      <div className="pt-17 max-w-7xl mx-auto px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
