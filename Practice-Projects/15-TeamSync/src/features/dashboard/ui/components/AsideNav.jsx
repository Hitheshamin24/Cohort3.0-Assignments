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
import { useSelector } from "react-redux";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constants/navgation";
import NavigationTab from "./NavigationTab";



const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);
  let navigation =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;
  return (
    <aside className="fixed left-0 top-0 flex h-screen flex-col border-r border-(--outline-variant) bg-(--surface-container-lowest) w-60 py-5 text-(--on-surface)">
      {/* Logo */}
      <div className="px-2.5 pb-7">
        <h1 className="text-sm font-bold text-var(--primary)">Teamsync AI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navigation.map((route) => {
          return (
            <NavigationTab
              path={route.path}
              Icon={route.icon}
              title={route.title}
            />
          );
        })}
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
