import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { X } from "lucide-react"
import { ACCOUNT_TYPES, addAccount, updateAccount } from "../../redux/slices/accountsSlice"
import generateId from "../../utils/generateId"

const AccountForm = ({ onClose, editData }) => {
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      type: "Bank Account",
      openingBalance: "",
    },
  })

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        type: editData.type,
        openingBalance: editData.openingBalance,
      })
    }
  }, [editData, reset])

  const onFormSubmit = (data) => {
    if (editData) {
      const newOpeningBalance = Number(data.openingBalance);
      const diff = newOpeningBalance - editData.openingBalance;

      dispatch(updateAccount({
        ...editData,
        name: data.name.trim(),
        type: data.type,
        openingBalance: newOpeningBalance,
        currentBalance: editData.currentBalance + diff,
      }))
    } else {
      dispatch(addAccount({
        id: generateId(),
        isActive: true,
        name: data.name.trim(),
        type: data.type,
        openingBalance: Number(data.openingBalance),
        currentBalance: Number(data.openingBalance),
      }))
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md">

        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary">
            {editData ? "Edit Account" : "Add Account"}
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="px-6 py-5 space-y-4">

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Account Name</label>
            <input
              type="text"
              placeholder="e.g. SBI Savings"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("name", { required: "Account name required" })}
            />
            {errors.name && <p className="text-expense text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Account Type</label>
            <select
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors bg-surface"
              {...register("type", { required: true })}
            >
              {ACCOUNT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Opening Balance (₹)</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("openingBalance", {
                required: "Amount required",
                min: { value: 0, message: "Amount must be 0 or more" },
              })}
            />
            {errors.openingBalance && <p className="text-expense text-xs mt-1">{errors.openingBalance.message}</p>}
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
              className="flex-1 bg-primary text-white rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {editData ? "Save Changes" : "Add Account"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AccountForm
