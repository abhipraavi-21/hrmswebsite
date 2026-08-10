import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resourcesService } from "../../services/cmsService";
import type { ResourceSummary } from "../../types/cms";

export function ResourcesPage() {
  const [resources, setResources] = useState<ResourceSummary[]>([]);

  useEffect(() => {
    void resourcesService.list().then(setResources);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Resources</div>
        <h1 className="mt-2 text-3xl font-semibold">Resource subpages</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{resource.slug}</div>
            <h2 className="mt-2 text-2xl font-semibold">{resource.resourceName}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{resource.shortDescription}</p>
            <Link className="btn-primary mt-5" to={`/pages/${resource.page?.id}`}>
              Open Editor
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
