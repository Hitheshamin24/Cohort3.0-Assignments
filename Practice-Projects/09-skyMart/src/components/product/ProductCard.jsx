import React, { useContext } from "react";
import { Check, ShoppingCart, Star } from "lucide-react";
import { Product } from "../../context/ProductContext";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, checkIfProductExists } = useContext(Product);
  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="w-full max-w-65 overflow-hidden rounded-[28px] border border-zinc-700 bg-[#101010] transition-all duration-300 hover:border-lime-400 cursor-pointer"
    >
      {/* Image Section */}
      <div className="bg-white p-4">
        {/* Category Badge */}
        <span className="inline-block rounded-full bg-zinc-500 px-3 py-1 font-dm-sans text-[10px] font-medium text-white capitalize">
          {product.category}
        </span>

        {/* Product Image */}
        <div className="mt-6 flex h-40 items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex min-h-55 flex-col p-4">
        {/* Category */}
        <p className="font-dm-sans text-[10px] text-zinc-500 capitalize">
          {product.category}
        </p>

        {/* Product Name */}
        <h3
          className="mt-2 h-18 overflow-hidden font-dm-sans text-[14px] font-semibold leading-6 text-white"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={10}
                fill={
                  index < Math.round(product.rating.rate) ? "#facc15" : "none"
                }
                className={
                  index < Math.round(product.rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-500"
                }
              />
            ))}
          </div>

          <span className="font-dm-sans text-[10px] text-zinc-500">
            ({product.rating.count})
          </span>
        </div>

        <hr className="my-4 border-zinc-700" />

        {/* Bottom Section */}
        <div className="mt-auto flex items-center justify-between">
          <h2 className="font-syne text-[18px] font-bold text-lime-400">
            ${product.price}
          </h2>
          {checkIfProductExists(product.id) ? (
            <button className="flex items-center gap-2 rounded-full border border-green-800 bg-green-950 px-4 py-2 text-sm font-medium text-green-400 transition-all duration-300 hover:bg-green-900 cursor-pointer">
              <Check size={16} strokeWidth={2.5} />
              Added
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex items-center gap-2 rounded-full bg-lime-400 px-4 py-2 transition duration-300 hover:bg-lime-300 cursor-pointer"
            >
              <ShoppingCart size={14} className="text-black" />
              <span className="font-dm-sans text-[12px] font-medium text-black">
                Add
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
