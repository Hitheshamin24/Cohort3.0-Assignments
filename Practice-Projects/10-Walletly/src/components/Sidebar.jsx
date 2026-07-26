import { NavLink } from "react-router"
import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  BarChart2,
} from "lucide-react"

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/accounts", label: "Accounts", icon: Landmark },
  { path: "/income", label: "Income", icon: TrendingUp },
  { path: "/expense", label: "Expense", icon: TrendingDown },
  { path: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { path: "/reports", label: "Reports", icon: BarChart2 },
]

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen flex flex-col bg-surface text-text-primary shrink-0 border-r border-border shadow-sm">

      {/* logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-bold text-lg text-white">
          W
        </div>
        <span className="text-xl font-extrabold tracking-tight">Walletly</span>
      </div>

      {/* nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/20 translate-x-1"
                  : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
