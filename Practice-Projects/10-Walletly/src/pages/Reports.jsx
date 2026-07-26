import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { TrendingUp, TrendingDown, PiggyBank, ChevronLeft, ChevronRight } from "lucide-react"
import { selectAllIncomes } from "../redux/slices/incomeSlice"
import { selectAllExpenses } from "../redux/slices/expenseSlice"

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`

const CATEGORY_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-orange-500",
  "bg-teal-500", "bg-indigo-500", "bg-rose-500", "bg-amber-500",
  "bg-cyan-500", "bg-green-500", "bg-red-500",
]

// component bahar — Reports ke andar define nahi karna
const CategoryBreakdown = ({ data, emptyMsg }) => {
  const total = data.reduce((s, d) => s + d.amount, 0)

  if (data.length === 0) {
    return <p className="text-center py-6 text-text-muted text-sm">{emptyMsg}</p>
  }

  return (
    <ul className="space-y-3 flex-1 overflow-y-auto pr-2">
      {data.map(({ name, amount }, i) => {
        const pct = total > 0 ? Math.round((amount / total) * 100) : 0
        return (
          <li key={name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-secondary">{name}</span>
              <span className="text-sm font-medium text-text-primary">
                {fmt(amount)} <span className="text-text-muted font-normal">({pct}%)</span>
              </span>
            </div>
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`}
                style={{ width: `${pct}%`, transition: "width 0.4s ease" }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const Reports = () => {
  const incomes = useSelector(selectAllIncomes)
  const expenses = useSelector(selectAllExpenses)

  const now = new Date()

  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  )

  const prevMonth = () => {
    const [y, m] = selectedMonth.split("-").map(Number)
    const d = new Date(y, m - 2)
    setSelectedMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`)
  }

  const nextMonth = () => {
    const [y, m] = selectedMonth.split("-").map(Number)
    const d = new Date(y, m)
    setSelectedMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`)
  }

  const monthLabel = useMemo(() => {
    const [y, m] = selectedMonth.split("-").map(Number)
    return new Date(y, m - 1).toLocaleString("en-IN", { month: "long", year: "numeric" })
  }, [selectedMonth])

  const monthlyIncomes = useMemo(
    () => incomes.filter((i) => i.date.startsWith(selectedMonth)),
    [incomes, selectedMonth]
  )

  const monthlyExpenses = useMemo(
    () => expenses.filter((e) => e.date.startsWith(selectedMonth)),
    [expenses, selectedMonth]
  )

  const totalIncome = useMemo(
    () => monthlyIncomes.reduce((s, i) => s + i.amount, 0),
    [monthlyIncomes]
  )

  const totalExpense = useMemo(
    () => monthlyExpenses.reduce((s, e) => s + e.amount, 0),
    [monthlyExpenses]
  )

  const savings = totalIncome - totalExpense

  const incomeByCategory = useMemo(() => {
    const map = {}
    monthlyIncomes.forEach((i) => { map[i.category] = (map[i.category] || 0) + i.amount })
    return Object.entries(map).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount)
  }, [monthlyIncomes])

  const expenseByCategory = useMemo(() => {
    const map = {}
    monthlyExpenses.forEach((e) => { map[e.category] = (map[e.category] || 0) + e.amount })
    return Object.entries(map).map(([name, amount]) => ({ name, amount })).sort((a, b) => b.amount - a.amount)
  }, [monthlyExpenses])

  const last6Months = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      const label = d.toLocaleString("en-IN", { month: "short", year: "2-digit" })
      const inc = incomes.filter((x) => x.date.startsWith(key)).reduce((s, x) => s + x.amount, 0)
      const exp = expenses.filter((x) => x.date.startsWith(key)).reduce((s, x) => s + x.amount, 0)
      return { key, label, inc, exp, savings: inc - exp }
    }).reverse()
  }, [incomes, expenses])

  const maxBar = Math.max(...last6Months.map((m) => Math.max(m.inc, m.exp)), 1)

  return (
    <div className="h-full flex flex-col gap-4">

      {/* month selector */}
      <div className="bg-surface rounded-2xl border border-border p-3 flex items-center justify-between shrink-0">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary transition-colors">
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <p className="font-semibold text-text-primary text-sm">{monthLabel}</p>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs text-text-muted mt-0.5 outline-none bg-transparent cursor-pointer"
          />
        </div>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-surface-2 text-text-secondary transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* monthly summary cards */}
      <div className="grid grid-cols-3 gap-3 shrink-0">
        <div className="bg-surface rounded-2xl border border-border p-3 flex flex-col justify-center items-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp size={14} className="text-income" />
            <p className="text-xs text-text-muted">Income</p>
          </div>
          <p className="text-lg font-bold text-income">{fmt(totalIncome)}</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-3 flex flex-col justify-center items-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown size={14} className="text-expense" />
            <p className="text-xs text-text-muted">Expense</p>
          </div>
          <p className="text-lg font-bold text-expense">{fmt(totalExpense)}</p>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-3 flex flex-col justify-center items-center text-center">
          <div className="flex items-center gap-1.5 mb-1">
            <PiggyBank size={14} className={savings >= 0 ? "text-income" : "text-expense"} />
            <p className="text-xs text-text-muted">Savings</p>
          </div>
          <p className={`text-lg font-bold ${savings >= 0 ? "text-income" : "text-expense"}`}>{fmt(savings)}</p>
        </div>
      </div>

      {/* category breakdowns */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-full flex flex-col bg-surface rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-text-primary mb-4 shrink-0">Income by Category</h3>
          <CategoryBreakdown data={incomeByCategory} emptyMsg="No income this month" />
        </div>
        <div className="h-full flex flex-col bg-surface rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-text-primary mb-4 shrink-0">Expense by Category</h3>
          <CategoryBreakdown data={expenseByCategory} emptyMsg="No expenses this month" />
        </div>
      </div>

      {/* last 6 months bar chart */}
      <div className="bg-surface rounded-2xl border border-border p-4 shrink-0">
        <h3 className="font-semibold text-text-primary text-sm mb-3">Last 6 Months Overview</h3>
        <div className="flex items-end justify-between gap-2 h-24">
          {last6Months.map((m) => (
            <div key={m.key} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end" style={{ height: "64px" }}>
                <div
                  className="flex-1 bg-income rounded-t-md opacity-80"
                  style={{ height: `${(m.inc / maxBar) * 100}%`, minHeight: m.inc > 0 ? "4px" : "0" }}
                  title={`Income: ${fmt(m.inc)}`}
                />
                <div
                  className="flex-1 bg-expense rounded-t-md opacity-80"
                  style={{ height: `${(m.exp / maxBar) * 100}%`, minHeight: m.exp > 0 ? "4px" : "0" }}
                  title={`Expense: ${fmt(m.exp)}`}
                />
              </div>
              <span className="text-xs text-text-muted">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 justify-center">
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2.5 h-2.5 rounded-sm bg-income inline-block" /> Income
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2.5 h-2.5 rounded-sm bg-expense inline-block" /> Expense
          </span>
        </div>
      </div>

    </div>
  )
}

export default Reports
