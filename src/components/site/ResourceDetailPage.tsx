import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/site/Footer";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";

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
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
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
              </div>
            </div>

            <div className="lg:col-span-6">
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
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Explore
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Resources built for clear next steps
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {cards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                </article>
              ))}
            </div>

            <a
              href={secondaryAction.href}
              className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              {secondaryAction.label} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
