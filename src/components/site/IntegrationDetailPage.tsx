import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";

type Stat = {
  label: string;
  value: string;
};

type Capability = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type IntegrationDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  summaryTitle: string;
  summaryBody: string;
  stats: Stat[];
  capabilities: Capability[];
  points: string[];
  backHref: string;
  backLabel?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  footerTitle: string;
  footerBody: string;
};

export default function IntegrationDetailPage({
  eyebrow,
  title,
  description,
  summaryTitle,
  summaryBody,
  stats,
  capabilities,
  points,
  backHref,
  backLabel = "Back to pricing",
  primaryAction,
  secondaryAction,
  footerTitle,
  footerBody,
}: IntegrationDetailPageProps) {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={title} description={description} canonicalPath={canonicalPath} />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                {eyebrow}
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">{description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={primaryAction.href} className="btn-primary">
                  {primaryAction.label}
                </a>
                <a href={secondaryAction.href} className="btn-outline">
                  {secondaryAction.label}
                </a>
                <a href={backHref} className="btn-outline">
                  {backLabel}
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {stats.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative grid gap-4 rounded-[2rem] border border-border bg-white p-5 shadow-float sm:grid-cols-2">
                  <div className="soft-card p-5 sm:col-span-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          {summaryTitle}
                        </div>
                        <div className="mt-2 text-2xl font-bold text-ink">{summaryBody}</div>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          Typical flow
                        </div>
                        <div className="mt-1 text-sm font-semibold text-ink">
                          Connect once, automate the handoff, and keep data moving cleanly.
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <ArrowRight className="h-4 w-4" />
                        Ready to scale
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What it includes
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The pieces that keep the integration useful every day
              </h2>
              <p className="mt-3 text-ink-soft">
                The pages below keep the structure simple: a focused workflow, a few practical
                capabilities, and a clear next step back to the integrations hub.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((capability) => (
                <article key={capability.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {capability.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{capability.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{capability.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Common use cases
              </div>
              <div className="mt-2 text-2xl font-bold text-ink">
                Built for teams that need integrations to reduce manual work
              </div>
              <div className="mt-6 space-y-4">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Next step
              </div>
              <div className="mt-2 text-2xl font-bold text-ink">{footerTitle}</div>
              <p className="mt-3 text-sm text-ink-soft">{footerBody}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={primaryAction.href} className="btn-primary">
                  {primaryAction.label}
                </a>
                <a href={backHref} className="btn-outline">
                  {backLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
