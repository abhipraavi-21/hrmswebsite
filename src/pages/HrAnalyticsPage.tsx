import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Globe,
  PieChart,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { modelScreenshots } from "@/lib/modelScreenshots";

type StatCard = {
  label: string;
  value: string;
};

type IconCard = {
  title: string;
  desc: string;
  icon: ReactNode;
};

type FeatureCard = IconCard;

type FaqItem = {
  q: string;
  a: string;
};

const heroStats: StatCard[] = [
  {
    label: "Employee Reports",
    value: "View complete employee details, department records and joining information in one place.",
  },
  {
    label: "Workforce Overview",
    value: "Get a clear picture of employee strength across departments and branches.",
  },
  {
    label: "Export Reports",
    value: "Download employee reports in Excel or PDF format whenever you need them.",
  },
];

const whatIsHighlights = [
  {
    title: "Centralised platform",
    desc: "View employee data from one structured place instead of scattered spreadsheets or physical files.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Instant search",
    desc: "Search specific employee details quickly and keep records easy to access.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Department, branch and designation views",
    desc: "Generate reports by department, branch, designation or joining date when you need them.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Export or print anytime",
    desc: "Keep employee data ready to search, filter, export or print without manual effort.",
    icon: <Download className="h-5 w-5" />,
  },
];

const whyMattersCards: IconCard[] = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Better Employee Visibility",
    desc: "See complete employee information at a glance, without digging through files.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Organised HR Records",
    desc: "Keep all employee data structured and easy to access.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Department Insights",
    desc: "Understand employee distribution across every department.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Workforce Planning",
    desc: "Use accurate employee data to plan department and branch requirements.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Employee Search",
    desc: "Find any employee's details within seconds using search and filters.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Centralised Data",
    desc: "Store all employee information on one secure, unified platform.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Branch Visibility",
    desc: "Track employee records across every branch location.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Better HR Decisions",
    desc: "Rely on accurate, updated data for everyday HR decisions.",
  },
];

const analyticsFeatures: FeatureCard[] = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Employee Reports",
    desc: "Access complete employee details, including personal and employment information.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Employee Search",
    desc: "Quickly find employees using name, ID or other basic details.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Department Reports",
    desc: "View employee records organised by department.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Branch Reports",
    desc: "Get employee data segmented by branch location.",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "Designation Reports",
    desc: "Access employee records grouped by designation.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Employee Directory",
    desc: "Maintain a centralised list of all employees in your organisation.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Attendance Reports",
    desc: "View employee attendance records in an organised, easy-to-read format.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Leave Reports",
    desc: "Access employee leave records whenever needed.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Export Excel",
    desc: "Download employee reports in Excel format for further use.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    title: "Export PDF",
    desc: "Save employee reports as PDF files for sharing or record-keeping.",
  },
  {
    icon: <Printer className="h-5 w-5" />,
    title: "Printable Reports",
    desc: "Print employee reports directly from the system.",
  },
  {
    icon: <PieChart className="h-5 w-5" />,
    title: "Advanced Search Filters",
    desc: "Narrow down employee records using multiple filter options.",
  },
];

const reportDashboardItems = [
  "Employee Reports",
  "Department Reports",
  "Branch Reports",
  "Attendance Reports",
  "Leave Reports",
  "Search & Filters",
  "Excel Export",
  "PDF Export",
  "Print Option",
];

const benefitCards: IconCard[] = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "Reduce Manual Work",
    desc: "Spend less time compiling employee data manually.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Better HR Visibility",
    desc: "Get a clear, organised view of your entire workforce.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Faster Employee Search",
    desc: "Locate employee details in seconds, not hours.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Organised Workforce Data",
    desc: "Keep employee records structured and easy to manage.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Easy Report Export",
    desc: "Download reports in Excel or PDF whenever required.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Centralised Employee Records",
    desc: "Access all employee information from one platform.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Quick HR Decisions",
    desc: "Base everyday HR decisions on accurate, readily available data.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Improved Workforce Management",
    desc: "Manage departments and branches with better data visibility.",
  },
];

const whyChoosePoints = [
  "Organised employee data and reports",
  "Department-wise, branch-wise and designation-wise records",
  "Excel, PDF and print export options",
  "Search and filter controls for faster retrieval",
  "Practical dashboards for daily HR decisions",
];

const faqItems: FaqItem[] = [
  {
    q: "What is HR Analytics Software?",
    a: "HR Analytics Software is a system that helps HR teams organise, access and manage employee data through structured reports, instead of relying on scattered spreadsheets or files.",
  },
  {
    q: "How does HR Analytics help HR teams?",
    a: "It gives HR teams centralised access to employee information, making it easier to search records and generate department-wise, branch-wise or designation-wise reports.",
  },
  {
    q: "Can I export employee reports?",
    a: "Yes. Altroz HRMS allows you to export employee reports in both Excel and PDF formats.",
  },
  {
    q: "Can I search employee information?",
    a: "Yes. You can search for employee details instantly using the employee search feature.",
  },
  {
    q: "Can I filter employee records?",
    a: "Yes. Altroz HRMS provides search and filter options so you can narrow down employee records by department, branch, designation and more.",
  },
  {
    q: "Does Altroz provide employee reports?",
    a: "Yes. Altroz HRMS offers detailed employee reports, including department-wise, branch-wise and designation-wise records.",
  },
  {
    q: "Can I export reports to Excel?",
    a: "Yes. All employee reports in Altroz HRMS can be exported to Excel format.",
  },
  {
    q: "Can I print HR reports?",
    a: "Yes. Reports generated in Altroz HRMS can be printed directly from the system.",
  },
  {
    q: "Why are HR reports important?",
    a: "HR reports help teams stay organised, make informed decisions and maintain accurate employee records without manual effort.",
  },
  {
    q: "Who should use HR Analytics Software?",
    a: "Any business that wants to keep employee data organised, accessible and easy to manage can benefit from HR Analytics Software, regardless of company size.",
  },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector('meta[name="description"]');
    const previousDescription = existingMeta?.getAttribute("content");
    let metaTag = existingMeta as HTMLMetaElement | null;

    document.title = title;

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }

    metaTag.content = description;

    return () => {
      document.title = previousTitle;

      if (metaTag) {
        if (previousDescription !== null && previousDescription !== undefined) {
          metaTag.content = previousDescription;
        } else {
          metaTag.remove();
        }
      }
    };
  }, [title, description]);
}

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className={center ? "mx-auto mt-3 max-w-2xl text-ink-soft" : "mt-3 text-ink-soft"}>
        {description}
      </p>
    </div>
  );
}

function IconTile({ title, desc, icon }: IconCard) {
  return (
    <article className="soft-card h-full p-5">
      <div className="flex h-full gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-6 text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
        </div>
      </div>
    </article>
  );
}

function FeatureTile({ title, desc, icon }: FeatureCard) {
  return (
    <article className="soft-card h-full p-5">
      <div className="flex h-full gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-6 text-ink">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
        </div>
      </div>
    </article>
  );
}

function FaqItemCard({ q, a }: FaqItem) {
  return (
    <AccordionItem key={q} value={q} className="rounded-2xl border border-border bg-white px-4">
      <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
        {q}
      </AccordionTrigger>
      <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">{a}</AccordionContent>
    </AccordionItem>
  );
}

export default function HrAnalyticsPage() {
  usePageMeta(
    "HR Reports & Analytics | Altroz HRMS",
    "See complete employee visibility with Altroz HRMS HR Analytics. View employee reports, department records, branch data, exports, dashboards, and more from one central platform.",
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />
          <div className="pointer-events-none absolute right-1/3 top-1/4 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

          <div className="container-x py-3 lg:py-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <ScrollReveal variant="fade-up" className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  HR Reports & Analytics
                </span>

                <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                  HR Analytics Software for Complete Employee Visibility
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Get organised, accurate and easy-to-access employee data with Altroz HRMS. Our
                  HR Analytics Software brings employee reports, department records and workforce
                  information together on one simple dashboard.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href="#reports-dashboard" className="btn-outline">
                    Explore HR Reports
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6">
                <div className="soft-card overflow-hidden p-4 md:p-5">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white">
                    <img
                      src={modelScreenshots.employeeReport}
                      alt="HR analytics dashboard preview"
                      className="block h-auto w-full bg-white object-contain"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <article key={stat.label} className="soft-card h-full p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-primary">
                          {stat.label}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{stat.value}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-7">
              <SectionHeading
                eyebrow="HR analytics basics"
                title="What is HR Analytics Software?"
                description="Understand how centralised employee data and reports help HR teams make better, faster decisions."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify hyphens-auto text-ink-soft">
                <p>
                  HR Analytics Software is a system that helps HR teams organise, access and
                  understand employee information in a structured way. Instead of searching
                  through scattered spreadsheets or physical files, HR teams can view all
                  employee data from a single, centralised platform.
                </p>
                <p>
                  For any growing business, employee data keeps increasing every day - new joiners,
                  department changes, branch transfers and leave records. Without a proper system,
                  this information becomes difficult to track and manage.
                </p>
                <p>
                  This is where HR Analytics Software becomes valuable. It allows HR teams to
                  maintain accurate employee records, search for specific employee details
                  instantly, and generate reports based on department, branch, designation or
                  joining date.
                </p>
                <p>
                  Good employee data does more than sit in a database. It helps HR teams answer
                  everyday questions quickly - how many employees are in a department, which branch
                  has how many staff, when an employee joined, or who belongs to which employee
                  category.
                </p>
                <p>
                  Reports built on this data help HR managers make informed decisions. Instead of
                  relying on guesswork, HR teams can refer to actual, updated employee records
                  while planning department structures, tracking branch strength or preparing
                  information for management.
                </p>
                <p>
                  Centralised employee information also reduces manual effort. HR teams no longer
                  need to maintain separate files for different departments or branches. Everything
                  stays organised in one system, ready to be searched, filtered, exported or
                  printed whenever required.
                </p>
                <p>
                  For businesses of any size, having organised and accessible employee data is the
                  foundation of good HR management. Altroz HRMS is built to support exactly this
                  need - giving HR teams clean, centralised and easy-to-use employee reports.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-5">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Why this matters
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">Employee data in one place</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  A clear reporting layer helps HR, finance and leadership read the same numbers
                  without rebuilding them for every meeting.
                </p>

                <div className="mt-6 grid gap-3">
                  {whatIsHighlights.map((item) => (
                    <div key={item.title} className="soft-card flex items-start gap-3 p-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why it matters"
              title="Why HR Analytics Matters"
              description="Eight reasons organised employee data and reports make everyday HR work simpler."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {whyMattersCards.map((card) => (
                <IconTile key={card.title} title={card.title} desc={card.desc} icon={card.icon} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Module coverage"
              title="HR Analytics Features"
              description="Every feature listed below is available in Altroz HRMS today."
              center
            />

            <StaggerReveal step={50} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analyticsFeatures.map((feature) => (
                <FeatureTile key={feature.title} title={feature.title} desc={feature.desc} icon={feature.icon} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="reports-dashboard" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-5">
              <SectionHeading
                eyebrow="Reports & Dashboard"
                title="Find employee information quickly, and export or print it in the format you need."
                description="Finding employee information should not take up your HR team's time. With Altroz HRMS, HR teams can quickly locate employee details using search and filter options, without going through multiple files or spreadsheets."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify hyphens-auto text-ink-soft">
                <p>
                  The Employee Dashboard brings together employee reports, department records,
                  branch details and joining information on one screen.
                </p>
                <p>
                  Whether you need to check attendance, review leave records or pull up an
                  employee's basic details, everything is accessible from a single, organised
                  view.
                </p>
                <p>
                  Once you have the information you need, reports can be exported to Excel,
                  downloaded as PDF or printed directly - making it simple to share data with
                  management or maintain records for audits.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-7">
              <div className="soft-card overflow-hidden p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Employee Dashboard
                    </div>
                    <h3 className="mt-1 text-2xl font-bold text-ink">
                      On the Employee Dashboard, you can access:
                    </h3>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <PieChart className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {reportDashboardItems.map((item) => (
                    <div key={item} className="soft-card flex items-center gap-3 px-4 py-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      <span className="text-sm font-medium text-ink">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-primary/20 bg-primary-soft/40 p-4 text-sm leading-6 text-ink-soft">
                  Reports stay ready for sharing, management reviews and audits without extra
                  formatting work.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Business value"
              title="Benefits"
              description="What HR teams gain by moving to organised, centralised employee reporting."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <IconTile key={card.title} title={card.title} desc={card.desc} icon={card.icon} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why Altroz"
                title="Why Choose Altroz HR Analytics"
                description="A practical, dependable way to manage employee data - without unnecessary complexity."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify hyphens-auto text-ink-soft">
                <p>
                  Altroz HRMS is built around what HR teams actually need - organised, accessible
                  and accurate employee information.
                </p>
                <p>
                  Instead of overwhelming HR teams with unnecessary complexity, Altroz focuses on
                  making everyday HR reporting simple. You get complete employee reports,
                  department and branch-wise records, and easy search and filter options - all from
                  one centralised system.
                </p>
                <p>
                  Every report can be exported to Excel or PDF, or printed directly, making it easy
                  to share information with management, auditors or other departments.
                </p>
                <p>
                  Altroz HRMS is designed to keep your employee data organised as your business
                  grows. Whether you are managing a single office or multiple branches, you get a
                  clear, structured view of your workforce without extra effort.
                </p>
                <p>
                  For HR teams who want reliable employee data without unnecessary complexity,
                  Altroz HR Analytics is a practical, dependable choice.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-5">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Practical reporting
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Built for organised, accurate employee information
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  A focused analytics layer helps teams read the same numbers without rebuilding
                  them for every meeting.
                </p>

                <div className="mt-6 space-y-3">
                  {whyChoosePoints.map((item) => (
                    <div key={item} className="soft-card flex items-start gap-3 p-4">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <SectionHeading
                eyebrow="Questions"
                title="Frequently Asked Questions"
                description="Common questions about HR Analytics and HR Reports on Altroz HRMS."
                center
              />
            </ScrollReveal>

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <FaqItemCard key={item.q} q={item.q} a={item.a} />
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final step
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Bring Structure to Your Employee Data
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    See how Altroz HRMS simplifies employee reports, department records and data
                    export - all from one centralised platform.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href="/company/contact-us" className="btn-outline">
                    Request Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
