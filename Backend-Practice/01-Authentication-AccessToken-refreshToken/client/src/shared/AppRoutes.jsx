import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import PublicLayout from '../app/layout/PublicLayout'
import ProtectedLayout from '../app/layout/ProtectedLayout'
import LoginPage from '../features/auth/ui/pages/LoginPage'
import RegisterPage from '../features/auth/ui/pages/RegisterPage'
import DashboardPage from '../features/dashboard/ui/pages/DashboardPage'
const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <Navigate to={"/login"} ></Navigate>
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
        ]
    },
    {
        path: "/profile",
        element: <ProtectedLayout />,
        children: [
            {
                index:true,
                element:<DashboardPage/>
            }
        ]
    }
]
)
const AppRoutes = () => {
    return (
        <div><RouterProvider router={router} /></div>
    )
}

export default AppRoutes