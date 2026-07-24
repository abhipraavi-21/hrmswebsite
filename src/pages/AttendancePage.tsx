import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Fingerprint,
  Globe,
  MapPin,
  ScanText,
  ShieldCheck,
  Smartphone,
  Users,
  Workflow,
  X,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/routes/routeConfig.js";

type SectionHeaderProps = {
  badge: string;
  title: string;
  description: string;
  centered?: boolean;
};

type Method = {
  value: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
};

type WorkflowStep = {
  title: string;
  description: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type BenefitCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FaqItem = {
  question: string;
  answer: string;
};

function SectionHeader({ badge, title, description, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="text-xs font-bold uppercase tracking-wider text-primary">{badge}</div>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

const heroStats = [
  {
    label: "Attendance methods",
    value: "6",
    note: "Biometric, web, GPS, geo-fencing, geo-location and selfie",
  },
  {
    label: "Workforce support",
    value: "3",
    note: "Office, remote and field teams",
  },
  {
    label: "Automation",
    value: "100%",
    note: "Real-time attendance tracking",
  },
];

const heroTags = [
  "GPS Attendance",
  "Geo-Fencing",
  "Web & Mobile Attendance",
  "Real-Time Attendance Reports",
];

const overviewManualItems = [
  "Paper registers and Excel sheets",
  "Delayed corrections and approvals",
  "Payroll mismatches from manual data",
  "Limited visibility for HR and managers",
];

const overviewDigitalItems = [
  "Automated attendance tracking",
  "Real-time attendance dashboard",
  "Digital approval workflow",
  "Payroll-ready attendance records",
];

const methods: Method[] = [
  {
    value: "biometric",
    label: "Biometric Attendance",
    title: "Secure attendance with biometric verification",
    description:
      "Record employee attendance using fingerprint or face recognition devices for fast, secure and accurate check-ins. Attendance data stays synchronized so HR teams can maintain reliable records without manual entry.",
    bullets: [
      "Record attendance using fingerprint or face recognition devices.",
      "Automatically sync attendance data from biometric devices.",
      "Prevent buddy punching and unauthorized check-ins.",
      "Generate accurate attendance records for payroll and reporting.",
    ],
  },
  {
    value: "web",
    label: "Web Attendance",
    title: "Mark attendance securely through the web portal",
    description:
      "Allow employees to mark attendance from the browser without requiring a biometric device. This is ideal for office employees, hybrid teams and organizations that need a simple and secure portal-based workflow.",
    bullets: [
      "Mark attendance securely through the web portal.",
      "Access attendance from approved office or work locations.",
      "View attendance history and daily records instantly.",
      "Submit attendance regularization requests online.",
    ],
  },
  {
    value: "gps",
    label: "GPS Attendance",
    title: "Track attendance with GPS location verification",
    description:
      "Allow employees to check in and check out using GPS-enabled mobile devices. The system records the employee location during attendance to improve transparency and support field workforce management.",
    bullets: [
      "Verify employee location during attendance.",
      "Ideal for sales, service and field employees.",
      "Record GPS coordinates for every check-in and check-out.",
      "Monitor attendance across multiple work locations.",
    ],
  },
  {
    value: "geolocation",
    label: "Geo-Location Attendance",
    title: "Verify employee location during every check-in",
    description:
      "Record the employee GPS location at the time of check-in and check-out to ensure accurate attendance records. Geo-location attendance improves transparency for office, remote and field teams.",
    bullets: [
      "Verify the employee location during every attendance entry.",
      "Maintain accurate and location-verified attendance records.",
      "Improve accountability for remote and field employees.",
      "Review attendance records with complete location details.",
    ],
  },
  {
    value: "geofence",
    label: "Geo-Fenced Attendance",
    title: "Allow attendance only from approved work locations",
    description:
      "Create secure attendance zones around offices, branches, factories or project sites. Employees can mark attendance only when they are inside the approved geo-fenced area.",
    bullets: [
      "Allow attendance only within approved work locations.",
      "Create geo-fenced zones for offices, branches and project sites.",
      "Verify presence at assigned project or client locations.",
      "Prevent attendance from unauthorized or out-of-range locations.",
    ],
  },
  {
    value: "selfie",
    label: "Selfie Attendance",
    title: "Verify attendance with selfie check-in",
    description:
      "Allow employees to mark attendance by capturing a selfie during check-in and check-out. Selfie attendance helps verify identity, reduce proxy attendance and improve accuracy for remote and field teams.",
    bullets: [
      "Mark attendance with a secure selfie check-in.",
      "Verify employee identity during every attendance entry.",
      "Reduce proxy attendance and unauthorized check-ins.",
      "Ideal for remote employees, field teams and on-site staff.",
    ],
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    title: "Employee Check-In",
    description:
      "Attendance is recorded using biometric devices, the web portal, GPS, geo-fenced locations, geo-location or selfie verification.",
  },
  {
    title: "Attendance Verification",
    description:
      "The system verifies the employee through the selected attendance method and validates the attendance record.",
  },
  {
    title: "Shift & Policy Validation",
    description:
      "Attendance is processed based on assigned shifts, working hours, grace periods and company attendance policies.",
  },
  {
    title: "Attendance Calculation",
    description:
      "Working hours, late arrivals, early exits, overtime and missing punches are calculated automatically.",
  },
  {
    title: "Attendance Regularization",
    description:
      "Employees can submit attendance correction requests for missed or incorrect attendance entries.",
  },
  {
    title: "Manager Approval",
    description:
      "Managers review and approve or reject attendance regularization requests through a simple workflow.",
  },
  {
    title: "Attendance Finalization",
    description:
      "Approved attendance records are finalized and prepared for reporting and payroll.",
  },
  {
    title: "Payroll Processing",
    description:
      "Final attendance data is shared with the payroll module for accurate salary calculations.",
  },
];

const shiftBullets = [
  "Create fixed, rotating and flexible shifts.",
  "Assign shifts to employees, departments or branches.",
  "Configure weekly offs and holiday schedules.",
  "Automate rotational shift scheduling.",
  "Manage shift allocation across multiple teams and locations.",
];

const exceptionCards: FeatureCard[] = [
  {
    title: "Attendance Regularization",
    description:
      "Allow employees to request corrections for missed punches, incorrect attendance or other attendance-related issues.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Missing Punch Management",
    description:
      "Identify missing check-ins and check-outs, then allow employees to submit correction requests for approval.",
    icon: <ScanText className="h-5 w-5" />,
  },
  {
    title: "Late Arrival Management",
    description:
      "Automatically track late arrivals based on company attendance policies and generate reports for HR review.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Overtime Management",
    description:
      "Automatically calculate employee overtime based on attendance records, approved working hours and company overtime policies.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const workingHoursBullets = [
  "Automatic working hour calculation.",
  "Track approved overtime accurately.",
  "Monitor break duration and total productive hours.",
  "Analyze working hours based on assigned shifts.",
];

const dashboardBullets = [
  "Real-time attendance dashboard.",
  "Daily attendance overview.",
  "Weekly attendance reports.",
  "Monthly attendance reports.",
  "Branch-wise attendance tracking.",
  "Department-wise attendance insights.",
];

const benefits: BenefitCard[] = [
  {
    title: "Improve Attendance Accuracy",
    description: "Automate attendance tracking and eliminate manual errors with secure attendance capture.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Save HR Time",
    description: "Reduce manual effort with automated attendance calculations, approvals and reporting.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Payroll-Ready Attendance",
    description: "Automatically prepare attendance records for accurate salary and payroll processing.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Better Employee Experience",
    description: "Give employees access to attendance records, regularization requests and approval status.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Support Multiple Work Locations",
    description: "Manage attendance across offices, branches, factories, warehouses and project locations.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Workforce Insights",
    description: "Monitor attendance trends, absenteeism, late arrivals, overtime and workforce performance with real-time reports.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is Attendance Management Software?",
    answer:
      "Attendance Management Software helps businesses record, track and manage employee attendance, working hours, shifts, overtime, leave and attendance reports from a centralized platform.",
  },
  {
    question: "Which attendance methods does Altroz HR support?",
    answer:
      "Altroz HR supports Biometric Attendance, Web Attendance, GPS Attendance, Geo-Fenced Attendance, Geo-Location Attendance and Selfie Attendance, so businesses can choose the best option for their workforce.",
  },
  {
    question: "Can employees mark attendance from remote or field locations?",
    answer:
      "Yes. Employees can mark attendance using GPS, Geo-Fenced, Geo-Location and Selfie Attendance, which makes the system suitable for field teams, remote employees, sales staff and on-site workers.",
  },
  {
    question: "What is Geo-Fenced Attendance?",
    answer:
      "Geo-Fenced Attendance allows employees to mark attendance only when they are inside an approved office, branch, factory or project site, helping prevent unauthorized attendance.",
  },
  {
    question: "Can employees request attendance corrections?",
    answer:
      "Yes. Employees can submit attendance regularization requests for missing punches or incorrect attendance records, and managers can approve or reject them through the workflow.",
  },
  {
    question: "Can Altroz HR manage multiple shifts?",
    answer:
      "Yes. Altroz HR supports fixed shifts, flexible shifts, rotational shifts, weekly offs and department-wise shift assignments to meet different business requirements.",
  },
  {
    question: "Does Attendance Management integrate with Payroll?",
    answer:
      "Yes. Approved attendance records, working hours, overtime, late arrivals and leave data are automatically prepared for payroll processing so salary calculations stay accurate.",
  },
  {
    question: "Can attendance be monitored across multiple branches and locations?",
    answer:
      "Yes. HR teams can monitor attendance across branches, offices, factories, warehouses and project sites from a centralized attendance dashboard with real-time reports.",
  },
];

function renderMethodVisual(method: Method) {
  switch (method.value) {
    case "biometric":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Attendance sync
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Biometric devices</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Fingerprint className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Devices online", "18"],
              ["Punches today", "312"],
              ["Sync health", "99%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-white p-4">
                <div className="text-xs uppercase tracking-wide text-ink-soft">{label}</div>
                <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BadgeCheck className="h-4 w-4 text-success" />
              Secure and reliable attendance capture
            </div>
            <div className="mt-4 h-2 rounded-full bg-surface">
              <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-primary to-sky-500" />
            </div>
          </div>
        </div>
      );

    case "web":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Portal workflow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Web attendance portal</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Globe className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Employee Login", "Secure access"],
              ["Attendance Status", "Check-in successful"],
              ["Today's Attendance", "09:25 AM"],
              ["Attendance History", "Real-time records"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-4">
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="mt-1 text-xs text-ink-soft">{detail}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Access</div>
                <div className="mt-1 text-sm font-semibold text-ink">Approved browser locations</div>
              </div>
              <div className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-semibold text-success">
                Live
              </div>
            </div>
          </div>
        </div>
      );

    case "gps":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Field workforce
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">GPS location verification</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <MapPin className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-border bg-white p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-ink">
              <span>Approved location checks</span>
              <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-xs text-success">
                Verified
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ["Head Office", "Pune, Maharashtra"],
                ["Mumbai Branch", "Mumbai, Maharashtra"],
                ["Manufacturing Unit", "Chakan MIDC, Pune"],
                ["Client Location", "Project site"],
              ].map(([place, region], index) => (
                <div key={place} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{place}</div>
                    <div className="text-xs text-ink-soft">{region}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-semibold text-success">
                    {index < 3 ? "Attendance Verified" : "Verified"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "geolocation":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Location proof
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Geo-location attendance</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <ScanText className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Head Office", "Attendance verified"],
              ["Mumbai Branch", "Attendance verified"],
              ["Manufacturing Unit", "Attendance verified"],
              ["Client Location", "Attendance verified"],
            ].map(([place, status]) => (
              <div key={place} className="rounded-2xl border border-border bg-white p-4">
                <div className="text-sm font-semibold text-ink">{place}</div>
                <div className="mt-1 text-xs text-ink-soft">{status}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Accurate location-verified attendance records
            </div>
          </div>
        </div>
      );

    case "geofence":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Approved zone
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Geo-fenced attendance</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Building2 className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-border bg-white p-4">
            <div className="relative mx-auto flex aspect-square max-w-[280px] items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-primary/15" />
              <div className="absolute inset-10 rounded-full border border-primary/20" />
              <div className="absolute inset-16 rounded-full border border-primary/30" />
              <div className="grid h-28 w-28 place-items-center rounded-full bg-primary-soft text-primary">
                <Building2 className="h-10 w-10" />
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-surface p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ShieldCheck className="h-4 w-4 text-success" />
                Employee is inside the approved attendance zone
              </div>
            </div>
          </div>
        </div>
      );

    case "selfie":
      return (
        <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Mobile verification
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Selfie attendance</h3>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Smartphone className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-[1.75rem] border border-border bg-white p-4">
              <div className="rounded-[1.5rem] bg-surface p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-ink-soft">Today</div>
                <div className="mt-2 text-xl font-bold text-ink">Selfie Check-In</div>
                <div className="mt-1 text-sm text-ink-soft">
                  Capture a selfie to verify identity and complete attendance securely.
                </div>
                <div className="mt-4 grid place-items-center rounded-[1.5rem] bg-primary-soft p-6 text-primary">
                  <Smartphone className="h-12 w-12" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                ["View Attendance History", "Daily, weekly and monthly records"],
                ["Request Attendance Correction", "Raise regularization requests online"],
                ["Track Approval Status", "Monitor manager decisions in real time"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-border bg-white p-4">
                  <div className="text-sm font-semibold text-ink">{title}</div>
                  <div className="mt-1 text-xs text-ink-soft">{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="attendance-hero hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/12 blur-3xl" />

          <div className="container-x pt-0 pb-6 lg:pt-0 lg:pb-8">
            <div className="mx-auto max-w-6xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <BadgeCheck className="h-3.5 w-3.5" />
                Attendance Management Software
              </span>

              <h1 className="mx-auto mt-2 max-w-6xl text-balance text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                Attendance Management Software That Simplifies Workforce Tracking
              </h1>

              <p className="mx-auto mt-3 max-w-5xl text-base leading-7 text-ink-soft sm:text-lg">
                Track employee attendance with biometric devices, web attendance, GPS,
                geo-fencing, geo-location and selfie verification from one centralized platform.
                Altroz HR helps businesses automate attendance, manage shifts, calculate working
                hours, monitor overtime and generate accurate attendance reports with ease.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <a href="#methods" className="btn-outline">
                  Explore Features
                </a>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {heroTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {heroStats.map((stat) => (
                <article key={stat.label} className="soft-card p-5">
                  <div className="text-sm font-semibold text-ink-soft">{stat.label}</div>
                  <div className="mt-2 text-4xl font-bold text-ink">{stat.value}</div>
                  <p className="mt-2 text-sm text-ink-soft">{stat.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="overview" className="py-20">
          <div className="container-x">
            <SectionHeader
              badge="Overview"
              title="What is Attendance Management Software?"
              description="Attendance Management Software helps businesses record, monitor and manage employee attendance accurately from a single platform. It automates attendance tracking, working hour calculations, shift management, overtime and attendance reports, reducing manual work and improving workforce efficiency."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="soft-card border border-rose-200/70 bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-rose-600">
                  <X className="h-4 w-4" />
                  Manual Attendance
                </div>
                <h3 className="mt-3 text-2xl font-bold text-ink">Manual Attendance</h3>
                <ul className="mt-5 space-y-3">
                  {overviewManualItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">
                        <X className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="soft-card border border-emerald-200/70 bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-success">
                  <BadgeCheck className="h-4 w-4" />
                  Altroz HR Attendance
                </div>
                <h3 className="mt-3 text-2xl font-bold text-ink">Altroz HR Attendance</h3>
                <ul className="mt-5 space-y-3">
                  {overviewDigitalItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-success">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Building2 className="h-4 w-4 text-primary" />
                    Centralized attendance, payroll-ready records and real-time visibility
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="methods" className="bg-surface py-20">
          <div className="container-x">
            <SectionHeader
              badge="Attendance Methods"
              title="Choose the attendance method that fits your workforce"
              description="Every business has different attendance requirements. Altroz HR offers multiple attendance methods for office employees, remote teams, field staff and project-based workforces."
            />

            <Tabs defaultValue="biometric" className="mt-10">
              <TabsList className="grid h-auto w-full gap-2 rounded-[2rem] border border-border bg-white p-2 shadow-card md:grid-cols-3 xl:grid-cols-6">
                {methods.map((method) => (
                  <TabsTrigger
                    key={method.value}
                    value={method.value}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-ink-soft data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    {method.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6">
                {methods.map((method) => (
                  <TabsContent key={method.value} value={method.value} className="mt-0">
                    <div className="grid gap-6 lg:grid-cols-12">
                      <article className="soft-card p-6 lg:col-span-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                          {method.label}
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-ink">{method.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-ink-soft">{method.description}</p>

                        <ul className="mt-6 space-y-3">
                          {method.bullets.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-ink">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-2xl border border-border bg-white p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <Workflow className="h-4 w-4 text-primary" />
                            Attendance capture designed for clear verification and simple approvals
                          </div>
                        </div>
                      </article>

                      <div className="lg:col-span-5">{renderMethodVisual(method)}</div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </section>

        <section id="workflow" className="py-20">
          <div className="container-x">
            <SectionHeader
              badge="Workflow"
              title="From attendance capture to payroll processing"
              description="Every attendance entry follows a structured workflow from employee check-in to validation, approval and payroll processing."
              centered
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {workflowSteps.map((step, index) => (
                <article key={step.title} className="soft-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Step {index + 1}
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-surface py-20">
          <div className="container-x">
            <SectionHeader
              badge="Attendance Management Features"
              title="Powerful features for smarter attendance management"
              description="Manage employee attendance with powerful features that automate shift planning, attendance calculations, regularization, overtime and reporting."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="soft-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Shift Management
                    </div>
                    <h3 className="text-2xl font-bold text-ink">Manage employee shifts with ease</h3>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {shiftBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="soft-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Attendance Exceptions
                    </div>
                    <h3 className="text-2xl font-bold text-ink">Handle attendance exceptions cleanly</h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {exceptionCards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-border bg-white p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                          {card.icon}
                        </span>
                        {card.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-ink-soft">{card.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <article className="soft-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Working Hours & Overtime
                    </div>
                    <h3 className="text-2xl font-bold text-ink">Track working hours and overtime automatically</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  Automatically calculate employee working hours, break time and overtime based on attendance records. Get accurate time tracking without manual calculations.
                </p>

                <ul className="mt-6 space-y-3">
                  {workingHoursBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["SHIFT HOURS", "Working hours"],
                    ["OVERTIME", "Tracked automatically"],
                    ["BREAK TIME", "Productive hours"],
                    ["ANALYSIS", "Shift-based reporting"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        {label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="soft-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Attendance Dashboard
                    </div>
                    <h3 className="text-2xl font-bold text-ink">Monitor attendance from one dashboard</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-ink-soft">
                  Access attendance insights across employees, departments, branches and locations through a centralized dashboard with real-time reports and summaries.
                </p>

                <ul className="mt-6 space-y-3">
                  {dashboardBullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Real-time", "Daily", "Branch-wise"].map((chip) => (
                    <div key={chip} className="rounded-2xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-ink">
                      {chip}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20">
          <div className="container-x">
            <SectionHeader
              badge="Business Benefits"
              title="Why businesses choose Altroz HR attendance management"
              description="Simplify attendance management with automated tracking, accurate working hour calculations, real-time visibility and payroll-ready records."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <article className="soft-card p-6 lg:col-span-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Featured Benefit
                </div>
                <h3 className="mt-4 text-2xl font-bold text-ink">Accurate attendance for every employee</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Record attendance using biometric, web, GPS, geo-fenced, geo-location and selfie attendance methods while maintaining accurate and reliable attendance records.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Improve attendance accuracy at scale",
                    "Save HR time",
                    "Simplify payroll processing",
                    "Better employee transparency",
                    "Manage multiple locations",
                    "Improve workforce productivity",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <article key={benefit.title} className="soft-card p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-surface py-20">
          <div className="container-x">
            <SectionHeader
              badge="Questions"
              title="Frequently Asked Questions"
              description="Find answers to the most common questions about Attendance Management Software, attendance tracking methods, shift management, payroll integration and employee attendance."
              centered
            />

            <div className="mt-10 rounded-[2rem] border border-border bg-white p-2 shadow-card">
              <Accordion type="single" collapsible className="divide-y divide-border">
                {faqItems.map((item) => (
                  <AccordionItem key={item.question} value={item.question} className="px-4">
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-6 text-ink-soft">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Ready to switch to digital attendance?
                </div>
                <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                  Make attendance clean, clear and easy for every team
                </h2>
                <p className="mt-3 text-ink-soft">
                  Use a single attendance system for biometric devices, mobile teams, branches and payroll-ready reporting.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to={ROUTES.bookDemo} className="btn-primary">
                  Book Free Demo
                </Link>
                <Link to={ROUTES.contact} className="btn-outline">
                  Contact Sales
                </Link>
                <a href="#methods" className="btn-outline">
                  Review Methods
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
