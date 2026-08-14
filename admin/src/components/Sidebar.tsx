import {
  BarChart3,
  BookOpen,
  BadgePercent,
  Files,
  KeyRound,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  ReceiptText,
  ShoppingCart,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BLOG_GROUPS, getBlogAdminRoute } from "../data/blogGroups";

const primaryLinks = [
  { to: "/", label: "Billing Dashboard", icon: LayoutDashboard },
  { to: "/billing/customers", label: "Customers", icon: Users },
  { to: "/billing/catalog", label: "Catalog", icon: PackageSearch },
  { to: "/billing/coupons", label: "Coupons", icon: BadgePercent },
  { to: "/billing/subscriptions", label: "Subscriptions", icon: ReceiptText },
  { to: "/billing/purchase-orders", label: "Purchase Orders", icon: ShoppingCart },
  { to: "/billing/payments", label: "Payments", icon: Wallet },
  { to: "/billing/invoices", label: "Invoices", icon: BarChart3 },
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
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
          Altroz HRMS
        </div>
        <div className="mt-2 text-2xl font-semibold">Billing Admin</div>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <div className="px-4 pt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Billing & Subscriptions
        </div>
        {primaryLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}

        <div className="px-4 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Content & Blogs
        </div>

        <div className="px-4 pt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Blog Pages
        </div>

        <NavLink
          to="/blog-posts"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
              isActive
                ? "bg-sky-500 text-white"
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
                isActive
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
                isActive
                  ? "bg-sky-500 text-white"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
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
