import { useEffect, useState } from "react";
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

export default function BulkEmailNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(12);
  const location = useLocation();
  const currentPath = location.pathname;

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

      <div className="site-container py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to={ROUTES.bulkEmail} className="flex shrink-0 items-center gap-2 -ml-3">
            <BrandMark mode="wordmark" />
          </Link>

          <div className="flex items-center gap-2">
            <NavLink
              to={ROUTES.pricing}
              className={({ isActive }) =>
                cn(
                  "nav-link rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  isActive || currentPath === ROUTES.pricing
                    ? "bg-primary-soft text-primary"
                    : "text-ink hover:bg-surface",
                )
              }
            >
              Pricing
            </NavLink>
            <NavLink to={ROUTES.bookDemo} className="btn-success justify-center px-3 py-2 text-xs sm:px-5 sm:text-sm">
              Book Demo
            </NavLink>
          </div>
        </div>

        <nav className="mt-3 grid gap-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-card sm:grid-cols-2 xl:grid-cols-4">
          {menuGroups.map((group) => (
            <DesktopMenuColumn key={group.id} group={group} active={group.items.some((item) => currentPath === item.href)} />
          ))}
        </nav>
      </div>
    </header>
  );
}

function DesktopMenuColumn({
  group,
  active,
}: {
  group: MenuGroup;
  active: boolean;
}) {
  return (
    <div className={cn("min-w-0 rounded-2xl p-2", active && "bg-primary-soft/40")}>
      <div className="flex items-center gap-1.5 text-sm font-black tracking-tight text-ink">
        {group.title}
        <ChevronDown className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-3 space-y-1.5">
        {group.items.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-primary-soft/60 hover:text-primary",
                isActive ? "bg-primary-soft/60 text-primary" : "text-ink-soft",
              )
            }
          >
            <span className="text-primary">-</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
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
              <Link
                key={item.label}
                to={item.href}
                onClick={onNavigate}
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-left transition-colors active:bg-white/60 active:text-primary sm:hover:bg-white/60 sm:hover:text-primary"
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
              </Link>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
