import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AsideNav from "../../features/dashboard/ui/components/AsideNav";
import TopNav from "../../features/dashboard/ui/components/TopNav";

const DashboardLayout = () => {
  const { mode } = useSelector((store) => store.theme);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else document.body.classList.remove("light");
  }, [mode]);
  return (
    <div className="grid min-h-screen grid-cols-[16rem_1fr]">
      <div className="border border-gray-500 w-60">
        <AsideNav />
      </div>
      <div className="pt-12">
        <div className="flex flex-col ">
          <TopNav />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
