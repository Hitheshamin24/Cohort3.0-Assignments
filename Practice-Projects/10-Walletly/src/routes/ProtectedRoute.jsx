import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import { selectIsAuthenticated } from "../redux/slices/authSlice"

// agar logged in nahi — /login pe bhejo
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
