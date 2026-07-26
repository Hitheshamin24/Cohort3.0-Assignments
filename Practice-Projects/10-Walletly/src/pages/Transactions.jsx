import { useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, Trash2, ArrowUpDown } from "lucide-react"
import { selectAllTransactions, deleteTransaction } from "../redux/slices/transactionSlice"
import { selectAllIncomes, deleteIncome } from "../redux/slices/incomeSlice"
import { selectAllExpenses, deleteExpense } from "../redux/slices/expenseSlice"
import { selectAllAccounts, updateAccountBalance } from "../redux/slices/accountsSlice"
import { INCOME_CATEGORIES } from "../redux/slices/incomeSlice"
import { EXPENSE_CATEGORIES } from "../redux/slices/expenseSlice"

const ALL_CATEGORIES = ["All", ...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])]

const Transactions = () => {
  const dispatch = useDispatch()
  const transactions = useSelector(selectAllTransactions)
  const incomes = useSelector(selectAllIncomes)
  const expenses = useSelector(selectAllExpenses)
  const accounts = useSelector(selectAllAccounts)

  // filter state
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterMonth, setFilterMonth] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterAccount, setFilterAccount] = useState("all")
  const [sortOrder, setSortOrder] = useState("latest")

  // filtered and sorted list 
  const filtered = useMemo(() => {
    let list = [...transactions]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter((t) => t.description.toLowerCase().includes(q))
    }

    if (filterType !== "all") {
      list = list.filter((t) => t.type === filterType)
    }

    if (filterMonth) {
      list = list.filter((t) => t.date.startsWith(filterMonth))
    }

    if (filterCategory !== "All") {
      list = list.filter((t) => t.category === filterCategory)
    }

    if (filterAccount !== "all") {
      list = list.filter((t) => t.accountId === filterAccount)
    }

    list.sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date)
      return sortOrder === "latest" ? diff : -diff
    })

    return list
  }, [transactions, search, filterType, filterMonth, filterCategory, filterAccount, sortOrder])

  const handleDelete = (transaction) => {
    if (!window.confirm("Delete this transaction?")) return

    if (transaction.type === "income") {
      const income = incomes.find((i) => i.transactionId === transaction.id)
      if (income) dispatch(deleteIncome(income.id))
      dispatch(updateAccountBalance({ accountId: transaction.accountId, amount: transaction.amount, type: "expense" }))
    } else {
      const expense = expenses.find((e) => e.transactionId === transaction.id)
      if (expense) dispatch(deleteExpense(expense.id))
      dispatch(updateAccountBalance({ accountId: transaction.accountId, amount: transaction.amount, type: "income" }))
    }

    dispatch(deleteTransaction(transaction.id))
  }

  const clearFilters = () => {
    setSearch("")
    setFilterType("all")
    setFilterMonth("")
    setFilterCategory("All")
    setFilterAccount("all")
    setSortOrder("latest")
  }

  return (
    <div className="space-y-4">

      <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* filter row */}
        <div className="flex flex-wrap gap-3">

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary bg-surface"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* month */}
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary bg-surface"
          />

          {/* category */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary bg-surface"
          >
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* account */}
          <select
            value={filterAccount}
            onChange={(e) => setFilterAccount(e.target.value)}
            className="border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary bg-surface"
          >
            <option value="all">All Accounts</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          {/* sort */}
          <button
            onClick={() => setSortOrder((s) => s === "latest" ? "oldest" : "latest")}
            className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowUpDown size={14} />
            {sortOrder === "latest" ? "Latest First" : "Oldest First"}
          </button>

          {/* clear */}
          <button
            onClick={clearFilters}
            className="text-sm text-text-muted hover:text-expense transition-colors"
          >
            Clear
          </button>
        </div>

        {/* results count */}
        <p className="text-xs text-text-muted">
          Showing {filtered.length} of {transactions.length} transactions
        </p>
      </div>

      {/* transactions table */}
      <div className="bg-surface rounded-2xl border border-border p-5">
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-text-muted text-sm">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-muted text-left">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Account</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-2 transition-colors">
                    <td className="py-3 text-text-muted whitespace-nowrap">{t.date}</td>
                    <td className="py-3 text-text-primary font-medium">{t.description}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        t.type === "income"
                          ? "bg-income-light text-income"
                          : "bg-expense-light text-expense"
                      }`}>
                        {t.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td className="py-3 text-text-secondary">{t.category}</td>
                    <td className="py-3 text-text-secondary">{t.accountName}</td>
                    <td className="py-3 text-text-muted">{t.paymentMethod}</td>
                    <td className={`py-3 text-right font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                      {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDelete(t)}
                        className="p-1.5 rounded-lg text-text-muted hover:text-expense hover:bg-expense-light transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}

export default Transactions
