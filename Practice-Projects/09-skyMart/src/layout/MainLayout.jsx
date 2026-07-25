import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import CartDrawer from "../components/CartDrawer";

const MainLayout = () => {
  return (
    <div className="bg-[#0d0d0d]">
      <Navbar />
      <CartDrawer />
      <div className="pt-17 max-w-7xl mx-auto px-5">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
