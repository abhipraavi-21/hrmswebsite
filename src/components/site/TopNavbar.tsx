import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Users, X } from "lucide-react";
import BrandMark from "./BrandMark";
import {
  featureMenuColumns,
  companyMenuColumns,
  emailLinks,
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

const companyLinks = companyMenuColumns.flatMap((column) => column.links);

export default function TopNavbar() {
  const [activeTab, setActiveTab] = useState<"hrms" | "email">("hrms");
  const [open, setOpen] = useState<null | "hrms" | "email">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

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
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
      <div className="site-container flex items-center justify-between gap-3 py-3 lg:hidden">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <BrandMark />
        </a>

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
                    <MobileAccordionGroup
                      value="bulk-email"
                      title="Bulk Email"
                      items={emailLinks}
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
                      href="/pricing"
                      onNavigate={() => setMobileOpen(false)}
                    />
                    <MobileTopLevelLink
                      label="Partner With Us"
                      href="/partner-with-us"
                      onNavigate={() => setMobileOpen(false)}
                    />
                  </Accordion>
                </div>

                <div className="mt-8 grid gap-3">
                  <a
                    href="/company/book-demo"
                    onClick={() => setMobileOpen(false)}
                    className="btn-ghost justify-center text-sm"
                  >
                    Request Demo
                  </a>
                  <a
                    href="/pricing"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary justify-center text-sm"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="site-container hidden lg:grid grid-cols-1 gap-2 py-2 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-3 lg:py-0 lg:h-16">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <BrandMark />
        </a>

        <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:gap-1">
          <ProductTab
            label="HRMS"
            icon={<Users className="h-4 w-4" />}
            active={activeTab === "hrms"}
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
            active={activeTab === "email"}
            onClick={() => setActiveTab("email")}
            onHover={() => {
              clearCloseTimer();
              setOpen("email");
            }}
            onLeave={scheduleClose}
            isOpen={open === "email"}
            items={emailLinks}
          />
        </nav>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
          <a
            href="/company/contact-us"
            className="btn-ghost text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 justify-center"
          >
            Contact Sales
          </a>
          <a
            href="/company/support"
            className="btn-ghost text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 justify-center"
          >
            Support
          </a>
          <a
            href="/company/book-demo"
            className="btn-success text-xs sm:text-sm px-3 sm:px-5 py-2 justify-center"
          >
            Book Free Demo
          </a>
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
  isOpen,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  isOpen: boolean;
  items: { label: string; desc: string; href?: string }[] | { label: string; href: string }[];
}) {
  return (
    <div className="relative max-lg:w-full lg:w-auto" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        onClick={onClick}
        className={`flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors lg:w-auto ${
          active ? "bg-primary-soft text-primary" : "text-ink hover:bg-surface"
        }`}
      >
        {icon}
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 opacity-60 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`absolute left-0 top-full z-50 w-full origin-top transition-[opacity,transform] duration-240 ease-out lg:w-72 ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.975] opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div aria-hidden="true" className="h-2" />
        <div className="popup-blue-surface relative overflow-hidden rounded-[1.35rem] border border-white/70 p-2 shadow-[0_18px_50px_rgba(11,92,255,0.14)] backdrop-blur-xl ring-1 ring-white/60">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] popup-blue-band" />
          {(items as { label: string; desc?: string; href?: string }[]).map((it, index) => (
            <a
              key={it.label}
              href={it.href ?? `#${it.label}`}
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
            </a>
          ))}
        </div>
      </div>
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
    <a
      href={href}
      onClick={onNavigate}
      className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface hover:text-primary"
    >
      <span className="text-sm font-semibold tracking-tight text-ink">{label}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
    </a>
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
    <a
      href={href}
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
    </a>
  );
}
