import React from "react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    emoji: "💻",
    title: "Electronics",
    items: 17,
  },
  {
    emoji: "📦",
    title: "Clothing",
    items: 2,
  },
  {
    emoji: "📦",
    title: "Furniture",
    items: 3,
  },
  {
    emoji: "📦",
    title: "Home",
    items: 14,
  },
  {
    emoji: "📦",
    title: "Sports",
    items: 8,
  },
  {
    emoji: "📦",
    title: "Accessories",
    items: 6,
  },
];

const CategoryCard = () => {
  return (
    <section className="py-10">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-syne text-[20px] font-bold text-white">
          Shop by Category
        </h2>

        <button className="flex items-center gap-2 font-dm-sans text-[14px] font-medium text-lime-400 hover:gap-3 transition-all">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Cards */}
      <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-3xl py-5 px-6 flex flex-col items-center justify-center cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            {/* Emoji */}
            <span className="font-dm-sans text-[30px]">
              {category.emoji}
            </span>

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