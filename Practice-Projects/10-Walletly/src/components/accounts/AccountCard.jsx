import { Pencil, Trash2, ToggleLeft, ToggleRight, Landmark, Wallet, Banknote, CreditCard, PiggyBank } from "lucide-react"

// type ke hisaab se icon
const typeIcons = {
  "Bank Account": Landmark,
  "Wallet": Wallet,
  "Cash": Banknote,
  "Credit Card": CreditCard,
  "Savings": PiggyBank,
}

// type ke hisaab se color (Black & White theme)
const typeColors = {
  "Bank Account": "bg-surface-2 text-text-primary",
  "Wallet": "bg-surface-2 text-text-primary",
  "Cash": "bg-surface-2 text-text-primary",
  "Credit Card": "bg-surface-2 text-text-primary",
  "Savings": "bg-surface-2 text-text-primary",
}

const AccountCard = ({ account, onEdit, onDelete, onToggle }) => {
  const Icon = typeIcons[account.type] ?? Landmark
  const colorClass = typeColors[account.type] ?? "bg-gray-100 text-gray-600"

  return (
    <div className={`bg-surface rounded-3xl p-6 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] ${!account.isActive ? "opacity-50" : ""}`}>

      {/* top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
          <Icon size={20} />
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggle(account.id)}
            title={account.isActive ? "Deactivate" : "Activate"}
            className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-2 transition-colors"
          >
            {account.isActive ? <ToggleRight size={18} className="text-income" /> : <ToggleLeft size={18} />}
          </button>
          <button
            onClick={() => onEdit(account)}
            className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-2 transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="p-1.5 rounded-lg text-text-muted hover:text-expense hover:bg-expense-light transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* name & type */}
      <p className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">{account.type}</p>
      <h3 className="font-extrabold text-text-primary text-lg tracking-tight mt-0.5">{account.name}</h3>

      {/* balance */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-muted mb-0.5">Current Balance</p>
        <p className={`text-xl font-bold ${account.currentBalance < 0 ? "text-expense" : "text-text-primary"}`}>
          ₹{account.currentBalance.toLocaleString("en-IN")}
        </p>
      </div>

      {/* inactive badge */}
      {!account.isActive && (
        <span className="mt-3 inline-block text-xs bg-surface-2 text-text-muted px-2 py-0.5 rounded-full">
          Inactive
        </span>
      )}
    </div>
  )
}

export default AccountCard
