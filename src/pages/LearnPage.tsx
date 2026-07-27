import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Layers3,
  Lightbulb,
  LockKeyhole,
  NotebookPen,
  Sparkles,
  Users,
  Wallet,
  Workflow,
  FileText,
  Smartphone,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

type HighlightCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type CategoryCard = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ReactNode;
};

type GuideCard = {
  title: string;
  description: string;
  readingTime: string;
  category: string;
  difficulty: string;
  href: string;
};

type LearningPath = {
  title: string;
  description: string;
  steps: string[];
};

type BestPractice = {
  title: string;
  description: string;
};

type TrustCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FaqItem = {
  question: string;
  answer: string;
};

const seoTitle = "HR Learning Resources | HR Guides, Best Practices & Compliance | Altroz HR";
const seoDescription =
  "Explore free HR learning resources from Altroz HR. Guides on attendance, payroll, leave, recruitment, compliance and HR automation for growing businesses.";

const heroHighlights: HighlightCard[] = [
  {
    title: "HR Learning",
    description: "Structured, easy-to-follow content that helps you understand core HR processes.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Expert Guides",
    description: "Practical guides written around real HR situations, not just theory.",
    icon: <NotebookPen className="h-5 w-5" />,
  },
  {
    title: "Free Resources",
    description: "Every guide, topic and best practice on this page is free to read.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

const categoryCards: CategoryCard[] = [
  {
    id: "hr-guides",
    title: "HR Guides",
    description: "Foundational reading on core HR processes and how they fit together.",
    cta: "View HR Guides",
    href: ROUTES.coreHR,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "attendance-management",
    title: "Attendance Management",
    description: "Learn how daily attendance, GPS check-ins and geo-fencing keep records accurate.",
    cta: "Learn Attendance",
    href: ROUTES.attendanceManagement,
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    id: "payroll",
    title: "Payroll",
    description: "Understand how salary calculation, deductions and payroll cycles actually work.",
    cta: "Learn Payroll",
    href: ROUTES.payroll,
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: "leave-management",
    title: "Leave Management",
    description: "Everything about leave policies, balances, approvals and planning.",
    cta: "Learn Leave Management",
    href: ROUTES.leaveManagement,
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    id: "recruitment",
    title: "Recruitment",
    description: "How structured hiring reduces time-to-hire and improves candidate quality.",
    cta: "Learn Recruitment",
    href: ROUTES.recruitment,
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    id: "performance",
    title: "Performance",
    description: "Guides on goal setting, reviews and continuous feedback.",
    cta: "Learn Performance",
    href: ROUTES.performance,
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "employee-self-service",
    title: "Employee Self Service",
    description: "How ESS portals reduce HR's daily workload and empower employees.",
    cta: "Learn ESS",
    href: ROUTES.employeeSelfService,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Tracking company assets issued to employees, from laptops to ID cards.",
    cta: "Learn Asset Management",
    href: ROUTES.assetManagement,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "hr-automation",
    title: "HR Automation",
    description: "Where automation fits into HR and which tasks benefit most.",
    cta: "Learn HR Automation",
    href: ROUTES.automation,
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: "hr-analytics",
    title: "HR Analytics",
    description: "Turning HR data into decisions leadership can act on.",
    cta: "Learn HR Analytics",
    href: ROUTES.analytics,
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "workforce-management",
    title: "Workforce Management",
    description: "Planning shifts, schedules and workforce availability efficiently.",
    cta: "Learn Workforce Management",
    href: ROUTES.workforce,
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "exit-management",
    title: "Exit Management",
    description: "Handling resignations, notice periods and full-and-final settlement smoothly.",
    cta: "Learn Exit Management",
    href: ROUTES.exitManagement,
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: "document-generation",
    title: "Document Generation",
    description: "Creating consistent, compliant HR letters and documents at scale.",
    cta: "Learn Document Generation",
    href: ROUTES.documentGeneration,
    icon: <NotebookPen className="h-5 w-5" />,
  },
  {
    id: "mobile-hr",
    title: "Mobile HR",
    description: "How mobile access changes the way employees and managers use HR day to day.",
    cta: "Learn Mobile HR",
    href: ROUTES.employeeSelfService,
    icon: <MapPinned className="h-5 w-5" />,
  },
];

const guideCards: GuideCard[] = [
  {
    title: "Complete HRMS Buying Guide",
    description: "What to check before choosing an HRMS, from must-have modules to implementation support.",
    readingTime: "9 min",
    category: "HR Software",
    difficulty: "Beginner",
    href: ROUTES.coreHR,
  },
  {
    title: "Attendance Management Guide",
    description: "How GPS attendance, geo-tracking and geo-fencing keep attendance data accurate.",
    readingTime: "7 min",
    category: "Attendance",
    difficulty: "Beginner",
    href: ROUTES.attendanceManagement,
  },
  {
    title: "Payroll Management Guide",
    description: "A walkthrough of the payroll cycle, from attendance input to payslip generation.",
    readingTime: "8 min",
    category: "Payroll",
    difficulty: "Intermediate",
    href: ROUTES.payroll,
  },
  {
    title: "Leave Management Guide",
    description: "Setting up fair, transparent leave policies that employees actually understand.",
    readingTime: "6 min",
    category: "Leave",
    difficulty: "Beginner",
    href: ROUTES.leaveManagement,
  },
  {
    title: "Employee Lifecycle Guide",
    description: "Everything from onboarding and promotion to transfer and exit, explained stage by stage.",
    readingTime: "10 min",
    category: "Core HR",
    difficulty: "Intermediate",
    href: ROUTES.coreHR,
  },
  {
    title: "Performance Management Guide",
    description: "Building a performance review process that feels fair, not just formal.",
    readingTime: "8 min",
    category: "Performance",
    difficulty: "Intermediate",
    href: ROUTES.performance,
  },
  {
    title: "HR Automation Guide",
    description: "Which repetitive HR tasks to automate first, and the impact it has on your team.",
    readingTime: "7 min",
    category: "Automation",
    difficulty: "Intermediate",
    href: ROUTES.automation,
  },
  {
    title: "HR Analytics Guide",
    description: "Turning attendance, payroll and performance data into decisions leadership trusts.",
    readingTime: "9 min",
    category: "Analytics",
    difficulty: "Advanced",
    href: ROUTES.analytics,
  },
];

const learningPaths: LearningPath[] = [
  {
    title: "Beginner HR",
    description: "Start with the basics - attendance, leave and payroll fundamentals - before moving to advanced topics.",
    steps: ["HR fundamentals", "Attendance", "Payroll", "Leave", "ESS", "Reports"],
  },
  {
    title: "Growing Business",
    description: "Learn how to introduce structure and self-service as your headcount increases.",
    steps: ["Employee records", "Approvals", "Self-service", "Automation", "Reporting"],
  },
  {
    title: "Enterprise HR",
    description: "Explore workforce planning, analytics and compliance at scale across multiple locations.",
    steps: ["Branches", "Roles and access", "Attendance", "Payroll", "Analytics", "Compliance"],
  },
  {
    title: "HR Manager",
    description: "Sharpen day-to-day HR execution - approvals, documentation, performance and exits.",
    steps: ["Approvals", "Documents", "Performance", "Exit workflows", "Team reporting"],
  },
  {
    title: "Business Owner",
    description: "Understand HR at a high level so you can guide decisions without managing every detail.",
    steps: ["HR strategy", "Workforce visibility", "Cost control", "Process clarity", "Leadership reports"],
  },
  {
    title: "Operations Team",
    description: "Focus on attendance, shift planning and workforce management for field and floor teams.",
    steps: ["Shift planning", "Attendance accuracy", "Field teams", "Workforce planning"],
  },
];

const bestPractices: BestPractice[] = [
  {
    title: "Attendance Best Practices",
    description:
      "Mark attendance consistently, verify GPS check-ins for field staff, and review exceptions daily instead of at month-end.",
  },
  {
    title: "Payroll Best Practices",
    description:
      "Lock attendance and leave data before running payroll, and keep a clear audit trail for every payroll cycle.",
  },
  {
    title: "Leave Policies",
    description: "Write leave policies in plain language and make balances visible to employees at all times.",
  },
  {
    title: "Employee Documentation",
    description: "Keep offer letters, ID proofs and appraisal records centralised and easy to retrieve.",
  },
  {
    title: "Exit Process",
    description: "Use a clear checklist for notice period, asset return, and full-and-final settlement to avoid disputes.",
  },
  {
    title: "Performance Reviews",
    description: "Set goals early in the cycle, gather feedback continuously, and avoid surprises at review time.",
  },
  {
    title: "Employee Engagement",
    description: "Recognise contributions regularly and act on employee feedback, not just collect it.",
  },
  {
    title: "Shift Planning",
    description: "Plan shifts around actual workload data, not assumptions, and share schedules well in advance.",
  },
];

const trustCards: TrustCard[] = [
  {
    title: "Easy to Understand",
    description: "Written in simple language, without unnecessary HR jargon.",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "Practical Examples",
    description: "Concepts explained with everyday HR situations, not abstract theory.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Industry Focused",
    description: "Guides reflect how HR actually works across different business sizes.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Updated Content",
    description: "Content is reviewed to stay aligned with how HR practices evolve.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Modern HR Practices",
    description: "Coverage includes current approaches like GPS attendance and HR automation.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Actionable Guides",
    description: "Every guide is built to be applied, not just read.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Written by HR Experts",
    description: "Created with HR and product knowledge from people who understand real workflows.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Easy Navigation",
    description: "Organised by category, topic and learning path so you find what you need quickly.",
    icon: <Layers3 className="h-5 w-5" />,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What is Altroz HR's Learn page?",
    answer:
      "It is a free HR learning hub by Altroz HR with guides, best practices and topic explainers on attendance, payroll, leave, recruitment, compliance and more.",
  },
  {
    question: "Is the HR learning content on this page free?",
    answer: "Yes. All guides, topics and best practices on this page are free to read and do not require sign-up.",
  },
  {
    question: "Who should use these HR learning resources?",
    answer:
      "HR professionals, business owners, managers, startups, SMEs and enterprise HR teams who want to understand HR processes better.",
  },
  {
    question: "Do I need to use Altroz HR software to read these guides?",
    answer:
      "No. The guides are written to help anyone learn HR concepts, whether or not they use Altroz HR.",
  },
  {
    question: "What HR topics are covered in the Learn section?",
    answer:
      "Attendance, payroll, leave management, recruitment, performance, employee self service, asset management, HR automation, HR analytics, workforce management, exit management and document generation.",
  },
  {
    question: "How is Altroz HR's content different from generic HR blogs?",
    answer:
      "Content is written around real HR workflows and practical examples, focused on how HR teams actually work day to day.",
  },
  {
    question: "Does Altroz HR cover HR compliance topics?",
    answer:
      "Yes, compliance-related topics are covered as part of the HR Guides and Popular HR Topics sections, with more compliance guides planned.",
  },
  {
    question: "Can small businesses and startups benefit from these guides?",
    answer:
      "Yes. The Beginner HR and Growing Business learning paths are designed specifically for smaller teams building their HR processes.",
  },
  {
    question: "How often is new HR learning content added?",
    answer:
      "New guides, topics and best practices are added regularly as this page grows into a complete HR knowledge center.",
  },
  {
    question: "How do I explore Altroz HR's HRMS solutions after learning?",
    answer:
      "Once you're ready, you can explore relevant Altroz HR modules linked within each guide, or book a free demo to see them in action.",
  },
];

const popularTopics = [
  { label: "Attendance", href: "#attendance-management" },
  { label: "Payroll", href: "#payroll" },
  { label: "Leave", href: "#leave-management" },
  { label: "Employee Self Service", href: "#employee-self-service" },
  { label: "Recruitment", href: "#recruitment" },
  { label: "HR Automation", href: "#hr-automation" },
  { label: "HR Analytics", href: "#hr-analytics" },
  { label: "HR Compliance", href: "#why-learn" },
  { label: "Asset Management", href: "#asset-management" },
  { label: "Employee Records", href: "#hr-guides" },
  { label: "Geo Tracking", href: "#attendance-management" },
  { label: "Geo Fencing", href: "#attendance-management" },
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
    <ScrollReveal variant="fade-up" className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function StatCard({ title, description, icon }: HighlightCard) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
    </article>
  );
}

export default function LearnPage() {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : ROUTES.learn;

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={seoTitle} description={seoDescription} canonicalPath={canonicalPath} />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                Altroz HR Learning Center
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                HR Learning Resources for Modern, Growing Businesses
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                Simple, practical HR guides on attendance, payroll, leave, recruitment, compliance
                and automation, written for HR teams, managers and business owners who want to
                build a stronger workplace.
              </p>

              <div className="button-group mt-6 justify-center">
                <Link to={ROUTES.coreHR} className="btn-primary">
                  Explore HR Guides
                </Link>
                <Link to={ROUTES.bookDemo} className="btn-outline">
                  Book a Free Demo
                </Link>
              </div>
            </div>

            <StaggerReveal step={70} className="mt-8 grid gap-4 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <StatCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="why-learn" className="section">
          <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Why Learn with Altroz HR"
                title="Learn the reasoning behind HR processes, not just the software screens"
                description="HR is no longer limited to attendance registers and salary slips. As teams grow, HR becomes the function that keeps a business compliant, fair and efficient, and most HR problems come from a lack of clear knowledge rather than a lack of effort."
              />
              <div className="mt-5 space-y-4 text-base leading-7 text-ink-soft">
                <p>
                  Modern HR is changing fast. Manual attendance is being replaced by GPS and
                  geo-tracking. Paper-based leave requests are becoming self-service approvals.
                  Compliance rules keep updating.
                </p>
                <p>
                  Altroz HR was built to solve these everyday HR problems, and this Learn page
                  exists to share that same understanding with anyone who wants to run HR better,
                  whether or not they use Altroz HR software.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <StaggerReveal step={60} className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Understand HR, Not Just Software",
                    description:
                      "Learn the reasoning behind HR processes so you can make better decisions, with or without a tool.",
                    icon: <Lightbulb className="h-5 w-5" />,
                  },
                  {
                    title: "Stay Ahead of Changing HR Practices",
                    description:
                      "Get clarity on how HR is evolving, from manual registers to automated, data-backed processes.",
                    icon: <Sparkles className="h-5 w-5" />,
                  },
                  {
                    title: "Reduce Costly HR Mistakes",
                    description:
                      "Clear guides on attendance, payroll and compliance help you avoid errors that are expensive to fix later.",
                    icon: <ShieldCheck className="h-5 w-5" />,
                  },
                  {
                    title: "Build a Fairer Workplace",
                    description:
                      "Well-informed HR decisions lead to more consistent, transparent treatment of employees.",
                    icon: <Users className="h-5 w-5" />,
                  },
                ].map((item) => (
                  <article key={item.title} className="soft-card flex h-full flex-col p-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                  </article>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="section bg-surface" id="resource-categories">
          <div className="site-container">
            <SectionHeading
              eyebrow="Explore Learning Categories"
              title="Jump straight into the HR area you want to learn about"
              description="The Learn page is organised so visitors can move from broad HR topics into the specific areas they want to read about next."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categoryCards.map((card) => (
                <Link
                  key={card.id}
                  id={card.id}
                  to={card.href}
                  className="soft-card group flex h-full flex-col p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-auto pt-5 text-sm font-semibold text-primary">
                    {card.cta}
                    <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Featured HR Guides"
              title="In-depth guides for anyone planning, buying or improving HR processes"
              description="These resource cards provide practical starting points and can link visitors into the product pages they need next."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {guideCards.map((guide) => (
                <Link
                  key={guide.title}
                  to={guide.href}
                  className="soft-card flex h-full flex-col p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <span>{guide.readingTime}</span>
                    <span>•</span>
                    <span>{guide.category}</span>
                    <span>•</span>
                    <span>{guide.difficulty}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{guide.description}</p>
                  <div className="mt-auto pt-5 text-sm font-semibold text-primary">
                    Read guide
                    <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Popular HR Topics"
              title="Quick topics for focused reading"
              description="Use the topic chips to jump to a category or revisit the broader learning areas as you browse."
              center
            />

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {popularTopics.map((topic) => (
                <a
                  key={topic.label}
                  href={topic.href}
                  className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                >
                  {topic.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Learning Paths"
              title="Pick a path based on your role or where your business is today"
              description="Each path helps the reader move from basics to more advanced topics in a sequence that feels practical, not overwhelming."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 lg:grid-cols-2">
              {learningPaths.map((path) => (
                <article key={path.title} className="soft-card flex h-full flex-col p-5">
                  <h3 className="text-xl font-bold text-ink">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{path.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {path.steps.map((step) => (
                      <span
                        key={step}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink"
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Best Practices"
              title="Practical, easy-to-apply recommendations"
              description="These notes keep the learn page useful for readers who want concrete actions they can take right away."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {bestPractices.map((item) => (
                <article key={item.title} className="soft-card flex h-full flex-col p-5">
                  <div className="text-lg font-bold text-ink">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Businesses Trust Altroz HR Knowledge"
              title="Learning content that is simple, practical and built for real teams"
              description="This section keeps the promise of the page clear: useful HR knowledge written in a way busy teams can actually use."
              center
            />

            <StaggerReveal step={45} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustCards.map((item) => (
                <article key={item.title} className="soft-card flex h-full flex-col p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="A few quick answers about the learning center and the content it contains"
              description="These questions cover how the page is organised, who it is for and how the learning content helps different HR teams."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {faqItems.map((item) => (
                <Accordion
                  key={item.question}
                  type="single"
                  collapsible
                  className="rounded-2xl border border-border bg-white px-5 shadow-card"
                >
                  <AccordionItem value={item.question} className="border-0">
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <p className="text-sm leading-7 text-ink-soft">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                    Keep Learning. Keep Growing Your HR Practice.
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Explore in-depth HR guides at your own pace, or see how Altroz HR brings these
                    practices to life with a free, no-obligation demo
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    Use this page as a practical reference for HR processes, then move into the
                    product pages when you want to see the workflows in action.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="button-group lg:justify-end">
                    <Link to={ROUTES.coreHR} className="btn-primary">
                      Explore HR Guides
                    </Link>
                    <Link to={ROUTES.bookDemo} className="btn-outline">
                      Book Free Demo
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
