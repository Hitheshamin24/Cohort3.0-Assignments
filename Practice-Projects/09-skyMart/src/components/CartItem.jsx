import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  return (
    <div className="rounded-3xl border border-zinc-600 p-4">
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

          <h4 className="mt-2 font-syne text-[16px] font-bold text-lime-400">
            ${item.price}
          </h4>

          <p className="font-dm-sans text-[16px] text-zinc-500">
            ${item.price} each
          </p>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-700 transition hover:border-lime-400 hover:bg-lime-400/10">
                <Minus
                  size={16}
                  className="text-zinc-300"
                />
              </button>

              <span className="font-dm-sans text-[14px] text-white">
                1
              </span>

              <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-700 transition hover:border-lime-400 hover:bg-lime-400/10">
                <Plus
                  size={16}
                  className="text-zinc-300"
                />
              </button>
            </div>

            <button className="transition hover:text-red-500">
              <Trash2
                size={16}
                className="text-zinc-500"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;