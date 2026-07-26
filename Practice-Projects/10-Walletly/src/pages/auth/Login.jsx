import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { Mail, Lock, LogIn } from "lucide-react"
import AuthLayout from "../../layouts/AuthLayout"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/localStorage"

const Login = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm()

  const onFormSubmit = (data) => {
    const users = loadFromStorage(STORAGE_KEYS.USERS) || []
    const user = users.find((u) => u.email === data.email && u.password === data.password)

    if (!user) {
      setError("password", { message: "Invalid email or password" })
      return
    }

    const { password, ...safeUser } = user
    dispatch(setCurrentUser(safeUser))
    saveToStorage(STORAGE_KEYS.CURRENT_USER, safeUser)
  }

  return (
    <AuthLayout>
      <h1 className="text-xl font-bold text-text-primary mb-1">Welcome back</h1>
      <p className="text-sm text-text-muted mb-6">Login to your Walletly account</p>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("email", { required: "Email required" })}
            />
          </div>
          {errors.email && <p className="text-expense text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("password", { required: "Password required" })}
            />
          </div>
          {errors.password && <p className="text-expense text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity mt-2"
        >
          <LogIn size={16} />
          Login
        </button>

      </form>

      <p className="text-center text-sm text-text-muted mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login
