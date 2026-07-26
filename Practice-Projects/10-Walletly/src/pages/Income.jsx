import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, TrendingUp } from "lucide-react"
import { selectAllIncomes, selectTotalIncome, deleteIncome } from "../redux/slices/incomeSlice"
import { deleteTransaction } from "../redux/slices/transactionSlice"
import { updateAccountBalance } from "../redux/slices/accountsSlice"
import IncomeForm from "../components/income/IncomeForm"
import IncomeTable from "../components/income/IncomeTable"

const Income = () => {
  const dispatch = useDispatch()
  const incomes = useSelector(selectAllIncomes)
  const totalIncome = useSelector(selectTotalIncome)

  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleDelete = (income) => {
    if (!window.confirm("Delete this income?")) return
    // balance reverse karo
    dispatch(updateAccountBalance({ accountId: income.accountId, amount: income.amount, type: "expense" }))
    dispatch(deleteIncome(income.id))
    dispatch(deleteTransaction(income.transactionId))
  }

  const openEdit = (income) => {
    setEditData(income)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-text-muted">Total Income</p>
          <p className="text-2xl font-bold text-income">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-income text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Income
        </button>
      </div>

      {/* table card */}
      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-income" />
          <h2 className="font-semibold text-text-primary">Income Records</h2>
          <span className="ml-auto text-xs text-text-muted">{incomes.length} entries</span>
        </div>
        <IncomeTable incomes={incomes} onEdit={openEdit} onDelete={handleDelete} />
      </div>

      {showForm && <IncomeForm onClose={closeForm} editData={editData} />}
    </div>
  )
}

export default Income
