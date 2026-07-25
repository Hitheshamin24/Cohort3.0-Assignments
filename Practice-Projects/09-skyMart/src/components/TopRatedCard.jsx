import React, { useContext } from "react";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Product } from "../context/ProductContext";
import { useNavigate } from "react-router";

const TopRatedCard = () => {
  const navigate=useNavigate()
  const { sortProducts, addToCart } = useContext(Product);
  const topRated = sortProducts().slice(0,5);
  return (
    <div className="bg-white rounded-[30px] p-5 ">
      <div className="flex justify-between items-center mb-5">
        <h2 className="flex items-center gap-2 font-syne text-[18px] font-bold">
          <Star size={16} fill="#facc15" className="text-yellow-400" />
          Top Rated
        </h2>

        <button className="flex items-center gap-1 font-dm-sans text-[12px] text-lime-500 cursor-pointer">
          See all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {topRated.map((item, index) => (
          <div onClick={()=>navigate(`/products/${item.id}`)}
            key={index}
            className="border border-[#eefcb2] rounded-2xl px-4 py-3 flex justify-between items-center cursor-pointer"
          >
            <div  className="flex gap-3 items-center ">
              <img
                src={item.image}
                alt=""
                className="w-10 h-10 rounded-lg object-cover"
              />

              <h3 className="font-syne text-[14px] text-lime-500">
                ${item.price}
              </h3>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                addToCart(item)}}
              className="w-8 h-8 rounded-xl bg-lime-50 flex justify-center items-center"
            >
              <ShoppingBag size={16} className="text-lime-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedCard;
