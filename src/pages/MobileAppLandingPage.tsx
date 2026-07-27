"use client";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  Smartphone,
  Sparkles,
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
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";

const pageTitle = "Altroz HR Mobile App | Manage HR Anywhere, Anytime";
const pageDescription =
  "Give employees a modern HR mobile app to mark attendance, apply leave, check payslips and stay updated on company news - all from one secure app.";

const appExperienceCards = [
  {
    title: "Dashboard",
    desc: "A personalised home screen with attendance status, working hours, shortcuts, updates and alerts.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    desc: "Punch in and punch out on the move with GPS and location-based attendance options.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Payroll",
    desc: "View monthly salary summaries and download current or previous payslips instantly.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Leave",
    desc: "Apply for leave, track approvals and see balance updates without calling HR.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Tasks",
    desc: "Stay on top of assigned tasks and daily work without switching apps.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Profile",
    desc: "Securely view employee details, reporting manager, password and notification preferences.",
    icon: <Users className="h-5 w-5" />,
  },
];

const pocketWorkflows = [
  "Open the app and instantly see today's attendance status and working hours.",
  "Apply for leave and track approval status without calling HR.",
  "Download payslips the moment payroll is processed.",
  "Stay updated with company announcements and holiday calendars.",
  "Receive real-time alerts and notifications so nothing is missed.",
];

const topBenefits = [
  {
    title: "Apply leave anywhere",
    desc: "Employees can raise leave requests from the office, the field or while traveling.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Approve on the go",
    desc: "Managers can review and approve pending requests without waiting to get back to a desk.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "See balances instantly",
    desc: "Leave balances stay visible and accurate as soon as requests are approved.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Stay notified",
    desc: "Push-style alerts help employees and managers act quickly on important updates.",
    icon: <Bell className="h-5 w-5" />,
  },
];

const sectionFeatures = [
  {
    title: "Attendance Management",
    intro: "Accurate attendance, without the paperwork. The Altroz HR app makes it simple for employees to mark attendance correctly, wherever they are working from.",
    points: [
      "Punch In and Punch Out directly from the app.",
      "GPS and location-based attendance for field and mobile teams.",
      "Quick attendance history and weekly or monthly overviews.",
    ],
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Payroll on Mobile",
    intro: "Payroll information, always within reach. Employees no longer need to email HR or wait for a printed payslip.",
    points: [
      "View monthly salary summary inside the app.",
      "Download current and previous payslips in seconds.",
      "Keep salary information accessible without HR follow-up.",
    ],
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Leave & Holidays",
    intro: "Applying for leave and checking holidays should not require a phone call to HR. The Altroz HR app puts this control directly in employees' hands.",
    points: [
      "Apply for leave from web or mobile.",
      "Check leave balance before submitting a request.",
      "View the full holiday calendar and upcoming holidays.",
    ],
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Tasks & Notifications",
    intro: "Stay on top of daily work and company updates without switching apps.",
    points: [
      "View tasks assigned to you within the app.",
      "Receive real-time alerts and notifications for HR activity.",
      "See company-wide announcements inside the app.",
    ],
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Employee Profile",
    intro: "Every employee's information, securely available in one place.",
    points: [
      "Employee details, designation and core profile information.",
      "Reporting manager, email and phone at a glance.",
      "Change password and manage notification preferences securely.",
    ],
    icon: <Users className="h-5 w-5" />,
  },
];

const dashboardShows = [
  "A personalised greeting screen that welcomes each employee by name.",
  "Daily overview of working hours and current attendance status.",
  "Quick access shortcuts to attendance, leave, payroll and tasks.",
  "Today's updates, announcements and pending alerts, all in one workspace.",
];

const simpleNavItems = [
  { title: "Home", desc: "Today's snapshot", icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: "Attendance", desc: "Punch in and out", icon: <Clock3 className="h-5 w-5" /> },
  { title: "Leave", desc: "Apply and track", icon: <ClipboardList className="h-5 w-5" /> },
  { title: "Profile", desc: "Secure settings", icon: <Users className="h-5 w-5" /> },
];

const whyEmployeesLove = [
  {
    title: "Fewer HR follow-ups",
    desc: "Employees can check balances, status and history without waiting on manual replies.",
  },
  {
    title: "Everything in one place",
    desc: "Attendance, leave, payroll, tasks and profile data live inside the same app.",
  },
  {
    title: "Faster everyday actions",
    desc: "Common HR tasks become a few taps instead of emails, calls or paperwork.",
  },
  {
    title: "Better visibility",
    desc: "People know what is happening with attendance, leave and updates in real time.",
  },
];

const whoShouldUse = [
  "Employees",
  "HR managers",
  "Business owners",
  "Operations teams",
  "Field employees",
  "Sales teams",
  "Team leaders",
];

const bestExperience = [
  "Minimal Design - uncluttered screens that focus on what matters.",
  "Clean Interface - clear typography, spacing and visual hierarchy.",
  "Fast Navigation - every feature reachable in a tap or two.",
  "Responsive Layout - a consistent experience across mobile devices.",
  "Professional User Experience - designed to feel like a premium enterprise product.",
  "Modern Mobile UI - contemporary design language that employees enjoy using daily.",
];

const faqItems = [
  {
    q: "How do I download the Altroz HR Mobile App?",
    a: "You can use the Download App button on this page. Once installed, log in with the credentials shared by your HR team.",
  },
  {
    q: "How do employees log in to the app?",
    a: "Employees log in using the credentials provided by their organisation's HR team, and can change their password anytime from the Employee Profile section.",
  },
  {
    q: "Can employees mark attendance from the app?",
    a: "Yes. Employees can Punch In and Punch Out directly from the app, including GPS and location-based attendance.",
  },
  {
    q: "Can I download my payslip from the mobile app?",
    a: "Yes. The Payroll section lets employees view their monthly salary summary and download current and previous payslips.",
  },
  {
    q: "Can I apply for leave through the app?",
    a: "Yes. Employees can apply for leave, check their leave balance and track leave status directly from the app.",
  },
  {
    q: "Can I view my attendance history in the app?",
    a: "Yes. The Attendance section shows attendance history along with weekly and monthly overviews.",
  },
  {
    q: "Does the app show the company holiday calendar?",
    a: "Yes. Employees can view the full holiday calendar as well as upcoming holidays within the app.",
  },
  {
    q: "How do notifications and alerts work in the app?",
    a: "The app sends real-time alerts and notifications for important HR activity, along with company-wide announcements.",
  },
  {
    q: "Is my employee profile available inside the app?",
    a: "Yes. Employees can view their profile details, reporting manager, email and phone number in the Employee Profile section.",
  },
  {
    q: "Can employees manage notification preferences?",
    a: "Yes. Notification Preferences can be managed from within the Employee Profile section.",
  },
  {
    q: "How secure is the Altroz HR Mobile App?",
    a: "The app is protected with secure login and password controls, and employee data is accessible only through authenticated access.",
  },
  {
    q: "Can I check my working hours in the app?",
    a: "Yes. The Dashboard and Attendance sections show daily working hours along with current attendance status.",
  },
  {
    q: "Does the app show company announcements?",
    a: "Yes. Company Announcements are delivered directly to employees within the app.",
  },
  {
    q: "Can I view tasks assigned to me in the app?",
    a: "Yes. The Tasks section allows employees to view tasks assigned to them.",
  },
  {
    q: "Who can use the Altroz HR Mobile App?",
    a: "The app is designed for employees, HR managers, business owners, operations teams, field employees, sales teams and team leaders.",
  },
];

export default function MobileAppLandingPage() {
  const appUrl = typeof window !== "undefined" ? window.location.href : "";

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: new URL(ROUTES.home, typeof window !== "undefined" ? window.location.origin : "https://www.altrozhr.com").href,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Mobile App Landing",
          item: appUrl || new URL(ROUTES.mobileAppLanding, "https://www.altrozhr.com").href,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Altroz HR Mobile App",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS",
      description: pageDescription,
      url: appUrl || new URL(ROUTES.mobileAppLanding, "https://www.altrozhr.com").href,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO
        title={pageTitle}
        description={pageDescription}
        canonicalPath={ROUTES.mobileAppLanding}
        ogTitle={pageTitle}
        ogDescription={pageDescription}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <ScrollReveal className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  HR THAT FITS IN YOUR POCKET
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Altroz HR Mobile App - Manage HR Anywhere, Anytime
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                  Give your employees a modern HR mobile app to mark attendance, apply leave,
                  check payslips and stay updated on company news - all from one simple, secure
                  app. Built for businesses that move fast and teams that work from everywhere.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#app-overview" className="btn-primary">
                    Download App
                  </a>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
                  </Link>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-ink-soft">
                  Premium floating phone mockups showcase the Dashboard, Attendance and Payslip
                  screens side-by-side, giving visitors an instant preview of the real in-app
                  experience.
                </p>
              </ScrollReveal>

              <ScrollReveal className="relative">
                <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-4 bottom-4 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" />
                <div className="soft-card relative overflow-hidden p-5 sm:p-6">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="soft-card -mt-3 p-4 shadow-[0_18px_40px_rgba(11,92,255,0.08)]">
                      <div className="rounded-[1.25rem] border border-border bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              Dashboard
                            </div>
                            <div className="mt-2 text-lg font-bold text-ink">Today&apos;s view</div>
                          </div>
                          <LayoutDashboard className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="rounded-xl bg-primary-soft/70 px-3 py-2 text-xs font-semibold text-ink">
                            Attendance status
                          </div>
                          <div className="rounded-xl bg-surface/60 px-3 py-2 text-xs font-semibold text-ink">
                            Working hours
                          </div>
                          <div className="rounded-xl bg-surface/60 px-3 py-2 text-xs font-semibold text-ink">
                            Shortcuts and alerts
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="soft-card mt-3 p-4 shadow-[0_18px_40px_rgba(11,92,255,0.08)]">
                      <div className="rounded-[1.25rem] border border-border bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              Attendance
                            </div>
                            <div className="mt-2 text-lg font-bold text-ink">Punch In</div>
                          </div>
                          <Clock3 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl border border-border bg-surface/60 p-3 text-xs font-semibold text-ink">
                            GPS verified
                          </div>
                          <div className="rounded-2xl border border-border bg-surface/60 p-3 text-xs font-semibold text-ink">
                            Location based
                          </div>
                          <div className="rounded-2xl border border-border bg-primary-soft/60 p-3 text-xs font-semibold text-primary">
                            Punch In / Punch Out
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="soft-card mt-6 p-4 shadow-[0_18px_40px_rgba(11,92,255,0.08)]">
                      <div className="rounded-[1.25rem] border border-border bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              Payslip
                            </div>
                            <div className="mt-2 text-lg font-bold text-ink">Download now</div>
                          </div>
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="rounded-xl bg-primary-soft/70 px-3 py-2 text-xs font-semibold text-ink">
                            Current month
                          </div>
                          <div className="rounded-xl bg-surface/60 px-3 py-2 text-xs font-semibold text-ink">
                            Previous slips
                          </div>
                          <div className="rounded-xl bg-surface/60 px-3 py-2 text-xs font-semibold text-ink">
                            Salary summary
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-16 lg:pb-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-4xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Experience HR in your pocket
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                HR should never be limited to a desk
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                With the Altroz HR Mobile App, employees and managers carry their entire HR
                workspace with them - whether they are on the shop floor, at a client site,
                travelling between locations, or working from home.
              </p>
            </ScrollReveal>

            <div className="mt-8 rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Built around the way your team actually works
                  </div>
                  <div className="mt-4 space-y-3">
                    {pocketWorkflows.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surface/35 p-4">
                        <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <p className="text-sm leading-7 text-ink">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="soft-card p-5 sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Everything you need in one mobile app
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {appExperienceCards.map((card) => (
                      <article key={card.title} className="soft-card h-full p-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                          {card.icon}
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-ink">{card.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-ink-soft">{card.desc}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="app-overview" className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <ScrollReveal>
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Dashboard experience
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  The Dashboard is the first screen employees see
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                  The Dashboard is the first screen employees see when they open the Altroz HR app
                  - a clean workspace built around what matters most each day.
                </p>

                <div className="mt-6 space-y-3">
                  {dashboardShows.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
                      <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-7 text-ink">{item}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal className="soft-card relative overflow-hidden p-5 sm:p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />
                <div className="rounded-[1.5rem] border border-border bg-white p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    What the dashboard shows
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "A personalised greeting screen that welcomes each employee by name.",
                      "Daily overview of working hours and current attendance status.",
                      "Quick access shortcuts to attendance, leave, payroll and tasks.",
                      "Today&apos;s updates, announcements and pending alerts, all in one workspace.",
                    ].map((item) => (
                      <div key={item} className="soft-card p-4 text-sm leading-7 text-ink">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-ink-soft">
                    Instead of digging through menus, employees get instant access to the HR
                    functions they use every day - right from the home screen.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Mobile benefits
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Why teams choose mobile leave workflows
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                Mobile access makes leave management faster for employees and easier for managers,
                especially when teams are spread across locations.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" step={70}>
              {topBenefits.map((item) => (
                <article key={item.title} className="soft-card h-full p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="flex flex-col gap-3 text-center lg:text-left">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Everything in one mobile app
                </div>
                <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  All essential HR functions at your fingertips
                </h2>
                <p className="max-w-3xl text-sm leading-7 text-ink-soft sm:text-base">
                  A single app that brings together every essential HR function your workforce
                  needs - no switching between tools, no confusion.
                </p>
              </div>

              <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" step={55}>
                {sectionFeatures.map((item) => (
                  <article key={item.title} className="soft-card h-full p-5">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{item.intro}</p>
                    <div className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm leading-7 text-ink-soft">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </StaggerReveal>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
              <ScrollReveal className="soft-card p-6 sm:p-8">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Simple navigation
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  A minimal navigation bar that keeps everything close
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  The Altroz HR app is built around a simple, minimal navigation bar so employees
                  can reach any feature in a tap or two.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {simpleNavItems.map((item) => (
                    <div key={item.title} className="soft-card flex items-start gap-3 p-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ink">{item.title}</div>
                        <div className="text-sm leading-6 text-ink-soft">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-ink-soft">
                  This simple four-point structure means employees never have to search for a
                  feature - everything important is always within reach.
                </p>
              </ScrollReveal>

              <ScrollReveal className="soft-card p-6 sm:p-8">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Tasks and notifications
                </div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Stay on top of daily work and company updates
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Employees can view tasks assigned to them within the app, helping them stay
                  organised and on schedule.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="soft-card p-4">
                    <div className="text-sm font-bold text-ink">Task Management</div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      Employees can view tasks assigned to them within the app, helping them stay
                      organised and on schedule.
                    </p>
                  </div>
                  <div className="soft-card p-4">
                    <div className="text-sm font-bold text-ink">Alerts, Announcements & Notifications</div>
                    <p className="mt-2 text-sm leading-7 text-ink-soft">
                      The app sends real-time alerts and notifications for important HR activity,
                      along with company-wide announcements.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                Why employees love the app
              </div>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                A cleaner way to handle everyday HR work
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                The page is structured around what mobile users care about most: speed, clarity,
                visibility and fewer follow-ups.
              </p>
            </ScrollReveal>

            <StaggerReveal className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4" step={60}>
              {whyEmployeesLove.map((item) => (
                <article key={item.title} className="soft-card h-full p-5">
                  <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="flex flex-col gap-3 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Who should use the app
                </div>
                <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Built for every kind of team
                </h2>
                <p className="mx-auto max-w-3xl text-base leading-7 text-ink-soft">
                  The Altroz HR Mobile App is built for every kind of team - from head-office
                  staff to employees working across multiple sites.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {whoShouldUse.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-surface/40 px-4 py-2 text-sm font-medium text-ink shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="flex flex-col gap-3 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Best mobile experience
                </div>
                <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Designed to make everyday HR tasks effortless
                </h2>
                <p className="mx-auto max-w-3xl text-base leading-7 text-ink-soft">
                  Every screen in the Altroz HR app is designed with one goal - make everyday HR
                  tasks effortless.
                </p>
              </div>

              <StaggerReveal className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" step={55}>
                {bestExperience.map((item) => {
                  const [label, description] = item.split(" - ");
                  return (
                    <article key={item} className="soft-card h-full p-5">
                      <div className="text-lg font-bold text-ink">{label}</div>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{description}</p>
                    </article>
                  );
                })}
              </StaggerReveal>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="rounded-[2rem] border border-border bg-white p-6 shadow-float sm:p-8">
              <div className="flex flex-col gap-3 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                  Frequently asked questions
                </div>
                <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  Questions about the mobile app
                </h2>
              </div>

              <Accordion type="single" collapsible className="mt-8 space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="overflow-hidden rounded-[1.35rem] border border-border bg-surface/35 px-4"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline [&>svg]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="site-container">
            <ScrollReveal className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Take HR wherever you go
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Empower your employees with a modern HR experience designed for productivity,
                    convenience, and smarter workforce management.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <a href="#app-overview" className="btn-primary">
                    Download App
                  </a>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {schema.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <Footer />
    </div>
  );
}
