import { ArrowRight, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { cn } from "@/lib/utils";
import {
  bulkEmailTabs,
  type BulkEmailTabId,
  type BulkEmailPageConfig,
  type BulkEmailFeatureCard,
} from "./bulkEmailData";

export function BulkEmailLayout({ page }: { page: BulkEmailPageConfig }) {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={page.pageTitle}
        description={page.description}
        canonicalPath={page.canonicalPath}
      />
      <TopNavbar />
      <BulkEmailNavbar activeId={page.id} />

      <main className="hero-gradient">
        <section className="section pt-8 sm:pt-10">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Bulk Email Workspace
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">{page.description}</p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {page.overview.map((item) => (
                  <div
                    key={item.label}
                    className="soft-card h-full rounded-[1.35rem] p-4 shadow-card"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-ink-soft">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  What this page covers
                </div>
                <div className="mt-2 text-2xl font-bold tracking-tight text-ink">
                  {page.eyebrow}
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{page.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section pt-0">
          <div className="site-container">
            <div className="grid gap-5">
              <BulkEmailCardGrid cards={page.cards} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function BulkEmailCardGrid({ cards }: { cards: BulkEmailFeatureCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="group h-full rounded-[1.4rem] border border-border bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
            <card.icon className="h-5 w-5" />
          </span>
          <div className="mt-4 text-base font-semibold text-ink">{card.title}</div>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </article>
      ))}
    </div>
  );
}

function BulkEmailNavbar({ activeId }: { activeId: BulkEmailTabId }) {
  return (
    <div className="sticky top-16 z-40 hidden border-b border-border bg-primary-soft/70 backdrop-blur-md transition-shadow duration-300 lg:block">
      <div className="site-container grid grid-cols-1 gap-2 py-2 transition-[height,padding] duration-300 lg:h-12 lg:items-center lg:py-0">
        <nav className="flex flex-wrap items-center gap-1 overflow-visible lg:mx-auto">
          {bulkEmailTabs.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "nav-link rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
                  isActive || activeId === item.id
                    ? "bg-white/70 text-primary"
                    : "text-ink hover:bg-white/70 hover:text-primary",
                )
              }
              aria-current={activeId === item.id ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
