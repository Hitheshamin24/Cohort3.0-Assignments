import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { X } from "lucide-react"
import { addIncome, updateIncome, INCOME_CATEGORIES } from "../../redux/slices/incomeSlice"
import { addTransaction, updateTransaction } from "../../redux/slices/transactionSlice"
import { updateAccountBalance, selectActiveAccounts } from "../../redux/slices/accountsSlice"
import { PAYMENT_METHODS } from "../../redux/slices/transactionSlice"
import generateId from "../../utils/generateId"

const today = new Date().toISOString().split("T")[0]

const IncomeForm = ({ onClose, editData }) => {
  const dispatch = useDispatch()
  const activeAccounts = useSelector(selectActiveAccounts)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      date: today,
      description: "",
      amount: "",
      accountId: "",
      category: "Salary",
      paymentMethod: "Cash",
      notes: "",
    },
  })

  useEffect(() => {
    if (editData) {
      reset({
        date: editData.date,
        description: editData.description,
        amount: editData.amount,
        accountId: editData.accountId,
        category: editData.category,
        paymentMethod: editData.paymentMethod,
        notes: editData.notes || "",
      })
    }
  }, [editData, reset])

  const onFormSubmit = (data) => {
    const account = activeAccounts.find((a) => a.id === data.accountId)
    const amount = Number(data.amount)

    if (editData) {
      // edit — pehle purana amount reverse, phir naya apply
      dispatch(updateAccountBalance({ accountId: editData.accountId, amount: editData.amount, type: "expense" }))
      dispatch(updateAccountBalance({ accountId: data.accountId, amount, type: "income" }))

      const updated = { ...editData, ...data, amount, accountName: account?.name }
      dispatch(updateIncome(updated))
      dispatch(updateTransaction({ ...updated, id: editData.transactionId, type: "income" }))
    } else {
      const id = generateId()
      const transactionId = generateId()

      const income = {
        id,
        transactionId,
        date: data.date,
        description: data.description,
        amount,
        accountId: data.accountId,
        accountName: account?.name,
        category: data.category,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
      }

      dispatch(addIncome(income))
      dispatch(addTransaction({ ...income, id: transactionId, type: "income" }))
      dispatch(updateAccountBalance({ accountId: data.accountId, amount, type: "income" }))
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-surface">
          <h2 className="text-base font-semibold text-text-primary">
            {editData ? "Edit Income" : "Add Income"}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="px-6 py-5 space-y-4">

          {/* date + amount — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Date</label>
              <input
                type="date"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
                {...register("date", { required: "Date required" })}
              />
              {errors.date && <p className="text-expense text-xs mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="0"
                min="1"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
                {...register("amount", {
                  required: "Amount required",
                  min: { value: 1, message: "Must be > 0" },
                })}
              />
              {errors.amount && <p className="text-expense text-xs mt-1">{errors.amount.message}</p>}
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. January Salary"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("description", { required: "Description required" })}
            />
            {errors.description && <p className="text-expense text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* account */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Account</label>
            <select
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors bg-surface"
              {...register("accountId", { required: "Account required" })}
            >
              <option value="">-- Select Account --</option>
              {activeAccounts.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            {errors.accountId && <p className="text-expense text-xs mt-1">{errors.accountId.message}</p>}
          </div>

          {/* category + payment — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
              <select
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors bg-surface"
                {...register("category")}
              >
                {INCOME_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Payment Method</label>
              <select
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors bg-surface"
                {...register("paymentMethod")}
              >
                {PAYMENT_METHODS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* notes */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Notes (optional)</label>
            <textarea
              rows={2}
              placeholder="Any extra details..."
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors resize-none"
              {...register("notes")}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border text-text-secondary rounded-lg py-2 text-sm font-medium hover:bg-surface-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-income text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {editData ? "Save Changes" : "Add Income"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default IncomeForm
