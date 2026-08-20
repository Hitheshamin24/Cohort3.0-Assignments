import {
  Bell,
  Search,
  Menu,
  Grid3X3,
  UserCircle,
} from "lucide-react";
import React from "react";

const TopNav = () => {
  return (
    <header
      className="
        fixed top-0 right-0 z-40
        ml-60
        flex h-12 w-[calc(100%-15rem)]
        items-center justify-between
        border-b border-(--outline-variant)
        bg-(--surface-container-lowest)
        px-4
      "
    >
      {/* Search */}
      <div className="relative w-52">
        <Search
          size={13}
          className="
            absolute left-2.5 top-1/2
            -translate-y-1/2
            text-(--on-surface-variant)
          "
        />

        <input
          type="text"
          placeholder="Search workspace..."
          className="
            h-7 w-full
            rounded-md
            border border-(--outline-variant)
            bg-(--surface-container)
            pl-8 pr-2
            text-[11px]
            text-(--on-surface)
            outline-none
            placeholder:text-(--on-surface-variant)
            focus:border-(--primary)
          "
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button
          className="
            relative flex h-7 w-7
            items-center justify-center
            rounded-md
            text-[var(--on-surface-variant)]
            hover:bg-[var(--surface-container)]
            hover:text-[var(--on-surface)]
          "
        >
          <Bell size={14} />
          
          {/* Notification dot */}
          <span
            className="
              absolute right-1.5 top-1.5
              h-1.5 w-1.5
              rounded-full
              bg-[var(--primary)]
            "
          />
        </button>

        {/* Menu / Apps */}
        <button
          className="
            flex h-7 w-7
            items-center justify-center
            rounded-md
            text-[var(--on-surface-variant)]
            hover:bg-[var(--surface-container)]
            hover:text-[var(--on-surface)]
          "
        >
          <Grid3X3 size={13} />
        </button>

        {/* Menu */}
        <button
          className="
            flex h-7 w-7
            items-center justify-center
            rounded-md
            text-[var(--on-surface-variant)]
            hover:bg-[var(--surface-container)]
            hover:text-[var(--on-surface)]
          "
        >
          <Menu size={15} />
        </button>

        {/* Avatar */}
        <button
          className="
            flex h-7 w-7
            items-center justify-center
            overflow-hidden
            rounded-full
            bg-[var(--primary-container)]
            text-[var(--on-primary-container)]
          "
        >
          <UserCircle size={16} />
        </button>
      </div>
    </header>
  );
};

export default TopNav;