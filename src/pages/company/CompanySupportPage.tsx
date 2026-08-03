"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  DoorOpen,
  FileText,
  Fingerprint,
  Handshake,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MessageSquareText,
  PackageCheck,
  Phone,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

type SupportCard = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

const pageTitle = "HR Software Help Center | Support & Documentation — Altroz HR";
const pageDescription =
  "Get help with Altroz HR. Search guides, product documentation and troubleshooting for Employee Management, Attendance, Payroll, Leave and more.";

const popularSearches = [
  "Attendance",
  "Payroll",
  "Leave",
  "Employee Management",
  "Recruitment",
  "Analytics",
  "ESS",
];

const categories: SupportCard[] = [
  {
    title: "Employee Management",
    description: "Add employees, manage profiles, org charts and employee records in one place.",
    icon: <Users className="h-5 w-5" />,
    href: `${ROUTES.coreHR}`,
  },
  {
    title: "Attendance",
    description: "Set up GPS attendance, geo tracking, geo fencing and daily attendance rules.",
    icon: <Fingerprint className="h-5 w-5" />,
    href: ROUTES.attendanceManagement,
  },
  {
    title: "Leave",
    description: "Configure leave types, leave policy, approvals and leave balance tracking.",
    icon: <CalendarDays className="h-5 w-5" />,
    href: ROUTES.leaveManagement,
  },
  {
    title: "Payroll",
    description: "Run payroll, manage salary structures, deductions and payslip generation.",
    icon: <Wallet className="h-5 w-5" />,
    href: ROUTES.payroll,
  },
  {
    title: "Recruitment",
    description: "Post jobs, track candidates and manage your hiring pipeline.",
    icon: <ClipboardList className="h-5 w-5" />,
    href: ROUTES.recruitment,
  },
  {
    title: "Performance",
    description: "Set goals, run appraisal cycles and track employee performance.",
    icon: <BarChart3 className="h-5 w-5" />,
    href: ROUTES.performance,
  },
  {
    title: "Employee Self Service",
    description: "Help employees apply leave, view payslips and update details on their own.",
    icon: <Smartphone className="h-5 w-5" />,
    href: ROUTES.employeeSelfService,
  },
  {
    title: "Asset Management",
    description: "Assign, track and recover company assets issued to employees.",
    icon: <PackageCheck className="h-5 w-5" />,
    href: ROUTES.assetManagement,
  },
  {
    title: "HR Automation",
    description: "Automate repetitive HR tasks with rules and triggers.",
    icon: <Workflow className="h-5 w-5" />,
    href: ROUTES.automation,
  },
  {
    title: "HR Analytics",
    description: "Understand workforce data with reports and dashboards.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: ROUTES.analytics,
  },
  {
    title: "Employee Lifecycle",
    description: "Manage onboarding, transfers, promotions and exits end to end.",
    icon: <Settings2 className="h-5 w-5" />,
    href: `${ROUTES.businessApps}#employee-lifecycle`,
  },
  {
    title: "Exit Management",
    description: "Handle resignations, clearance and full and final settlement.",
    icon: <DoorOpen className="h-5 w-5" />,
    href: ROUTES.exitManagement,
  },
  {
    title: "Mobile App",
    description: "Use Altroz HR on the go with the mobile HR app.",
    icon: <Smartphone className="h-5 w-5" />,
    href: ROUTES.employeeSelfService,
  },
  {
    title: "Approval Workflow",
    description: "Build multi-level approval workflows for leave, reimbursement and more.",
    icon: <CheckCircle2 className="h-5 w-5" />,
    href: ROUTES.automation,
  },
];

const gettingStarted = [
  {
    step: "1",
    title: "Getting Started with Altroz HR",
    description:
      "A quick overview of how Altroz HR works, so you can find your way around before you begin setup.",
  },
  {
    step: "2",
    title: "Create Your Company",
    description: "Set up your company profile, add your logo, working hours and basic details.",
  },
  {
    step: "3",
    title: "Add Employees",
    description: "Add employees one by one or import many employees at once using the employee template.",
  },
  {
    step: "4",
    title: "Configure Attendance",
    description: "Choose your attendance method, including GPS attendance, geo tracking and geo fencing.",
  },
  {
    step: "5",
    title: "Configure Leave",
    description: "Set up leave types, leave policy and yearly leave balances for your team.",
  },
  {
    step: "6",
    title: "Setup Payroll",
    description: "Define salary structures, pay cycles and statutory settings before your first payroll run.",
  },
  {
    step: "8",
    title: "Generate Documents",
    description: "Create offer letters, appointment letters and other HR documents from templates.",
  },
  {
    step: "9",
    title: "Create Approval Workflow",
    description: "Set up multi-level approvals for leave, reimbursement and other requests.",
  },
];

const troubleshooting = [
  {
    title: "Unable to Login",
    desc: "Trouble accessing your Altroz HR account.",
    steps: [
      "Check that you are using the correct company URL and registered email ID.",
      "Use the Forgot Password option to reset your password.",
      "Clear your browser cache or try a different browser.",
      "If the issue continues, raise a support request from the Help Center.",
    ],
  },
  {
    title: "Attendance Issues",
    desc: "Attendance not marking correctly or GPS location not detected.",
    steps: [
      "Make sure location permission is turned on for the Altroz HR mobile app.",
      "Check that geo fencing is configured correctly for your work location.",
      "Confirm you have a stable internet connection while marking attendance.",
      "Ask your HR admin to check the attendance settings for your profile.",
    ],
  },
  {
    title: "Leave Approval Problems",
    desc: "Leave requests stuck in pending or not routing to the right approver.",
    steps: [
      "Check that the approval workflow is correctly mapped to your reporting manager.",
      "Confirm the leave policy allows the leave type you have applied for.",
      "Ask your approver to check their pending approvals in Altroz HR.",
      "Contact your HR admin if the workflow needs to be corrected.",
    ],
  },
  {
    title: "Payroll Questions",
    desc: "Doubts about salary structure, deductions or payslip calculations.",
    steps: [
      "Review your salary structure under the Payroll module.",
      "Check statutory settings such as PF, ESI and TDS configuration.",
      "Compare the current payslip with the previous cycle for changes.",
      "Reach out to your HR or payroll admin for specific calculation queries.",
    ],
  },
  {
    title: "Employee Import Issues",
    desc: "Bulk employee import failing or showing errors.",
    steps: [
      "Download the latest Employee Import Template before uploading data.",
      "Check for missing mandatory fields such as employee ID or email.",
      "Make sure date formats match the template instructions.",
      "Fix the flagged rows and re-upload the corrected file.",
    ],
  },
  {
    title: "Notification Issues",
    desc: "Not receiving email, SMS or app notifications.",
    steps: [
      "Check your notification settings under Account Settings.",
      "Confirm your registered email ID and mobile number are correct.",
      "Check your spam or junk folder for missed emails.",
      "Ask your admin to verify notification rules for your module.",
    ],
  },
  {
    title: "Document Generation Issues",
    desc: "Letters or documents not generating correctly.",
    steps: [
      "Check that the employee profile has all required fields filled in.",
      "Confirm the correct document template is selected.",
      "Try generating the document again after refreshing the page.",
      "Contact support if the template itself needs correction.",
    ],
  },
];

const supportChannels: SupportCard[] = [
  {
    title: "Email Support",
    description: "Write to our support team and we’ll get back to you.",
    icon: <Mail className="h-5 w-5" />,
    href: ROUTES.contact,
  },
  {
    title: "Phone Support",
    description: "Speak directly with our support team during working hours.",
    icon: <Phone className="h-5 w-5" />,
    href: ROUTES.contact,
  },
  {
    title: "Book a Product Demo",
    description: "See Altroz HR in action with a guided walkthrough from our team.",
    icon: <BookOpen className="h-5 w-5" />,
    href: ROUTES.bookDemo,
  },
  {
    title: "Contact Sales",
    description: "Talk to our team about pricing, plans and implementation.",
    icon: <Handshake className="h-5 w-5" />,
    href: ROUTES.contact,
  },
];

const faqs = [
  {
    q: "What is Altroz HR?",
    a: "Altroz HR is a cloud-based HR software from Altroz Technologies Pvt. Ltd. that helps you manage employees, attendance, leave, payroll and more from one place.",
  },
  {
    q: "How do I get started with Altroz HR?",
    a: "Start with the Getting Started guide in this Help Center. It walks you through creating your company profile, adding employees and configuring core modules step by step.",
  },
  {
    q: "How do I add employees to Altroz HR?",
    a: "You can add employees one by one from the Employee Management module, or import many employees at once using the Employee Import Template available in the Downloads section.",
  },
  {
    q: "How does GPS attendance work in Altroz HR?",
    a: "GPS attendance uses the employee’s device location to mark attendance. It works along with geo tracking and geo fencing so attendance is recorded only from approved locations.",
  },
  {
    q: "Can I set up different leave policies for different employees?",
    a: "Yes, you can configure multiple leave types and leave policies in the Leave module and apply them based on employee groups or departments.",
  },
  {
    q: "How do I run payroll in Altroz HR?",
    a: "Set up salary structures and statutory settings first, then use the Payroll module to process your payroll cycle and generate payslips.",
  },
  {
    q: "What is Employee Self Service (ESS)?",
    a: "ESS allows employees to apply for leave, view payslips, update personal details and access company documents without depending on the HR team for every request.",
  },
  {
    q: "How do I set up an approval workflow?",
    a: "Go to the Approval Workflow section in settings and define approval levels for requests like leave and reimbursement based on your organisation structure.",
  },
  {
    q: "Can I use Altroz HR on mobile?",
    a: "Yes, Altroz HR has a Mobile HR App that lets employees and managers access attendance, leave, ESS and approvals on the go.",
  },
  {
    q: "I forgot my password. What should I do?",
    a: "Use the Forgot Password option on the login page to reset your password. If you still cannot log in, raise a support request from this Help Center.",
  },
  {
    q: "Why is my attendance not marking correctly?",
    a: "This is usually related to location permissions or geo fencing settings. Check the Troubleshooting section under Attendance Issues for step-by-step help.",
  },
  {
    q: "How do I generate offer letters and other documents?",
    a: "Use the Document Generation module to create letters from ready templates, filling in employee details automatically from their profile.",
  },
  {
    q: "Does Altroz HR support employee exit and full and final settlement?",
    a: "Yes, the Exit Management module helps you manage resignations, clearance and full and final settlement as part of the employee lifecycle.",
  },
  {
    q: "How do I contact support if I face an issue?",
    a: "You can raise a support request, email our support team or book a call using the options in the Need More Help section of this page.",
  },
  {
    q: "Where can I learn more about specific modules?",
    a: "Visit the Product Documentation section on this page for detailed guides on Overview, Configuration, Best Practices, FAQs and Troubleshooting for each module.",
  },
];

function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
    </div>
  );
}

export default function CompanySupportPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.support}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-success/10 blur-3xl" />

          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <LifeBuoy className="h-4 w-4" />
                Help Center
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                HR Software Help Center
                <span className="block">Find Answers, Guides and Support for Altroz HR</span>
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-ink-soft">
                Everything you need to set up, use and troubleshoot Altroz HR from Employee
                Management and Attendance to Payroll and HR Analytics. Search our knowledge base,
                browse product documentation or reach out to our support team.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
              <ScrollReveal className="lg:col-span-7">
                <div className="max-w-2xl rounded-[1.75rem] border border-border bg-white p-4 shadow-card">
                  <div className="flex items-center gap-3 rounded-[1.4rem] border border-primary/15 bg-surface/30 px-4 py-3">
                    <Search className="h-5 w-5 text-primary" />
                    <span className="text-sm text-ink-soft">Search help articles...</span>
                  </div>
                  <div className="mt-4 text-sm font-medium text-ink-soft">Popular Searches</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {popularSearches.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book a Demo
                  </Link>
                  <Link to={ROUTES.contact} className="btn-outline">
                    Contact Support
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal className="lg:col-span-5">
                <div className="soft-card relative overflow-hidden p-6">
                  <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      {
                        title: "Quick setup",
                        desc: "Find the right guide to get started fast.",
                        icon: <Settings2 className="h-5 w-5" />,
                      },
                      {
                        title: "Troubleshooting",
                        desc: "Resolve common issues with step-by-step help.",
                        icon: <ShieldCheck className="h-5 w-5" />,
                      },
                      {
                        title: "Product docs",
                        desc: "Browse module guidance and workflows.",
                        icon: <BookOpen className="h-5 w-5" />,
                      },
                      {
                        title: "Human support",
                        desc: "Reach out to the team when you need a hand.",
                        icon: <Headphones className="h-5 w-5" />,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-border bg-[#f4f8ff] p-4"
                      >
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                          {item.icon}
                        </div>
                        <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Browse Help Categories"
              title="Find the right help article for your module"
              description="Each card links to a module area where users can search for the right documentation and guidance."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="soft-card group flex h-full flex-col justify-between p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    View Articles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Getting Started"
              title="Beginner-friendly setup guides"
              description="Follow the steps in order to get Altroz HR ready for your team."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {gettingStarted.map((item) => (
                <div key={item.title} className="soft-card h-full p-5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white shadow-sm">
                      <span className="text-sm font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Troubleshooting"
              title="Common issues with clear next steps"
              description="Use these guides to resolve the most common problems users run into while using the platform."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              {troubleshooting.map((item) => (
                <article key={item.title} className="soft-card p-5">
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{item.desc}</p>
                  <div className="mt-4 grid gap-2">
                    {item.steps.map((step) => (
                      <div key={step} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-7 text-ink-soft">{step}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Need More Help?"
              title="Choose the support channel that works for you"
              description="Use the support options below for assistance, demos or sales conversations."
              align="center"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supportChannels.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="soft-card group flex h-full flex-col justify-between p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">{item.description}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Common questions about Altroz HR"
              description="Fifteen FAQs covering getting started, product usage, troubleshooting, implementation and support."
              align="center"
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Still need assistance?
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Our team is here to help you get the most out of Altroz HR. Reach out any time
                    if you need guidance, troubleshooting help or a guided demo.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={ROUTES.contact} className="btn-primary">
                      Contact Support
                    </Link>
                    <Link to={ROUTES.bookDemo} className="btn-outline">
                      Book Free Demo
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Docs", desc: "Product documentation", icon: <BookOpen className="h-4 w-4" /> },
                      { title: "Email", desc: "Write to support", icon: <Mail className="h-4 w-4" /> },
                      { title: "Phone", desc: "Speak to the team", icon: <Phone className="h-4 w-4" /> },
                      { title: "Demo", desc: "See Altroz HR live", icon: <LayoutDashboard className="h-4 w-4" /> },
                      { title: "Sales", desc: "Plans and pricing", icon: <Handshake className="h-4 w-4" /> },
                      { title: "Help", desc: "Troubleshooting support", icon: <CircleHelp className="h-4 w-4" /> },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className={cn(
                          "rounded-[1.35rem] border border-border p-4 shadow-card",
                          index % 2 === 0 ? "bg-primary-soft/30" : "bg-white",
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-ink">{item.title}</div>
                            <div className="mt-1 text-xs leading-5 text-ink-soft">{item.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
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
