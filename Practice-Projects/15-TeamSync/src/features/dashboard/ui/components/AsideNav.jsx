import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  MessageSquare,
  Settings,
  Plus,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Assistant",
    path: "/assistant",
    icon: Sparkles,
  },
  {
    name: "Groups",
    path: "/groups",
    icon: Users,
  },
  {
    name: "Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const AsideNav = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen flex-col border-r border-(--outline-variant) bg-(--surface-container-lowest) w-60 py-5 text-(--on-surface)">

      {/* Logo */}
      <div className="px-2.5 pb-7">
        <h1 className="text-sm font-bold text-var(--primary)">
          Teamsync AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `
              flex h-9 items-center gap-2.5 rounded-(--radius)
              px-2.5 text-[13px] font-normal
              transition-colors duration-150
              ${
                isActive
                  ? "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-var(--primary)"
                  : "text-(--on-surface-variant) hover:bg-(--surface-container) hover:text-var(--on-surface)"
              }
              `
            }
          >
            <Icon size={15} strokeWidth={1.8} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* New Task */}
      <div className="mt-auto px-2.5">
        <button
          className="
            flex h-8 w-full items-center justify-center gap-1.5
            rounded-[var(--radius)]
            bg-[var(--primary)]
            text-xs font-medium
            text-[var(--on-primary)]
            transition
            hover:brightness-110
            active:translate-y-px
          "
        >
          <Plus size={14} />
          <span>New Task</span>
        </button>
      </div>
    </aside>
  );
};

export default AsideNav;