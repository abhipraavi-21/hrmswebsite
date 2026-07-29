"use client";

import { useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  CheckCircle2,
  Clock3,
  Factory,
  FileText,
  Handshake,
  Headphones,
  HeartPulse,
  Laptop2,
  Layers3,
  Landmark,
  MapPinned,
  MessageSquareText,
  Presentation,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Store,
  Target,
  Truck,
  Users,
  Wallet,
  Workflow,
  Brain,
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
import { buildWhatsAppHref, contactConfig, contactMethods, employeeRangeOptions, industryOptions, moduleOptions, preferredContactMethods } from "@/config/contactInfo";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { cn } from "@/lib/utils";

const seoTitle = "Book a Free Demo | Altroz HR";
const seoDescription =
  "Book a free, no-obligation Altroz HR demo to see employee management, attendance, payroll, leave, recruitment and reporting workflows in action.";

const demoHighlights = [
  {
    title: "Free Demo",
    description: "No payment details required and no obligation to move forward.",
    icon: <CalendarCheck className="h-5 w-5" />,
  },
  {
    title: "Personalized Walkthrough",
    description: "The session can focus on the modules and workflows most relevant to your team.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Built for Growing Teams",
    description: "See how Altroz HR helps teams manage work with less manual effort.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const demoModules = [
  {
    title: "Employee Management",
    description: "Understand how records, profiles and team data stay organized in one place.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    description: "See how attendance, GPS tracking and shift-wise visibility work together.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Payroll",
    description: "Review the route from attendance and leave data to salary processing.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Leave Management",
    description: "Explore leave policies, balances and approvals in a simple flow.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Recruitment",
    description: "See how hiring workflows support structured candidate handling.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Performance",
    description: "Learn how reviews, feedback and goals can be managed in one dashboard.",
    icon: <ChartColumn className="h-5 w-5" />,
  },
  {
    title: "Employee Self Service",
    description: "Show employees how they can access what they need without extra HR work.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "HR Automation",
    description: "See how repetitive HR tasks can move into automated workflows.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const demoSteps = [
  {
    step: "01",
    title: "Submit Demo Request",
    description:
      "Fill in the booking form with your business details and current HR challenges so the team can prepare a relevant walkthrough.",
  },
  {
    step: "02",
    title: "Confirmation from Our Team",
    description: "Our team reviews your request and reaches out to confirm the demo details.",
  },
  {
    step: "03",
    title: "Schedule Meeting",
    description: "A date and time are finalized, and the meeting link or call details are shared.",
  },
  {
    step: "04",
    title: "Live Product Demonstration",
    description:
      "A product specialist walks you through Altroz HR and the modules most relevant to your business.",
  },
  {
    step: "05",
    title: "Questions and Discussion",
    description: "Ask about your HR processes, team size or industry so you get clarity before deciding.",
  },
  {
    step: "06",
    title: "Next Steps",
    description: "If Altroz HR looks like a good fit, the next steps are discussed at your pace.",
  },
];

const whoShouldBook = [
  {
    title: "HR Teams",
    description: "Teams that want to see how everyday HR work can become simpler and more structured.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Business Owners",
    description: "Owners who want a clearer view of workforce processes before choosing a platform.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Operations Leaders",
    description: "Leaders who need a practical walkthrough of attendance, shifts and approvals.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Finance Teams",
    description: "Teams that want to see how payroll inputs, approvals and reporting stay aligned.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Multi-Location Businesses",
    description: "Organizations managing different branches, sites or locations from one platform.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Growing Businesses",
    description: "Startups and SMEs that need a clean way to scale HR without adding manual effort.",
    icon: <Rocket className="h-5 w-5" />,
  },
];

const whyBook = [
  {
    title: "Understand the Workflow",
    description: "See how requests move from one step to another before you commit to a tool.",
  },
  {
    title: "Match It to Your Business",
    description: "Focus the demo on your industry, team size and current HR setup.",
  },
  {
    title: "See the Full Picture",
    description: "Look at attendance, payroll, leave and reports together instead of in isolation.",
  },
  {
    title: "Reduce Manual Work",
    description: "Learn where Altroz HR can replace spreadsheets and repetitive follow-ups.",
  },
  {
    title: "Improve Visibility",
    description: "See how data stays centralised and easier to search, review and share.",
  },
  {
    title: "Support Better Decisions",
    description: "A clearer system helps HR, operations and leadership make better calls.",
  },
  {
    title: "Plan Implementation",
    description: "Understand what rollout could look like before you move to the next stage.",
  },
  {
    title: "Ask Real Questions",
    description: "Use the session to ask about your exact workflow, not just generic product features.",
  },
];

const industries = [
  {
    title: "Manufacturing",
    description: "Shift-based teams, shop floor operations and overtime handling.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    title: "Healthcare",
    description: "Departments, shift coverage and staff availability that changes daily.",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    title: "Retail",
    description: "Branch-level attendance, workforce visibility and store coordination.",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "IT and Software",
    description: "Flexible hours, self-service needs and employee lifecycle tracking.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Construction",
    description: "Field teams, site-based attendance and mobile access needs.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Education",
    description: "Teaching and non-teaching staff, payroll and records by category.",
    icon: <Presentation className="h-5 w-5" />,
  },
  {
    title: "Logistics",
    description: "Distributed teams, route-based work and location-aware check-ins.",
    icon: <MapPinned className="h-5 w-5" />,
  },
  {
    title: "Professional Services",
    description: "Appointment-based workflows, documentation and people management.",
    icon: <Landmark className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    question: "Is the demo free?",
    answer: "Yes. The Altroz HR product demo is completely free, with no obligation to purchase.",
  },
  {
    question: "How long is the demo?",
    answer:
      "The demo is usually a focused session covering the modules most relevant to your business. Exact timing is confirmed when the meeting is scheduled.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation is required. The demo is conducted online, and Altroz HR is cloud-based.",
  },
  {
    question: "Can multiple team members join?",
    answer:
      "Yes. You can invite relevant colleagues such as HR, payroll or operations team members to join the demo.",
  },
  {
    question: "Can I ask questions during the demo?",
    answer:
      "Yes. The session includes time for questions and discussion so you can clarify anything specific to your business.",
  },
  {
    question: "Can startups book a demo?",
    answer:
      "Yes. Startups and small businesses are welcome to book a demo and see how Altroz HR fits their current stage.",
  },
  {
    question: "Can enterprises request customized demonstrations?",
    answer:
      "Yes. Enterprises can share specific requirements in the form, and the walkthrough can be tailored accordingly.",
  },
  {
    question: "Do I need to provide payment details to book a demo?",
    answer: "No. Booking a demo does not require any payment information.",
  },
  {
    question: "Will I get a sales pitch, or an actual product walkthrough?",
    answer:
      "The session is primarily a product walkthrough. The team can also answer commercial questions if you have them.",
  },
  {
    question: "Can I reschedule my demo if needed?",
    answer:
      "Yes. You can get in touch with the team to reschedule to a more convenient date and time.",
  },
  {
    question: "Is Altroz HR suitable for my industry?",
    answer:
      "Altroz HR is used across industries such as manufacturing, healthcare, retail, construction, IT and more. You can mention your industry in the form so the demo can be shaped accordingly.",
  },
  {
    question: "Which HR modules can I see in the demo?",
    answer:
      "You can choose the modules you are most interested in, such as attendance, payroll, leave or recruitment.",
  },
  {
    question: "Who will conduct the demo?",
    answer: "The demo is conducted by a member of the Altroz HR product team.",
  },
  {
    question: "What happens after the demo?",
    answer:
      "After the demo, you can decide the next steps at your own pace. The team will be available to answer follow-up questions.",
  },
  {
    question: "How do I book a demo?",
    answer:
      "Simply fill in the demo booking form on this page with your details, and the team will get in touch to confirm your session.",
  },
];

const quickLinks = [
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Why Altroz HR", href: ROUTES.whyAltroz },
  { label: "About Us", href: ROUTES.about },
  { label: "Contact Us", href: ROUTES.contact },
  { label: "Support", href: ROUTES.support },
  { label: "Learn", href: ROUTES.learn },
  { label: "Attendance Management", href: ROUTES.attendanceManagement },
  { label: "Payroll Management", href: ROUTES.payroll },
  { label: "Leave Management", href: ROUTES.leaveManagement },
  { label: "Recruitment", href: ROUTES.recruitment },
  { label: "Performance Management", href: ROUTES.performance },
  { label: "HR Automation", href: ROUTES.automation },
  { label: "HR Analytics", href: ROUTES.analytics },
  { label: "Workforce Management", href: ROUTES.workforce },
  { label: "Employee Lifecycle", href: ROUTES.coreHR },
];

const contactIconMap = {
  messageSquare: MessageSquareText,
  calendarDays: CalendarDays,
  headphones: Headphones,
  handshake: Handshake,
  briefcase: BriefcaseBusiness,
} as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email address."),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid mobile number."),
  city: z.string().min(2, "Please enter your city."),
  industry: z.string().min(1, "Please select your industry."),
  employeeRange: z.string().min(1, "Please select the employee range."),
  interestedModule: z.string().min(1, "Please select a module."),
  preferredContactMethod: z.string().min(1, "Please select a contact method."),
  message: z.string().min(15, "Please share a short message about your demo needs."),
  consent: z.boolean().refine((value) => value, "Please agree to be contacted about your demo request."),
});

type FormValues = z.infer<typeof formSchema>;

type StatusState =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const defaultValues: FormValues = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  mobileNumber: "",
  city: "",
  industry: "",
  employeeRange: "",
  interestedModule: moduleOptions[0],
  preferredContactMethod: preferredContactMethods[0],
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

function InfoCard({
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

function NumberCard({
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

export default function BookDemoPage() {
  const canonicalPath = typeof window !== "undefined" ? window.location.pathname : ROUTES.bookDemo;
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = (values: FormValues) => {
    setStatus({ type: "loading", message: "Preparing your demo request..." });

    const message = [
      "Altroz HR free demo request",
      `Name: ${sanitize(values.fullName)}`,
      `Company: ${sanitize(values.companyName)}`,
      `Business email: ${sanitize(values.businessEmail)}`,
      `Mobile number: ${sanitize(values.mobileNumber)}`,
      `City: ${sanitize(values.city)}`,
      `Industry: ${sanitize(values.industry)}`,
      `Employee range: ${sanitize(values.employeeRange)}`,
      `Interested module: ${sanitize(values.interestedModule)}`,
      `Preferred contact method: ${sanitize(values.preferredContactMethod)}`,
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
      message: "Your demo request draft opened in WhatsApp. Send it there to complete your booking.",
    });
    form.reset(defaultValues);
  };

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
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                  Trusted Cloud HR Platform
                </span>
                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                  Book Your Free HR Software Demo with Altroz HR
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  See how Altroz HR can simplify employee management, attendance, payroll and more
                  with a personalized, no-obligation walkthrough built around your business.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-ink-soft">
                  Altroz HR is a cloud-based HR software designed to reduce manual effort and bring
                  your workforce processes into one central view.
                </p>

                <div className="button-group mt-6">
                  <Button asChild className="h-11 rounded-full bg-primary px-6 font-semibold text-white">
                    <a href="#demo-form">Schedule Free Demo</a>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                    <a href="#what-youll-see">Explore Features</a>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink-soft">
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    No obligation
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Online walkthrough
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Tailored to your workflow
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="soft-card overflow-hidden p-6 md:p-8">
                  <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <CalendarCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                          Demo Overview
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-ink">
                          What your session will focus on
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                          The demo can be shaped around your priorities, such as attendance, payroll,
                          leave, HR automation or workforce visibility.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Employee records and approvals",
                        "Attendance and shift visibility",
                        "Payroll and leave workflow",
                        "Reports and next-step discussion",
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
                        { value: "Free", label: "No payment details" },
                        { value: "1 session", label: "Focused walkthrough" },
                        { value: "Your pace", label: "No pressure follow-up" },
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
              {demoHighlights.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="demo-form" className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Demo Booking Form"
              title="Share a few details so the demo can be tailored to your business"
              description="This form keeps the request short but still gives the team enough context to prepare a relevant walkthrough."
              center
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Book My Free Demo
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-ink">Tell us what you want to see</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      Add your details and the modules you care about most. The form is intentionally
                      simple so it stays easy to complete on desktop and mobile.
                    </p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary sm:grid">
                    <MessageSquareText className="h-5 w-5" />
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
                        name="employeeRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee Range *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {employeeRangeOptions.map((option) => (
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
                        name="interestedModule"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Module *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select module" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {moduleOptions.map((option) => (
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
                        name="preferredContactMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Contact Method *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {preferredContactMethods.map((option) => (
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
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What would you like to see? *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your current HR setup, the modules you want to review, and any challenges you want the demo to cover."
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
                              I agree to be contacted about this demo request *
                            </FormLabel>
                            <p className="text-xs leading-5 text-ink-soft">
                              You can mention your preferred time and any priorities you want the
                              demo to cover.
                            </p>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs leading-5 text-ink-soft">
                        The form opens a WhatsApp draft with your details so the team can confirm your
                        demo request quickly.
                      </div>
                      <Button
                        type="submit"
                        className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                      >
                        Book My Free Demo
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
                  What to prepare
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">A few details help us tailor the demo</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Your current HR pain points or workflows",
                    "The modules you want to explore first",
                    "Your industry and employee range",
                    "Any branch, shift or field-team setup",
                    "Your preferred contact method and time",
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

                <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                  <div className="text-sm font-bold text-ink">Validation guidance</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    Full name, company name, business email, mobile number, city, industry,
                    employee range, module choice and consent are all required so the request can be
                    prepared properly.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="what-youll-see" className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="What You'll See in the Demo"
              title="Pick the areas that matter most and keep the walkthrough focused"
              description="Depending on your interests, the demo can cover any or all of the core Altroz HR modules."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {demoModules.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="How the Demo Works"
              title="A simple six-step flow so there are no surprises"
              description="The process is designed to be clear, conversational and easy to follow from request to follow-up."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {demoSteps.map((item) => (
                <NumberCard key={item.step} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Who Should Book a Demo?"
              title="If you work with HR, operations or workforce planning, this demo can help"
              description="The page is meant for decision makers and practitioners who want to see the software in the context of real work."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {whoShouldBook.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why Book a Demo?"
              title="A demo helps you evaluate the fit before making a decision"
              description="These benefits are focused on clarity, alignment and practical next steps rather than generic sales language."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {whyBook.map((item) => (
                <article key={item.title} className="soft-card flex h-full flex-col p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <BadgeCheck className="h-5 w-5" />
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
              eyebrow="Industries We Serve"
              title="The demo can be shaped around the way your industry actually works"
              description="Use the form to tell us your industry so the walkthrough can focus on the right workflows, constraints and reporting needs."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industries.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers before you book"
              description="These questions cover the booking process, demo format and what happens after the session."
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

        <section className="section bg-surface">
          <div className="site-container">
            <SectionHeading
              eyebrow="Need Help Before Booking?"
              title="If you have questions, choose the contact path that suits you best"
              description="The repository does not publish verified phone, email or office details, so this page uses the existing product routes and WhatsApp flow."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {contactMethods.map((item) => {
                const Icon = contactIconMap[item.icon as keyof typeof contactIconMap];
                return (
                  <SmartLink
                    key={item.id}
                    href={item.href}
                    className="group soft-card flex h-full flex-col p-5 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                    <div className="mt-auto pt-5 text-sm font-semibold text-primary">
                      Open path
                      <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </SmartLink>
                );
              })}
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
                    Keep Exploring
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Book the demo now, or review the product pages that match your priorities
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    Use this page to get a practical look at Altroz HR, then move into the pages
                    below when you want to explore the modules in more detail.
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
                      <a href="#demo-form">Book Free Demo</a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-full px-6 font-semibold">
                      <Link to={ROUTES.contact}>Contact Sales</Link>
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
