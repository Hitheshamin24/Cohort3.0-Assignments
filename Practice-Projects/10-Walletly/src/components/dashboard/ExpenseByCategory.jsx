import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectAllExpenses } from "../../redux/slices/expenseSlice"

const CATEGORY_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-orange-500",
  "bg-teal-500", "bg-indigo-500", "bg-rose-500", "bg-amber-500",
  "bg-cyan-500", "bg-green-500", "bg-red-500",
]

const ExpenseByCategory = () => {
  const expenses = useSelector(selectAllExpenses)

  // group by category aur total nikalo
  const categoryData = useMemo(() => {
    const map = {}
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount
    })
    return Object.entries(map)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const total = categoryData.reduce((s, c) => s + c.amount, 0)

  return (
    <div className="h-full flex flex-col bg-surface rounded-3xl border border-border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="font-semibold text-text-primary mb-4 shrink-0">Expense by Category</h2>

      {categoryData.length === 0 ? (
        <p className="text-center py-8 text-text-muted text-sm flex-1">No expenses yet</p>
      ) : (
        <ul className="space-y-3 flex-1 overflow-y-auto pr-2">
          {categoryData.map(({ name, amount }, i) => {
            const pct = total > 0 ? Math.round((amount / total) * 100) : 0
            return (
              <li key={name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{name}</span>
                  <span className="text-sm font-medium text-text-primary">
                    ₹{amount.toLocaleString("en-IN")}
                    <span className="text-text-muted font-normal ml-1">({pct}%)</span>
                  </span>
                </div>
                {/* progress bar */}
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
      )}
    </div>
  )
}

export default ExpenseByCategory
