import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Plus, Wallet } from "lucide-react"
import {
  selectAllAccounts,
  selectTotalBalance,
  deleteAccount,
  toggleAccountStatus,
} from "../redux/slices/accountsSlice"
import AccountCard from "../components/accounts/AccountCard"
import AccountForm from "../components/accounts/AccountForm"

const Accounts = () => {
  const dispatch = useDispatch()
  const accounts = useSelector(selectAllAccounts)
  const totalBalance = useSelector(selectTotalBalance)

  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleDelete = (id) => {
    if (window.confirm("Delete this account?")) dispatch(deleteAccount(id))
  }

  const handleToggle = (id) => dispatch(toggleAccountStatus(id))

  const openEdit = (account) => {
    setEditData(account)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditData(null)
  }

  return (
    <div>
      {/* header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-text-muted">Total Balance (active)</p>
          <p className="text-2xl font-bold text-text-primary">
            ₹{totalBalance.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Account
        </button>
      </div>

      {/* accounts grid */}
      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-surface-2 rounded-2xl flex items-center justify-center mb-4">
            <Wallet size={28} className="text-text-muted" />
          </div>
          <p className="text-text-secondary font-medium">No accounts yet</p>
          <p className="text-text-muted text-sm mt-1">Add your first account to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* modal */}
      {showForm && (
        <AccountForm
          onClose={closeForm}
          editData={editData}
        />
      )}
    </div>
  )
}

export default Accounts
