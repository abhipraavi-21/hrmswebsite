import { useMemo, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import {
  PricingFeatureComparisonSection,
  PRICING_FEATURE_SECTION_TYPE,
} from "@/components/site/PricingFeatureComparisonSection";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { usePublicContent } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import { fetchPageByKey } from "@/services/pageService";
import { getSeedPageFallback } from "@/services/seedFallback";
import { getSectionItems, getSetting } from "@/services/cmsHelpers";
import type { PublicCmsItem, PublicCmsSection } from "@/services/cmsTypes";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Coins,
  Crown,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Laptop,
  LayoutDashboard,
  Layers3,
  Lightbulb,
  MailCheck,
  MapPin,
  Megaphone,
  Package,
  QrCode,
  RotateCcw,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Workflow,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

type NavbarVariant = "default" | "bulkEmail" | "assetManagement";

type ManagedCmsShowcasePageProps = {
  pageKey: string;
  canonicalPath: string;
  navbarVariant?: NavbarVariant;
  fallbackTitle: string;
  fallbackDescription: string;
};

const iconMap = {
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Coins,
  Crown,
  Factory,
  FileText,
  GraduationCap,
  HeartPulse,
  Laptop,
  LayoutDashboard,
  Layers3,
  Lightbulb,
  MailCheck,
  MapPin,
  Megaphone,
  Package,
  QrCode,
  RotateCcw,
  Send,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Workflow,
  Wrench,
} as const;

function ActionLink({
  href,
  className,
  children,
}: {
  href?: string | null;
  className: string;
  children: ReactNode;
}) {
  if (!href) {
    return <span className={className}>{children}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function PageChrome({ variant }: { variant: NavbarVariant }) {
  if (variant === "bulkEmail") {
    return <BulkEmailNavbar />;
  }

  if (variant === "assetManagement") {
    return <AssetManagementNavbar />;
  }

  return (
    <>
      <TopNavbar />
      <MainNavbar />
    </>
  );
}

function getIcon(iconName?: string | null) {
  if (!iconName) {
    return Sparkles;
  }

  return iconMap[iconName as keyof typeof iconMap] ?? Sparkles;
}

function getStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  centered?: boolean;
}) {
  if (!eyebrow && !title && !description) {
    return null;
  }

  return (
    <ScrollReveal className={cn("max-w-4xl", centered && "mx-auto text-center")}>
      {eyebrow ? (
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
      ) : null}
      {title ? (
        <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      ) : null}
      {description ? (
        <p className="mt-3 text-sm leading-7 text-ink-soft sm:text-base">{description}</p>
      ) : null}
    </ScrollReveal>
  );
}

function SectionActions({ section }: { section: PublicCmsSection }) {
  if (!section.buttonText && typeof section.settings?.secondaryButtonText !== "string") {
    return null;
  }

  return (
    <ScrollReveal className="mt-8 flex flex-wrap justify-center gap-3">
      {section.buttonText ? (
        <ActionLink href={section.buttonLink} className="btn-primary justify-center">
          {section.buttonText}
          <ArrowRight className="h-4 w-4" />
        </ActionLink>
      ) : null}
      {typeof section.settings?.secondaryButtonText === "string" ? (
        <ActionLink
          href={(section.settings?.secondaryButtonLink as string | undefined) ?? "#"}
          className="btn-outline justify-center"
        >
          {section.settings.secondaryButtonText}
        </ActionLink>
      ) : null}
    </ScrollReveal>
  );
}

function ItemFeatureList({ item }: { item: PublicCmsItem }) {
  const features = getStringList(item.extraData?.features);

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      {features.map((feature) => (
        <div key={feature} className="flex items-start gap-2 rounded-xl bg-surface/70 px-3 py-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <span className="text-sm leading-6 text-ink">{feature}</span>
        </div>
      ))}
    </div>
  );
}

function InfoCard({ item }: { item: PublicCmsItem }) {
  const Icon = getIcon(item.icon);

  return (
    <article className="soft-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      {item.subtitle ? (
        <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
          {item.subtitle}
        </div>
      ) : null}
      <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
      {item.description ? (
        <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
      ) : null}
      <ItemFeatureList item={item} />
      {item.buttonLink || item.buttonText ? (
        <ActionLink
          href={item.buttonLink}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary"
        >
          {item.buttonText ?? "Open"}
          <ArrowRight className="h-4 w-4" />
        </ActionLink>
      ) : null}
    </article>
  );
}

function ContentSplitSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section);

  return (
    <section id={section.sectionKey} className="section">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {items.map((item) => {
            const features = getStringList(item.extraData?.features);
            const secondaryDescription =
              typeof item.extraData?.secondaryDescription === "string"
                ? item.extraData.secondaryDescription
                : "";

            return (
              <ScrollReveal key={`${section.sectionKey}-${item.title}`} className="soft-card p-6">
                {item.subtitle ? (
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    {item.subtitle}
                  </div>
                ) : null}
                <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{item.title}</h3>
                {item.description ? (
                  <p className="mt-4 text-sm leading-7 text-ink-soft">{item.description}</p>
                ) : null}
                {secondaryDescription ? (
                  <p className="mt-4 text-sm leading-7 text-ink-soft">{secondaryDescription}</p>
                ) : null}
                {features.length > 0 ? (
                  <div className="mt-5 space-y-3">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </ScrollReveal>
            );
          })}
        </div>

        <SectionActions section={section} />
      </div>
    </section>
  );
}

function IconCardsSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section);

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={section.sectionKey} className="section">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <StaggerReveal
          step={40}
          className={cn(
            "mt-8 grid gap-5",
            items.length >= 6 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2",
          )}
        >
          {items.map((item) => (
            <InfoCard key={`${section.sectionKey}-${item.title}`} item={item} />
          ))}
        </StaggerReveal>

        <SectionActions section={section} />
      </div>
    </section>
  );
}

function TimelineSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section);

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={section.sectionKey} className="section bg-white">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <ScrollReveal
              key={`${section.sectionKey}-${item.title}`}
              delay={index * 35}
              className="soft-card relative overflow-hidden p-5"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-success/60" />
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-sm font-black text-primary">
                  {item.subtitle?.replace(/^Step\s*/i, "") ?? `${index + 1}`}
                </div>
                <div>
                  {item.subtitle ? (
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      {item.subtitle}
                    </div>
                  ) : null}
                  <h3 className="mt-1 text-xl font-black tracking-tight text-ink">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                  ) : null}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonTableSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section);
  const headers = getStringList(section.settings?.headers);
  const firstHeader = headers[0] ?? "Manual Spreadsheet";
  const secondHeader = headers[1] ?? "Digital Asset Management Platform";
  const usesDynamicColumns =
    headers.length > 2 || items.some((item) => Array.isArray(item.extraData?.values));

  if (items.length === 0) {
    return null;
  }

  if (usesDynamicColumns) {
    const tableHeaders = headers.length > 0 ? headers : ["Item", "Details"];
    const gridTemplateColumns = `minmax(220px, 1.2fr) repeat(${Math.max(
      0,
      tableHeaders.length - 1,
    )}, minmax(150px, 1fr))`;
    const minWidth = Math.max(720, 220 + tableHeaders.length * 160);

    return (
      <section id={section.sectionKey} className="section bg-white">
        <div className="site-container">
          <SectionIntro
            eyebrow={section.subheading}
            title={section.heading}
            description={section.description}
            centered
          />

          <ScrollReveal className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
            <div className="overflow-x-auto">
              <div style={{ minWidth }}>
                <div
                  className="grid bg-slate-950 text-xs font-black uppercase tracking-[0.16em] text-white"
                  style={{ gridTemplateColumns }}
                >
                  {tableHeaders.map((header) => (
                    <div
                      key={header}
                      className="border-r border-white/10 px-5 py-4 last:border-r-0"
                    >
                      {header}
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => {
                    const values = Array.isArray(item.extraData?.values)
                      ? item.extraData.values.map((value) => String(value ?? ""))
                      : [item.description ?? ""];
                    const rowValues = tableHeaders.slice(1).map((_, index) => values[index] ?? "");

                    return (
                      <div
                        key={`${section.sectionKey}-${item.id}`}
                        className="grid bg-white text-sm leading-7"
                        style={{ gridTemplateColumns }}
                      >
                        <div className="border-r border-border px-5 py-4 font-semibold text-ink">
                          {item.title}
                        </div>
                        {rowValues.map((value, index) => (
                          <div
                            key={`${section.sectionKey}-${item.id}-${index}`}
                            className="border-r border-border px-5 py-4 text-ink-soft last:border-r-0"
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id={section.sectionKey} className="section bg-white">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <ScrollReveal className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-white shadow-float">
          <div className="grid bg-slate-950 text-sm font-black uppercase tracking-[0.16em] text-white sm:grid-cols-2">
            <div className="border-b border-white/10 px-5 py-4 sm:border-b-0 sm:border-r">
              {firstHeader}
            </div>
            <div className="px-5 py-4">{secondHeader}</div>
          </div>

          <div className="divide-y divide-border">
            {items.map((item) => (
              <div
                key={`${section.sectionKey}-${item.id}`}
                className="grid gap-0 bg-white text-sm leading-7 sm:grid-cols-2"
              >
                <div className="border-b border-border px-5 py-4 font-semibold text-ink sm:border-b-0 sm:border-r">
                  {item.title}
                </div>
                <div className="px-5 py-4 text-ink-soft">{item.description}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ChecklistSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section);

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={section.sectionKey} className="section bg-surface">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <StaggerReveal className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" step={25}>
          {items.map((item) => (
            <div
              key={`${section.sectionKey}-${item.id}`}
              className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <span className="text-sm font-semibold leading-7 text-ink">{item.title}</span>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function FaqSection({ section }: { section: PublicCmsSection }) {
  const items = getSectionItems(section, "faq");

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={section.sectionKey} className="section">
      <div className="site-container">
        <SectionIntro
          eyebrow={section.subheading}
          title={section.heading}
          description={section.description}
          centered
        />

        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={`${section.sectionKey}-${item.title}-${index}`}
                value={`${section.sectionKey}-${index}`}
                className="overflow-hidden rounded-[1.35rem] border border-border bg-white px-5 shadow-card"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {section.buttonText || section.settings?.secondaryButtonText ? (
          <ScrollReveal className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-border bg-white p-6 text-center shadow-float sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              {(getSetting(section, "secondaryHeading", "") as string) || "Need help?"}
            </div>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
              {(getSetting(section, "secondaryDescription", "") as string) ||
                "Use the links below to keep moving through the right part of the site."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {section.buttonText ? (
                <ActionLink href={section.buttonLink} className="btn-primary justify-center">
                  {section.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              ) : null}
              {typeof section.settings?.secondaryButtonText === "string" ? (
                <ActionLink
                  href={(section.settings?.secondaryButtonLink as string | undefined) ?? "#"}
                  className="btn-outline justify-center"
                >
                  {section.settings.secondaryButtonText}
                </ActionLink>
              ) : null}
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}

function CtaSection({ section }: { section: PublicCmsSection }) {
  return (
    <section id={section.sectionKey} className="hero-gradient py-14 sm:py-16 lg:py-20">
      <div className="site-container">
        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              {section.subheading ? (
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {section.subheading}
                </div>
              ) : null}
              {section.heading ? (
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {section.heading}
                </h2>
              ) : null}
              {section.description ? (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-soft sm:text-base">
                  {section.description}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {section.buttonText ? (
                <ActionLink href={section.buttonLink} className="btn-primary">
                  {section.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              ) : null}
              {typeof section.settings?.secondaryButtonText === "string" ? (
                <ActionLink
                  href={(section.settings?.secondaryButtonLink as string | undefined) ?? "#"}
                  className="btn-outline"
                >
                  {section.settings.secondaryButtonText}
                </ActionLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionRenderer({ section }: { section: PublicCmsSection }) {
  switch (section.sectionType) {
    case PRICING_FEATURE_SECTION_TYPE:
      return (
        <section id={section.sectionKey} className="section bg-surface">
          <div className="site-container">
            <PricingFeatureComparisonSection section={section} />
          </div>
        </section>
      );
    case "content_split":
      return <ContentSplitSection section={section} />;
    case "icon_cards":
      return <IconCardsSection section={section} />;
    case "timeline":
      return <TimelineSection section={section} />;
    case "comparison_table":
      return <ComparisonTableSection section={section} />;
    case "checklist":
      return <ChecklistSection section={section} />;
    case "faq":
      return <FaqSection section={section} />;
    case "cta_banner":
      return <CtaSection section={section} />;
    default:
      return null;
  }
}

function HeroSection({ section }: { section: PublicCmsSection | null | undefined }) {
  if (!section) {
    return null;
  }

  const badgeText =
    (getSetting(section, "badgeText", "") as string) || section.subheading || "CMS Page";
  const heroBullets = getStringList(section.settings?.heroBullets);
  const secondaryHeading = getSetting(section, "secondaryHeading", "") as string;
  const secondaryDescription = getSetting(section, "secondaryDescription", "") as string;
  const secondaryDescriptionTwo = getSetting(section, "secondaryDescriptionTwo", "") as string;
  const featureBullets = getStringList(section.settings?.features);
  const items = getSectionItems(section);
  const hasRightPanel =
    !!secondaryHeading || !!secondaryDescription || featureBullets.length > 0 || items.length > 0;

  return (
    <section className="hero-gradient relative overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-16 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
      <div className="site-container">
        <div
          className={cn(
            "grid gap-10",
            hasRightPanel && "lg:grid-cols-[1.02fr_0.98fr] lg:items-start",
          )}
        >
          <ScrollReveal variant="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              {badgeText}
            </div>
            {section.heading ? (
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {section.heading}
              </h1>
            ) : null}
            {section.description ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-ink-soft sm:text-lg">
                {section.description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {section.buttonText ? (
                <ActionLink href={section.buttonLink} className="btn-primary">
                  {section.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </ActionLink>
              ) : null}
              {typeof section.settings?.secondaryButtonText === "string" ? (
                <ActionLink
                  href={(section.settings?.secondaryButtonLink as string | undefined) ?? "#"}
                  className="btn-outline"
                >
                  {section.settings.secondaryButtonText}
                </ActionLink>
              ) : null}
            </div>

            {heroBullets.length > 0 ? (
              <div className="mt-7 space-y-3">
                {heroBullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-7 text-ink">{bullet}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </ScrollReveal>

          {hasRightPanel ? (
            <ScrollReveal variant="fade-left" delay={80} className="soft-card p-6 sm:p-7">
              {secondaryHeading ? (
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {secondaryHeading}
                </div>
              ) : null}
              {secondaryDescription ? (
                <p className="mt-3 text-sm leading-7 text-ink-soft">{secondaryDescription}</p>
              ) : null}
              {secondaryDescriptionTwo ? (
                <p className="mt-3 text-sm leading-7 text-ink-soft">{secondaryDescriptionTwo}</p>
              ) : null}

              {featureBullets.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {featureBullets.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm leading-6 text-ink">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {items.length > 0 ? (
                <div className={cn("mt-5 grid gap-3", items.length > 2 ? "sm:grid-cols-2" : "")}>
                  {items.map((item) => {
                    const Icon = getIcon(item.icon);

                    return (
                      <div
                        key={`${section.sectionKey}-${item.title}`}
                        className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                          <Icon className="h-4 w-4" />
                          {item.title}
                        </div>
                        {item.subtitle ? (
                          <div className="mt-2 text-base font-bold text-ink">{item.subtitle}</div>
                        ) : null}
                        {item.description ? (
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function ManagedCmsShowcasePage({
  pageKey,
  canonicalPath,
  navbarVariant = "default",
  fallbackTitle,
  fallbackDescription,
}: ManagedCmsShowcasePageProps) {
  const seedContent = useMemo(() => getSeedPageFallback(pageKey), [pageKey]);
  const {
    data: remoteContent,
    error,
    loading,
  } = usePublicContent(() => fetchPageByKey(pageKey), [pageKey], seedContent);
  const heroSection =
    remoteContent?.sections.find((section) => section.sectionType === "hero") ?? null;
  const bodySections =
    remoteContent?.sections.filter((section) => section.sectionType !== "hero") ?? [];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={remoteContent?.metaTitle ?? fallbackTitle}
        description={remoteContent?.metaDescription ?? fallbackDescription}
        canonicalPath={remoteContent?.canonicalUrl ?? canonicalPath}
        image={remoteContent?.ogImage ?? undefined}
        imageAlt={remoteContent?.ogImageAlt ?? undefined}
        ogTitle={remoteContent?.ogTitle ?? remoteContent?.metaTitle ?? fallbackTitle}
        ogDescription={
          remoteContent?.ogDescription ?? remoteContent?.metaDescription ?? fallbackDescription
        }
      />
      <PageChrome variant={navbarVariant} />

      <main>
        <HeroSection section={heroSection} />

        {loading ? (
          <section className="section">
            <div className="site-container">
              <div className="rounded-[2rem] border border-border bg-white p-8 text-center text-sm text-ink-soft shadow-float">
                Loading page content...
              </div>
            </div>
          </section>
        ) : null}

        {!loading && error ? (
          <section className="section">
            <div className="site-container">
              <div className="rounded-[2rem] border border-border bg-white p-8 text-center shadow-float">
                <h2 className="text-2xl font-black tracking-tight text-ink">
                  Unable to load this page
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{error}</p>
              </div>
            </div>
          </section>
        ) : null}

        {!loading && !error
          ? bodySections.map((section) => (
              <SectionRenderer key={`${pageKey}-${section.id}`} section={section} />
            ))
          : null}
      </main>

      <Footer />
    </div>
  );
}
