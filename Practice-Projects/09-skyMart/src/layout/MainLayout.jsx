import React from "react";
import Navbar from "../components/Navbar";
import Home from "../Pages/Home";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div className="bg-[#0d0d0d]">
      <Navbar />
      <div className="pt-17 max-w-7xl mx-auto px-5">
        <Home/>
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
