import { createElement } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Clock3, Sparkles, TrendingUp, Users } from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Hero from "@/components/site/Hero";
import CustomerLogos from "@/components/site/CustomerLogos";
import ProductCards from "@/components/site/ProductCards";
import Features from "@/components/site/Features";
import DashboardShowcase from "@/components/site/DashboardShowcase";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import { usePublicContent } from "@/hooks/usePublicContent";
import { ROUTES } from "@/routes/routeConfig.js";
import { getSection } from "@/services/cmsHelpers";
import { fetchHrmsPage } from "@/services/pageService";

const roiFallbackCards = [
  {
    id: 0,
    title: "Monthly hours saved",
    subtitle: "Live estimate",
    icon: "Clock3",
  },
  {
    id: 1,
    title: "Annual savings",
    subtitle: "Net Year 1 view",
    icon: "TrendingUp",
  },
  {
    id: 2,
    title: "Payback period",
    subtitle: "Months to recover",
    icon: "Calculator",
  },
  {
    id: 3,
    title: "FTE recovered",
    subtitle: "Capacity equivalent",
    icon: "Users",
  },
];

const roiIconMap = {
  Calculator,
  Clock3,
  TrendingUp,
  Users,
};

export default function HrmsHomePage() {
  const { data: remoteContent } = usePublicContent(fetchHrmsPage);
  const roiSection = getSection(remoteContent, "roi");
  const roiChips = (roiSection?.settings?.chips as string[] | undefined) ?? [
    "Instant results",
    "No signup required",
    "Indian Rupee estimates",
  ];
  const roiCards = roiSection?.items?.length ? roiSection.items : roiFallbackCards;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={remoteContent?.metaTitle ?? "Altroz HRMS | HR, Payroll and Attendance Platform"}
        description={
          remoteContent?.metaDescription ??
          "Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform."
        }
        canonicalPath="/hrms"
        image={remoteContent?.ogImage ?? undefined}
        imageAlt={remoteContent?.ogImageAlt ?? undefined}
        ogTitle={
          remoteContent?.ogTitle ??
          remoteContent?.metaTitle ??
          "Altroz HRMS | HR, Payroll and Attendance Platform"
        }
        ogDescription={
          remoteContent?.ogDescription ??
          remoteContent?.metaDescription ??
          "Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform."
        }
      />
      <TopNavbar />
      <MainNavbar />
      <main>
        <Hero section={getSection(remoteContent, "hero")} />
        <CustomerLogos section={getSection(remoteContent, "customer-logos")} />
        <ProductCards section={getSection(remoteContent, "platform-cards")} />
        <Features section={getSection(remoteContent, "feature-grid")} />

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="grid gap-8 rounded-[2rem] border border-border bg-white p-8 shadow-float lg:grid-cols-[1.08fr_0.92fr] lg:items-center md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-sm font-extrabold text-primary">
                  <Sparkles className="h-4 w-4" />
                  {roiSection?.subheading ?? "ROI calculator"}
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  {roiSection?.heading ?? "See how much your HR team can save"}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  {roiSection?.description ??
                    "Estimate the time, operational cost and administrative effort your organisation can save by automating attendance, payroll, leave, employee management and reporting."}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {roiChips.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-semibold text-ink"
                    >
                      <Calculator className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={roiSection?.buttonLink ?? ROUTES.roiCalculator} className="btn-primary">
                    {roiSection?.buttonText ?? "Calculate My Savings"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={
                      ((roiSection?.settings?.secondaryButtonLink as string | undefined) ??
                        ROUTES.bookDemo)
                    }
                    className="btn-outline"
                  >
                    {(roiSection?.settings?.secondaryButtonText as string | undefined) ??
                      "Book a demo"}
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {roiCards.map((item) => {
                  const Icon = roiIconMap[(item.icon as keyof typeof roiIconMap) ?? "Clock3"] ?? Clock3;

                  return (
                    <div key={item.id} className="soft-card p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {createElement(Icon, { className: "h-5 w-5" })}
                      </div>
                      <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        {item.title}
                      </div>
                      <div className="mt-1 text-lg font-black text-ink">{item.subtitle}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <DashboardShowcase section={getSection(remoteContent, "dashboard-showcase")} />
        <WhyChooseUs section={getSection(remoteContent, "why-switch")} />
        <CTA section={getSection(remoteContent, "final-cta")} />
      </main>
      <Footer />
    </div>
  );
}
