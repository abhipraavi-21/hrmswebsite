import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";

type ResourceDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  highlights: string[];
  cards: {
    title: string;
    desc: string;
  }[];
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
};

export default function ResourceDetailPage({
  eyebrow,
  title,
  description,
  icon,
  highlights,
  cards,
  primaryAction,
  secondaryAction,
}: ResourceDetailPageProps) {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={title} description={description} canonicalPath={canonicalPath} />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <ScrollReveal variant="fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  {eyebrow}
                </span>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={100}>
                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  {title}
                </h1>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={180}>
                <p className="mt-4 max-w-xl text-base text-ink-soft">{description}</p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={260}>
                <div className="button-group mt-6">
                  <a href={primaryAction.href} className="btn-primary">
                    {primaryAction.label}
                  </a>
                  <a href={secondaryAction.href} className="btn-outline">
                    {secondaryAction.label}
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="fade-left" delay={320} className="lg:col-span-6">
              <div className="relative mx-auto max-w-xl rounded-[2rem] border border-border bg-white p-5 shadow-float">
                <div className="soft-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        Resource center
                      </div>
                      <div className="mt-2 text-2xl font-bold text-ink">
                        Practical help for stronger HR operations
                      </div>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                      {icon}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-surface p-3">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <ScrollReveal variant="fade-up" className="section-heading text-left">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Explore
              </span>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">
                Resources built for clear next steps
              </h2>
            </ScrollReveal>

            <StaggerReveal step={80} className="card-grid mt-8 md:grid-cols-3">
              {cards.map((card) => (
                <article key={card.title} className="content-card soft-card">
                  <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                </article>
              ))}
            </StaggerReveal>

            <ScrollReveal variant="fade-up" delay={120}>
              <a
                href={secondaryAction.href}
                className="card-action mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
              >
                {secondaryAction.label} <ArrowRight className="h-4 w-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
