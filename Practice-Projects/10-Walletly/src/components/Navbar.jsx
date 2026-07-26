import { useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { CalendarDays, LogOut } from "lucide-react"
import { logout, selectCurrentUser } from "../redux/slices/authSlice"

const pageTitles = {
  "/": "Dashboard",
  "/accounts": "Accounts",
  "/income": "Income",
  "/expense": "Expense",
  "/transactions": "Transactions",
  "/reports": "Reports",
}

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const title = pageTitles[location.pathname] ?? "Walletly"

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  })

  const handleLogout = () => {
    dispatch(logout())
  }

  // user ka first letter avatar ke liye
  const initial = currentUser?.name?.[0]?.toUpperCase() ?? "U"

  return (
    <header className="sticky top-0 z-40 h-20 bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">

      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        <p className="flex items-center gap-1 text-xs text-text-muted">
          <CalendarDays size={11} />
          {today}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* user name */}
        {currentUser && (
          <span className="text-sm text-text-secondary hidden sm:block">
            {currentUser.name}
          </span>
        )}

        {/* avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
          {initial}
        </div>

        {/* logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 rounded-lg text-text-muted hover:text-expense hover:bg-expense-light transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>

    </header>
  )
}

export default Navbar
