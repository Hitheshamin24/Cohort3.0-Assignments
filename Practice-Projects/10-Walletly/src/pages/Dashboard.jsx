import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank,
  CalendarDays, Landmark, Plus,
} from "lucide-react"
import { selectTotalBalance, selectActiveAccounts } from "../redux/slices/accountsSlice"
import { selectTotalIncome, selectMonthlyIncome } from "../redux/slices/incomeSlice"
import { selectTotalExpense, selectMonthlyExpense } from "../redux/slices/expenseSlice"
import StatCard from "../components/dashboard/StatCard"
import RecentTransactions from "../components/dashboard/RecentTransactions"
import ExpenseByCategory from "../components/dashboard/ExpenseByCategory"

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`

const Dashboard = () => {
  const navigate = useNavigate()

  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()
  const monthName = now.toLocaleString("en-IN", { month: "long", year: "numeric" })

  const totalBalance  = useSelector(selectTotalBalance)
  const totalIncome   = useSelector(selectTotalIncome)
  const totalExpense  = useSelector(selectTotalExpense)
  const activeAccounts = useSelector(selectActiveAccounts)
  const monthlyIncome  = useSelector(selectMonthlyIncome(month, year))
  const monthlyExpense = useSelector(selectMonthlyExpense(month, year))

  const netSavings = totalIncome - totalExpense
  const monthlySavings = monthlyIncome - monthlyExpense

  return (
    <div className="h-full flex flex-col gap-4">

      {/* quick actions */}
      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => navigate("/income")}
          className="flex items-center gap-2 bg-income text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} /> Add Income
        </button>
        <button
          onClick={() => navigate("/expense")}
          className="flex items-center gap-2 bg-expense text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={15} /> Add Expense
        </button>
      </div>

      {/* stat cards row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <StatCard
          title="Total Balance"
          value={fmt(totalBalance)}
          icon={Wallet}
          color="bg-primary/10 text-primary"
          sub="All active accounts"
        />
        <StatCard
          title="Total Income"
          value={fmt(totalIncome)}
          icon={TrendingUp}
          color="bg-income-light text-income"
        />
        <StatCard
          title="Total Expense"
          value={fmt(totalExpense)}
          icon={TrendingDown}
          color="bg-expense-light text-expense"
        />
        <StatCard
          title="Net Savings"
          value={fmt(netSavings)}
          icon={PiggyBank}
          color={netSavings >= 0 ? "bg-income-light text-income" : "bg-expense-light text-expense"}
          sub="Income − Expense"
        />
      </div>

      {/* stat cards row 2 — monthly */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
        <StatCard
          title="Monthly Income"
          value={fmt(monthlyIncome)}
          icon={CalendarDays}
          color="bg-income-light text-income"
          sub={monthName}
        />
        <StatCard
          title="Monthly Expense"
          value={fmt(monthlyExpense)}
          icon={CalendarDays}
          color="bg-expense-light text-expense"
          sub={monthName}
        />
        <StatCard
          title="Active Accounts"
          value={activeAccounts.length}
          icon={Landmark}
          color="bg-primary/10 text-primary"
          sub={`Monthly savings: ${fmt(monthlySavings)}`}
        />
      </div>

      {/* bottom section */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <ExpenseByCategory />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
