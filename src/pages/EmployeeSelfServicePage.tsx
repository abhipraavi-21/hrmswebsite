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
  Fingerprint,
  Globe2,
  HelpCircle,
  LayoutDashboard,
  MapPin,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";

const heroMetrics = [
  { label: "Access", value: "Web, Android, iOS" },
  { label: "Focus", value: "Employee and manager self-service" },
  { label: "Result", value: "Less HR dependency" },
];

const essHighlights = [
  {
    title: "Attendance management",
    desc: "Track daily attendance, working hours, overtime, late marks, and attendance history in real time.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Leave management",
    desc: "Apply for leave, check balances, monitor history, and follow approval status with ease.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Salary slips",
    desc: "View and download monthly salary slips securely whenever employees need them.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Company announcements",
    desc: "Share HR updates, policies, and notifications instantly across the workforce.",
    icon: <Bell className="h-5 w-5" />,
  },
];

const keyFeatures = [
  {
    title: "Shift management",
    desc: "Let employees review assigned shifts, weekly offs, and timing changes.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Employee profile",
    desc: "Update personal details, emergency contacts, and other employee information.",
    icon: <UserRound className="h-5 w-5" />,
  },
  {
    title: "Help desk",
    desc: "Raise support requests and connect directly with HR for assistance.",
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: "Resignation management",
    desc: "Submit resignation requests online and track the process transparently.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Holiday calendar",
    desc: "Stay informed about company holidays, public holidays, and upcoming events.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Secure access",
    desc: "Use a secure portal with role-based access controls and protected data.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Mobile-first access",
    desc: "Use the portal on Android, iOS, or the web from anywhere.",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    title: "Instant alerts",
    desc: "Receive updates for approvals, requests, and policy changes without delay.",
    icon: <Bell className="h-5 w-5" />,
  },
];

const managerTools = [
  "Approve or reject leave requests",
  "Approve attendance regularization",
  "Monitor team attendance",
  "View team leave calendar",
  "Track team reports",
  "Review employee activity",
];

const smartAttendance = [
  {
    title: "GPS attendance",
    desc: "Capture attendance accurately from a defined location.",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Geo-location attendance",
    desc: "Use location-aware check-ins for field and distributed teams.",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    title: "Biometric integration",
    desc: "Connect biometric devices for reliable time capture.",
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Face recognition",
    desc: "Support face-based verification where you need stronger controls.",
    icon: <ScanFace className="h-5 w-5" />,
  },
  {
    title: "Selfie attendance",
    desc: "Let employees check in with a photo-based attendance flow.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
];

const dashboardItems = [
  "Present / absent status",
  "Leave balance",
  "Salary information",
  "Upcoming holidays",
  "Birthday reminders",
  "Notifications",
  "Assigned tasks",
  "Attendance summary",
];

const benefits = [
  "Reduce dependency on HR teams",
  "Improve employee productivity",
  "Faster leave approvals",
  "Easy access to HR information",
  "Paperless HR processes",
  "Secure access from anywhere",
  "Real-time updates and notifications",
  "Better employee experience",
];

const whyChoose = [
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
    question: "What is Employee Self Service (ESS)?",
    answer:
      "ESS is a secure portal that lets employees manage attendance, leave, salary slips, profile updates, and HR requests on their own.",
  },
  {
    question: "Can employees access ESS on mobile devices?",
    answer:
      "Yes. The ESS experience is designed for Android, iOS, and web access so employees can use it from almost anywhere.",
  },
  {
    question: "Can employees download salary slips?",
    answer: "Yes. Employees can securely view and download salary slips whenever they need them.",
  },
  {
    question: "Can managers approve leave requests?",
    answer:
      "Yes. Managers can approve or reject leave requests, review attendance, and see team activity from the manager view.",
  },
  {
    question: "Is employee data secure?",
    answer:
      "Yes. The portal uses secure authentication and role-based access to help protect employee information.",
  },
];

export default function EmployeeSelfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Employee Self Service
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Empower your employees with a smart self-service portal
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                Give employees control over attendance, leave, salary slips, announcements, and more
                from a secure web portal or mobile app, anytime and anywhere.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book a free demo
                </a>
                <a href="#features" className="btn-outline">
                  Explore ESS features
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src="/employee-self-service/hero.jpg"
                      alt="Employee self service portal preview"
                      width={1200}
                      height={640}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                What ESS does
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A secure portal that puts everyday HR actions in employee hands
              </h2>
              <p className="mt-3 text-ink-soft">
                This section mirrors the reference content and focuses on the most useful self
                service actions employees want to complete without waiting on HR.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {essHighlights.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-surface scroll-mt-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Key features
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Everything employees and managers need in one place
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {keyFeatures.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-border bg-white p-4 shadow-float">
                <img
                  src="/employee-self-service/mobile-access.jpg"
                  alt="Mobile self service portal preview"
                  width={768}
                  height={1152}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Mobile access and approvals
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Manager self service keeps approvals moving
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Managers can approve or reject leave, review attendance regularization, and keep a
                close eye on team activity without digging through spreadsheets or email chains.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {managerTools.map((item) => (
                  <div key={item} className="soft-card flex items-center gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Smart attendance options
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Capture attendance the way your teams actually work
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {smartAttendance.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Employee dashboard
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Give employees a clear, useful dashboard at a glance
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                The dashboard keeps the essentials visible so employees can move quickly from one
                task to the next.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {dashboardItems.map((item) => (
                  <div key={item} className="soft-card flex items-center gap-3 p-4">
                    <LayoutDashboard className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="soft-card overflow-hidden p-4">
                <div className="rounded-[1.4rem] bg-[#eef6ff] p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Employee profile
                      </div>
                      <div className="mt-2 text-sm text-ink-soft">
                        Keep personal information, emergency contacts, and documents organized.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-success">
                        Notifications
                      </div>
                      <div className="mt-2 text-sm text-ink-soft">
                        Deliver status updates and reminders in real time.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Salary slips
                      </div>
                      <div className="mt-2 text-sm text-ink-soft">
                        Download monthly salary information securely whenever needed.
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-success">
                        Help desk
                      </div>
                      <div className="mt-2 text-sm text-ink-soft">
                        Raise support requests without losing context.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Benefits
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                The ESS experience makes HR lighter and employees happier
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((item) => (
                <div key={item} className="soft-card flex items-start gap-3 p-5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why choose Altoz HRMS ESS
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Built for ease of use, security, and smoother daily HR operations
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {whyChoose.map((item) => (
                <div key={item} className="soft-card p-5">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-medium text-ink">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-surface">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Frequently asked questions
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                A few common questions about ESS
              </h2>
              <p className="mt-3 text-ink-soft">
                These answers keep the page aligned with the source content while making the next
                step clearer.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="soft-card overflow-hidden p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-base font-semibold text-ink no-underline hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-ink-soft">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="rounded-[2rem] bg-gradient-to-r from-primary to-[#0a4fda] px-6 py-10 text-white shadow-float md:px-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white/90">
                    Ready to simplify employee experience?
                  </span>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    Empower your workforce with a secure, user-friendly ESS portal
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-white/90">
                    Reduce HR workload, improve productivity, and give employees fast access to the
                    information they need.
                  </p>
                </div>

                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <a
                    href="/company/book-demo"
                    className="btn-success bg-white text-primary hover:bg-white/90"
                  >
                    Book your free demo
                    <ArrowRight className="h-4 w-4" />
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
