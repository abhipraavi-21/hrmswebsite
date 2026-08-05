import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import PageSEO from "@/components/site/PageSEO";

type BulkEmailBlankPageProps = {
  pageTitle: string;
  canonicalPath: string;
  title: string;
};

export default function BulkEmailBlankPage({
  pageTitle,
  canonicalPath,
  title,
}: BulkEmailBlankPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={pageTitle}
        description={`${title} for Altroz Bulk Email.`}
        canonicalPath={canonicalPath}
      />
      <BulkEmailNavbar />

      <main className="section py-16 sm:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-border bg-white p-6 shadow-card sm:p-8">
            <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
              Bulk Email
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
