import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectRecentTransactions } from "../../redux/slices/transactionSlice"

const RecentTransactions = () => {
  const navigate = useNavigate()
  const recent = useSelector(selectRecentTransactions)

  return (
    <div className="h-full flex flex-col bg-surface rounded-3xl border border-border p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="font-semibold text-text-primary">Recent Transactions</h2>
        <button
          onClick={() => navigate("/transactions")}
          className="text-xs text-primary hover:underline"
        >
          View all
        </button>
      </div>

      {recent.length === 0 ? (
        <p className="text-center py-8 text-text-muted text-sm flex-1">No transactions yet</p>
      ) : (
        <ul className="space-y-3 flex-1 overflow-y-auto pr-2">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  t.type === "income" ? "bg-income-light text-income" : "bg-expense-light text-expense"
                }`}>
                  {t.type === "income" ? "↑" : "↓"}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.description}</p>
                  <p className="text-xs text-text-muted">{t.date} · {t.category}</p>
                </div>
              </div>
              <p className={`text-sm font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecentTransactions
