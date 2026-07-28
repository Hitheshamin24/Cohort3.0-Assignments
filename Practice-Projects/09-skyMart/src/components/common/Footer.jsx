import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-300 bg-[#101010] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-5 flex flex-col items-center justify-center gap-2">
        {/* Logo */}
        <h2 className="font-syne text-[20px] font-semibold">
          <span className="text-lime-400">SkyMart</span>
        </h2>

        {/* Copyright */}
        <p className="font-dm-sans text-[12px] text-zinc-500 text-center">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </div>
    </footer>
  );
};

export default Footer;