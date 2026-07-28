import React, { useContext } from "react";
import { Product } from "../../context/ProductContext";
import { ShoppingBag, TrendingUp, Star, Tags } from "lucide-react";

const DashboardStats = () => {
  const { cart, cartTotal, categoriesList, topProductsCount } = useContext(Product);

  const stats = [
    {
      icon: <ShoppingBag size={22} className="text-lime-400" />,
      value: cart.length.toString(),
      title: "Cart Items",
      subtitle: "In your bag",
      bg: "bg-lime-400/10",
    },
    {
      icon: <TrendingUp size={22} className="text-sky-400" />,
      value: `$${(cartTotal || 0).toFixed(2)}`,
      title: "Cart Value",
      subtitle: "Ready to checkout",
      bg: "bg-sky-400/10",
    },
    {
      icon: <Star size={22} className="text-yellow-400" />,
      value: (topProductsCount || 0).toString(),
      title: "Top Products",
      subtitle: "Rated 4.5+",
      bg: "bg-yellow-400/10",
    },
    {
      icon: <Tags size={22} className="text-violet-400" />,
      value: (categoriesList?.length || 0).toString(),
      title: "Categories",
      subtitle: "To explore",
      bg: "bg-violet-400/10",
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 mt-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="border border-zinc-700 rounded-[26px] p-7 bg-[#101010] flex gap-5 h-30"
        >
          <div
            className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
          >
            {item.icon}
          </div>

          <div>
            <h2 className="font-syne text-[24px] font-bold text-white">
              {item.value}
            </h2>

            <p className="font-dm-sans text-[14px] text-zinc-300">
              {item.title}
            </p>

            <p className="font-dm-sans text-[12px] text-zinc-500">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
