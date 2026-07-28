import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChartColumn,
  ClipboardCheck,
  ClipboardList,
  Database,
  Building2,
  Factory,
  FileText,
  Fingerprint,
  Globe,
  HeartPulse,
  GraduationCap,
  Laptop,
  MapPinned,
  MessageSquareMore,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

type FeatureCard = {
  title: string;
  description: string;
  bullets: string[];
  icon: JSX.Element;
};

type WorkflowStep = {
  title: string;
  description: string;
};

type IndustryCard = {
  title: string;
  description: string;
  icon: JSX.Element;
};

type BenefitCard = {
  title: string;
  description: string;
};

type ReportItem = {
  title: string;
  description: string;
};

const heroStats = [
  { label: "Applications", value: "19 HR apps" },
  { label: "Data model", value: "1 employee record" },
  { label: "Access", value: "Mobile-ready" },
  { label: "Outcome", value: "One connected suite" },
];

const suiteCards: FeatureCard[] = [
  {
    title: "Employee Management",
    description:
      "Keep every employee record in one searchable system from onboarding to day-to-day admin.",
    bullets: [
      "Centralized employee database",
      "Departments, designations and reporting lines",
      "Foundation for every connected HR workflow",
    ],
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Attendance Management",
    description:
      "Track attendance across office, remote and field teams with data that flows into payroll.",
    bullets: [
      "Mobile attendance and multiple check-in methods",
      "Real-time visibility for HR and managers",
      "Automatic sync with leave and payroll",
    ],
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Shift Management",
    description:
      "Plan and assign shifts across departments and locations without manual scheduling effort.",
    bullets: [
      "Flexible shift patterns and rotations",
      "Reduced scheduling conflicts and coverage gaps",
      "Built for multi-location operations",
    ],
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Leave Management",
    description:
      "Handle leave policies, approvals and balances in one self-service workflow.",
    bullets: [
      "Configurable leave policies and types",
      "Automated approval flows for managers",
      "Leave balances update in real time",
    ],
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Payroll Management",
    description:
      "Process accurate payroll using verified attendance, leave and employee data.",
    bullets: [
      "Automated payroll processing each cycle",
      "Reduced manual salary calculation errors",
      "Clear payroll reports for HR and finance",
    ],
    icon: <ChartColumn className="h-5 w-5" />,
  },
  {
    title: "Recruitment Management",
    description:
      "Organise hiring from requisition to offer without scattered tracking sheets.",
    bullets: [
      "Track openings and candidate pipelines",
      "Structured interview stages and handoff",
      "Smooth move from candidate to employee",
    ],
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Performance Management",
    description:
      "Set goals, run review cycles and keep performance history tied to the employee record.",
    bullets: [
      "Goal setting and review workflows",
      "Manager and self-assessment support",
      "Transparent evaluation across teams",
    ],
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Asset Management",
    description:
      "Track laptops, devices, ID cards and more from allocation through return.",
    bullets: [
      "Assignment against employee profiles",
      "Condition and return tracking",
      "Cleaner asset recovery on exit",
    ],
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: "Employee Self Service",
    description:
      "Give employees direct access to their own HR information without waiting on HR.",
    bullets: [
      "Attendance, leave and payslip access",
      "Self-service requests and approvals",
      "Mobile app access for employees",
    ],
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Workforce Management",
    description:
      "Get one real-time view of the workforce across departments, shifts and locations.",
    bullets: [
      "Consolidated workforce visibility",
      "Planning support for multiple locations",
      "Attendance, shift and leave in one view",
    ],
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "HR Automation",
    description:
      "Automate repetitive approvals, notifications and record updates across HR workflows.",
    bullets: [
      "Automated approval workflows",
      "Fewer manual follow-ups and delays",
      "More time for higher-value HR work",
    ],
    icon: <Settings2 className="h-5 w-5" />,
  },
  {
    title: "HR Reports & Analytics",
    description:
      "Access centralized reports across attendance, leave, payroll, recruitment and performance.",
    bullets: [
      "Ready reports across core HR functions",
      "Real-time data instead of manual compilation",
      "Consistent reporting for leadership",
    ],
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Exit Management",
    description:
      "Manage resignations, clearances and final settlements in a structured workflow.",
    bullets: [
      "Clearance tracking across departments",
      "Links with asset recovery and documents",
      "Clean closed records for compliance",
    ],
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Document Generation",
    description:
      "Generate HR letters and certificates directly from employee data.",
    bullets: [
      "Offer letters, appointment letters and certificates",
      "Auto-generated documents from records",
      "Less manual drafting and copying",
    ],
    icon: <ClipboardCheck className="h-5 w-5" />,
  },
  {
    title: "Geo Tracking",
    description:
      "Track the location of field and on-ground employees during working hours.",
    bullets: [
      "Location visibility for field teams",
      "Works alongside mobile attendance",
      "Useful for logistics and service teams",
    ],
    icon: <MapPinned className="h-5 w-5" />,
  },
  {
    title: "Geo Fencing",
    description:
      "Restrict attendance to approved locations and improve attendance accuracy.",
    bullets: [
      "Defined attendance boundaries",
      "Prevents unauthorised check-ins",
      "Works with geo tracking and mobile attendance",
    ],
    icon: <Globe className="h-5 w-5" />,
  },
];

const lifecycleSteps: WorkflowStep[] = [
  {
    title: "Recruitment",
    description: "Job openings and candidate stages are tracked until an offer is made.",
  },
  {
    title: "Hiring",
    description: "Selected candidates become employee records ready for onboarding.",
  },
  {
    title: "Employee Records",
    description: "Employee Management keeps personal, job and compliance data in one place.",
  },
  {
    title: "Attendance",
    description: "Daily attendance is captured through mobile and geo-verified check-ins.",
  },
  {
    title: "Leave",
    description: "Employees apply, managers approve and balances update automatically.",
  },
  {
    title: "Payroll",
    description: "Verified attendance and leave feed directly into payroll each cycle.",
  },
  {
    title: "Performance",
    description: "Goals and review cycles keep performance structured and transparent.",
  },
  {
    title: "Assets",
    description: "Devices and company assets are recorded from issue to return.",
  },
  {
    title: "Employee Self Service",
    description: "Employees access payslips, balances and records directly.",
  },
  {
    title: "Exit Management",
    description: "Resignation, clearance and recovery follow a structured workflow.",
  },
  {
    title: "Document Generation",
    description: "Letters and certificates are generated from employee data.",
  },
  {
    title: "Reports & Analytics",
    description: "Leadership reviews centralized reports across the full lifecycle.",
  },
];

const industryCards: IndustryCard[] = [
  {
    title: "Manufacturing",
    description:
      "Shift management, attendance and payroll support large shop-floor teams across multiple shifts.",
    icon: <FactoryIcon className="h-5 w-5" />,
  },
  {
    title: "Healthcare",
    description:
      "Round-the-clock shift scheduling, attendance accuracy and compliance records keep teams staffed correctly.",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "IT & Software",
    description:
      "Employee self service, performance management and recruitment support fast-growing technical teams.",
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: "Construction",
    description:
      "Geo tracking, geo fencing and asset management help verify site attendance and equipment usage.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Retail",
    description:
      "Multi-location attendance and shift management coordinate store schedules and salary processing.",
    icon: <StoreIcon className="h-5 w-5" />,
  },
  {
    title: "Logistics",
    description:
      "Geo tracking and mobile attendance give visibility into field and delivery staff across routes.",
    icon: <MapPinned className="h-5 w-5" />,
  },
  {
    title: "Education",
    description:
      "Employee management, leave management and document generation support teaching and non-teaching staff.",
    icon: <GraduationIcon className="h-5 w-5" />,
  },
  {
    title: "Hospitality",
    description:
      "Shift management and employee self service support round-the-clock staffing and staff convenience.",
    icon: <Users className="h-5 w-5" />,
  },
];

const whyChooseBullets = [
  "Every HR application shares the same employee data.",
  "One record updates automatically as employees move through the lifecycle.",
  "Automated workflows replace manual handoffs between HR tasks.",
  "Structured records support audit-ready compliance.",
  "Manage offices, sites and field locations from one platform.",
  "Mobile access works for HR teams, managers and employees.",
  "Dashboards keep attendance, leave and workforce data current.",
  "Digital workflows reduce paperwork and repetitive admin.",
  "Controlled access keeps employee records secure.",
  "The platform scales as your business adds employees and locations.",
];

const dashboardReports: ReportItem[] = [
  {
    title: "Attendance Reports",
    description: "Daily, department-wise and location-wise attendance summaries.",
  },
  {
    title: "Leave Reports",
    description: "Leave balances, applications and approval status across teams.",
  },
  {
    title: "Payroll Reports",
    description: "Salary processing summaries and payslip records by cycle.",
  },
  {
    title: "Employee Reports",
    description: "Headcount, department distribution and employee summaries.",
  },
  {
    title: "Asset Reports",
    description: "Allocation, return status and inventory tracking by employee.",
  },
  {
    title: "Performance Reports",
    description: "Review cycle status and goal tracking summaries by team.",
  },
  {
    title: "Recruitment Reports",
    description: "Candidate pipeline status and hiring progress by role.",
  },
];

const businessBenefits: BenefitCard[] = [
  {
    title: "Save Time",
    description: "Automated workflows remove repetitive manual HR tasks.",
  },
  {
    title: "Reduce Manual Work",
    description: "Data entered once flows automatically across applications.",
  },
  {
    title: "Increase Productivity",
    description: "HR teams spend less time on admin and more on people.",
  },
  {
    title: "Better Employee Experience",
    description: "Employees get self-service access instead of waiting on HR.",
  },
  {
    title: "Faster Decision Making",
    description: "Real-time reports give leadership up-to-date workforce data.",
  },
  {
    title: "Improved Visibility",
    description: "One dashboard view across attendance, leave, payroll and performance.",
  },
  {
    title: "Organized HR Operations",
    description: "A structured system replaces scattered spreadsheets and tools.",
  },
  {
    title: "Better Compliance",
    description: "Centralized, accurate records support audit and statutory requirements.",
  },
];

const faqs = [
  {
    q: "What are HR Business Applications?",
    a: "They are the software modules that manage the complete employee lifecycle within one HR platform, such as attendance, leave, payroll, recruitment and performance.",
  },
  {
    q: "What HR applications does Altroz HR offer?",
    a: "Altroz HR offers Employee Management, Attendance Management, Shift Management, Leave Management, Payroll Management, Recruitment Management, Performance Management, Asset Management, Employee Self Service, Exit Management, Document Generation, HR Reports & Analytics, HR Automation, Workforce Management, Geo Tracking, Geo Fencing and more.",
  },
  {
    q: "Why should a business use one HR platform instead of separate tools?",
    a: "Separate tools create duplicate data entry, mismatched records and delayed approvals. One platform keeps employee data consistent from hiring to exit.",
  },
  {
    q: "Does Altroz HR support multi-location businesses?",
    a: "Yes. Workforce Management, Shift Management, Geo Tracking and Geo Fencing help manage multi-location and multi-shift teams.",
  },
  {
    q: "Can employees access their own HR information?",
    a: "Yes. Employee Self Service lets employees view attendance, leave balances, payslips and personal records directly.",
  },
  {
    q: "Is Altroz HR accessible on mobile?",
    a: "Yes. Teams, managers and employees can manage HR tasks on the move through the mobile HR app.",
  },
  {
    q: "How does Payroll Management connect with Attendance and Leave?",
    a: "Payroll Management pulls verified attendance and leave data automatically, reducing manual calculation and errors.",
  },
  {
    q: "What is Geo Fencing used for in HR?",
    a: "Geo Fencing defines approved work locations so employees can only mark attendance from those sites.",
  },
  {
    q: "Can Altroz HR generate HR documents automatically?",
    a: "Yes. Document Generation creates offer letters, appointment letters and certificates directly from employee data.",
  },
  {
    q: "Is Altroz HR suitable for growing businesses?",
    a: "Yes. The platform is built to scale as a business adds employees, departments and locations.",
  },
];

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
    <ScrollReveal
      variant="fade-up"
      className={`max-w-4xl ${center ? "mx-auto text-center" : ""}`.trim()}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft text-justify">{description}</p>
    </ScrollReveal>
  );
}

function FactoryIcon(props: JSX.IntrinsicElements["svg"]) {
  return <Factory className="h-5 w-5" {...props} />;
}

function StoreIcon(props: JSX.IntrinsicElements["svg"]) {
  return <StoreBuildingIcon {...props} />;
}

function GraduationIcon(props: JSX.IntrinsicElements["svg"]) {
  return <GraduationCapIcon {...props} />;
}

function BuildingIcon(props: JSX.IntrinsicElements["svg"]) {
  return <Factory className="h-5 w-5" {...props} />;
}

function StoreBuildingIcon(props: JSX.IntrinsicElements["svg"]) {
  return <Building2 className="h-5 w-5" {...props} />;
}

function GraduationCapIcon(props: JSX.IntrinsicElements["svg"]) {
  return <GraduationCap className="h-5 w-5" {...props} />;
}

function SuiteCard({ card }: { card: FeatureCard }) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {card.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-ink">{card.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft text-justify">{card.description}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-ink-soft">
            <CheckMark />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function CheckMark() {
  return <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />;
}

export default function BusinessAppsPage() {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="HR Business Applications | Altroz HR"
        description="Explore Altroz HR's complete suite of HR business applications for employee management, payroll, attendance, analytics and more."
        canonicalPath={canonicalPath}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                Altroz HR
              </span>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                One Platform. Every HR Application Your Business Needs.
              </h1>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <p className="max-w-2xl text-base leading-7 text-ink-soft text-justify sm:text-lg">
                  Altroz HR brings every HR business application onto a single connected platform.
                  No scattered tools, no duplicate data entry, and no broken handoffs between
                  teams. It keeps one employee record flowing from recruitment to exit.
                </p>

                <div className="button-group mt-6">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book a Free Demo
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Talk to Our HR Experts
                  </Link>
                  <a href="#applications" className="btn-outline">
                    Explore All Applications
                  </a>
                </div>

                <StaggerReveal
                  step={70}
                  className="mt-7 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4"
                >
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="soft-card flex h-full min-h-[6.5rem] flex-col justify-start gap-1.5 p-3.5"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold leading-5 text-ink">{item.value}</div>
                  </div>
                ))}
                </StaggerReveal>
              </div>

              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-2xl">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                  <div className="relative rounded-[2rem] border border-border bg-white p-5 shadow-float">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="soft-card p-4 sm:col-span-3">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Connected suite
                        </div>
                        <div className="mt-2 text-2xl font-bold text-ink">
                          19 HR Applications on one platform
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft text-justify">
                          Employee data entered once moves cleanly through attendance, leave,
                          payroll, performance, assets, exits and reports.
                        </p>
                      </div>

                      <div className="soft-card p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          One record
                        </div>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          Centralized employee data across every module.
                        </p>
                      </div>
                      <div className="soft-card p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          One flow
                        </div>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          Recruitment, onboarding and lifecycle continuity.
                        </p>
                      </div>
                      <div className="soft-card p-4">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          One view
                        </div>
                        <p className="mt-2 text-sm font-semibold text-ink">
                          Attendance, payroll and reports in one dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="What Are HR Business Applications?"
                  title="All the HR modules your teams need, working as one connected system"
                  description="HR Business Applications are the modules that manage hiring, attendance, leave, payroll, performance, assets, exits and more. Altroz HR removes scattered spreadsheets and disconnected tools by keeping everything inside one source of truth."
                />
              </div>

              <div className="lg:col-span-5">
                <div className="soft-card p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Why it matters
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="soft-card p-4">
                      <div className="flex items-start gap-3">
                        <Bell className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold text-ink">Fewer follow-ups</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">
                            Approvals and reminders move automatically.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="soft-card p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquareMore className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold text-ink">Shared visibility</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">
                            HR, managers and employees stay on the same page.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="soft-card p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold text-ink">Cleaner records</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">
                            One employee record powers every connected module.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="soft-card p-4">
                      <div className="flex items-start gap-3">
                        <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold text-ink">Less friction</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">
                            Teams spend less time moving data between tools.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="applications" className="mt-12">
              <SectionHeading
                eyebrow="Complete HR Applications Suite"
                title="Every application below belongs to the same Altroz HR platform"
                description="Each module solves one part of the employee journey, but they are designed to work together so data stays accurate from hiring to exit."
                center
              />
              <StaggerReveal step={50} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {suiteCards.map((card) => (
                  <SuiteCard key={card.title} card={card} />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section id="employee-lifecycle" className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Employee Lifecycle Workflow"
              title="One flow from recruitment to exit"
              description="Altroz HR is built around one continuous employee lifecycle. Data created at one stage flows automatically into the next, so nothing gets re-entered and nothing gets lost between teams."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {lifecycleSteps.map((step, index) => (
                <article key={step.title} className="soft-card flex h-full items-start gap-3 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-soft text-justify">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Industry Use Cases"
              title="Altroz HR adapts to how different industries actually manage their workforce"
              description="From factory floors to hospital wards and retail branches to field operations, the same HR platform can be configured to fit the way the business really works."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {industryCards.map((item) => (
                <article key={item.title} className="soft-card flex h-full flex-col p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft text-justify">
                    {item.description}
                  </p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container grid gap-6 lg:grid-cols-12">
            <ScrollReveal variant="fade-up" className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                Why Choose Altroz HR Business Applications?
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                A practical, dependable way to manage employee data without unnecessary complexity
              </h2>
              <p className="mt-3 text-base leading-7 text-ink-soft text-justify">
                Altroz HR keeps employee information organised, accessible and accurate. Instead
                of overwhelming teams with separate tools, it gives you one structure for everyday
                HR operations, better reporting and a cleaner handoff between processes.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyChooseBullets.map((bullet) => (
                  <div key={bullet} className="soft-card flex items-start gap-3 p-4">
                    <CheckMark />
                    <span className="text-sm leading-6 text-ink">{bullet}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="lg:col-span-5">
              <div className="soft-card h-full p-5">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  Dashboard & Reporting
                </div>
                <h3 className="mt-3 text-2xl font-bold text-ink">
                  Centralized dashboards keep leadership and HR working from the same data
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft text-justify">
                  Altroz HR gives teams real-time visibility across the platform instead of
                  forcing them to pull data from separate tools and spreadsheets.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {dashboardReports.map((report) => (
                    <div key={report.title} className="soft-card p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {report.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{report.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Benefits"
              title="What the connected suite gives your HR team"
              description="These are the operational gains the document highlights most clearly: faster work, less manual effort, clearer visibility and better control across the HR function."
              center
            />

            <StaggerReveal
              step={45}
              className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {businessBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="soft-card flex h-full min-h-[9rem] flex-col justify-between p-5"
                >
                  <div className="text-lg font-bold text-ink">{benefit.title}</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{benefit.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers to the most common questions"
              description="These FAQs cover the core ideas behind the suite, how the modules work together and what teams can expect from Altroz HR."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="soft-card group p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-ink">
                    <span>{faq.q}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 pr-6 text-sm leading-6 text-ink-soft text-justify">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="absolute -right-8 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Run Your Entire HR Function From One Platform
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    From recruitment to exit, Altroz HR connects every HR business application your
                    team needs
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft text-justify">
                    Employee data stays accurate, HR operations move faster and your workforce
                    experience feels effortless when every module works together inside one system.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="button-group lg:justify-end">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book a Free Demo
                    </Link>
                    <Link to={ROUTES.contact} className="btn-outline">
                      Talk to Our HR Experts
                    </Link>
                  </div>
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
