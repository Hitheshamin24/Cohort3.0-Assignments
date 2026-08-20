import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    let { employee, isHydrating } = useSelector((store) => store.auth);

    if (isHydrating) return null;

    if (!employee) {
        return <Navigate to="/" />;
    }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
