import { Routes, Route } from "react-router"
import MainLayout from "../layouts/MainLayout"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import Dashboard from "../pages/Dashboard"
import Accounts from "../pages/Accounts"
import Income from "../pages/Income"
import Expense from "../pages/Expense"
import Transactions from "../pages/Transactions"
import Reports from "../pages/Reports"

const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes — logged in hone pe redirect */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* protected routes — login chahiye */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
