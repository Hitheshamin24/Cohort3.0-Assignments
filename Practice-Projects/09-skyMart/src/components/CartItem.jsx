import React, { useContext } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "../context/ProductContext";

const CartItem = ({ item }) => {
  const {increaseQuantity, decreaseQuantity,deleteFromCart} = useContext(Product)
  return (
    <div className="rounded-3xl border border-zinc-600 p-3">
      <div className="flex gap-4">
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="h-20 w-20 rounded-2xl object-cover"
        />

        {/* Details */}
        <div className="flex flex-1 flex-col">
          <h3 className="font-dm-sans text-[14px] font-medium text-white">
            {item.title}
          </h3>

          <h4 className=" font-syne text-[16px] font-bold text-lime-400">
            ${item.price * item.quantity}
          </h4>

          <p className="font-dm-sans text-[12px] text-zinc-500">
            ${item.price} each
          </p>

          {/* Controls */}
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={()=>decreaseQuantity(item.id)} className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-700 transition hover:border-lime-400 hover:bg-lime-400/10 cursor-pointer">
                <Minus
                  size={16}
                  className="text-zinc-300"
                />
              </button>

              <span className="font-dm-sans text-[14px] text-white">
                {item.quantity}
              </span>

              <button onClick={()=>increaseQuantity(item.id)} className="flex h-6 w-6 items-center justify-center rounded-lg border border-zinc-700 transition hover:border-lime-400 hover:bg-lime-400/10 cursor-pointer">
                <Plus
                  size={16}
                  className="text-zinc-300"
                />
              </button>
            </div>

            <button onClick={()=>deleteFromCart(item.id)} className="transition hover:text-red-500 cursor-pointer">
              <Trash2
                size={16}
                className="text-red-300 hover:text-red-500 "
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;