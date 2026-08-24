import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  HeartPulse,
  Laptop,
  Mail,
  Package,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Workflow,
  Wrench,
  Truck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ROUTES } from "@/routes/routeConfig.js";

const productCards = [
  {
    title: "Altroz HR",
    eyebrow: "HR management software",
    description:
      "Manage attendance, payroll, leave, recruitment, performance, and workforce management in one connected platform.",
    href: ROUTES.hrmsHome,
    icon: <Users className="h-5 w-5" />,
    accent: "from-blue-600/10 via-white to-sky-500/10",
    features: ["Attendance", "Payroll", "Recruitment", "Leave", "Performance", "HR Analytics"],
    snippet: ["92% attendance", "Payroll ready", "Realtime approvals"],
    snippetLabel: "Attendance graph",
  },
  {
    title: "Altroz Asset Management",
    eyebrow: "Asset tracking software",
    description:
      "Manage, track, assign, maintain, and monitor business assets from one central platform.",
    href: ROUTES.assetManagement,
    icon: <Package className="h-5 w-5" />,
    accent: "from-emerald-500/10 via-white to-cyan-500/10",
    features: ["Asset Dashboard", "Asset Tracking", "QR Code", "Maintenance", "Reports", "Warranty Tracking"],
    snippet: ["QR assets", "Maintenance due", "Ownership visible"],
    snippetLabel: "Asset QR tag",
  },
  {
    title: "Altroz Bulk Email",
    eyebrow: "Email broadcasting platform",
    description:
      "Enterprise bulk email broadcasting platform for business communication and campaign management.",
    href: ROUTES.bulkEmail,
    icon: <Mail className="h-5 w-5" />,
    accent: "from-orange-500/10 via-white to-blue-500/10",
    features: ["Broadcast", "Scheduling", "Templates", "Analytics", "SMTP", "Reports"],
    snippet: ["Open rate", "Campaigns", "Delivery insights"],
    snippetLabel: "Open-rate chart",
  },
];

const companyStrengths = [
  {
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    title: "Enterprise software",
    description:
      "Built for the real needs of growing businesses, with the depth and reliability that enterprise teams expect from their software.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Cloud based platform",
    description:
      "Access your HR, asset, and communication data securely from anywhere, on any device, without depending on local infrastructure.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Easy to use",
    description:
      "A clean, intuitive interface means teams can start using Altroz products with minimal training and no steep learning curve.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Scalable solutions",
    description:
      "Altroz products are designed to grow with your organisation, from a small team to a multi-location enterprise.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Business automation",
    description:
      "Automate repetitive HR, asset, and communication tasks so your teams can focus on work that truly needs their attention.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Secure platform",
    description:
      "Business data is handled with strong access controls and security practices built into every Altroz product.",
  },
];

const ecosystemCards = [
  {
    title: "Altroz HR",
    description: "Employee onboarding, attendance, payroll, and exit workflows.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Altroz Asset Management",
    description: "QR asset tagging, allocation, maintenance, and recovery tracking.",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    title: "Altroz Bulk Email",
    description: "Broadcast communication, campaigns, and open-rate reporting.",
    icon: <Mail className="h-5 w-5" />,
  },
];

const industries = [
  {
    icon: <Factory className="h-5 w-5" />,
    title: "Manufacturing",
    description:
      "Track machinery and equipment with Altroz Asset Management, manage shift-based workforces with Altroz HR, and keep suppliers and staff informed with Altroz Bulk Email.",
  },
  {
    icon: <Laptop className="h-5 w-5" />,
    title: "IT & Software",
    description:
      "Manage laptops, licences, and IT assets, run payroll and performance reviews for distributed teams, and send product or policy updates through one platform.",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Healthcare",
    description:
      "Track medical equipment and warranties, manage staff attendance and shift schedules, and communicate with departments through secure bulk email.",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Education",
    description:
      "Manage faculty and administrative staff records, track institutional assets such as labs and equipment, and broadcast circulars or updates to staff and students.",
  },
  {
    icon: <Store className="h-5 w-5" />,
    title: "Retail",
    description:
      "Handle multi-location staff attendance and payroll, track store assets and inventory equipment, and run promotional or operational email campaigns.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Corporate Offices",
    description:
      "Simplify employee management and leave approvals, track office assets and IT equipment, and keep internal communication organised and consistent.",
  },
  {
    icon: <Banknote className="h-5 w-5" />,
    title: "Finance",
    description:
      "Maintain accurate payroll and compliance-ready HR records, track physical and IT assets, and send secure business communication to stakeholders.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Logistics",
    description:
      "Manage a distributed workforce across locations, track vehicles and equipment, and keep drivers, warehouses, and offices connected through timely email updates.",
  },
];

const workflowExamples = [
  {
    title: "Employee Onboarding",
    steps: [
      "Employee joins",
      "HR creates employee profile in Altroz HR",
      "Laptop assigned using Altroz Asset Management",
      "Welcome email sent through Altroz Bulk Email",
    ],
  },
  {
    title: "Employee Exit",
    steps: [
      "Employee resigns",
      "Exit recorded in Altroz HR",
      "Assigned laptop and equipment returned in Asset Management",
      "Exit confirmation and handover email sent through Bulk Email",
    ],
  },
  {
    title: "Asset Maintenance Update",
    steps: [
      "Asset due for maintenance",
      "Maintenance scheduled in Asset Management",
      "Concerned employee or department notified in advance",
      "Attendance and downtime tracked in Altroz HR",
    ],
  },
  {
    title: "Company-Wide Announcement",
    steps: [
      "New policy created by HR team in Altroz HR",
      "Policy document broadcast through Altroz Bulk Email",
      "Relevant equipment or facility changes updated in Asset Management",
    ],
  },
];

const businessBenefits = [
  {
    title: "Reduce Manual Work",
    description:
      "Automate routine HR, asset, and communication tasks so teams spend less time on repetitive paperwork.",
  },
  {
    title: "Improve Productivity",
    description:
      "Give employees and managers the tools to complete tasks faster, with fewer delays and errors.",
  },
  {
    title: "Centralise Business Operations",
    description:
      "Bring people, asset, and communication data into one connected ecosystem instead of scattered spreadsheets and tools.",
  },
  {
    title: "Improve Visibility",
    description:
      "Get a clear, real-time view of attendance, assets, and communication performance across the business.",
  },
  {
    title: "Manage Employees",
    description: "Handle the full employee lifecycle, from recruitment to exit, with Altroz HR.",
  },
  {
    title: "Manage Assets",
    description: "Track, assign, and maintain every business asset with Altroz Asset Management.",
  },
  {
    title: "Business Communication",
    description: "Reach employees, customers, or stakeholders reliably through Altroz Bulk Email.",
  },
  {
    title: "Business Growth",
    description:
      "Free up time and resources so your team can focus on growing the business, not managing paperwork.",
  },
];

const faqItems = [
  {
    question: "What is Altroz Technologies?",
    answer:
      "Altroz Technologies Pvt. Ltd. is an enterprise business software company that builds cloud-based solutions for HR management, asset management, and bulk email communication, helping businesses simplify everyday operations.",
  },
  {
    question: "Which software products does Altroz offer?",
    answer:
      "Altroz Technologies offers multiple core products: Altroz HR for human resource management, Altroz Asset Management for tracking and managing business assets, and Altroz Bulk Email for enterprise email broadcasting.",
  },
  {
    question: "Can I use only one Altroz product?",
    answer:
      "Yes. Each Altroz product, whether it is Altroz HR, Altroz Asset Management, or Altroz Bulk Email, is built to work as a complete stand-alone solution for your business.",
  },
  {
    question: "Can all Altroz products work together?",
    answer:
      "Yes. Altroz HR, Altroz Asset Management, and Altroz Bulk Email are part of the same Altroz ecosystem and are designed to work smoothly together for connected business workflows.",
  },
  {
    question: "Who should use Altroz software?",
    answer:
      "Altroz software is designed for business owners, HR managers, IT managers, operations teams, and finance teams across SMEs and enterprises that want to simplify HR, asset, and communication processes.",
  },
  {
    question: "Is Altroz suitable for SMEs?",
    answer:
      "Yes. Altroz products are built to be simple and scalable, making them suitable for small and medium-sized businesses as well as larger enterprises.",
  },
  {
    question: "Can enterprises use Altroz solutions?",
    answer:
      "Yes. Altroz Technologies builds enterprise-ready software with the reliability, scalability, and support that larger organisations require.",
  },
  {
    question: "How do I request a demo?",
    answer:
      "You can request a free demo by clicking the “Book Free Demo” button on this website, and our team will get in touch to schedule a walkthrough of the relevant Altroz product.",
  },
  {
    question: "What is Altroz HR used for?",
    answer:
      "Altroz HR is used for managing employee records, attendance, payroll, leave, recruitment, performance reviews, and overall workforce management.",
  },
  {
    question: "What is Altroz Asset Management used for?",
    answer:
      "Altroz Asset Management is used for tracking, assigning, and maintaining business assets, including QR code-based asset tracking, warranty tracking, and asset reporting.",
  },
  {
    question: "What is Altroz Bulk Email used for?",
    answer:
      "Altroz Bulk Email is used for sending business emails at scale, including campaign scheduling, email templates, delivery reports, and email performance analytics.",
  },
  {
    question: "Is Altroz software cloud-based?",
    answer:
      "Yes. Altroz products are built on a cloud-based platform, allowing businesses to access their data securely from anywhere.",
  },
  {
    question: "Which industries can use Altroz software?",
    answer:
      "Altroz software supports a wide range of industries, including manufacturing, IT and software, healthcare, education, retail, corporate offices, finance, and logistics.",
  },
  {
    question: "Does Altroz offer mobile access?",
    answer:
      "Altroz HR includes a mobile app so employees and managers can manage HR tasks on the go. Please check individual product pages for specific mobile capabilities.",
  },
  {
    question: "How is Altroz different from using separate tools for HR, assets, and email?",
    answer:
      "Instead of managing separate, disconnected tools, Altroz Technologies offers HR, asset management, and bulk email as part of one trusted ecosystem, making it easier for businesses to adopt one, two, or multiple products with a consistent experience.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Altroz Technologies | Enterprise Business Software"
        description="Altroz Technologies offers enterprise business management software — Altroz HR, Altroz Asset Management, and Altroz Bulk Email. Explore products and book a free demo."
        canonicalPath="/"
      />
      <TopNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x pt-5 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-16">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-6xl px-0 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Trusted Enterprise Business Software
                </span>

                <h1 className="mx-auto mt-4 max-w-6xl text-balance text-4xl font-black leading-[1.03] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[4.35rem]">
                  Business Management Software That Brings HR, Assets, and Communication Together
                </h1>

                <h2 className="mx-auto mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                  One Platform. Multiple Enterprise Solutions. A Single Trusted Brand.
                </h2>

                <p className="mx-auto mt-4 max-w-5xl text-justify leading-8 hyphens-auto text-ink-soft sm:text-xl">
                  Altroz Technologies Pvt. Ltd. builds enterprise-ready business management software
                  that helps organisations manage people, assets, and communication from one trusted
                  ecosystem. Whether you need HR software, asset management software, or a bulk email
                  platform, Altroz gives your business the tools to work smarter, reduce manual effort,
                  and grow with confidence.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link to={ROUTES.hrmsHome} className="btn-primary">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-outline">
                    Book Free Demo
                  </Link>
                </div>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div className="space-y-4">
                  <div className="soft-card p-5 md:p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
                      Business at a glance
                    </div>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">
                      One brand. Multiple product experiences.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Choose HR, Asset Management, or Bulk Email as a standalone product or use them
                      together in one Altroz ecosystem.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {productCards.map((item) => (
                      <div key={item.title} className="soft-card px-4 py-3">
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          {item.eyebrow}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-ink">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Our Products
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                One Company. Multiple Powerful Business Solutions.
              </h2>
              <p className="mt-3 text-justify leading-7 hyphens-auto text-ink-soft">
                Altroz Technologies brings together enterprise-grade software products that solve
                everyday business challenges. Explore the solution that fits your team, or use them
                together for a fully connected way of working.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
              {productCards.map((card) => (
                <article
                  key={card.title}
                  className="soft-card flex h-full min-h-[34rem] flex-col overflow-hidden p-6 md:p-7"
                >
                  <div className={`flex h-full flex-col rounded-[1.5rem] bg-gradient-to-br ${card.accent} p-5`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          {card.eyebrow}
                        </div>
                        <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">
                          {card.title}
                        </h3>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        {card.icon}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-ink-soft">{card.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {card.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-semibold text-ink"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/70 bg-white/80 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-primary">
                        {card.snippetLabel}
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {card.snippet.map((item, index) => (
                          <div
                            key={item}
                            className="rounded-2xl bg-primary-soft/70 px-3 py-4 text-center"
                          >
                            <div className="text-xs font-semibold leading-snug text-ink">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <Link to={card.href} className="btn-outline inline-flex w-full justify-center">
                        Explore {card.title}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why Businesses Choose Altroz
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Reliable software built for day-to-day business work
              </h2>
              <p className="mt-3 text-ink-soft">
                Altroz combines practical product design, cloud access, and business-grade control so
                teams can move faster without losing visibility.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {companyStrengths.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ecosystem" className="py-16 sm:py-20">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Altroz Ecosystem
                </span>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                  One brand at the top, multiple connected product nodes underneath
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                  Altroz Technologies is the parent brand, and each product can work on its own or
                  together as a connected ecosystem. Businesses can adopt only the product they
                  need, or combine them as they grow.
                </p>

                <div className="mt-6 space-y-3 rounded-[1.75rem] border border-border bg-white p-6 shadow-float">
                  {ecosystemCards.map((card) => (
                    <div key={card.title} className="flex items-start gap-3 rounded-2xl bg-surface/60 p-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-ink">{card.title}</div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-6 shadow-float">
                  <div className="mx-auto max-w-md rounded-[1.5rem] border border-border bg-surface/50 p-5 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                      Altroz Technologies
                    </div>
                    <div className="mt-3 text-2xl font-black tracking-tight text-ink">
                      Parent brand and shared experience
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      A single trusted brand powering multiple enterprise solutions.
                    </p>
                  </div>

                  <div className="mx-auto mt-4 h-14 w-px border-l border-dashed border-primary/40" />

                  <div className="grid gap-4 md:grid-cols-3">
                    {ecosystemCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[1.5rem] border border-border bg-gradient-to-br from-primary/10 via-white to-white p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-primary">
                          {card.icon}
                          {card.title}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-dashed border-primary/30 bg-primary-soft/40 p-4 text-center text-sm text-ink-soft">
                    Each product works as a stand-alone solution and also fits into the same Altroz ecosystem.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Industries We Serve
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Built for businesses across many sectors
              </h2>
              <p className="mt-3 text-ink-soft">
                From manufacturing plants to corporate offices, Altroz gives each team a clearer way
                to manage people, assets, and communication.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industries.map((industry) => (
                <article key={industry.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {industry.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{industry.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{industry.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="workflows" className="py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Why Our Products Work Better Together
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Connected workflows that keep business moments moving
              </h2>
              <p className="mt-3 text-ink-soft">
                Altroz HR, Altroz Asset Management, and Altroz Bulk Email can be used together to
                support complete business workflows with less manual effort.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {workflowExamples.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Workflow Example
                  </div>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">{item.title}</h3>
                  <div className="mt-5 space-y-3">
                    {item.steps.map((step, index) => (
                      <div key={step} className="flex items-start gap-3 rounded-2xl bg-surface/50 p-4">
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-ink">{step}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Business Benefits
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                A clearer way to run the business every day
              </h2>
              <p className="mt-3 text-ink-soft">
                These benefits are what teams feel after adopting Altroz across HR, assets, and email.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {businessBenefits.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                Clear answers for teams reviewing Altroz
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`faq-${index}`}
                    className="rounded-2xl border border-border bg-white px-5"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-ink-soft">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="cta" className="hero-gradient py-16 sm:py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final CTA
                  </span>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
                    Transform Your Business with Altroz Software Solutions
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
                    Discover the right software for your business. Whether you need HR management,
                    asset management, or business email communication, Altroz provides
                    enterprise-ready solutions designed to simplify everyday operations.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to={ROUTES.hrmsHome} className="btn-outline">
                    Explore Products
                  </Link>
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
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

function HeroIllustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
      <div className="relative rounded-[2rem] border border-border bg-white p-5 shadow-float">
        <div className="rounded-[1.5rem] border border-border bg-gradient-to-br from-primary/10 via-white to-success/10 p-5">
          <div className="mx-auto max-w-md rounded-[1.25rem] border border-white/80 bg-white/95 p-4 text-center shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Business Dashboard
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">
              Altroz Technologies at a glance
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              A central view connecting HR, assets, and email into one dependable brand experience.
            </p>
          </div>

          <div className="mx-auto mt-4 h-12 w-px border-l border-dashed border-primary/40" />

          <div className="grid items-stretch gap-3 md:grid-cols-3">
            <HeroNode
              title="Altroz HR"
              icon={<Users className="h-5 w-5" />}
              body="Attendance and payroll snapshot"
            />
            <HeroNode
              title="Asset Management"
              icon={<QrCode className="h-5 w-5" />}
              body="QR tag and maintenance snapshot"
            />
            <HeroNode
              title="Bulk Email"
              icon={<Mail className="h-5 w-5" />}
              body="Open-rate and campaign snapshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroNode({
  title,
  icon,
  body,
}: {
  title: string;
  icon: ReactNode;
  body: string;
}) {
  return (
    <div className="flex h-full min-h-[12.5rem] flex-col rounded-[1.5rem] border border-border bg-white p-3 shadow-sm">
      <div className="flex items-start gap-2 text-sm font-bold text-primary">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <span className="min-w-0 flex-1 text-[0.9rem] leading-tight [overflow-wrap:anywhere]">
          {title}
        </span>
      </div>
      <p className="mt-2.5 text-[0.95rem] leading-6 text-ink-soft">{body}</p>
    </div>
  );
}
