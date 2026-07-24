import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import BrandMark from "./BrandMark";
import {
  companyMenuColumns,
  featureMenuColumns,
  navItems,
  resourcesMenuItems,
  solutionMenuItems,
} from "./nav-data";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { ROUTES } from "@/routes/routeConfig.js";

export default function MainNavbar() {
  const [openMenu, setOpenMenu] = useState<
    null | "features" | "solutions" | "resources" | "company"
  >(null);
  const scrolled = useScrolled(12);

  return (
    <div
      className={cn(
        "sticky top-16 z-40 hidden border-b border-border bg-primary-soft/70 backdrop-blur-md transition-shadow duration-300 lg:block",
        scrolled && "shadow-[0_10px_28px_rgba(15,23,42,0.08)]",
      )}
    >
      <div
        className={cn(
          "site-container grid grid-cols-1 gap-2 overflow-visible py-2 transition-[height,padding] duration-300 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-3 lg:py-0",
          scrolled ? "lg:h-10" : "lg:h-12",
        )}
      >
        <Link to={ROUTES.home} className="flex items-center gap-2 shrink-0">
          <BrandMark mode="compact" className="scale-90 origin-left" />
        </Link>

        <nav className="flex flex-wrap items-center gap-1 pl-3 sm:pl-4 lg:pl-0 lg:flex-nowrap lg:mx-auto">
          <div
            className="relative order-2 shrink-0"
            onMouseEnter={() => setOpenMenu("solutions")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenMenu((current) => (current === "solutions" ? null : "solutions"))
              }
              className={cn(
                "nav-link flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                openMenu === "solutions"
                  ? "bg-white/70 text-primary"
                  : "text-ink hover:bg-white/70 hover:text-primary",
              )}
              aria-expanded={openMenu === "solutions"}
            >
              Solutions
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "solutions" && "rotate-180",
                )}
              />
            </button>

            <div
              className={`absolute left-0 top-full z-50 w-44 pt-3 origin-top-left transition-[opacity,transform] duration-200 ease-out ${
                openMenu === "solutions"
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-2 scale-[0.98] opacity-0"
              }`}
            >
              <div aria-hidden="true" className="h-3" />
              <div className="popup-blue-surface relative overflow-hidden rounded-2xl border border-border p-2 shadow-pop backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
                <ul className="space-y-1">
                  {solutionMenuItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        tabIndex={openMenu === "solutions" ? 0 : -1}
                        className="group block rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/70 hover:text-primary"
                      >
                        <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                          <span>{item.label}</span>
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="relative order-1 shrink-0"
            onMouseEnter={() => setOpenMenu("features")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu((current) => (current === "features" ? null : "features"))}
              className={cn(
                "nav-link flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                openMenu === "features"
                  ? "bg-white/70 text-primary"
                  : "text-ink hover:bg-white/70 hover:text-primary",
              )}
              aria-expanded={openMenu === "features"}
            >
              Features
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 opacity-60 ${
                  openMenu === "features" ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute left-0 top-full z-50 w-[min(920px,calc(100vw-1rem))] origin-top-left pt-3 transition-[opacity,transform] duration-[240ms] ease-out ${
                openMenu === "features"
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-3 scale-[0.975] opacity-0"
              }`}
            >
              <div aria-hidden="true" className="h-3" />
              <div className="popup-blue-surface relative overflow-hidden rounded-[1.5rem] border border-white/70 p-4 shadow-[0_28px_70px_rgba(11,92,255,0.16)] backdrop-blur-xl ring-1 ring-white/60 md:p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
                <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-primary/8 blur-3xl" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {featureMenuColumns.map((column, columnIndex) => (
                    <div
                      key={column.title}
                      style={{
                        transitionDelay: openMenu === "features" ? `${columnIndex * 45}ms` : "0ms",
                      }}
                      className={`p-2 transition-all duration-300 ${
                        openMenu === "features"
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {column.title}
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {column.links.map((link, linkIndex) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              tabIndex={openMenu === "features" ? 0 : -1}
                              style={{
                                transitionDelay:
                                  openMenu === "features" ? `${(linkIndex + 1) * 30}ms` : "0ms",
                              }}
                              className={`group block rounded-xl px-2.5 py-2 text-sm text-ink transition-all duration-300 ${
                                openMenu === "features"
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-1 opacity-0"
                              } hover:-translate-y-0.5 hover:bg-white/70 hover:text-primary`}
                            >
                              <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                <span>{link.label}</span>
                                <ArrowRight
                                  aria-hidden="true"
                                  className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative order-4 shrink-0"
            onMouseEnter={() => setOpenMenu("resources")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenMenu((current) => (current === "resources" ? null : "resources"))
              }
              className={cn(
                "nav-link flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                openMenu === "resources"
                  ? "bg-white/70 text-primary"
                  : "text-ink hover:bg-white/70 hover:text-primary",
              )}
              aria-expanded={openMenu === "resources"}
            >
              Resources
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "resources" && "rotate-180",
                )}
              />
            </button>

            <div
              className={`absolute left-0 top-full z-50 w-[min(280px,calc(100vw-1rem))] origin-top-left pt-3 transition-[opacity,transform] duration-200 ease-out ${
                openMenu === "resources"
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-2 scale-[0.98] opacity-0"
              }`}
            >
              <div aria-hidden="true" className="h-3" />
              <div className="popup-blue-surface relative overflow-hidden rounded-2xl border border-border p-6 shadow-pop backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
                <div className="rounded-xl p-1">
                  <ul className="space-y-1">
                    {resourcesMenuItems.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          tabIndex={openMenu === "resources" ? 0 : -1}
                          className="group block rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/70 hover:text-primary"
                        >
                          <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                            <span>{link.label}</span>
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative order-5 shrink-0"
            onMouseEnter={() => setOpenMenu("company")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu((current) => (current === "company" ? null : "company"))}
              className={cn(
                "nav-link flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                openMenu === "company"
                  ? "bg-white/70 text-primary"
                  : "text-ink hover:bg-white/70 hover:text-primary",
              )}
              aria-expanded={openMenu === "company"}
            >
              Company
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                  openMenu === "company" && "rotate-180",
                )}
              />
            </button>

            <div
              className={`absolute right-0 top-full z-50 w-[min(600px,calc(100vw-1rem))] origin-top-right pt-3 transition-[opacity,transform] duration-200 ease-out ${
                openMenu === "company"
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none translate-y-2 scale-[0.985] opacity-0"
              }`}
            >
              <div aria-hidden="true" className="h-3" />
              <div className="popup-blue-surface relative overflow-hidden rounded-2xl border border-border p-4 shadow-pop backdrop-blur-sm md:p-5">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {companyMenuColumns.map((column) => (
                    <div key={column.title} className="rounded-xl p-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        {column.title}
                      </div>
                      <ul className="mt-3 space-y-1">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              tabIndex={openMenu === "company" ? 0 : -1}
                              className="group block rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/70 hover:text-primary"
                            >
                              <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                <span>{link.label}</span>
                                <ArrowRight
                                  aria-hidden="true"
                                  className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end
              className={({ isActive }) =>
                cn(
                  "nav-link order-6 rounded-lg px-2.5 py-1.5 text-center text-xs font-medium transition-colors lg:text-left sm:text-sm",
                  isActive
                    ? "bg-white/70 text-primary"
                    : "text-ink hover:bg-white/70 hover:text-primary lg:hover:bg-transparent",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:flex lg:items-center lg:justify-end lg:gap-2">
          <Link
            to={ROUTES.bookDemo}
            className="text-xs sm:text-sm font-medium text-primary hover:underline"
          >
            Request Demo
          </Link>
          <Link
            to={ROUTES.contact}
            className="btn-primary inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold sm:px-4 sm:text-sm"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
