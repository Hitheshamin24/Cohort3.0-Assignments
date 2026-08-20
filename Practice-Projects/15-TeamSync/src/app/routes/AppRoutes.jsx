import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "../layouts/authLayout";
import LoginPage from "../../features/auth/ui/pages/LoginPage";
import RegisterPage from "../../features/auth/ui/pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../../features/dashboard/ui/HomePage";
import { useDispatch } from "react-redux";
import { currentLoggedEmployee } from "../../features/auth/state/auth/authAction";
import PublicRoute from "../ProtectedRoutes/PublicRoute";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";

const AppRoutes = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    (() => {
      dispatch(currentLoggedEmployee());
    })();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Navigate to="/login" />,
            },
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
