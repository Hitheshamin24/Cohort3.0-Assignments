import { Pencil, Trash2 } from "lucide-react"

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted text-sm">
        No expense records yet
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
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-surface-2 transition-colors">
              <td className="py-3 text-text-muted">{expense.date}</td>
              <td className="py-3 text-text-primary font-medium">{expense.description}</td>
              <td className="py-3">
                <span className="bg-expense-light text-expense text-xs px-2 py-0.5 rounded-full font-medium">
                  {expense.category}
                </span>
              </td>
              <td className="py-3 text-text-secondary">{expense.accountName}</td>
              <td className="py-3 text-text-muted">{expense.paymentMethod}</td>
              <td className="py-3 text-right font-semibold text-expense">
                -₹{expense.amount.toLocaleString("en-IN")}
              </td>
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-surface-2 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(expense)}
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

export default ExpenseTable
