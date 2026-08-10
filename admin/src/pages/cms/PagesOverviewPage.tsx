import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, FolderOpen } from "lucide-react";
import { LivePageButton } from "../../components/LivePageButton";
import { getBlogAdminRoute, getBlogGroupFromPageKey } from "../../data/blogGroups";
import { isLiveFrontendCmsPage, mergeManagedPages } from "../../data/managedCmsPages";
import { pageService } from "../../services/cmsService";
import type { CmsPageSummary } from "../../types/cms";
import { getPublicSitePageUrl } from "../../utils/publicSite";

function getErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to load the managed pages right now.";
}

export function PagesOverviewPage() {
  const [pages, setPages] = useState<CmsPageSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPages = async () => {
      try {
        const data = await pageService.list();

        if (!cancelled) {
          setPages(data);
          setLoadError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(getErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadPages();

    return () => {
      cancelled = true;
    };
  }, []);

  const { groups: mergedGroups, otherPages: mergedOtherPages } = mergeManagedPages(pages);
  const totalPageCount =
    mergedGroups.reduce((count, group) => count + group.pages.length, 0) + mergedOtherPages.length;
  const groups = mergedGroups
    .map((group) => ({
      ...group,
      pages: group.pages.filter(
        (page) => !getBlogGroupFromPageKey(page.pageKey) && isLiveFrontendCmsPage(page.pageKey),
      ),
    }))
    .filter((group) => group.pages.length > 0);
  const otherPages = mergedOtherPages.filter(
    (page) => !getBlogGroupFromPageKey(page.pageKey) && isLiveFrontendCmsPage(page.pageKey),
  );
  const visiblePageCount =
    groups.reduce((count, group) => count + group.pages.length, 0) + otherPages.length;
  const hiddenPageCount = Math.max(totalPageCount - visiblePageCount, 0);
  const unavailableCount = groups.flatMap((group) => group.pages).filter((page) => page.id < 0).length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Content Pages
        </div>
        <h1 className="mt-2 text-3xl font-semibold">Choose a page to edit</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Only pages that are already connected to the live frontend are shown here, so every save
          updates the website content you actually see.
        </p>
      </section>

      {hiddenPageCount ? (
        <section className="rounded-3xl border border-sky-200 bg-sky-50/70 p-6 text-sm text-sky-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-700">
            Live Connected Pages Only
          </div>
          <p className="mt-2">
            {hiddenPageCount} page{hiddenPageCount === 1 ? " is" : "s are"} hidden from this list
            because those frontend screens still use hardcoded layouts and would not update
            correctly from admin yet.
          </p>
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 text-sm text-amber-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Admin API Issue
          </div>
          <p className="mt-2">{loadError}</p>
          <p className="mt-2 text-amber-800/80">
            Placeholder pages may still appear below, but their editors will stay disabled until the backend is available again.
          </p>
        </section>
      ) : null}

      {!loadError && unavailableCount ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 text-sm text-amber-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Backend Restart Needed
          </div>
          <p className="mt-2">
            {unavailableCount} managed {unavailableCount === 1 ? "page is" : "pages are"} not available from the backend yet.
          </p>
          <p className="mt-2 text-amber-800/80">
            Restart the backend once so the latest managed page keys are loaded, then refresh this screen.
          </p>
        </section>
      ) : null}

      {isLoading ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
          Loading pages...
        </section>
      ) : null}

      {!isLoading && !pages.length ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-sm">
          No editable pages were found.
        </section>
      ) : null}

      {groups.map((group) => {
        return (
          <section key={group.title} className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                {group.title}
              </div>
              <p className="mt-2 text-sm text-slate-500">{group.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.pages.map((page) => (
                <PageCard key={page.pageKey} page={page} />
              ))}
            </div>
          </section>
        );
      })}

      {otherPages.length ? (
        <section className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
              Additional Frontend Pages
            </div>
            <p className="mt-2 text-sm text-slate-500">
              These live frontend pages already exist in the backend and can now be edited from the admin panel too.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherPages.map((page) => (
              <PageCard key={page.pageKey} page={page} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PageCard({ page }: { page: CmsPageSummary }) {
  const isAvailable = page.id > 0;
  const blogGroup = getBlogGroupFromPageKey(page.pageKey);
  const liveUrl = isLiveFrontendCmsPage(page.pageKey)
    ? getPublicSitePageUrl(page.pageKey, page.slug)
    : null;

  return (
    <article
      className={`rounded-3xl border bg-white p-6 shadow-sm ${
        isAvailable ? "border-slate-200" : "border-dashed border-amber-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-50 text-sky-600">
          {page.resourcePage ? <FolderOpen className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            !isAvailable
              ? "bg-amber-100 text-amber-800"
              : page.status === "published"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {isAvailable ? page.status : "unavailable"}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-slate-900">{page.pageName}</h2>
      <p className="mt-1 break-all text-sm text-slate-500">/{page.slug}</p>
      <p className="mt-4 text-sm text-slate-500">
        {page.resourcePage ? `Resource page: ${page.resourcePage.resourceName}` : "Main website page"}
      </p>

      {!isAvailable ? (
        <>
          <p className="mt-4 text-sm text-amber-800">
            This page key is not available from the backend yet. Restart the backend, then refresh this screen.
          </p>
          <span className="btn-secondary mt-5 cursor-not-allowed border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-100">
            Editor Unavailable
          </span>
        </>
      ) : (
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to={`/pages/${page.id}`} className="btn-primary">
            Open Editor
            <ExternalLink className="h-4 w-4" />
          </Link>
          <LivePageButton href={liveUrl} />
          {blogGroup ? (
            <Link to={getBlogAdminRoute(blogGroup)} className="btn-secondary">
              Manage Blog Posts
            </Link>
          ) : null}
        </div>
      )}
    </article>
  );
}
