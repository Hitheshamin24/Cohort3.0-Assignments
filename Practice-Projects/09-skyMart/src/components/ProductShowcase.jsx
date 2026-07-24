import React from "react";
import {
  Zap,
  ShieldCheck,
  Tag,
} from "lucide-react";

import TopRatedCard from "./TopRatedCard";
import NewArrivalsCard from "./NewArrivalsCard";

const ProductShowcase = () => {
  return (
    <section className="space-y-8">

      <div className="grid lg:grid-cols-2 gap-6">
        <TopRatedCard />
        <NewArrivalsCard />
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border border-zinc-700 rounded-2xl bg-[#101010] p-5 flex items-center gap-4">
          <Zap size={16} className="text-lime-400" />

          <div>
            <h3 className="font-dm-sans text-[14px] font-semibold text-white">
              Fast Delivery
            </h3>

            <p className="font-dm-sans text-[12px] text-zinc-500">
              Same-day on select items
            </p>
          </div>
        </div>

        <div className="border border-zinc-700 rounded-2xl bg-[#101010] p-5 flex items-center gap-4">
          <ShieldCheck size={16} className="text-sky-400" />

          <div>
            <h3 className="font-dm-sans text-[14px] font-semibold text-white">
              Secure Payments
            </h3>

            <p className="font-dm-sans text-[12px] text-zinc-500">
              100% encrypted checkout
            </p>
          </div>
        </div>

        <div className="border border-zinc-700 rounded-2xl bg-[#101010] p-5 flex items-center gap-4">
          <Tag size={16} className="text-green-400" />

          <div>
            <h3 className="font-dm-sans text-[14px] font-semibold text-white">
              Best Prices
            </h3>

            <p className="font-dm-sans text-[12px] text-zinc-500">
              Price-match guarantee
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default ProductShowcase;