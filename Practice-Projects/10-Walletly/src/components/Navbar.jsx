import { useLocation } from "react-router"
import { CalendarDays, User } from "lucide-react"

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
  const title = pageTitles[location.pathname] ?? "Walletly"

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">

      {/* page title */}
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        <p className="flex items-center gap-1 text-xs text-text-muted">
          <CalendarDays size={11} />
          {today}
        </p>
      </div>

      {/* avatar */}
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
        <User size={16} />
      </div>

    </header>
  )
}

export default Navbar
