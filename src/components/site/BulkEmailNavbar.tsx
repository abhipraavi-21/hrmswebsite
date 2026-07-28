import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark";
import { useScrolled } from "@/hooks/useScrolled";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";
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

type MenuItem = {
  label: string;
  href: string;
};

type MenuGroup = {
  id: string;
  title: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    id: "products",
    title: "Products",
    items: [
      { label: "Email Broadcast", href: ROUTES.bulkEmailCampaigns },
      { label: "Templates", href: ROUTES.bulkEmailTemplates },
      { label: "Analytics", href: ROUTES.bulkEmailAnalytics },
      { label: "Scheduling", href: ROUTES.bulkEmailAutomation },
      { label: "SMTP", href: ROUTES.bulkEmail },
    ],
  },
  {
    id: "solutions",
    title: "Solutions",
    items: [
      { label: "HR Communication", href: ROUTES.bulkEmailCampaigns },
      { label: "Marketing", href: ROUTES.bulkEmailCampaigns },
      { label: "Education", href: ROUTES.bulkEmailTemplates },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    items: [
      { label: "Learn", href: ROUTES.learn },
      { label: "Blog", href: ROUTES.blog },
      { label: "FAQs", href: ROUTES.faq },
    ],
  },
  {
    id: "company",
    title: "Company",
    items: [
      { label: "About", href: ROUTES.about },
      { label: "Contact", href: ROUTES.contact },
      { label: "Help Center", href: ROUTES.support },
    ],
  },
];

const topLevelLinks = [
  { label: "Pricing", href: ROUTES.pricing, className: "nav-link" },
  {
    label: "Book Demo",
    href: ROUTES.bookDemo,
    className: "btn-success",
  },
];

export default function BulkEmailNavbar() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const scrolled = useScrolled(12);
  const location = useLocation();

  const currentPath = location.pathname;
  const isGroupActive = (group: MenuGroup) => group.items.some((item) => currentPath === item.href);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenGroup(null);
    }, 150);
  };

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    const { overflow } = document.body.style;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/90",
        scrolled && "shadow-[0_10px_28px_rgba(15,23,42,0.08)]",
      )}
    >
      <div className="site-container flex items-center justify-between gap-3 py-3 lg:hidden">
        <Link to={ROUTES.bulkEmail} className="flex shrink-0 items-center gap-2 -ml-3">
          <BrandMark mode="wordmark" />
        </Link>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            hideClose
            className="w-[min(100vw,26rem)] max-w-none border-l border-border/70 bg-background p-0 text-ink shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Bulk email navigation</SheetTitle>
              <SheetDescription>Mobile navigation menu.</SheetDescription>
            </SheetHeader>

            <div className="relative flex h-full min-h-[100dvh] flex-col overflow-hidden bg-background">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />

              <div className="flex-1 overflow-y-auto px-5 py-6 pt-10">
                <div className="flex items-center justify-between gap-3">
                  <BrandMark mode="wordmark" />
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
                    {menuGroups.map((group) => (
                      <MobileMenuGroup
                        key={group.id}
                        group={group}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ))}
                  </Accordion>
                </div>

                <div className="mt-8 grid gap-3">
                  <Link
                    to={ROUTES.pricing}
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost justify-center text-sm"
                  >
                    Pricing
                  </Link>
                  <Link
                    to={ROUTES.bookDemo}
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary justify-center text-sm"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div
        className={cn(
          "site-container hidden grid-cols-1 gap-2 py-2 transition-[height,padding] duration-300 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-3 lg:py-0",
          scrolled ? "lg:h-14" : "lg:h-16",
        )}
      >
        <Link to={ROUTES.bulkEmail} className="flex shrink-0 items-center gap-2 -ml-3">
          <BrandMark mode="wordmark" />
        </Link>

        <nav className="flex flex-wrap items-center gap-1 overflow-visible lg:mx-auto">
          {menuGroups.map((group) => (
            <DesktopMenuGroup
              key={group.id}
              group={group}
              active={isGroupActive(group)}
              open={openGroup === group.id}
              onOpen={() => {
                clearCloseTimer();
                setOpenGroup(group.id);
              }}
              onClose={scheduleClose}
            />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          {topLevelLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  item.className,
                  item.className === "btn-success"
                    ? "justify-center px-3 py-2 text-xs sm:px-5 sm:text-sm"
                    : "nav-link rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  isActive ? (item.className === "btn-success" ? "" : "bg-primary-soft text-primary") : "",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

function DesktopMenuGroup({
  group,
  active,
  open,
  onOpen,
  onClose,
}: {
  group: MenuGroup;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={cn(
          "nav-link flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
          active || open ? "bg-primary-soft text-primary" : "text-ink hover:bg-surface",
        )}
      >
        {group.title}
        <ChevronDown
          className={cn("h-3.5 w-3.5 opacity-60 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "absolute left-0 top-full z-50 w-72 origin-top transition-[opacity,transform] duration-[240ms] ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.975] opacity-0",
        )}
        aria-hidden={!open}
      >
        <div aria-hidden="true" className="h-2" />
        <div className="popup-blue-surface relative overflow-hidden rounded-[1.35rem] border border-white/70 p-2 shadow-[0_18px_50px_rgba(11,92,255,0.14)] backdrop-blur-xl ring-1 ring-white/60">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
          <div className="grid gap-1">
            {group.items.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.href}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-all duration-300 hover:bg-white/70 hover:text-primary",
                    open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                    isActive && "bg-white/70 text-primary",
                  )
                }
              >
                <div className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  <div className="text-sm font-semibold text-ink transition-colors group-hover:text-primary">
                    {item.label}
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenuGroup({
  group,
  onNavigate,
}: {
  group: MenuGroup;
  onNavigate: () => void;
}) {
  return (
    <AccordionItem value={group.id} className="border-0">
      <AccordionTrigger className="rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
        <span className="text-sm font-semibold tracking-tight text-ink">{group.title}</span>
      </AccordionTrigger>
      <AccordionContent className="pb-1 pt-2">
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-2">
          <div className="grid gap-0">
            {group.items.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-left transition-colors active:bg-white/60 active:text-primary sm:hover:bg-white/60 sm:hover:text-primary",
                    isActive && "bg-white/60 text-primary",
                  )
                }
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-ink transition-colors group-active:text-primary sm:group-hover:text-primary">
                    {item.label}
                  </div>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary opacity-80 transition-[transform,opacity] duration-200 ease-out group-active:translate-x-1 sm:opacity-0 sm:-translate-x-0.5 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
                />
              </NavLink>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
