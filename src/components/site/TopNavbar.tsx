import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Users, X } from "lucide-react";
import BrandMark from "./BrandMark";
import {
  featureMenuColumns,
  companyMenuColumns,
  hrmsLinks,
  resourcesMenuItems,
  solutionMenuItems,
} from "./nav-data";
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

const companyLinks = companyMenuColumns.flatMap((column) => column.links);

export default function TopNavbar() {
  const [activeTab, setActiveTab] = useState<"hrms" | "email">("hrms");
  const [open, setOpen] = useState<null | "hrms" | "email">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(12);
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isBulkEmailPage = location.pathname.startsWith(ROUTES.bulkEmail);
  const currentTab = isBulkEmailPage ? "email" : activeTab;

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(null);
    }, 180);
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
        <Link to={ROUTES.home} className="flex items-center gap-2 shrink-0">
          <BrandMark />
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
              <SheetTitle>Main navigation</SheetTitle>
              <SheetDescription>Mobile navigation menu.</SheetDescription>
            </SheetHeader>

            <div className="relative flex h-full min-h-[100dvh] flex-col overflow-hidden bg-background">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />

              <div className="flex-1 overflow-y-auto px-5 py-6 pt-10">
                <div className="flex items-center justify-between gap-3">
                  <BrandMark />
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
                    <MobileAccordionGroup
                      value="hrms"
                      title="HRMS"
                      items={hrmsLinks}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileTopLevelLink
                      label="Bulk Email"
                      href={ROUTES.bulkEmailCampaigns}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileFeaturesGroup onNavigate={() => setMobileOpen(false)} />
                    <MobileAccordionGroup
                      value="solutions"
                      title="Solutions"
                      items={solutionMenuItems}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileAccordionGroup
                      value="resources"
                      title="Resources"
                      items={resourcesMenuItems}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileAccordionGroup
                      value="company"
                      title="Company"
                      items={companyLinks}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileTopLevelLink
                      label="Pricing"
                      href={ROUTES.pricing}
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileTopLevelLink
                      label="Partner With Us"
                      href={ROUTES.partner}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  </Accordion>
                </div>

                <div className="mt-8 grid gap-3">
                  <Link
                    to={ROUTES.bookDemo}
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost justify-center text-sm"
                  >
                    Request Demo
                  </Link>
                  <Link
                    to={ROUTES.pricing}
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary justify-center text-sm"
                  >
                    View Pricing
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
        <Link to={ROUTES.home} className="flex items-center gap-2 shrink-0">
          <BrandMark />
        </Link>

        <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:gap-1">
          <ProductTab
            label="HRMS"
            icon={<Users className="h-4 w-4" />}
            active={currentTab === "hrms"}
            onClick={() => setActiveTab("hrms")}
            onHover={() => {
              clearCloseTimer();
              setOpen("hrms");
            }}
            onLeave={scheduleClose}
            isOpen={open === "hrms"}
            items={hrmsLinks}
          />
          <ProductTab
            label="Bulk Email"
            icon={<Mail className="h-4 w-4" />}
            active={currentTab === "email"}
            onClick={() => {
              setActiveTab("email");
              navigate(ROUTES.bulkEmailCampaigns);
            }}
            onHover={() => {
              setOpen(null);
            }}
            onLeave={() => {
              setOpen(null);
            }}
            isOpen={false}
          />
        </nav>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
          <Link
            to={ROUTES.contact}
            className="nav-link btn-ghost justify-center px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm"
          >
            Contact Sales
          </Link>
          <Link
            to={ROUTES.support}
            className="nav-link btn-ghost justify-center px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm"
          >
            Support
          </Link>
          <Link
            to={ROUTES.bookDemo}
            className="btn-success justify-center px-3 py-2 text-xs sm:px-5 sm:text-sm"
          >
            Book Free Demo
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProductTab({
  label,
  icon,
  active,
  onClick,
  onHover,
  onLeave,
  isOpen = false,
  items,
  showChevron = Boolean(items?.length),
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  isOpen?: boolean;
  items?: { label: string; desc: string; href?: string }[] | { label: string; href: string }[];
  showChevron?: boolean;
}) {
  return (
    <div className="relative max-lg:w-full lg:w-auto" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        onClick={onClick}
        className={cn(
          "nav-link flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors lg:w-auto sm:text-sm",
          active ? "bg-primary-soft text-primary" : "text-ink hover:bg-surface",
        )}
        data-active={active || isOpen ? "true" : "false"}
      >
        {icon}
        {label}
        {showChevron ? (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        ) : null}
      </button>
      {items?.length ? (
        <div
          className={`absolute left-0 top-full z-50 w-full origin-top transition-[opacity,transform] duration-[240ms] ease-out lg:w-72 ${
            isOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-[0.975] opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div aria-hidden="true" className="h-2" />
          <div className="popup-blue-surface relative overflow-hidden rounded-[1.35rem] border border-white/70 p-2 shadow-[0_18px_50px_rgba(11,92,255,0.14)] backdrop-blur-xl ring-1 ring-white/60">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
            <div className="grid gap-1">
              {(items as { label: string; desc?: string; href?: string }[]).map((it, index) => (
                <Link
                  key={it.label}
                  to={it.href ?? `#${it.label}`}
                  tabIndex={isOpen ? 0 : -1}
                  style={{ transitionDelay: isOpen ? `${index * 35}ms` : "0ms" }}
                  className={`group flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-all duration-300 ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  } hover:bg-white/70 hover:text-primary`}
                >
                  <div className="flex items-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    <div className="text-sm font-semibold text-ink transition-colors group-hover:text-primary">
                      {it.label}
                    </div>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 -translate-x-0.5 opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileAccordionGroup({
  value,
  title,
  items,
  onNavigate,
}: {
  value: string;
  title: string;
  items: { label: string; desc?: string; href?: string }[] | { label: string; href: string }[];
  onNavigate: () => void;
}) {
  return (
    <AccordionItem value={value} className="border-0">
      <AccordionTrigger className="rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
        <span className="text-sm font-semibold tracking-tight text-ink">{title}</span>
      </AccordionTrigger>
      <AccordionContent className="pb-1 pt-2">
        <div className="rounded-2xl border border-border/70 bg-muted/30 p-2">
          <div className="grid gap-0">
            {(items as { label: string; desc?: string; href?: string }[]).map((item) => (
              <MobileLink
                key={item.label}
                label={item.label}
                href={item.href ?? "#"}
                description={item.desc}
                showDescription={Boolean(item.desc)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileFeaturesGroup({ onNavigate }: { onNavigate: () => void }) {
  return (
    <AccordionItem value="features" className="border-0">
      <AccordionTrigger className="rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
        <span className="text-sm font-semibold tracking-tight text-ink">Features</span>
      </AccordionTrigger>
      <AccordionContent className="pb-1 pt-2">
        <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/30 p-2">
          {featureMenuColumns.map((column) => (
            <section key={column.title} className="rounded-xl bg-background/80 p-3">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {column.title}
              </div>
              <div className="mt-2 grid gap-0">
                {column.links.map((item) => (
                  <MobileLink
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    description={undefined}
                    showDescription={false}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileTopLevelLink({
  label,
  href,
  onNavigate,
}: {
  label: string;
  href: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface hover:text-primary"
    >
      <span className="text-sm font-semibold tracking-tight text-ink">{label}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
    </Link>
  );
}

function MobileLink({
  label,
  href,
  description,
  showDescription = true,
  onNavigate,
}: {
  label: string;
  href: string;
  description?: string;
  showDescription?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className="group flex items-center justify-between gap-3 rounded-lg px-2 py-3 text-left transition-colors active:bg-white/60 active:text-primary sm:hover:bg-white/60 sm:hover:text-primary"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-ink transition-colors group-active:text-primary sm:group-hover:text-primary">
          {label}
        </div>
        {showDescription && description ? (
          <div className="text-xs text-ink-soft">{description}</div>
        ) : null}
      </div>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-primary opacity-80 transition-[transform,opacity] duration-200 ease-out group-active:translate-x-1 sm:opacity-0 sm:-translate-x-0.5 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
      />
    </Link>
  );
}
