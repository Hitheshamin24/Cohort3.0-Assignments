import React from "react";
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Star,
  Tags,
} from "lucide-react";

const DashboardHero = () => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : hour < 21
      ? "Good Evening"
      : "Good Night";


  return (
    <div className="">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-[30px] border border-zinc-700 bg-[#101010] p-12">

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex items-center  justify-between gap-10">

          {/* Left */}
          <div className="max-w-2xl">
            <p className="font-dm-sans text-[14px] uppercase tracking-widest text-lime-400 mb-5">
              {greeting} 👋
            </p>

            <h1 className="font-dm-sans text-[48px] leading-13 font-bold text-white">
              Welcome back,
              <br />
              <span className="text-lime-400">Hithesh!</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] text-zinc-400 font-dm-sans leading-8">
              Discover today's picks — hand-curated products across
              electronics, fashion, and more.
            </p>

            <div className="mt-10 flex  gap-2">
              <button className="font-dm-sans text-nowrap text-[14px] font-medium bg-lime-400 text-black px-5 py-2 rounded-2xl flex items-center gap-2 hover:bg-lime-300 duration-300">
                Shop Now
                <ArrowRight size={18} />
              </button>

              <button className="font-dm-sans text-nowrap text-[14px] font-medium border border-zinc-700 text-white px-5 py-4 rounded-2xl hover:bg-zinc-900 duration-300">
                View All Products
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">

            <div className="w-40 h-32 rounded-3xl bg-lime-400/15 border border-lime-400/30 flex flex-col items-center justify-center">
              <h2 className="font-syne text-[36px] font-bold text-lime-400">
                20+
              </h2>

              <p className="font-dm-sans text-[16px] text-zinc-400">
                Products Available
              </p>
            </div>

            <div className="w-40 h-32 rounded-3xl border border-zinc-500 flex flex-col items-center justify-center">
              <h2 className="font-syne text-[24px] font-bold text-white">
                Free
              </h2>

              <p className="font-dm-sans text-[16px] text-zinc-400">
                Delivery on ₹999+
              </p>
            </div>

          </div>
        </div>
      </div>

    
    </div>
  );
};

export default DashboardHero;