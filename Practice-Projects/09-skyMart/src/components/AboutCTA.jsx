import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const AboutCTA = () => {
    const navigate=useNavigate()
  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      <div className="bg-[#101010] border border-zinc-700 rounded-3xl py-14 px-8 text-center">

        <h2 className="font-syne text-[24px] font-bold text-white">
          Ready to Shop?
        </h2>

        <p className="font-dm-sans text-[14px] text-zinc-400 mt-4">
          Explore thousands of products at unbeatable prices.
        </p>

        <button onClick={()=>navigate("/shop")} className="mt-8 inline-flex items-center gap-2 bg-lime-400 text-black font-syne text-[16px] px-8 py-4 rounded-2xl hover:bg-lime-300 transition cursor-pointer">
          Shop Now
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  );
};

export default AboutCTA;