import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import MainLayout from "../layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import ProductsPage from "../Pages/ProductsPage";
import Home from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "/",
          element: <AuthLayout />,
          children: [
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
      path: "/",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "products",
              element: <ProductsPage />,
            },
            {
              path: "/products/:id",
              element: <ProductDetailsPage />,
            },
            {
              path: "about",
              element: <AboutPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
