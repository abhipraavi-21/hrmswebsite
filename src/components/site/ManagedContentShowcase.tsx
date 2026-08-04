import { CalendarDays, Clock3, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import type { ContentRecord } from "@/admin/types";
import { INTERNAL_ROUTE_SET, isInternalHref, normalizePath } from "@/routes/routeConfig.js";

type ManagedContentShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  records: ContentRecord[];
};

function canRenderLink(slug: string) {
  if (!isInternalHref(slug)) {
    return false;
  }

  return INTERNAL_ROUTE_SET.has(normalizePath(slug));
}

export default function ManagedContentShowcase({
  eyebrow,
  title,
  description,
  records,
}: ManagedContentShowcaseProps) {
  if (!records.length) {
    return null;
  }

  return (
    <section className="section">
      <div className="site-container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft">{description}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {records.map((record) => {
            const isLinkable = canRenderLink(record.slug);

            return (
              <article
                key={record.id}
                className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <span>{record.type}</span>
                  <span className="text-ink-soft/40">/</span>
                  <span>{record.status}</span>
                </div>

                <h3 className="mt-4 text-xl font-black tracking-tight text-ink">{record.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{record.summary}</p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-soft">
                  {record.publishedAt ? (
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {record.publishedAt}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {record.readingTime}
                  </span>
                </div>

                {record.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {record.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface/35 px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {isLinkable ? (
                  <div className="mt-6">
                    <Link
                      to={record.slug}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Open page
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
