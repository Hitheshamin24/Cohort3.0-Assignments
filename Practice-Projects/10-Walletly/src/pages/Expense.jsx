import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, TrendingDown } from "lucide-react"
import { selectAllExpenses, selectTotalExpense, deleteExpense } from "../redux/slices/expenseSlice"
import { deleteTransaction } from "../redux/slices/transactionSlice"
import { updateAccountBalance } from "../redux/slices/accountsSlice"
import ExpenseForm from "../components/expense/ExpenseForm"
import ExpenseTable from "../components/expense/ExpenseTable"

const Expense = () => {
  const dispatch = useDispatch()
  const expenses = useSelector(selectAllExpenses)
  const totalExpense = useSelector(selectTotalExpense)

  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleDelete = (expense) => {
    if (!window.confirm("Delete this expense?")) return
    // balance reverse karo — expense tha to income direction mein add karo
    dispatch(updateAccountBalance({ accountId: expense.accountId, amount: expense.amount, type: "income" }))
    dispatch(deleteExpense(expense.id))
    dispatch(deleteTransaction(expense.transactionId))
  }

  const openEdit = (expense) => {
    setEditData(expense)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-text-muted">Total Expense</p>
          <p className="text-2xl font-bold text-expense">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-expense text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Expense
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingDown size={18} className="text-expense" />
          <h2 className="font-semibold text-text-primary">Expense Records</h2>
          <span className="ml-auto text-xs text-text-muted">{expenses.length} entries</span>
        </div>
        <ExpenseTable expenses={expenses} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      {showForm && <ExpenseForm onClose={closeForm} editData={editData} />}
    </div>
  )
}

export default Expense
