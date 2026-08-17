import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Package, Users, X } from "lucide-react";
import BrandMark from "./BrandMark";
import { featureMenuColumns } from "./nav-data";
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

type MobileTab = "hrms" | "email" | "asset";

type NavItem = {
  label: string;
  href: string;
};

type MobileSection = {
  title: string;
  href?: string;
  links: NavItem[];
};

const hrmsSections: MobileSection[] = featureMenuColumns.map((column) => ({
  title: column.title,
  href: column.links[0]?.href,
  links: column.links,
}));

const bulkEmailSections: MobileSection[] = [
  {
    title: "Campaign Center",
    href: ROUTES.bulkEmailBroadcast,
    links: [
      { label: "Bulk Email Home", href: ROUTES.bulkEmail },
      { label: "Email Broadcast", href: ROUTES.bulkEmailBroadcast },
      { label: "Templates", href: ROUTES.bulkEmailTemplates },
      { label: "Contacts", href: ROUTES.bulkEmailContact },
      { label: "Analytics", href: ROUTES.bulkEmailAnalytics },
      { label: "Automation", href: ROUTES.bulkEmailAutomation },
      { label: "Scheduling", href: ROUTES.bulkEmailScheduling },
      { label: "SMTP", href: ROUTES.bulkEmailSmtp },
    ],
  },
  {
    title: "Use Cases",
    href: ROUTES.bulkEmailHrCommunication,
    links: [
      { label: "HR Communication", href: ROUTES.bulkEmailHrCommunication },
      { label: "Marketing", href: ROUTES.bulkEmailMarketing },
      { label: "Education", href: ROUTES.bulkEmailEducation },
    ],
  },
  {
    title: "Resources",
    href: ROUTES.bulkEmailLearn,
    links: [
      { label: "Learn", href: ROUTES.bulkEmailLearn },
      { label: "Blog", href: ROUTES.bulkEmailBlog },
      { label: "FAQs", href: ROUTES.bulkEmailFaq },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Pricing", href: ROUTES.bulkEmailPricing },
      { label: "Contact Us", href: ROUTES.bulkEmailContact },
    ],
  },
];

const assetManagementSections: MobileSection[] = [
  {
    title: "Asset Operations",
    href: ROUTES.assetManagementHome,
    links: [
      { label: "Asset Management", href: ROUTES.assetManagementHome },
      { label: "Asset Dashboard", href: ROUTES.bulkEmailAssetDashboard },
      { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
      { label: "QR Code Asset Management", href: ROUTES.bulkEmailAssetQrCode },
      { label: "Asset Maintenance", href: ROUTES.bulkEmailAssetMaintenance },
      { label: "Asset Reports", href: ROUTES.bulkEmailAssetReports },
    ],
  },
  {
    title: "Solutions",
    href: ROUTES.bulkEmailAssetDashboard,
    links: [
      { label: "IT Asset Management", href: ROUTES.bulkEmailAssetDashboard },
      { label: "Manufacturing Assets", href: ROUTES.bulkEmailAssetTracking },
      { label: "Healthcare Assets", href: ROUTES.bulkEmailAssetMaintenance },
      { label: "Educational Institutions", href: ROUTES.bulkEmailAssetReports },
      { label: "Corporate Offices", href: ROUTES.assetManagementHome },
    ],
  },
  {
    title: "Resources",
    href: ROUTES.assetManagementLearn,
    links: [
      { label: "Learn", href: ROUTES.assetManagementLearn },
      { label: "Asset Management Guide", href: ROUTES.assetManagementGuide },
      { label: "Blog", href: ROUTES.assetManagementBlog },
      { label: "FAQs", href: ROUTES.assetManagementFaq },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Pricing", href: ROUTES.assetManagementPricing },
      { label: "Contact Us", href: ROUTES.assetManagementContact },
      { label: "Help Center", href: ROUTES.support },
    ],
  },
];

const mobileSectionMap: Record<MobileTab, MobileSection[]> = {
  hrms: hrmsSections,
  email: bulkEmailSections,
  asset: assetManagementSections,
};

const HRMS_LOGIN_SIGNUP_HREF =
  `${ROUTES.checkoutBase}/hrms?plan=1&employees=28&billing=annual&mode=register`;

export default function TopNavbar() {
  return <TopNavbarShell />;
}

export function TopNavbarShell({ forceActiveTab = null }: { forceActiveTab?: MobileTab | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(12);
  const location = useLocation();
  const navigate = useNavigate();

  const isBulkEmailPage = location.pathname.startsWith(ROUTES.bulkEmail);
  const isAssetManagementPage =
    location.pathname.startsWith(ROUTES.assetManagementHome) ||
    location.pathname.startsWith(ROUTES.assetManagement);
  const currentTab: MobileTab =
    forceActiveTab ?? (isAssetManagementPage ? "asset" : isBulkEmailPage ? "email" : "hrms");
  const currentSections = mobileSectionMap[currentTab];
  const currentTabLabel =
    currentTab === "hrms" ? "HRMS" : currentTab === "email" ? "Bulk Email" : "Asset Management";

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
      <div className="site-container flex flex-col gap-2 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2 -ml-3">
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
                <SheetTitle>Main navigation</SheetTitle>
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
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          {currentTabLabel}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-ink">Main pages</h2>
                      </div>
                      <div className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                        {currentSections.length} groups
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {currentSections.map((section) => (
                        <MobileSectionCard
                          key={section.title}
                          section={section}
                          onNavigate={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3">
                      <SheetClose asChild>
                        <Link
                          to={HRMS_LOGIN_SIGNUP_HREF}
                          onClick={() => setMobileOpen(false)}
                          className="btn-primary justify-center text-sm"
                        >
                          Login / Signup
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-2 pb-1">
          <Link
            to={ROUTES.hrmsHome}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
              currentTab === "hrms"
                ? "bg-primary-soft text-primary"
                : "text-ink hover:bg-surface hover:text-primary",
            )}
          >
            <Users className="h-4 w-4" />
            HRMS
          </Link>
          <Link
            to={ROUTES.bulkEmail}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
              currentTab === "email"
                ? "bg-primary-soft text-primary"
                : "text-ink hover:bg-surface hover:text-primary",
            )}
          >
            <Mail className="h-4 w-4" />
            Bulk Email
          </Link>
          <Link
            to={ROUTES.assetManagementHome}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm",
              currentTab === "asset"
                ? "bg-primary-soft text-primary"
                : "text-ink hover:bg-surface hover:text-primary",
            )}
          >
            <Package className="h-4 w-4" />
            Asset Management
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "site-container hidden grid-cols-1 gap-2 py-2 transition-[height,padding] duration-300 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-3 lg:py-0",
          scrolled ? "lg:h-14" : "lg:h-16",
        )}
      >
        <Link to={ROUTES.home} className="flex shrink-0 items-center gap-2 -ml-3">
          <BrandMark mode="wordmark" />
        </Link>

        <nav className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:gap-1">
          <ProductTab
            label="HRMS"
            icon={<Users className="h-4 w-4" />}
            active={currentTab === "hrms"}
            onClick={() => {
              navigate(ROUTES.hrmsHome);
            }}
            isOpen={false}
          />
          <ProductTab
            label="Bulk Email"
            icon={<Mail className="h-4 w-4" />}
            active={currentTab === "email"}
            onClick={() => {
              navigate(ROUTES.bulkEmail);
            }}
            isOpen={false}
          />
          <ProductTab
            label="Asset Management"
            icon={<Package className="h-4 w-4" />}
            active={currentTab === "asset"}
            onClick={() => {
              navigate(ROUTES.assetManagementHome);
            }}
            isOpen={false}
          />
        </nav>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
          <Link
            to={ROUTES.hrmsContact}
            className="nav-link btn-ghost justify-center px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm"
          >
            Contact Sales
          </Link>
          <Link
            to={ROUTES.support}
            className="nav-link btn-ghost justify-center px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm"
          >
            Help Center
          </Link>
          <Link
            to={HRMS_LOGIN_SIGNUP_HREF}
            className="btn-success justify-center px-3 py-2 text-xs sm:px-5 sm:text-sm"
          >
            Login / Signup
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
  icon: ReactNode;
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

function MobileSectionCard({
  section,
  onNavigate,
}: {
  section: MobileSection;
  onNavigate: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
      <div className="border-b border-border/70 bg-muted/30 px-4 py-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
          Main page
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {section.href ? (
              <SheetClose asChild>
                <Link
                  to={section.href}
                  onClick={onNavigate}
                  className="block break-normal whitespace-normal text-base font-semibold text-ink [overflow-wrap:normal] transition-colors hover:text-primary"
                >
                  {section.title}
                </Link>
              </SheetClose>
            ) : (
              <h3 className="text-base font-semibold text-ink">{section.title}</h3>
            )}
          </div>

          {section.href ? (
            <SheetClose asChild>
              <Link
                to={section.href}
                onClick={onNavigate}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink transition-colors hover:bg-surface hover:text-primary"
              >
                Open
              </Link>
            </SheetClose>
          ) : null}
        </div>
      </div>

      <div className="px-2 py-2">
        <p className="px-2 pb-1 pt-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ink-soft">
          Sub pages
        </p>
        <div className="grid gap-1">
          {section.links.map((item) => (
            <MobileSubLink key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileSubLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <SheetClose asChild>
      <Link
        to={item.href}
        onClick={onNavigate}
        className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface hover:text-primary"
      >
        <span className="min-w-0 whitespace-nowrap text-sm font-medium text-ink [overflow-wrap:normal] transition-colors group-hover:text-primary">
          {item.label}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-primary opacity-70 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
        />
      </Link>
    </SheetClose>
  );
}
