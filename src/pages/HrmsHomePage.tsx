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
import { ROUTES } from "@/routes/routeConfig.js";

export default function HrmsHomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Altroz HRMS | HR, Payroll and Attendance Platform"
        description="Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform."
        canonicalPath="/hrms"
      />
      <TopNavbar />
      <MainNavbar />
      <main>
        <Hero />
        <CustomerLogos />
        <ProductCards />
        <Features />
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-x">
            <div className="grid gap-8 rounded-[2rem] border border-border bg-white p-8 shadow-float lg:grid-cols-[1.08fr_0.92fr] lg:items-center md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-sm font-extrabold text-primary">
                  <Sparkles className="h-4 w-4" />
                  ROI calculator
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  See how much your HR team can save
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Estimate the time, operational cost and administrative effort your organisation can save by automating attendance, payroll, leave, employee management and reporting.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Instant results", "No signup required", "Indian Rupee estimates"].map((item) => (
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
                  <Link to={ROUTES.roiCalculator} className="btn-primary">
                    Calculate My Savings
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book a demo
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Monthly hours saved", value: "Live estimate", icon: <Clock3 className="h-5 w-5" /> },
                  { label: "Annual savings", value: "Net Year 1 view", icon: <TrendingUp className="h-5 w-5" /> },
                  { label: "Payback period", value: "Months to recover", icon: <Calculator className="h-5 w-5" /> },
                  { label: "FTE recovered", value: "Capacity equivalent", icon: <Users className="h-5 w-5" /> },
                ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-primary">{item.label}</div>
                    <div className="mt-1 text-lg font-black text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <DashboardShowcase />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
