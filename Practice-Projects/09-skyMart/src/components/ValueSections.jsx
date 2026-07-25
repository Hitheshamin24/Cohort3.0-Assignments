import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  BadgeCheck,
} from "lucide-react";

const values = [
  {
    icon: <ShieldCheck size={18} />,
    title: "Trust",
    description:
      "Every product is verified for quality and authenticity before listing.",
  },
  {
    icon: <Zap size={18} />,
    title: "Speed",
    description:
      "We process and deliver your orders as quickly as possible.",
  },
  {
    icon: <Users size={18} />,
    title: "Community",
    description:
      "Built around real customer feedback and long-term relationships.",
  },
  {
    icon: <BadgeCheck size={18} />,
    title: "Quality",
    description:
      "Curated products with exceptional quality at affordable prices.",
  },
];

const ValuesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-16">
      <h2 className="font-syne text-[24px] font-bold text-center text-white mb-10">
        What We Stand For
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-[#101010] border border-zinc-700 rounded-2xl p-6 flex gap-5"
          >
            <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400">
              {value.icon}
            </div>

            <div>
              <h3 className="font-syne text-[16px] font-semibold text-white">
                {value.title}
              </h3>

              <p className="font-dm-sans text-[14px] text-zinc-400 mt-2 leading-6">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesSection;