import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );
  console.log("this is theme->", mode);

  return (
    <nav
      className="h-16 w-full flex items-center justify-between px-8"
      style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer"
        >
          EaseUi
        </h1>

        <div
          className="hidden sm:flex items-center rounded-md px-3 py-1.5"
          style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--surface)' }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text-color)' }}
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6" style={{ color: 'var(--text-muted)' }}>
        <li
          onClick={() => navigate("components")}
          className="cursor-pointer transition-colors duration-200"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-color)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          Components
        </li>
        <li
          className="cursor-pointer transition-colors duration-200"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-color)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >About</li>
        <li
          className="cursor-pointer transition-colors duration-200"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-color)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >Templates</li>
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full transition-colors duration-200"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--primary-subtle)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} style={{ color: 'var(--text-muted)' }} />
          </li>
        )}
      </ul>

      <button className="md:hidden text-gray-700">☰</button>
    </nav>
  );
};

export default Navbar;
