import { Pencil, Trash2 } from "lucide-react"

const IncomeTable = ({ incomes, onEdit, onDelete }) => {
  if (incomes.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted text-sm">
        No income records yet
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-text-muted text-left">
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Description</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Account</th>
            <th className="pb-3 font-medium">Method</th>
            <th className="pb-3 font-medium text-right">Amount</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {incomes.map((income) => (
            <tr key={income.id} className="hover:bg-surface-2 transition-colors">
              <td className="py-3 text-text-muted">{income.date}</td>
              <td className="py-3 text-text-primary font-medium">{income.description}</td>
              <td className="py-3">
                <span className="bg-income-light text-income text-xs px-2 py-0.5 rounded-full font-medium">
                  {income.category}
                </span>
              </td>
              <td className="py-3 text-text-secondary">{income.accountName}</td>
              <td className="py-3 text-text-muted">{income.paymentMethod}</td>
              <td className="py-3 text-right font-semibold text-income">
                +₹{income.amount.toLocaleString("en-IN")}
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(income)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-2 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(income)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-expense hover:bg-expense-light transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IncomeTable
