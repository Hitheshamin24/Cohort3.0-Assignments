import React from "react";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";

const products = [
  { image: "/products/6.png", price: "$99.99" },
  { image: "/products/7.png", price: "$299.99" },
  { image: "/products/8.png", price: "$24.99" },
  { image: "/products/9.png", price: "$199.99" },
  { image: "/products/10.png", price: "$34.99" },
];

const NewArrivalsCard = () => {
  return (
    <div className="bg-white rounded-[30px] p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="flex items-center gap-2 font-syne text-[18px] font-bold">
          <Zap size={16} className="text-lime-500" />
          New Arrivals
        </h2>

        <button className="flex items-center gap-1 font-dm-sans text-[12px] text-lime-500">
          See all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {products.map((item, index) => (
          <div
            key={index}
            className="border rounded-2xl px-4 py-3 flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <img
                src={item.image}
                alt=""
                className="w-10 h-10 rounded-lg object-cover"
              />

              <h3 className="font-syne text-[14px] text-lime-500">
                {item.price}
              </h3>
            </div>

            <button className="w-8 h-8 rounded-xl bg-lime-50 flex justify-center items-center">
              <ShoppingBag size={16} className="text-lime-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsCard;