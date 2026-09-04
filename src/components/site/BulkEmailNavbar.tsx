import { useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Mail, Menu, Package, Users, X } from "lucide-react";
import BrandMark from "./BrandMark";
import ProductBrandLine from "./ProductBrandLine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { ROUTES } from "@/routes/routeConfig.js";

type MenuKey = "products" | "solutions" | "resources" | "company";

type MenuItem = {
  label: string;
  href: string;
};

const productItems: MenuItem[] = [
  { label: "Email Broadcast", href: ROUTES.bulkEmailBroadcast },
  { label: "Templates", href: ROUTES.bulkEmailTemplates },
  { label: "Analytics", href: ROUTES.bulkEmailAnalytics },
  { label: "Scheduling", href: ROUTES.bulkEmailScheduling },
  { label: "SMTP", href: ROUTES.bulkEmailSmtp },
];

const solutionItems: MenuItem[] = [
  { label: "HR Communication", href: ROUTES.bulkEmailHrCommunication },
  { label: "Marketing", href: ROUTES.bulkEmailMarketing },
  { label: "Education", href: ROUTES.bulkEmailEducation },
];

const resourceItems: MenuItem[] = [
  { label: "Learn", href: ROUTES.bulkEmailLearn },
  { label: "Blog", href: ROUTES.bulkEmailBlog },
  { label: "FAQs", href: ROUTES.bulkEmailFaq },
];

const companyItems: MenuItem[] = [
  { label: "About", href: ROUTES.bulkEmailAbout },
  { label: "Contact", href: ROUTES.bulkEmailContact },
  { label: "Help Center", href: ROUTES.support },
];

export default function BulkEmailNavbar() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(12);
  const { pathname } = useLocation();
  const isBulkEmailHomePage = pathname === ROUTES.bulkEmail;
  const drawerThemeClass = isBulkEmailHomePage ? "bulk-email-home-theme" : "bulk-email-theme";
  const switcherButtonClass =
    "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-semibold text-ink transition-all duration-200 sm:px-4 sm:text-sm hover:bg-surface hover:text-primary";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/90",
        scrolled && "shadow-[0_10px_28px_rgba(15,23,42,0.08)]",
      )}
    >
      <div className="site-container flex flex-col gap-2 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2 -ml-3">
            <BrandMark mode="wordmark" src="/brand/altroz-blue-wordmark.png" alt="Altroz" />
          </Link>
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              hideClose
              className={cn(
                drawerThemeClass,
                "w-[min(100vw,26rem)] max-w-none border-l border-border/70 bg-background p-0 text-ink shadow-[0_24px_80px_rgba(15,23,42,0.22)]",
              )}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Main navigation</SheetTitle>
                <SheetDescription>Mobile navigation menu.</SheetDescription>
              </SheetHeader>

              <div className="relative flex h-full min-h-[100dvh] flex-col overflow-hidden bg-background">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />

                <div className="flex-1 overflow-y-auto px-5 py-6 pt-10">
                <div className="flex items-center justify-between gap-3">
                    <BrandMark mode="wordmark" src="/brand/altroz-blue-wordmark.png" alt="Altroz" />
                    <SheetClose asChild>
                      <button
                        type="button"
                        aria-label="Close menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink shadow-sm transition-colors hover:bg-surface hover:text-primary"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </SheetClose>
                  </div>

                  <div className="mt-6">
                    <Accordion type="single" collapsible className="space-y-2">
                      <MobileGroup title="Products" items={productItems} onNavigate={() => setMobileOpen(false)} />
                      <MobileGroup title="Solutions" items={solutionItems} onNavigate={() => setMobileOpen(false)} />
                      <MobileGroup title="Resources" items={resourceItems} onNavigate={() => setMobileOpen(false)} />
                      <MobileGroup title="Company" items={companyItems} onNavigate={() => setMobileOpen(false)} />
                    </Accordion>
                  </div>

                  <div className="mt-8 grid gap-3">
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center justify-start">
          <ProductBrandLine
            compact
            brandSrc="/brand/bulk-email-logo-transparent.png"
            brandAlt="Altroz Bulk Email"
            className="max-w-full"
          />
        </div>

        <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link to={ROUTES.hrmsHome} className={switcherButtonClass}>
            <Users className="h-4 w-4 text-ink" />
            HRMS
          </Link>
          <Link to={ROUTES.bulkEmail} className={switcherButtonClass}>
            <Mail className="h-4 w-4 text-ink" />
            Bulk Email
          </Link>
          <Link to={ROUTES.assetManagementHome} className={switcherButtonClass}>
            <Package className="h-4 w-4 text-ink" />
            Asset Management
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <div
          className={cn(
            "border-b border-border/70 bg-white/95 transition-[height,padding] duration-300",
            scrolled ? "lg:h-14" : "lg:h-16",
          )}
        >
          <div className="site-container flex h-full items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2 -ml-3">
                <BrandMark mode="wordmark" src="/brand/altroz-blue-wordmark.png" alt="Altroz" />
              </Link>
              <div className="flex items-center gap-2">
                <Link to={ROUTES.hrmsHome} className={switcherButtonClass}>
                  <Users className="h-4 w-4 text-ink" />
                  HRMS
                </Link>
                <Link to={ROUTES.bulkEmail} className={switcherButtonClass}>
                  <Mail className="h-4 w-4 text-ink" />
                  Bulk Email
                </Link>
                <Link to={ROUTES.assetManagementHome} className={switcherButtonClass}>
                  <Package className="h-4 w-4 text-ink" />
                  Asset Management
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="bulk-email-nav-strip border-b border-border/60 bg-primary-soft/60">
          <div className="site-container grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4 py-2">
            <ProductBrandLine
              compact
              brandSrc="/brand/bulk-email-logo-transparent.png"
              brandAlt="Altroz Bulk Email"
              className="justify-self-start"
            />

            <nav className="flex w-fit flex-wrap items-center justify-center gap-1 justify-self-center lg:gap-2">
              <DesktopMenu
                label="Products"
                active={activeMenu === "products"}
                onOpen={() => setActiveMenu("products")}
                onClose={() => setActiveMenu(null)}
              >
                <MenuList items={productItems} active={activeMenu === "products"} />
              </DesktopMenu>

              <DesktopMenu
                label="Solutions"
                active={activeMenu === "solutions"}
                onOpen={() => setActiveMenu("solutions")}
                onClose={() => setActiveMenu(null)}
              >
                <MenuList items={solutionItems} active={activeMenu === "solutions"} />
              </DesktopMenu>

              <DesktopMenu
                label="Resources"
                active={activeMenu === "resources"}
                onOpen={() => setActiveMenu("resources")}
                onClose={() => setActiveMenu(null)}
              >
                <MenuList items={resourceItems} active={activeMenu === "resources"} />
              </DesktopMenu>

              <DesktopMenu
                label="Company"
                active={activeMenu === "company"}
                onOpen={() => setActiveMenu("company")}
                onClose={() => setActiveMenu(null)}
                alignRight
              >
                <MenuList items={companyItems} active={activeMenu === "company"} />
              </DesktopMenu>

              <NavLink
                to={ROUTES.bulkEmailPricing}
                className={({ isActive }) =>
                  cn(
                    "nav-link rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                    isActive ? "bg-white/70 text-primary" : "text-ink hover:bg-white/70 hover:text-primary",
                  )
                }
              >
                Pricing
              </NavLink>

              <NavLink
                to={ROUTES.partner}
                className={({ isActive }) =>
                  cn(
                    "nav-link whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                    isActive ? "bg-white/70 text-primary" : "text-ink hover:bg-white/70 hover:text-primary",
                  )
                }
              >
                Partner With Us
              </NavLink>
            </nav>

            <Link
              to={ROUTES.bulkEmailBookDemo}
              className="btn-primary inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold sm:px-4 sm:text-sm"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopMenu({
  label,
  active,
  onOpen,
  onClose,
  children,
  alignRight = false,
}: {
  label: string;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  alignRight?: boolean;
}) {
  return (
    <div className="relative shrink-0" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        onClick={active ? onClose : onOpen}
        className={cn(
          "nav-link flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
          active ? "bg-white/70 text-primary" : "text-ink hover:bg-white/70 hover:text-primary",
        )}
        aria-expanded={active}
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 opacity-60 transition-transform duration-200", active && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "absolute top-full z-50 pt-3 transition-[opacity,transform] duration-200 ease-out",
          alignRight ? "right-0 origin-top-right" : "left-0 origin-top-left",
          active
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        <div aria-hidden="true" className="h-3" />
        <div className="popup-blue-surface relative overflow-hidden rounded-2xl border border-border p-4 shadow-pop backdrop-blur-sm md:p-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
          {children}
        </div>
      </div>
    </div>
  );
}

function MenuList({ items, active }: { items: MenuItem[]; active: boolean }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.label}>
          <MenuLink item={item} active={active} />
        </li>
      ))}
    </ul>
  );
}

function MenuLink({ item, active }: { item: MenuItem; active: boolean }) {
  const baseClass =
    "group block rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/70 hover:text-primary";

  return (
    <Link to={item.href} tabIndex={active ? 0 : -1} className={baseClass}>
      <span className="inline-flex items-center gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        <span className="whitespace-nowrap">{item.label}</span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
        />
      </span>
    </Link>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <AccordionItem value={title.toLowerCase()} className="overflow-hidden rounded-2xl border border-border bg-white px-4">
      <AccordionTrigger className="py-4 text-left text-sm font-semibold text-ink hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.label}>
              <SheetClose asChild>
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-ink transition-colors hover:bg-surface hover:text-primary"
                >
                  <span className="min-w-0 break-normal whitespace-normal text-left [overflow-wrap:normal]">
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-60" />
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
