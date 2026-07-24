import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import MainLayout from "../layout/MainLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  const router = createBrowserRouter([
   {
    path:"/",
    element:<PublicRoutes/>,
    children:[
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
    ]
   },
    {
      path:"/home",
      element:<ProtectedRoutes/>,
      children:[
        {
          path:"",
          element:<MainLayout/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
