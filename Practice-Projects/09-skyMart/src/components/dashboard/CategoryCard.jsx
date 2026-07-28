import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Product } from "../../context/ProductContext";

const CategoryCard = () => {
  const navigate = useNavigate();
  const { products } = useContext(Product);
  const emojiMap = {
    electronics: "💻",
    "men's clothing": "👔",
    "women's clothing": "👗",
    jewelery: "💍",
  };

  const categories = [...new Set(products.map((item) => item.category))].map(
    (category) => ({
      title: category,
      emoji: emojiMap[category] || "📦",
      items: products.filter((item) => item.category === category).length,
    }),
  );
  return (
    <section className="py-10">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne text-[20px] font-bold text-white">
          Shop by Category
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="bg-[#2a2a2a] w-full rounded-2xl py-3.5 flex justify-center items-center gap-2 text-lime-400 font-syne font-bold text-sm hover:bg-[#333] transition-colors cursor-pointer"
        >
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards */}
      <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            onClick={() =>
              navigate(
                `/products?category=${encodeURIComponent(category.title)}`,
              )
            }
            key={category.title}
            className="bg-white rounded-3xl py-5 px-6 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            {/* Emoji */}
            <span className="font-dm-sans text-[30px]">{category.emoji}</span>

            {/* Title */}
            <h3 className="mt-4 font-dm-sans text-[14px] font-semibold text-zinc-900">
              {category.title}
            </h3>

            {/* Items */}
            <p className="mt-1 font-dm-sans text-[12px] text-zinc-500">
              {category.items} items
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
