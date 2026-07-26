// saare routes ek jagah — centralized routing
import { Routes, Route } from "react-router"
import Dashboard from "../pages/Dashboard"
import Accounts from "../pages/Accounts"
import Income from "../pages/Income"
import Expense from "../pages/Expense"
import Transactions from "../pages/Transactions"
import Reports from "../pages/Reports"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  )
}

export default AppRoutes
