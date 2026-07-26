import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import { selectIsAuthenticated } from "../redux/slices/authSlice"

// agar pehle se logged in — dashboard pe bhejo
const PublicRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute
