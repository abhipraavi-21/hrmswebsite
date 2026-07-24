import { ArrowRight, BarChart3, FileText, Mail, Repeat2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ROUTES } from "@/routes/routeConfig.js";

const sections = [
  {
    title: "Campaigns",
    description: "Send announcements, reminders, and HR updates at scale.",
    icon: Mail,
    href: ROUTES.bulkEmailCampaigns,
  },
  {
    title: "Templates",
    description: "Reuse approved layouts for faster communication.",
    icon: FileText,
    href: ROUTES.bulkEmailTemplates,
  },
  {
    title: "Contacts",
    description: "Organize employee lists for cleaner sends.",
    icon: Users,
    href: ROUTES.bulkEmailContacts,
  },
  {
    title: "Analytics",
    description: "Track opens and clicks after sending.",
    icon: BarChart3,
    href: ROUTES.bulkEmailAnalytics,
  },
  {
    title: "Automation",
    description: "Set repeatable workflows for recurring communication.",
    icon: Repeat2,
    href: ROUTES.bulkEmailAutomation,
  },
];

export default function BulkEmailPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Bulk Email | Altroz HRMS"
        description="Bulk email workspace for campaigns, templates, contacts, analytics, and automation."
        canonicalPath={ROUTES.bulkEmail}
      />
      <TopNavbar />

      <main className="hero-gradient">
        <section className="section pt-10">
          <div className="site-container">
            <div className="max-w-3xl">
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
                Bulk Email
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Choose a bulk email section
              </h1>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                Open each page separately so the content stays visible and easy to manage.
              </p>
            </div>
          </div>
        </section>

        <section className="section pt-0 pb-16">
          <div className="site-container">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sections.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-float"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-4 text-xl font-bold text-ink">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
