import React from "react";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
} from "lucide-react";

const stats = [
  {
    icon: <Package size={18} className="text-lime-400" />,
    value: "20K+",
    label: "Products",
  },
  {
    icon: <Users size={18} className="text-lime-400" />,
    value: "50K+",
    label: "Happy Customers",
  },
  {
    icon: <Star size={18} className="text-lime-400" />,
    value: "4.9",
    label: "Avg. Rating",
  },
  {
    icon: <Truck size={18} className="text-lime-400" />,
    value: "99%",
    label: "On-time Delivery",
  },
];

const AboutHero = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Thunder */}

      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-2xl bg-lime-400 flex items-center justify-center animate-bounce">
          <Zap
            size={28}
            className="text-black fill-black"
          />
        </div>
      </div>

      {/* Heading */}

      <div className="text-center mt-8">

        <h1 className="font-syne text-[48px] font-bold text-white">
          About{" "}
          <span className="text-lime-400">
            SkyMart
          </span>
        </h1>

        <p className="font-dm-sans text-[18px] text-zinc-400 mt-5 max-w-3xl mx-auto leading-8">
          SkyMart is a next-generation e-commerce
          platform built to make online shopping
          fast, fair, and enjoyable — for everyone.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-4  gap-5 mt-12">

        {stats.map((item) => (
          <div
            key={item.label}
            className="border border-zinc-700 rounded-2xl bg-[#101010] p-6 flex flex-col items-center"
          >
            {item.icon}

            <h2 className="font-syne text-[24px] font-bold text-white mt-3">
              {item.value}
            </h2>

            <p className="font-dm-sans text-[12px] text-zinc-500 mt-1">
              {item.label}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AboutHero;