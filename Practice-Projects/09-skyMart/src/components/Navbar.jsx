import React, { useContext, useState } from "react";
import { Zap, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/UseAuthHooks";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { loggedInUser, userLogout } = useAuth();
  const links = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="w-full bg-[#0f0f0f] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <Zap
                size={15}
                className="fill-black text-black"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="font-syne text-[18px] font-bold">
              <span className="text-white">Sky</span>
              <span className="text-lime-400">Mart</span>
            </h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-dm-sans text-sm font-medium">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-lime-400" : "text-zinc-400 hover:text-white"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Profile */}
            <div className="hidden md:flex items-center gap-2 bg-[#1a1a1a] border border-zinc-700 rounded-xl px-3 py-1.5">
              <div className="w-8 h-8 rounded-xl bg-lime-400 flex items-center justify-center">
                <span className="text-black font-dm-sans text-sm font-semibold">
                  {loggedInUser.avatar}
                </span>
              </div>

              <span className="text-sm font-dm-sans text-white font-medium">
                {loggedInUser.fullName.split(" ")[0]}
              </span>
            </div>

            {/* Cart */}
            <button className="relative w-10 h-10 rounded-xl border border-zinc-700 bg-[#111] flex items-center justify-center cursor-pointer">
              <ShoppingCart size={18} className="text-white" />

              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-400 text-[10px] font-bold font-dm-sans flex items-center justify-center text-black">
                2
              </span>
            </button>

            {/* Logout */}
            <button onClick={()=>userLogout()} className="hidden md:flex w-10 h-10 rounded-xl border border-zinc-700 bg-[#111] items-center justify-center cursor-pointer">
              <LogOut size={18} className="text-zinc-300" />
            </button>

            {/* Mobile */}
            <button
              onClick={() => setIsMobile(!isMobile)}
              className="md:hidden w-10 h-10 rounded-xl border border-zinc-700 bg-[#111] flex items-center justify-center cursor-pointer"
            >
              {isMobile ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="md:hidden bg-[#0f0f0f] border-b border-zinc-800 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col px-5 py-5 font-dm-sans">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobile(false)}
                className={({ isActive }) =>
                  `py-4 text-sm font-medium ${
                    isActive
                      ? "text-lime-400"
                      : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button onClick={()=>userLogout()} className="mt-4 flex items-center gap-2 text-red-400 text-sm">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
