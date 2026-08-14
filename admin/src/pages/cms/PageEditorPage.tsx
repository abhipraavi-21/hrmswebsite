import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageEditor } from "../../components/editor/PageEditor";
import { getBlogAdminRoute, getBlogGroupFromPageKey } from "../../data/blogGroups";
import { getManagedPagePresentation, isLiveFrontendCmsPage } from "../../data/managedCmsPages";
import { pageService } from "../../services/cmsService";
import type { CmsPage, CmsPageSummary } from "../../types/cms";

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

  return "Unable to load this page right now.";
}

export function PageEditorPage() {
  const { pageKey } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const blogGroup = getBlogGroupFromPageKey(page?.pageKey);

  const applyPresentation = (loadedPage: CmsPage, pageSummary?: CmsPageSummary | null) => {
    const presentation =
      getManagedPagePresentation(loadedPage.pageKey) ??
      getManagedPagePresentation(pageSummary?.pageKey ?? "") ??
      null;

    if (!presentation) {
      return loadedPage;
    }

    return {
      ...loadedPage,
      pageName: presentation.pageName,
      slug: presentation.slug,
    };
  };

  const reload = async () => {
    if (!pageKey) {
      setPage(null);
      setLoadError("Page key is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      const loadedPage = await pageService.get(pageKey);
      setPage(applyPresentation(loadedPage));
    } catch (error) {
      if (!/^\d+$/.test(pageKey)) {
        try {
          const pages = await pageService.list();
          const matchedPage = pages.find((entry) => entry.pageKey === pageKey) ?? null;

          if (matchedPage?.id && matchedPage.id > 0) {
            const loadedPage = await pageService.get(matchedPage.id);
            setPage(applyPresentation(loadedPage, matchedPage));

            if (pageKey !== String(matchedPage.id)) {
              navigate(`/pages/${matchedPage.id}`, { replace: true });
            }

            return;
          }
        } catch {
          // Keep the original page-loading error if the fallback lookup also fails.
        }
      }

      setPage(null);
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, [pageKey, navigate]);

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading page editor...</div>;
  }

  if (loadError || !page) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
          Page Loading Issue
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">This page editor could not be opened</h1>
        <p className="mt-3 text-sm text-slate-600">{loadError ?? "The page content was not returned by the API."}</p>
        <p className="mt-2 text-sm text-slate-500">
          If this page was added recently, restart the backend once so the new managed page keys are available in the admin API.
        </p>
        <button type="button" onClick={() => void reload()} className="btn-primary mt-5">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">CMS Page</div>
            <h1 className="mt-2 text-3xl font-semibold">{page.pageName}</h1>
            <p className="mt-2 text-sm text-slate-500">{page.slug}</p>
          </div>
          {blogGroup ? (
            <Link to={getBlogAdminRoute(blogGroup)} className="btn-secondary">
              Manage Blog Posts
            </Link>
          ) : null}
        </div>
      </section>
      {!blogGroup && !isLiveFrontendCmsPage(page.pageKey) ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-700">
            Frontend Not Fully Linked Yet
          </div>
          <p className="mt-2">
            This page still uses a hardcoded frontend layout in parts, so admin edits may not match
            every visible block on the website yet.
          </p>
        </section>
      ) : null}
      <PageEditor page={page} onReload={reload} />
    </div>
  );
}
