import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PageEditor } from "../../components/editor/PageEditor";
import { pageService } from "../../services/cmsService";
import type { CmsPage, CmsPageSummary } from "../../types/cms";

export function PageEditorPage() {
  const { pageKey } = useParams();
  const [pageList, setPageList] = useState<CmsPageSummary[]>([]);
  const [page, setPage] = useState<CmsPage | null>(null);

  const activePageId = useMemo(
    () => pageList.find((item) => item.pageKey === pageKey)?.id,
    [pageKey, pageList],
  );

  const reload = async () => {
    const pages = await pageService.list();
    setPageList(pages);

    const matchedPage = pages.find((item) => item.pageKey === pageKey);

    if (matchedPage) {
      setPage(await pageService.get(matchedPage.id));
    }
  };

  useEffect(() => {
    void reload();
  }, [pageKey]);

  if (!activePageId || !page) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading page editor...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">CMS Page</div>
        <h1 className="mt-2 text-3xl font-semibold">{page.pageName}</h1>
        <p className="mt-2 text-sm text-slate-500">{page.slug}</p>
      </section>
      <PageEditor page={page} onReload={reload} />
    </div>
  );
}
