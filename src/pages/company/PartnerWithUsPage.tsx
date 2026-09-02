"use client";

import { useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Factory,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Laptop2,
  Layers3,
  Megaphone,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  Store,
  Target,
  Users,
  Workflow,
  Clock3,
  ChartColumn,
  HeartPulse,
  Truck,
  Presentation,
  MapPinned,
  Landmark,
  Mail,
  Headphones,
  Phone,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppHref, contactConfig, contactMethods, industryOptions } from "@/config/contactInfo";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { cn } from "@/lib/utils";

const pageTitle = "Partner with Altroz HR | HRMS Partner Program";
const pageDescription =
  "Join the Altroz HR Partner Program and grow your business with a trusted cloud-based HR software platform for modern workplaces.";

const capabilityStrip = [
  { label: "Referral opportunities", icon: <Users className="h-4 w-4" /> },
  { label: "Sales assistance", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Product training", icon: <GraduationCap className="h-4 w-4" /> },
  { label: "Demo support", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Marketing resources", icon: <Megaphone className="h-4 w-4" /> },
  { label: "Customer onboarding", icon: <Workflow className="h-4 w-4" /> },
  { label: "Long-term collaboration", icon: <Handshake className="h-4 w-4" /> },
];

const partnerAudience = [
  {
    title: "HR Consultants",
    description: "Support clients with practical HR software recommendations and process guidance.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Payroll Consultants",
    description: "Help businesses connect payroll inputs, approvals and reporting in one flow.",
    icon: <WalletIcon />,
  },
  {
    title: "IT Companies",
    description: "Offer a structured HR platform as part of broader technology conversations.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Digital Agencies",
    description: "Expand your service portfolio with HR software partnerships and referrals.",
    icon: <Megaphone className="h-5 w-5" />,
  },
  {
    title: "System Integrators",
    description: "Bring Altroz HR into larger implementation and integration projects.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Business Advisors",
    description: "Recommend a platform that fits clients who are modernizing HR operations.",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    title: "Software Resellers",
    description: "Add a reliable HR solution to your product and channel mix.",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Entrepreneurs",
    description: "Start a new service line with a product that can support long-term collaboration.",
    icon: <Rocket className="h-5 w-5" />,
  },
];

const partnerBenefits = [
  {
    title: "Add a Complete HR Practice",
    description: "Bring a cloud-based HR platform into your existing service portfolio.",
  },
  {
    title: "Access Product Training",
    description: "Learn the platform deeply so you can explain it with confidence.",
  },
  {
    title: "Get Sales Support",
    description: "Use available support to move conversations forward with prospective clients.",
  },
  {
    title: "Use Marketing Resources",
    description: "Leverage materials that help you introduce Altroz HR to your audience.",
  },
  {
    title: "Support Client Onboarding",
    description: "Work with a team that can help during setup, configuration and rollout.",
  },
  {
    title: "Build Recurring Opportunities",
    description: "Grow with referral, channel and implementation work over time.",
  },
  {
    title: "Strengthen Your Offer",
    description: "Offer clients attendance, payroll, leave, recruitment and reporting together.",
  },
  {
    title: "Collaborate Long Term",
    description: "Partner with a team focused on ongoing relationships, not one-off deals.",
  },
];

const partnerTypes = [
  {
    title: "Referral Partner",
    description: "Introduce Altroz HR to your network and let our team handle the sales conversation.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Channel Partner",
    description: "Actively sell and promote Altroz HR as part of your business offerings.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Implementation Partner",
    description: "Support clients through setup, configuration and rollout assistance.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Technology Partner",
    description: "Fit Altroz HR into integration projects or a broader technology stack.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "Business Consultant Partner",
    description: "Recommend Altroz HR within your HR, operations or business advisory work.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Partner Application",
    description: "Fill out the partnership application form with your business details and areas of interest.",
  },
  {
    step: "02",
    title: "Application Review",
    description: "Our partnerships team reviews your application to understand your business fit.",
  },
  {
    step: "03",
    title: "Introduction Meeting",
    description: "We connect with you to discuss the partnership, your goals and the next steps.",
  },
  {
    step: "04",
    title: "Partner Onboarding",
    description: "Once aligned, we onboard you as an official Altroz HR partner and share resources.",
  },
  {
    step: "05",
    title: "Training and Enablement",
    description: "You get product training so you and your team understand the platform in depth.",
  },
  {
    step: "06",
    title: "Start Referring and Selling",
    description: "Begin introducing Altroz HR to clients and your network with team support as needed.",
  },
  {
    step: "07",
    title: "Ongoing Support",
    description: "Our team continues to support you through onboarding, questions and future updates.",
  },
];

const businessWins = [
  {
    title: "Centralized HR Operations",
    description: "Your clients can manage employees, attendance, payroll and leave from one place.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Better Data Visibility",
    description: "A unified system makes records easier to search, review and share.",
    icon: <ChartColumn className="h-5 w-5" />,
  },
  {
    title: "Reduced Manual Work",
    description: "Move clients away from spreadsheets, follow-ups and disconnected tools.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Scales with Growth",
    description: "The same platform can support small teams and larger organizations.",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Supports Real Workflows",
    description: "The product is built around attendance, payroll, leave and approvals.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Trusted by Businesses",
    description: "Position a practical platform that helps clients modernize HR confidently.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    q: "Who can become an Altroz HR partner?",
    a: "HR consultants, payroll consultants, IT companies, digital agencies, system integrators, chartered accountants, software resellers, business consultants, startups and entrepreneurs can all apply.",
  },
  {
    q: "Is there any registration fee to join the partner program?",
    a: "There is no registration fee to apply for the Altroz HR Partner Program.",
  },
  {
    q: "How does the partner program work?",
    a: "You apply through the partnership form, the team reviews your application, and once onboarded you receive training and support to introduce Altroz HR to clients.",
  },
  {
    q: "Do partners receive training on the platform?",
    a: "Yes. Onboarded partners receive product training to help them understand the platform and its modules.",
  },
  {
    q: "Can freelancers become Altroz HR partners?",
    a: "Yes. Freelancers and independent professionals with relevant business or HR networks are welcome to apply.",
  },
  {
    q: "Do you provide marketing support to partners?",
    a: "Yes. Approved marketing resources are made available to help partners introduce Altroz HR to their audience.",
  },
  {
    q: "How can I apply to become a partner?",
    a: "You can apply by filling in the Partner Application Form on this page with your business details.",
  },
  {
    q: "What industries can Altroz HR partners serve?",
    a: "Altroz HR is built for organizations across industries that need to manage employees, attendance, payroll and related HR processes.",
  },
  {
    q: "Do partners get demo support for prospective clients?",
    a: "Yes. The team can assist partners with product demonstrations for prospective clients.",
  },
  {
    q: "What is the difference between a referral partner and a channel partner?",
    a: "A referral partner introduces clients to Altroz HR, while a channel partner actively sells and promotes the platform as part of their own offerings.",
  },
  {
    q: "Will I have a dedicated point of contact?",
    a: "Yes. Onboarded partners are supported by a dedicated point of contact from the partnerships team.",
  },
  {
    q: "Does Altroz HR provide technical support during client onboarding?",
    a: "Yes. The support team can help with technical queries that come up while onboarding your clients.",
  },
  {
    q: "How long does the partner application review take?",
    a: "Review timelines can vary depending on the application and current volume, so a fixed timeframe is not committed.",
  },
  {
    q: "Can IT companies integrate Altroz HR into larger projects?",
    a: "Yes. IT companies and system integrators can join as Technology Partners to include Altroz HR within broader implementations.",
  },
  {
    q: "Is the partnership a long-term arrangement?",
    a: "Yes. The partner program is designed for long-term collaboration rather than a one-time engagement.",
  },
  {
    q: "Who do I contact if I have more questions?",
    a: "You can reach out to the partnerships team using the partner enquiry or contact routes on this site.",
  },
];

const quickLinks = [
  { label: "About Us", href: ROUTES.about },
  { label: "Why Altroz HR", href: ROUTES.whyAltroz },
  { label: "Book a Free Demo", href: ROUTES.bookDemo },
  { label: "Contact Us", href: ROUTES.contact },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Employee Management", href: ROUTES.coreHR },
  { label: "Attendance Management", href: ROUTES.attendanceManagement },
  { label: "Payroll Management", href: ROUTES.payroll },
  { label: "Leave Management", href: ROUTES.leaveManagement },
  { label: "Recruitment", href: ROUTES.recruitment },
  { label: "Performance Management", href: ROUTES.performance },
  { label: "HR Automation", href: ROUTES.automation },
  { label: "HR Analytics", href: ROUTES.analytics },
  { label: "Workforce Management", href: ROUTES.workforce },
  { label: "Learn", href: ROUTES.learn },
];

const partnerFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email address."),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid mobile number."),
  city: z.string().min(2, "Please enter your city."),
  industry: z.string().min(1, "Please select your industry."),
  partnerType: z.string().min(1, "Please select a partner type."),
  website: z.string().optional(),
  message: z.string().min(15, "Please share a short note about your partnership goals."),
  consent: z.boolean().refine((value) => value, "Please agree to be contacted about your enquiry."),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

type StatusState =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const defaultValues: PartnerFormValues = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  mobileNumber: "",
  city: "",
  industry: "",
  partnerType: "",
  website: "",
  message: "",
  consent: false,
};

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
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
    <ScrollReveal variant="fade-up" className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </ScrollReveal>
  );
}

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
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

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <article className="soft-card flex h-full flex-col p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary-soft text-sm font-bold text-primary">
        {step}
      </div>
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{description}</p>
    </article>
  );
}

function WalletIcon() {
  return <span className="text-current">₹</span>;
}

function SmartLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  );
}

export default function PartnerWithUsPage() {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : ROUTES.partner;
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = (values: PartnerFormValues) => {
    setStatus({ type: "loading", message: "Preparing your partnership enquiry..." });

    const message = [
      "Altroz HR partner enquiry",
      `Name: ${sanitize(values.fullName)}`,
      `Company: ${sanitize(values.companyName)}`,
      `Business email: ${sanitize(values.businessEmail)}`,
      `Mobile number: ${sanitize(values.mobileNumber)}`,
      `City: ${sanitize(values.city)}`,
      `Industry: ${sanitize(values.industry)}`,
      `Partner type: ${sanitize(values.partnerType)}`,
      `Website: ${sanitize(values.website ?? "")}`,
      "",
      "Message:",
      sanitize(values.message),
    ].join("\n");

    const href = buildWhatsAppHref(message);
    const opened = window.open(href, "_blank", "noopener,noreferrer");

    if (!opened) {
      setStatus({
        type: "error",
        message: "Your browser blocked the WhatsApp window. Please allow popups and try again.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Your partnership enquiry draft opened in WhatsApp. Send it there to complete submission.",
    });
    form.reset(defaultValues);
  };

  const contactIconMap: Record<string, ReactNode> = {
    messageSquare: <MessageSquareText className="h-5 w-5" />,
    calendarDays: <CalendarCheck className="h-5 w-5" />,
    headphones: <Headphones className="h-5 w-5" />,
    handshake: <Handshake className="h-5 w-5" />,
    briefcase: <BriefcaseBusiness className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO title={pageTitle} description={pageDescription} canonicalPath={canonicalPath} />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                  Altroz HR Partner Program
                </span>
                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                  Become an HR Software Partner with Altroz HR
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Grow your business by partnering with a trusted cloud-based HR software platform
                  built for modern workplaces.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-soft">
                  Altroz HR helps consultants, IT companies, agencies and business advisors offer
                  clients a complete HR technology solution across employee management, attendance,
                  payroll, leave, recruitment and more.
                </p>

                <div className="button-group mt-6">
                  <Button asChild className="h-11 rounded-full bg-primary px-6 font-semibold text-white">
                    <a href="#partner-form">Become a Partner</a>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                    <a href="#partner-help">Talk to Our Team</a>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink-soft">
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Training and enablement
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Sales and demo support
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Long-term collaboration
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="soft-card overflow-hidden p-6 md:p-8">
                  <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <Handshake className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Partnership Snapshot
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-ink">
                          What the program is built to do
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          Add a complete HR technology practice to your services and help clients
                          move beyond spreadsheets and manual HR workflows.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Referral and channel opportunities",
                        "Partner onboarding and training",
                        "Client demo assistance",
                        "Implementation support",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        { value: "No Fee", label: "To apply" },
                        { value: "One Platform", label: "Many HR workflows" },
                        { value: "Long Term", label: "Partnership focus" },
                      ].map((item) => (
                        <div key={item.label} className="soft-card p-4">
                          <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                            {item.value}
                          </div>
                          <div className="mt-1 text-sm text-ink-soft">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <StaggerReveal step={70} className="mt-8 grid gap-4 md:grid-cols-3">
              {capabilityStrip.map((item) => (
                <Card key={item.label} title={item.label} description={""} icon={item.icon} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Why Partner with Altroz HR"
                title="A practical way to expand your service portfolio"
                description="Indian businesses are moving away from spreadsheets and manual HR processes. That shift creates a real opportunity for partners who can guide clients to the right HR solution."
              />
              <div className="mt-5 space-y-4 text-base leading-7 text-ink-soft">
                <p>
                  When you partner with Altroz HR, you are not just recommending software. You are
                  adding a complete HR technology practice to your existing services.
                </p>
                <p>
                  Whether you already advise clients on HR, payroll, compliance or IT systems,
                  Altroz HR gives you a platform you can confidently bring into those conversations.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <StaggerReveal step={60} className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Add a complete HR practice",
                    description: "Bring cloud HR into your existing service mix.",
                    icon: <BriefcaseBusiness className="h-5 w-5" />,
                  },
                  {
                    title: "Guide clients with confidence",
                    description: "Use product knowledge to support better conversations.",
                    icon: <GraduationCap className="h-5 w-5" />,
                  },
                  {
                    title: "Solve real business problems",
                    description: "Help clients replace scattered HR processes with one system.",
                    icon: <Target className="h-5 w-5" />,
                  },
                  {
                    title: "Build recurring opportunities",
                    description: "Grow referrals, implementation support and longer term work.",
                    icon: <Rocket className="h-5 w-5" />,
                  },
                ].map((item) => (
                  <Card key={item.title} {...item} />
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Can Become a Partner?"
              title="The program is designed for professionals and businesses who already serve growing organizations"
              description="If your work already touches HR, technology or business advisory needs, there is likely a fit here."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {partnerAudience.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Partner Benefits"
              title="Support, training and resources that make the partnership easier to grow"
              description="The program is structured to help partners represent Altroz HR clearly and serve their clients well."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {partnerBenefits.map((item) => (
                <Card
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={<BadgeCheck className="h-5 w-5" />}
                />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="How the Partnership Works"
              title="A straightforward onboarding process from application to active collaboration"
              description="The steps below outline how the partnership usually moves from first enquiry to ongoing support."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {processSteps.map((item) => (
                <StepCard key={item.step} {...item} />
              ))}
            </StaggerReveal>

            <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-ink-soft shadow-sm">
              Every application is reviewed individually. We do not commit to a fixed approval
              timeline, since this can vary based on business fit and current application volume.
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Partner Program Types"
              title="Choose the collaboration style that best fits your business model"
              description="Each partner type can create a different kind of opportunity, from referrals to implementation and technology work."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {partnerTypes.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Businesses Choose Altroz HR"
              title="A strong product makes for a stronger partnership"
              description="Use these points to show prospects why Altroz HR is a practical fit for growing organizations."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {businessWins.map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="partner-form" className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Partner Application Form"
              title="Tell us about your business and how you want to collaborate"
              description="The form below keeps the application practical while still capturing the details needed for review."
              center
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Partner Application
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-ink">Share a short introduction</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Include the kind of partnership you want, your business background and the
                      industries you serve so the team can respond with relevant next steps.
                    </p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary sm:grid">
                    <Handshake className="h-5 w-5" />
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="name@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industryOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select partner type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {partnerTypes.map((option) => (
                                  <SelectItem key={option.title} value={option.title}>
                                    {option.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website or LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input placeholder="Optional website or profile URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your partnership goals *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us which clients you usually work with, what kind of partnership you want, and any goals you want to achieve."
                              className="min-h-28 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="text-sm font-medium text-ink">
                              I agree to the Privacy Policy *
                            </FormLabel>
                            <p className="text-xs leading-5 text-ink-soft">
                              Our team can review the application and respond using the contact
                              details you share here.
                            </p>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs leading-5 text-ink-soft">
                        This submission opens a WhatsApp draft using your details so the partnerships
                        team can pick it up quickly.
                      </div>
                      <Button
                        type="submit"
                        className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                      >
                        Submit Partnership Application
                      </Button>
                    </div>

                    {status.type !== "idle" && (
                      <div
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm leading-6",
                          status.type === "success" &&
                            "border-success/20 bg-success/10 text-success",
                          status.type === "error" && "border-destructive/20 bg-destructive/10 text-destructive",
                          status.type === "loading" && "border-primary/20 bg-primary/10 text-primary",
                        )}
                      >
                        {status.message}
                      </div>
                    )}
                  </form>
                </Form>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100} className="soft-card p-6 lg:col-span-5">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Before You Apply
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">A few details help the review</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Your business type and the kind of clients you serve",
                    "The partnership model you are interested in",
                    "Your city and preferred communication details",
                    "Whether you want referral, implementation or technology work",
                    "Any questions you want the team to answer first",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers for prospective partners"
              description="These questions keep the partner program easy to understand before you apply."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl space-y-3">
              {faqItems.map((item, index) => (
                <Accordion
                  key={item.q}
                  type="single"
                  collapsible
                  className="rounded-2xl border border-border bg-white px-5 shadow-card"
                >
                  <AccordionItem value={`faq-${index}`} className="border-0">
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <p className="text-sm leading-7 text-ink-soft">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        <section id="partner-help" className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Need Help Before Booking?"
              title="Choose the contact path that matches your next step"
              description="The site uses the existing internal routes and WhatsApp flow, so you can move forward without searching around."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {contactMethods.map((item) => (
                <SmartLink
                  key={item.id}
                  href={item.href}
                  className="group soft-card flex h-full flex-col p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    {contactIconMap[item.icon] ?? <Mail className="h-5 w-5" />}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                  <div className="mt-auto pt-5 text-sm font-semibold text-primary">
                    Open path
                    <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </SmartLink>
              ))}
            </StaggerReveal>

            <div className="mx-auto mt-5 max-w-4xl rounded-2xl border border-border bg-white p-4 text-sm leading-6 text-ink-soft shadow-sm">
              {contactConfig.missingVerifiedDetailsNote}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Let&apos;s grow together
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    Partner with Altroz HR and bring a trusted cloud-based HR platform to the
                    businesses you work with. Apply today and build a long-term partnership.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-primary-soft hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="button-group lg:justify-end">
                    <Button asChild className="h-11 rounded-full bg-primary px-6 font-semibold text-white">
                      <a href="#partner-form">Become a Partner</a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                      <Link to={ROUTES.contact}>Contact Us</Link>
                    </Button>
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
