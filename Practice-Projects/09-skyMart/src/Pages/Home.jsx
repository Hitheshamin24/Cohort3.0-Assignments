import React from "react";
import DashboardCard from "../components/DashboardCard";
import CategoryCard from "../components/CategoryCard";
import ProductShowcase from "../components/ProductShowcase";

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
