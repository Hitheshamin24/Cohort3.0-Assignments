import React from "react";
import DashboardCard from "../components/dashboard/DashboardCard";
import CategoryCard from "../components/dashboard/CategoryCard";
import ProductShowcase from "../components/product/ProductShowcase";

const Home = () => {
  return (
    <div>
      <DashboardCard />
      <CategoryCard />
      <ProductShowcase />
    </div>
  );
};

export default Home;
