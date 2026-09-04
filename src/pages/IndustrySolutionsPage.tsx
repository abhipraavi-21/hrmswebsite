import { useEffect, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Construction,
  DoorOpen,
  Factory,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Laptop,
  Landmark,
  MapPin,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { ROUTES } from "@/routes/routeConfig.js";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type IndustrySolution = {
  title: string;
  icon: LucideIcon;
  overview: string;
  challenges: string[];
  help: string;
  modules: string[];
  cta: string;
};

type ModuleCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

type IconCard = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const pageTitle = "Industry-Wise HR Software | HR Solutions for Every Industry - Altroz HR";
const pageDescription =
  "Altroz HR offers industry-wise HR software for manufacturing, IT, healthcare, construction, retail, logistics, education and hospitality. Includes Geo Tracking, Geo Fencing and Mobile Attendance for field teams. Book a free demo today.";

const heroHighlights = [
  {
    title: "Industry-Specific HR Solutions",
    description:
      "Pre-suited setups for manufacturing, healthcare, construction, retail, IT, education, logistics, hospitality and facility management.",
    icon: Sparkles,
  },
  {
    title: "Geo Tracking and Mobile Attendance",
    description:
      "Verified, location-based attendance for employees who work outside a fixed office.",
    icon: MapPin,
  },
  {
    title: "Multi-Location Workforce Management",
    description:
      "Manage employees across branches, sites and client locations from one dashboard.",
    icon: Building2,
  },
];

const industryExamples = [
  {
    title: "Factory floors",
    description: "Shift-heavy work, overtime tracking and payroll accuracy.",
    icon: Factory,
  },
  {
    title: "Hospital wards",
    description: "24x7 staffing, department shifts and duty coverage.",
    icon: HeartPulse,
  },
  {
    title: "Retail branches",
    description: "Branch-wise attendance and store-level workforce visibility.",
    icon: ShoppingBag,
  },
  {
    title: "IT teams",
    description: "Flexible hours, self-service and performance workflows.",
    icon: Laptop,
  },
];

const industrySolutions: IndustrySolution[] = [
  {
    title: "Manufacturing",
    icon: Factory,
    overview:
      "Manufacturing units run on shift-based production, machine timings and factory floor discipline. Workforce planning has to match production targets, not office hours.",
    challenges: [
      "Multiple rotating shifts across production lines",
      "Overtime tracking for factory workers",
      "Attendance discipline at shop floor level",
      "Payroll linked to shift and overtime data",
    ],
    help:
      "Altroz HR maps shift patterns to actual production schedules, captures overtime automatically from attendance data, and pushes verified hours straight into payroll, cutting down manual shift sheets and overtime disputes.",
    modules: ["Shift Management", "Attendance Management", "Payroll Management", "Employee Management"],
    cta: "Get an HR Solution Built for Manufacturing",
  },
  {
    title: "IT and Software",
    icon: Laptop,
    overview:
      "IT teams work in flexible hours, hybrid setups and project-based structures. HR here needs to be self-service first and low on paperwork.",
    challenges: [
      "Flexible working hours and remote check-ins",
      "Frequent leave and comp-off requests",
      "Continuous performance review cycles",
      "High dependency on employees managing their own HR tasks",
    ],
    help:
      "Altroz HR gives IT employees a self-service portal to apply leave, view payslips and track performance, while HR teams get a single dashboard to manage the entire employee lifecycle without chasing emails.",
    modules: [
      "Employee Management",
      "Leave Management",
      "Performance Management",
      "Employee Self Service",
    ],
    cta: "Get an HR Solution Built for IT and Software",
  },
  {
    title: "Healthcare and Hospitals",
    icon: HeartPulse,
    overview:
      "Hospitals run round the clock. Doctors, nurses and support staff work in overlapping shifts where even a small scheduling gap affects patient care.",
    challenges: [
      "24x7 shift rotation across departments",
      "Accurate attendance for critical care staff",
      "Payroll complexity with shift allowances",
      "Leave planning without affecting patient coverage",
    ],
    help:
      "Altroz HR builds shift rosters department-wise, tracks attendance in real time, and calculates payroll with shift-linked components, so hospital administrators always know who is on duty and who is on leave.",
    modules: ["Shift Management", "Attendance Management", "Payroll Management", "Leave Management"],
    cta: "Get an HR Solution Built for Healthcare and Hospitals",
  },
  {
    title: "Construction",
    icon: Construction,
    overview:
      "Construction workforce operates across scattered project sites, often far from any central office, making manual attendance almost impossible to verify.",
    challenges: [
      "Workers spread across multiple project sites",
      "No fixed office for attendance marking",
      "Risk of proxy or unverified attendance",
      "Site-wise employee records and documentation",
    ],
    help:
      "Altroz HR uses Geo Tracking, Geo Fencing Attendance and Mobile Attendance so workers can check in only from the assigned site, giving site managers verified, location-based attendance and simplified payroll processing.",
    modules: [
      "Geo Tracking",
      "Geo Fencing",
      "Mobile Attendance",
      "Employee Management",
      "Payroll Management",
      "Document Generation",
    ],
    cta: "Get an HR Solution Built for Construction",
  },
  {
    title: "Retail",
    icon: ShoppingBag,
    overview:
      "Retail businesses run multiple outlets, each with its own staff, shift timing and footfall pattern that changes through the day and across seasons.",
    challenges: [
      "Attendance tracking across many branches",
      "Different shift timings per outlet",
      "Store-wise payroll processing",
      "Leave approvals across locations",
    ],
    help:
      "Altroz HR consolidates attendance and shift data from every branch into one system, so retail HR teams can plan staffing outlet by outlet and process payroll centrally without visiting each store.",
    modules: ["Attendance Management", "Shift Management", "Payroll Management", "Leave Management"],
    cta: "Get an HR Solution Built for Retail",
  },
  {
    title: "Education",
    icon: GraduationCap,
    overview:
      "Schools and colleges manage two very different workforce groups - teaching staff with academic schedules and non-teaching staff with fixed shifts.",
    challenges: [
      "Separate attendance rules for teaching and non-teaching staff",
      "Academic calendar linked leave planning",
      "Payroll structures that differ by staff category",
      "Manual record keeping for large staff strength",
    ],
    help:
      "Altroz HR lets institutions manage teaching and non-teaching staff separately, apply the right attendance and leave rules to each group, and run payroll accurately for every staff category.",
    modules: ["Employee Management", "Attendance Management", "Payroll Management", "Leave Management"],
    cta: "Get an HR Solution Built for Education",
  },
  {
    title: "Logistics and Transport",
    icon: Truck,
    overview:
      "Logistics teams work on the move - drivers, delivery staff and field executives rarely sit at a desk, which makes conventional attendance systems irrelevant.",
    challenges: [
      "Constantly moving field staff",
      "No central location for attendance",
      "Verifying genuine field visits and check-ins",
      "Payroll dependent on field attendance data",
    ],
    help:
      "Altroz HR tracks field employees through Geo Tracking and Mobile Attendance, confirms location-based check-ins with Geo Fencing, and feeds this data directly into payroll for accurate, dispute-free processing.",
    modules: ["Geo Tracking", "Mobile Attendance", "Geo Fencing", "Employee Management", "Payroll Management"],
    cta: "Get an HR Solution Built for Logistics and Transport",
  },
  {
    title: "Hospitality",
    icon: Hotel,
    overview:
      "Hotels and hospitality businesses run on round-the-clock shifts with front office, housekeeping, kitchen and service teams all working different hours.",
    challenges: [
      "Multiple overlapping shift patterns",
      "High staff turnover and quick onboarding needs",
      "Attendance accuracy across departments",
      "Payroll linked to shift allowances",
    ],
    help:
      "Altroz HR manages department-wise shift planning, captures accurate attendance for every shift, and gives staff self-service access to payslips and leave, reducing the front-desk load on HR teams.",
    modules: ["Shift Management", "Attendance Management", "Payroll Management", "Employee Self Service"],
    cta: "Get an HR Solution Built for Hospitality",
  },
  {
    title: "Facility Management",
    icon: Building2,
    overview:
      "Facility management companies deploy staff across client sites and locations, often with little direct supervision, making workforce visibility a real challenge.",
    challenges: [
      "Staff deployed across multiple client locations",
      "Limited visibility of on-site attendance",
      "Verifying attendance at the correct client site",
      "Centralised payroll across scattered teams",
    ],
    help:
      "Altroz HR combines Geo Tracking, Mobile Attendance and multi-location workforce visibility so facility management companies always know which employee is present at which client site, with payroll processed centrally.",
    modules: [
      "Multi-Location Workforce Management",
      "Geo Tracking",
      "Mobile Attendance",
      "Attendance Management",
      "Payroll Management",
    ],
    cta: "Get an HR Solution Built for Facility Management",
  },
];

const glanceCards = industrySolutions.map((industry) => ({
  title: industry.title,
  icon: industry.icon,
  summary: industry.overview,
  modules: industry.modules,
}));

const fieldWorkforceCards = [
  {
    title: "Geo Tracking",
    icon: MapPin,
    description:
      "Know the real-time location of field employees while they are on duty, without manual check-ins or phone calls.",
  },
  {
    title: "Geo Fencing",
    icon: BadgeCheck,
    description:
      "Set virtual boundaries around a site or office so attendance can only be marked when the employee is within the defined zone.",
  },
  {
    title: "GPS Attendance",
    icon: Globe2,
    description:
      "Capture attendance with GPS coordinates, giving HR teams accurate, location-verified records for every field employee.",
  },
  {
    title: "Mobile Attendance",
    icon: Smartphone,
    description:
      "Let employees mark attendance directly from their mobile phones, wherever their work takes them.",
  },
  {
    title: "Client Site Attendance",
    icon: Building2,
    description:
      "Verify that employees are marking attendance from the correct client site, useful for facility and field service teams.",
  },
  {
    title: "Field Workforce Visibility",
    icon: Users,
    description:
      "Get a clear, centralised view of where every field employee is working, without depending on manual reporting.",
  },
  {
    title: "Location Based Attendance",
    icon: Landmark,
    description:
      "Tie attendance records to actual work locations, so HR always has a location-verified audit trail.",
  },
  {
    title: "Multi Site Workforce",
    icon: Workflow,
    description:
      "Manage employees working across several project sites or branches from a single, unified HR system.",
  },
];

const moduleCards: ModuleCard[] = [
  {
    title: "Employee Management",
    icon: Users,
    description:
      "A single, organised record for every employee, adaptable to any industry's staff structure - from factory workers to teaching staff.",
  },
  {
    title: "Attendance Management",
    icon: CalendarDays,
    description:
      "Accurate attendance capture whether employees work from an office, a factory floor, a hospital ward or a client site.",
  },
  {
    title: "Payroll Management",
    icon: Wallet,
    description:
      "Payroll that reflects real attendance, shifts and overtime, reducing errors across industries with complex pay structures.",
  },
  {
    title: "Leave Management",
    icon: Workflow,
    description:
      "Leave rules that can be set differently for different departments, staff categories or shift groups.",
  },
  {
    title: "Recruitment Management",
    icon: Users,
    description:
      "A structured hiring process that helps industries with high staff turnover fill positions faster.",
  },
  {
    title: "Performance Management",
    icon: BarChart3,
    description:
      "Track goals and reviews in a way that suits both project-based teams and shift-based staff.",
  },
  {
    title: "Employee Self Service",
    icon: Smartphone,
    description:
      "Employees across any industry can apply for leave, check attendance and download payslips on their own.",
  },
  {
    title: "Asset Management",
    icon: Building2,
    description:
      "Track company assets issued to employees, useful for industries handling tools, devices or site equipment.",
  },
  {
    title: "Exit Management",
    icon: DoorOpen,
    description:
      "A structured, paperless exit process for industries with frequent employee movement.",
  },
  {
    title: "Document Generation",
    icon: FileText,
    description:
      "Generate offer letters, ID cards and HR documents quickly, useful for industries hiring in bulk or at multiple sites.",
  },
  {
    title: "HR Reports and Analytics",
    icon: BarChart3,
    description:
      "Get attendance, payroll and workforce reports that reflect the real structure of your industry.",
  },
  {
    title: "Approval Workflow",
    icon: Workflow,
    description:
      "Route leave, attendance and other approvals to the right manager, however your organisation is structured.",
  },
];

const benefitCards: IconCard[] = [
  {
    title: "Reduce Manual HR Work",
    icon: CheckCircle2,
    description:
      "Automate attendance, payroll and leave processes that would otherwise take hours of manual effort every month.",
  },
  {
    title: "Increase Productivity",
    icon: ArrowRight,
    description: "Free up your HR team's time so they can focus on people, not paperwork.",
  },
  {
    title: "Better Attendance Accuracy",
    icon: BadgeCheck,
    description:
      "Location-verified and system-based attendance means fewer disputes and cleaner records.",
  },
  {
    title: "Paperless HR Operations",
    icon: FileText,
    description:
      "Move employee records, documents and approvals online, reducing dependence on physical files.",
  },
  {
    title: "Improve Payroll Accuracy",
    icon: Wallet,
    description:
      "Payroll calculated directly from attendance and shift data means fewer errors and faster processing.",
  },
  {
    title: "Centralised Employee Records",
    icon: Users,
    description:
      "Access every employee's information from one system, regardless of department, shift or location.",
  },
  {
    title: "Better Workforce Visibility",
    icon: Globe2,
    description:
      "Know exactly who is working, where and on what shift, across every branch or site.",
  },
  {
    title: "Faster Decision Making",
    icon: BarChart3,
    description:
      "Real-time reports give HR and management the information they need, when they need it.",
  },
];

const whyChooseCards: IconCard[] = [
  {
    title: "Easy to Use",
    icon: Sparkles,
    description:
      "A clean, simple interface that HR teams and employees can start using without lengthy training.",
  },
  {
    title: "Industry Ready",
    icon: Factory,
    description:
      "Built to adapt to the workforce structure of manufacturing, healthcare, construction, retail and more.",
  },
  {
    title: "Geo Tracking and Geo Fencing",
    icon: MapPin,
    description:
      "Purpose-built for industries with field employees and multiple work sites.",
  },
  {
    title: "Mobile Attendance",
    icon: Smartphone,
    description:
      "Attendance marking that works for employees who are always on the move.",
  },
  {
    title: "Multi-Branch Management",
    icon: Building2,
    description:
      "Manage employees across several branches or locations from a single dashboard.",
  },
  {
    title: "Secure Employee Information",
    icon: Shield,
    description:
      "Employee data is stored and managed securely within the system.",
  },
  {
    title: "Role Based Access",
    icon: BadgeCheck,
    description:
      "Control who can view or edit information based on their role in the organisation.",
  },
  {
    title: "Scalable Platform",
    icon: Workflow,
    description:
      "A system that grows with your organisation, from a single office to multiple locations.",
  },
];

const faqItems = [
  {
    question: "Which industries use Altroz HR?",
    answer:
      "Altroz HR is used by manufacturing units, IT companies, hospitals, construction firms, retail chains, educational institutions, logistics companies, hospitality businesses and facility management companies.",
  },
  {
    question: "Is Altroz HR suitable for manufacturing companies?",
    answer:
      "Yes. Altroz HR supports shift management, overtime attendance and payroll processing designed for factory and production environments.",
  },
  {
    question: "Can construction companies use GPS attendance?",
    answer:
      "Yes. Construction teams can use Geo Tracking, Geo Fencing and Mobile Attendance to mark verified attendance directly from the project site.",
  },
  {
    question: "Can logistics companies track field employees?",
    answer:
      "Yes. Altroz HR gives logistics and transport companies real-time visibility of field staff through Geo Tracking and Mobile Attendance.",
  },
  {
    question: "How does Geo Tracking work?",
    answer:
      "Geo Tracking captures the real-time location of field employees while they are on duty, helping HR teams monitor field workforce activity accurately.",
  },
  {
    question: "What is Geo Fencing Attendance?",
    answer:
      "Geo Fencing Attendance allows attendance to be marked only when an employee is physically present within a defined location boundary, such as a site or branch.",
  },
  {
    question: "Can hospitals manage shifts using Altroz HR?",
    answer:
      "Yes. Altroz HR supports round-the-clock shift planning for hospitals, covering doctors, nurses and support staff across departments.",
  },
  {
    question: "Can retail businesses manage multiple branches?",
    answer:
      "Yes. Retail chains can track attendance, shifts and payroll across all their branches from a single, centralised system.",
  },
  {
    question: "Is Altroz HR suitable for small and medium businesses?",
    answer:
      "Yes. Altroz HR is built to be simple and scalable, making it suitable for SMEs as well as larger, multi-location organisations.",
  },
  {
    question: "Why choose Altroz HR?",
    answer:
      "Altroz HR combines industry-ready HR modules with genuine field workforce features like Geo Tracking, Geo Fencing and Mobile Attendance, all in one easy-to-use, scalable platform.",
  },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const head = document.head;
    const previousDescription = head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content;
    const previousCanonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;

    document.title = title;

    let meta = head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      head.appendChild(meta);
    }
    meta.content = description;

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }
    canonical.href = resolveSiteUrl(ROUTES.industrySolutions);

    return () => {
      document.title = previousTitle;
      if (createdMeta) {
        meta?.remove();
      } else if (meta && previousDescription !== undefined) {
        meta.content = previousDescription;
      }

      if (createdCanonical) {
        canonical?.remove();
      } else if (canonical && previousCanonical) {
        canonical.href = previousCanonical;
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
      <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p
        className={
          center
            ? "mx-auto mt-4 max-w-2xl text-sm leading-7 text-justify hyphens-auto text-ink-soft sm:text-base"
            : "mt-4 max-w-2xl text-sm leading-7 text-justify hyphens-auto text-ink-soft sm:text-base"
        }
      >
        {description}
      </p>
    </div>
  );
}

function IndustrySolutionCard({ item }: { item: IndustrySolution }) {
  const Icon = item.icon;

  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold leading-6 text-ink">{item.title}</h3>
      </div>

      <div className="mt-4 space-y-4 text-justify hyphens-auto">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Industry Overview
          </div>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{item.overview}</p>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Common HR Challenges
          </div>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-ink-soft">
            {item.challenges.map((challenge) => (
              <li key={challenge} className="flex gap-2 text-justify">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-success" />
                <span className="hyphens-auto">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            How Altroz HR Helps
          </div>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{item.help}</p>
        </div>

        <div className="mt-auto">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Recommended Modules
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.modules.map((module) => (
              <span
                key={module}
                className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-sm"
              >
                {module}
              </span>
            ))}
          </div>
          <a
            href={ROUTES.bookDemo}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {item.cta}
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function FeatureCard({ item }: { item: IconCard }) {
  const Icon = item.icon;

  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold leading-6 text-ink">{item.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
    </article>
  );
}

function ModuleFeatureCard({ item }: { item: ModuleCard }) {
  const Icon = item.icon;

  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-base font-bold leading-6 text-ink">{item.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
    </article>
  );
}

export default function IndustrySolutionsPage() {
  usePageMeta(pageTitle, pageDescription);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -left-20 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-start lg:py-16">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
                HR Software Built for Every Industry
              </span>

              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                HR Software for Every Industry - Built to Match How Your Workforce Actually Works
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                From factory floors to hospital wards, from construction sites to retail branches -
                every industry runs its workforce differently. Altroz HR adapts to your industry
                with the right mix of attendance, payroll, shift and field workforce tools, so you
                spend less time managing HR and more time running your business.
              </p>

              <p className="max-w-2xl text-sm leading-6 text-ink-soft">
                No spreadsheets. No guesswork. Just HR software that fits your industry.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </a>
                <a href="#industries" className="btn-outline">
                  Explore Industry Solutions
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="soft-card overflow-hidden p-4 sm:p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-white p-4 shadow-card"
                      >
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-3 text-sm font-semibold leading-6 text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{item.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Central workforce dashboard
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Attendance", value: "Configured" },
                      { label: "Shifts", value: "Managed" },
                      { label: "Reports", value: "Available" },
                    ].map((metric) => (
                      <div key={metric.label} className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                          {metric.label}
                        </div>
                        <div className="mt-1 text-sm font-bold text-ink">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {industryExamples.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-white p-4 shadow-card"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <Icon className="h-4 w-4 text-primary" />
                          {item.title}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-white">
          <div className="container-x py-5">
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Workflow, label: "Shift Management" },
                { icon: CalendarDays, label: "Attendance Tracking" },
                { icon: Wallet, label: "Payroll Processing" },
                { icon: Users, label: "Employee Records" },
                { icon: MapPin, label: "Multi-Location Management" },
                { icon: BarChart3, label: "Reports and Analytics" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Why every industry needs different HR software"
                title="One HR system cannot work the same way for every business"
                description="A factory runs on shifts and overtime. A hospital runs round the clock. A construction company has no fixed office at all. A retail chain manages dozens of branches, while an IT company runs on flexible hours and self-service."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify hyphens-auto text-ink-soft">
                <p className="text-justify hyphens-auto">
                  Generic HR software forces every one of these businesses into the same rigid
                  structure - and that is where HR processes start to break down.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Workforce structures that do not match the software's assumptions",
                    "Attendance rules that are too rigid for field or shift-based teams",
                    "Payroll calculations that do not reflect real shift and overtime data",
                    "Approval workflows that do not match how your teams are actually managed",
                  ].map((item) => (
                    <div key={item} className="soft-card flex items-start gap-3 p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-justify hyphens-auto">
                  Altroz HR is built differently. Instead of forcing one structure on every
                  business, it adapts its attendance, shift, payroll and workflow settings to
                  match how your industry actually operates - whether that means rotating shifts,
                  multiple branches, field employees, or a mix of teaching and non-teaching staff.
                </p>
              </div>

              <a
                href="#industries"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                See how Altroz HR adapts to your industry
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="soft-card h-full p-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Why this matters
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">A better fit for real operations</h3>
                <p className="mt-3 text-sm leading-6 text-justify hyphens-auto text-ink-soft">
                  Different industries need different workforce structures. These examples show how
                  the same HR platform can behave differently when the work changes.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {industryExamples.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl border border-border bg-white p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                          <Icon className="h-4 w-4 text-primary" />
                          {item.title}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{item.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-justify hyphens-auto text-ink-soft">
                  A factory runs on shifts. A hospital runs round the clock. Retail needs branch
                  control. IT needs flexibility. Altroz HR keeps those realities organized in one
                  system.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="industries" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries we serve"
              title="HR software designed around real industry workflows"
              description="Altroz HR is used across industries with very different workforce structures. Here is how it works for your industry."
              center
            />

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {industrySolutions.map((item) => (
                <IndustrySolutionCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industry solutions at a glance"
              title="Modules recommended for each industry"
              description="A quick reference to the Altroz HR modules best suited to each industry."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {glanceCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="soft-card flex h-full flex-col p-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-ink">{item.title}</h3>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                          Quick reference
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-ink-soft">{item.summary}</p>

                    <div className="mt-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Recommended modules
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.modules.map((module) => (
                          <span
                            key={module}
                            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-ink-soft shadow-sm"
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="field-workforce" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Field workforce management"
                title="HR software for employees who do not work from an office"
                description="Construction workers, logistics staff, facility management teams and field executives do not sit behind a desk, so their attendance and workforce management cannot either."
              />

              <div className="mt-6 space-y-4 text-sm leading-7 text-justify text-ink-soft">
                <p>
                  Altroz HR brings genuine field workforce visibility through Geo Tracking, Geo
                  Fencing and Mobile Attendance, giving you verified, location-based data instead
                  of guesswork.
                </p>
                <p>
                  This makes it easier to see who is on site, where they are working, and whether
                  attendance records match the actual work location.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {fieldWorkforceCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="soft-card flex h-full flex-col p-5">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-3 text-base font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Modules used across industries"
              title="The same reliable modules, configured for your industry"
              description="Every industry uses a different combination of Altroz HR modules, but every module is built to flex to your workforce structure."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {moduleCards.map((item) => (
                <ModuleFeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Benefits of industry-wise HR software"
              title="What businesses gain when HR software fits their industry"
              description="When the software matches the workforce, daily HR work becomes cleaner, faster and easier to manage."
              center
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionHeading
                  eyebrow="Why choose Altroz HR"
                  title="Built for real industry needs, not just a generic HR checklist"
                  description="Most HR software is built for a typical office environment and adds industry features as an afterthought. Altroz HR is built with field workforce management, multi-location operations and industry-specific workflows as core capabilities."
                />
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {whyChooseCards.map((item) => (
                    <FeatureCard key={item.title} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Frequently asked questions"
              title="Questions teams ask before choosing Altroz HR"
              description="Quick answers to the most common questions about industry-specific HR workflows, field workforce tracking and multi-location HR management."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="soft-card overflow-hidden rounded-[1.5rem] border border-border bg-white p-4 sm:p-5">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((item) => (
                    <AccordionItem
                      key={item.question}
                      value={item.question}
                      className="rounded-2xl border border-border bg-white px-4"
                    >
                      <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Final CTA section
                  </div>
                  <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    HR software that understands your industry
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
                    Whatever your industry - manufacturing, healthcare, construction, retail, IT,
                    education, logistics, hospitality or facility management - Altroz HR gives you
                    the right attendance, payroll, shift and field workforce tools to run HR the
                    way your business actually works.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </a>
                  <a href={ROUTES.contact} className="btn-outline">
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
