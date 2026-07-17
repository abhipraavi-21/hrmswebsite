import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";

type CompanyDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  highlights: string[];
  sections: {
    title: string;
    desc: string;
  }[];
  visual?: ReactNode;
  primaryAction?: {
    label: string;
    href: string;
  };
};

export default function CompanyDetailPage({
  eyebrow,
  title,
  description,
  icon,
  highlights,
  sections,
  visual,
  primaryAction = { label: "Book demo", href: "/company/book-demo" },
}: CompanyDetailPageProps) {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={title} description={description} canonicalPath={canonicalPath} />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient">
          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                {eyebrow}
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">{description}</p>

              <div className="button-group mt-6">
                <a href={primaryAction.href} className="btn-primary">
                  {primaryAction.label}
                </a>
                <a href="/" className="btn-outline">
                  Back to home
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[2rem] border border-border bg-white p-5 shadow-float">
                {visual ? (
                  <>{visual}</>
                ) : (
                  <div className="grid gap-4">
                    <div className="rounded-[1.75rem] border border-border bg-primary-soft/25 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            {eyebrow}
                          </div>
                          <div className="mt-2 text-2xl font-bold text-ink">{title}</div>
                          <p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p>
                        </div>
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-sm">
                          {icon}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {highlights.map((item, index) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-xl bg-white/80 p-3 shadow-sm"
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm text-ink">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        "Fast response",
                        "Tailored next steps",
                        "Simple rollout planning",
                      ].map((item) => (
                        <div key={item} className="soft-card p-4">
                          <div className="text-xs font-bold uppercase tracking-wider text-primary">
                            {item}
                          </div>
                          <div className="mt-1 text-sm font-medium text-ink-soft">
                            Built to keep this page feeling complete.
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Details
              </span>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                Everything visitors need to understand the next step
              </h2>
            </ScrollReveal>

            <StaggerReveal step={80} className="card-grid mt-8 md:grid-cols-3">
              {sections.map((section) => (
                <article key={section.title} className="content-card soft-card">
                  <h3 className="text-lg font-bold text-ink">{section.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{section.desc}</p>
                </article>
              ))}
            </StaggerReveal>

            <ScrollReveal variant="fade-up" delay={120}>
              <a
                href="/company/contact-us"
                className="card-action mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
