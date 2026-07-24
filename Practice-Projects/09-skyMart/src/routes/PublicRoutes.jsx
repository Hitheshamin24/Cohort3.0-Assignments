import React, { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { loggedInUser } = useContext(Auth);
  if (loggedInUser) {
    return <Navigate to={"/home"} />;
  }
  return <Outlet />;
};

export default PublicRoutes;
