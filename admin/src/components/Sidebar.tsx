import {
  BarChart3,
  ContactRound,
  FileImage,
  FilePenLine,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MailQuestion,
  NotebookPen,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const mainLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pages/hrms", label: "HRMS Page", icon: Home },
  { to: "/resources", label: "Resources", icon: NotebookPen },
  { to: "/pricing", label: "Pricing Page", icon: BarChart3 },
  { to: "/pages/contact-us", label: "Contact Us Page", icon: ContactRound },
  { to: "/contact-settings", label: "Contact Settings", icon: FilePenLine },
  { to: "/enquiries", label: "Contact Enquiries", icon: MailQuestion },
  { to: "/media", label: "Media Library", icon: FileImage },
  { to: "/profile", label: "Admin Profile", icon: UserRound },
  { to: "/change-password", label: "Change Password", icon: KeyRound },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex min-h-screen w-full max-w-72 flex-col border-r border-slate-200 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">Altroz HRMS</div>
        <div className="mt-2 text-2xl font-semibold">Admin Panel</div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {mainLinks.map((link) => (
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
