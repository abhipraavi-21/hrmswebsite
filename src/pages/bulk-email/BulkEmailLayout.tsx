import PageSEO from "@/components/site/PageSEO";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import type { BulkEmailPageConfig } from "./bulkEmailData";

export function BulkEmailLayout({ page }: { page: BulkEmailPageConfig }) {
  return (
    <div className="bulk-email-theme min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]">
      <PageSEO
        title={page.pageTitle}
        description={page.description}
        canonicalPath={page.canonicalPath}
      />
      <BulkEmailNavbar />

      <main className="hero-gradient">
        <section className="section py-16 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-white p-6 shadow-card sm:p-8">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                {page.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {page.title}
              </h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
