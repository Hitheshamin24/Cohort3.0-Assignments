import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { User, Mail, Lock, UserPlus } from "lucide-react"
import AuthLayout from "../../layouts/AuthLayout"
import { setCurrentUser } from "../../redux/slices/authSlice"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/localStorage"
import generateId from "../../utils/generateId"

const Signup = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm()

  const onFormSubmit = (data) => {
    const users = loadFromStorage(STORAGE_KEYS.USERS) || []

    // email already exists?
    if (users.find((u) => u.email === data.email)) {
      setError("email", { message: "Email already registered" })
      return
    }

    const newUser = {
      id: generateId(),
      name: data.name.trim(),
      email: data.email,
      password: data.password,  // learning project — no hashing
    }

    // save to users list
    saveToStorage(STORAGE_KEYS.USERS, [...users, newUser])

    // login the new user (without password in Redux)
    const { password, ...safeUser } = newUser
    dispatch(setCurrentUser(safeUser))
    saveToStorage(STORAGE_KEYS.CURRENT_USER, safeUser)
  }

  return (
    <AuthLayout>
      <h1 className="text-xl font-bold text-text-primary mb-1">Create account</h1>
      <p className="text-sm text-text-muted mb-6">Start tracking your finances today</p>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Hithesh"
              className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("name", { required: "Name required" })}
            />
          </div>
          {errors.name && <p className="text-expense text-xs mt-1">{errors.name.message}</p>}
        </div>

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
              placeholder="Min 6 characters"
              className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
          </div>
          {errors.password && <p className="text-expense text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Confirm Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary outline-none focus:border-primary transition-colors"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (val) => val === watch("password") || "Passwords don't match",
              })}
            />
          </div>
          {errors.confirmPassword && <p className="text-expense text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 transition-opacity mt-2"
        >
          <UserPlus size={16} />
          Create Account
        </button>

      </form>

      <p className="text-center text-sm text-text-muted mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Signup
