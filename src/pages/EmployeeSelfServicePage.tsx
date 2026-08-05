import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  UserRound,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

const heroMetrics = [
  { label: "Access", value: "Web, Android, iOS" },
  { label: "Focus", value: "Employee and manager self-service" },
  { label: "Result", value: "Less HR dependency" },
];

const heroHighlights = [
  "Check attendance, leave balance and salary slips in one place",
  "Keep employees updated with announcements and holiday info",
  "Reduce repetitive HR questions with direct self-service access",
  "Make everyday HR actions faster, clearer and easier to use",
];

const essOverviewCards = [
  {
    title: "Employee Dashboard",
    desc: "One screen view of attendance, leave balance, salary slips and announcements.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Attendance & Leave",
    desc: "View attendance history and apply for leave in a few clicks.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Salary Slip Download",
    desc: "Employees download salary slips directly from the employee portal.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Company Announcements",
    desc: "Share HR updates, policies, and notifications instantly across the workforce.",
    icon: <Bell className="h-5 w-5" />,
  },
];

const portalCapabilities = [
  {
    title: "Employee Login",
    desc: "A secure employee login portal to access all self-service features.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Attendance Records",
    desc: "View attendance records from the employee attendance portal.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Attendance History",
    desc: "Look back at attendance history for any earlier period.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Leave Request",
    desc: "Submit leave requests through the leave management portal.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Leave Balance",
    desc: "Check current leave balance before applying for leave.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Leave History",
    desc: "View a complete history of leave requests and their status.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Salary Slips",
    desc: "Download salary slips directly from the salary slip portal.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Holiday Calendar",
    desc: "Access the company holiday calendar for the year ahead.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Company Announcements",
    desc: "Read important company announcements as they are shared.",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Employee Dashboard",
    desc: "One dashboard covering attendance, leave, salary and updates.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const dashboardHighlights = [
  "Today's attendance",
  "Leave balance",
  "Salary slips",
  "Attendance history",
  "Holiday calendar",
  "Announcements",
];

const benefits = [
  "Less HR dependency",
  "Faster employee access",
  "Paperless HR",
  "Higher employee satisfaction",
  "Easy attendance tracking",
  "Quick leave requests",
  "Easy salary slip access",
  "Better communication",
];

const reasons = [
  "User-friendly interface",
  "Secure cloud-based platform",
  "Mobile and web access",
  "Real-time information",
  "Faster HR processes",
  "Role-based access control",
  "Seamless employee experience",
  "Dedicated customer support",
];

const faqs = [
  {
    question: "What is an Employee Self Service Portal?",
    answer:
      "An Employee Self Service Portal is an employee login portal where employees can view attendance, apply for leave, check leave balance, download salary slips and read company announcements on their own, without depending on HR for each request.",
  },
  {
    question: "How does the Employee Self Service Portal reduce HR dependency?",
    answer:
      "Since employees can access attendance, leave and salary information directly through the employee portal, HR teams do not need to answer the same routine questions repeatedly.",
  },
  {
    question: "Can employees download salary slips from the portal?",
    answer:
      "Yes. The salary slip portal inside the Employee Self Service Portal allows employees to download their salary slips whenever they need them.",
  },
  {
    question: "How do employees apply for leave through the portal?",
    answer:
      "Employees can submit a leave request directly through the leave management portal and track its status through leave history.",
  },
  {
    question: "Can employees check their leave balance online?",
    answer:
      "Yes. Leave balance is visible on the employee dashboard as well as inside the leave management portal, so employees always know how much leave they have left.",
  },
  {
    question: "Does the Employee Self Service Portal show attendance history?",
    answer:
      "Yes. The employee attendance portal lets employees view both current attendance and detailed attendance history.",
  },
  {
    question: "Is the holiday calendar available inside the employee portal?",
    answer:
      "Yes. The holiday calendar is available on the Employee Self Service Portal so employees can plan ahead around upcoming holidays.",
  },
  {
    question: "How do employees stay updated with company announcements?",
    answer:
      "All company announcements are published inside the Employee Self Service Portal, so every employee sees updates in one place.",
  },
  {
    question: "Is the employee login portal secure?",
    answer:
      "Yes. Each employee logs in through their own secure employee login portal to access personal HR information, keeping individual records private to each login.",
  },
  {
    question: "Who should use an Employee Self Service Software?",
    answer:
      "Any business that wants to reduce manual HR work and give employees direct access to attendance, leave and salary information should use an Employee Self Service Portal like Altroz HRMS.",
  },
];

function FeatureIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
      {icon}
    </div>
  );
}

export default function EmployeeSelfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Employee Self Service Portal | Altroz HRMS"
        description="Altroz HRMS gives every employee a secure self-service portal to check attendance, apply for leave, download salary slips and stay updated with company announcements."
        canonicalPath={ROUTES.employeeSelfService}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden scroll-mt-24">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-6 lg:grid-cols-12 lg:items-start lg:py-8">
            <ScrollReveal variant="fade-up" className="lg:col-span-6 self-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted Employee Self Service Portal
              </span>

              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Employee Self Service Portal built for simpler, faster HR
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz HRMS gives every employee a single Employee Self Service Portal to check
                attendance, apply for leave, download salary slips and stay updated with company
                announcements without waiting on HR for every small request.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary">
                  Book a Free Demo
                </a>
                <a href="#features" className="btn-outline">
                  Explore Employee Portal
                </a>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card h-full p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 max-w-xl rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  What this page covers
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6 self-start">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src="/employee-self-service/hero.jpg"
                      alt="Employee self service portal preview"
                      className="block h-auto w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Dashboard", value: "Everything at a glance" },
                      { label: "Attendance", value: "Track and review easily" },
                      { label: "Salary slips", value: "Download anytime" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-surface p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {item.label}
                        </div>
                        <div className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <LayoutDashboard className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          Employee dashboard
                        </div>
                        <div className="text-lg font-bold text-ink">HR information, instantly accessible</div>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        "Today's attendance",
                        "Leave balance",
                        "Salary slips",
                        "Attendance history",
                        "Holiday calendar",
                        "Announcements",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                          <span className="text-sm leading-6 text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What ESS does
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A secure portal that puts everyday HR actions in employee hands
              </h2>
              <p className="mt-4 text-ink-soft">
                This section mirrors the source content and focuses on the most useful self-service
                actions employees want to complete without waiting on HR.
              </p>
            </ScrollReveal>

            <StaggerReveal step={85} className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {essOverviewCards.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <FeatureIcon icon={item.icon} />
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="features" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Everything employees need
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Everything employees need in one portal
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                The Altroz Employee Self Service Portal brings together every routine HR task
                employees look for, inside one employee portal.
              </p>
            </ScrollReveal>

            <StaggerReveal step={70} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {portalCapabilities.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <FeatureIcon icon={item.icon} />
                    <div>
                      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
            <ScrollReveal variant="fade-up" className="soft-card h-full p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Employee dashboard
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                HR information, instantly accessible
              </h2>
              <p className="mt-4 text-ink-soft">
                The Employee Dashboard is the starting point of the Employee Self Service Portal.
                The moment an employee logs in, they land on a clean dashboard that brings together
                the information they need most.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Today's attendance and attendance history",
                  "Leave balance before time off is planned",
                  "Salary slips for quick download",
                  "Holiday calendar and announcements in one view",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-border bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Dashboard snapshot
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {dashboardHighlights.map((item) => (
                    <div key={item} className="rounded-xl bg-surface px-3 py-3 text-sm text-ink">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={90} className="h-full">
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-white p-4 shadow-float">
                <img
                  src="/employee-self-service/mobile-access.jpg"
                  alt="Mobile self service portal preview"
                  className="h-full min-h-[520px] w-full rounded-[1.5rem] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Benefits
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The ESS experience makes HR lighter and employees happier
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                These benefits show up quickly once Employee Self Service becomes part of the daily
                routine for both employees and HR teams.
              </p>
            </ScrollReveal>

            <StaggerReveal step={70} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((item) => (
                <div key={item} className="soft-card flex items-start gap-3 p-5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm leading-6 text-ink">{item}</span>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why choose Altoz HRMS ESS
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Built for ease of use, security and smoother daily HR operations
              </h2>
              <p className="mt-4 text-ink-soft">
                Businesses choose the Altroz Employee Self Service Portal because it stays focused
                on what actually matters to employees and HR teams.
              </p>
            </ScrollReveal>

            <StaggerReveal step={70} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <article key={item} className="soft-card p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-medium leading-6 text-ink">{item}</div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A few common questions about ESS
              </h2>
              <div className="mt-6 rounded-[1.5rem] border border-border bg-white px-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pr-8 text-sm leading-6 text-ink-soft">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={120} className="soft-card p-6 lg:col-span-5 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Final CTA
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Give your employees a better way to access HR
              </h2>
              <p className="mt-4 text-ink-soft">
                See how the Altroz Employee Self Service Portal simplifies attendance, leave and
                salary slip access for your entire team.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "One employee login portal",
                  "Attendance, leave and salary in one view",
                  "Less manual HR effort and fewer repetitive queries",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary justify-center">
                  Book Your Free Demo Today
                </a>
                <a href={ROUTES.contact} className="btn-outline justify-center">
                  Talk to Our Team
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
