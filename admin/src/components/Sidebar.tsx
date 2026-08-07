import {
  BookOpen,
  Files,
  KeyRound,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BLOG_GROUPS, getBlogAdminRoute } from "../data/blogGroups";

const primaryLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pages", label: "Content Pages", icon: Files },
];

const accountLinks = [
  { to: "/profile", label: "Admin Profile", icon: UserRound },
  { to: "/change-password", label: "Change Password", icon: KeyRound },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-full max-w-72 flex-col overflow-hidden border-r border-slate-200 bg-slate-950 text-white lg:sticky lg:top-0 lg:shrink-0">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Altroz HRMS</div>
        <div className="mt-2 text-2xl font-semibold">Simple Admin</div>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {primaryLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}

        <div className="px-4 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Blog Pages
        </div>

        <NavLink
          to="/blog-posts"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
              isActive ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
            }`
          }
        >
          <BookOpen className="h-4 w-4" />
          All Blog Pages
        </NavLink>

        {BLOG_GROUPS.map((group) => (
          <NavLink
            key={group.key}
            to={getBlogAdminRoute(group.key)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 pl-7 text-sm transition ${
                isActive ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <BookOpen className="h-4 w-4" />
            {group.shortLabel}
          </NavLink>
        ))}

        {accountLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive ? "bg-sky-500 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <button
          type="button"
          onClick={() => void logout()}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
