import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import ProductsPage from "../pages/ProductsPage";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
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
              index: true,
              element: <Navigate to="/login" replace />,
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
