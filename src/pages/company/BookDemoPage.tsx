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
  ClipboardList,
  Factory,
  FileText,
  Headphones,
  Laptop2,
  LayoutDashboard,
  Package,
  QrCode,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Workflow,
  Wrench,
} from "lucide-react";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { buildWhatsAppHref } from "@/config/contactInfo";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";

const seoTitle = "Book a Demo | Altroz Asset Management";
const seoDescription =
  "Book a demo of Altroz Asset Management and explore asset tracking, QR Code management, maintenance, warranties and asset reporting.";

const demoFocusOptions = [
  "Asset Management",
  "Asset Tracking",
  "QR Code Asset Management",
  "Asset Maintenance",
  "Asset Reports",
  "Complete Platform",
] as const;

const industryOptions = [
  "IT and Technology",
  "Manufacturing",
  "Operations",
  "Administration",
  "Finance",
  "Procurement",
  "Facility Management",
  "Healthcare",
  "Education",
  "Retail",
  "Construction",
  "Corporate Office",
  "Other",
] as const;

const demoTopics = [
  {
    title: "Asset Management",
    description: "See how assets can be registered, categorized and managed.",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Asset Tracking",
    description: "Understand asset ownership, location, department and status tracking.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "QR Code Management",
    description: "See how QR Codes can help identify and access asset information.",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    title: "Reports & Maintenance",
    description: "Explore maintenance information, warranty details and asset reports.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const businessTeams = [
  {
    title: "IT Teams",
    description: "Track hardware and equipment assigned across the organization.",
    icon: <Laptop2 className="h-5 w-5" />,
  },
  {
    title: "Manufacturing",
    description: "Manage machinery, tools and production assets.",
    icon: <Factory className="h-5 w-5" />,
  },
  {
    title: "Operations",
    description: "Keep visibility on assets used across daily operations.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Administration",
    description: "Manage office assets and equipment assignments.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Finance",
    description: "Maintain accurate asset records for reporting and audits.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Procurement",
    description: "Track assets from purchase through their lifecycle.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Facility Management",
    description: "Monitor assets and maintenance across facilities.",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Business Owners",
    description: "Get a centralized view of all organizational assets.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Share Your Details",
    description:
      "Tell us your company name, contact details, asset volume and what you want to explore.",
  },
  {
    step: "02",
    title: "We Understand Your Requirements",
    description:
      "Our team reviews your current asset management needs and prepares the right walkthrough.",
  },
  {
    step: "03",
    title: "Schedule a Suitable Demo",
    description: "We contact you to confirm a date and time that works for your team.",
  },
  {
    step: "04",
    title: "Explore the Platform",
    description:
      "See asset management, tracking, QR codes, maintenance, warranties and reports in action.",
  },
];

const faqItems = [
  {
    question: "How do I book an Altroz Asset Management demo?",
    answer:
      "Fill out the demo request form on this page with your details, and our team will get in touch to schedule a time that works for you.",
  },
  {
    question: "What will be covered in the demo?",
    answer:
      "The demo covers asset management, asset tracking, QR code management, and asset maintenance and reporting.",
  },
  {
    question: "Who should attend the demo?",
    answer:
      "Anyone involved in managing assets, such as IT, operations, administration, finance or facility teams.",
  },
  {
    question: "Can I discuss my organization's asset management requirements?",
    answer: "Yes. Our team will understand your requirements and tailor the demo accordingly.",
  },
  {
    question: "Can I see the QR Code asset management functionality?",
    answer: "Yes, QR Code based asset identification and access will be shown during the demo.",
  },
  {
    question: "How will the team contact me after submitting the form?",
    answer:
      "Our team will reach out using the phone number or email address you provide in the form.",
  },
];

const quickLinks = [
  { label: "Asset Management", href: ROUTES.assetManagementHome },
  { label: "Asset Tracking", href: ROUTES.bulkEmailAssetTracking },
  { label: "QR Code Asset Management", href: ROUTES.bulkEmailAssetQrCode },
  { label: "Asset Maintenance", href: ROUTES.bulkEmailAssetMaintenance },
  { label: "Asset Reports", href: ROUTES.bulkEmailAssetReports },
  { label: "Pricing", href: ROUTES.assetManagementPricing },
  { label: "FAQs", href: ROUTES.assetManagementFaq },
  { label: "Contact Us", href: ROUTES.assetManagementContact },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email address."),
  phoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid phone number."),
  numberOfAssets: z.string().optional(),
  industry: z.string().optional(),
  preferredDemoDate: z.string().optional(),
  preferredTime: z.string().optional(),
  demoFocus: z.string().min(1, "Please choose what you would like to explore."),
  message: z.string().optional(),
  consent: z
    .boolean()
    .refine((value) => value, "Please agree to be contacted about your demo request."),
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
  phoneNumber: "",
  numberOfAssets: "",
  industry: "",
  preferredDemoDate: "",
  preferredTime: "",
  demoFocus: "Complete Platform",
  message: "",
  consent: false,
};

function sanitize(value = "") {
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
    <ScrollReveal
      variant="fade-up"
      className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
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
    <article className="soft-card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-float">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
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

function DemoDashboardMock() {
  return (
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
            <h2 className="mt-2 text-2xl font-bold text-ink">What your asset demo will focus on</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Explore how your organization can manage assets, assignments, QR codes, maintenance,
              warranties and reports from one centralized platform.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Asset registration and categories",
            "Ownership, location and status tracking",
            "QR Code asset lookup",
            "Maintenance, warranty and reports",
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
            { value: "4 areas", label: "Core workflows" },
            { value: "QR ready", label: "Asset identification" },
            { value: "Your needs", label: "Tailored discussion" },
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
      "Altroz Asset Management demo request",
      `Name: ${sanitize(values.fullName)}`,
      `Company: ${sanitize(values.companyName)}`,
      `Business email: ${sanitize(values.businessEmail)}`,
      `Phone number: ${sanitize(values.phoneNumber)}`,
      `Number of assets: ${sanitize(values.numberOfAssets) || "Not provided"}`,
      `Industry: ${sanitize(values.industry) || "Not provided"}`,
      `Preferred demo date: ${sanitize(values.preferredDemoDate) || "Not provided"}`,
      `Preferred time: ${sanitize(values.preferredTime) || "Not provided"}`,
      `What to explore: ${sanitize(values.demoFocus)}`,
      "",
      "Message / requirements:",
      sanitize(values.message) || "Not provided",
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
      message:
        "Your demo request draft opened in WhatsApp. Send it there to complete your booking.",
    });
    form.reset(defaultValues);
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: resolveSiteUrl(ROUTES.home),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Book a Demo",
        item: resolveSiteUrl(ROUTES.bookDemo),
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Book a Demo | Altroz Asset Management",
    url: resolveSiteUrl(ROUTES.bookDemo),
    description: seoDescription,
    publisher: {
      "@type": "Organization",
      name: "Altroz Technologies Pvt. Ltd.",
      url: resolveSiteUrl(ROUTES.home),
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Altroz Technologies Pvt. Ltd.",
    url: resolveSiteUrl(ROUTES.home),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.08),_transparent_36%),linear-gradient(180deg,_#ffffff_0%,_#f7fbff_100%)]">
      <PageSEO title={seoTitle} description={seoDescription} canonicalPath={canonicalPath} />

      <AssetManagementNavbar />

      <main>
        <section className="page-banner relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                  Book a Demo
                </span>
                <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
                  See How Altroz Asset Management Can Simplify Your Asset Management
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft sm:text-lg">
                  Explore how your organization can manage assets, assignments, QR codes,
                  maintenance, warranties and reports from one centralized platform.
                </p>

                <div className="button-group mt-6">
                  <Button
                    asChild
                    className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                  >
                    <a href="#demo-form">Book My Demo</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full px-6 font-semibold"
                  >
                    <Link to={ROUTES.assetManagementHome}>Explore Asset Management</Link>
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink-soft">
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Asset tracking walkthrough
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    QR code management
                  </div>
                  <div className="rounded-full border border-border bg-white px-3 py-2 shadow-sm">
                    Maintenance and reports
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <DemoDashboardMock />
              </div>
            </div>

            <StaggerReveal step={70} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {demoTopics.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="demo-form" className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Request Your Demo"
              title="Share your details and our team will get in touch"
              description="Tell us what you want to explore, and our team will understand your requirements and schedule a suitable demo."
              center
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Book My Demo
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-ink">
                      Tell us what you want to explore
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      The form follows the demo sheet exactly, with required contact details and
                      optional context for assets, industry, date, time and requirements.
                    </p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary sm:grid">
                    <Headphones className="h-5 w-5" />
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
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfAssets"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Assets</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 250 assets" {...field} />
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
                            <FormLabel>Industry</FormLabel>
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
                        name="preferredDemoDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Demo Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="demoFocus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What would you like to explore? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose demo focus" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {demoFocusOptions.map((option) => (
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message / Requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your current asset management process, branches, asset types or reporting needs."
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
                              Our team will use your email or phone number to schedule your Altroz
                              Asset Management demo.
                            </p>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs leading-5 text-ink-soft">
                        The form opens a WhatsApp draft with your details so the team can confirm
                        your demo request quickly.
                      </div>
                      <Button
                        type="submit"
                        className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                      >
                        Request Demo
                      </Button>
                    </div>

                    {status.type !== "idle" && (
                      <div
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm leading-6",
                          status.type === "success" &&
                            "border-success/20 bg-success/10 text-success",
                          status.type === "error" &&
                            "border-destructive/20 bg-destructive/10 text-destructive",
                          status.type === "loading" &&
                            "border-primary/20 bg-primary/10 text-primary",
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
                  What We'll Show You
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  A practical walkthrough of the asset lifecycle
                </h3>
                <div className="mt-5 space-y-3">
                  {demoTopics.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        {item.icon}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink">{item.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-ink-soft">
                          {item.description}
                        </span>
                      </span>
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
              eyebrow="Built for Businesses Managing Physical Assets"
              title="The demo is useful for every team that handles business assets"
              description="Altroz Asset Management can support teams responsible for IT hardware, machinery, office equipment, finance records, procurement workflows and facility assets."
              center
            />

            <StaggerReveal step={55} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {businessTeams.map((item) => (
                <InfoCard key={item.title} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="How It Works"
              title="A simple flow from request to product walkthrough"
              description="The demo process is designed to be clear, practical and shaped around the asset management questions your team already has."
              center
            />

            <StaggerReveal step={60} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((item) => (
                <NumberCard key={item.step} {...item} />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-6 h-28 w-28 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Have Questions Before Booking?
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Talk to our team about your asset management requirements
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    If you want to understand whether Altroz Asset Management is the right fit for
                    your organization before booking, our team can help you review your
                    requirements.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="button-group lg:justify-end">
                    <Button
                      asChild
                      className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                    >
                      <Link to={ROUTES.assetManagementContact}>Talk to Our Team</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-full px-6 font-semibold"
                    >
                      <a href="#demo-form">Request Demo</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Quick answers before you book"
              description="These questions cover the demo request process, what will be shown and who should attend."
              center
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.question}
                    value={item.question}
                    className="rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1">
                      <p className="text-sm leading-7 text-ink-soft">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section bg-surface">
          <div className="site-container">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 left-4 h-36 w-36 rounded-full bg-success/10 blur-3xl" />

              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Ready to Explore Altroz Asset Management?
                  </div>
                  <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                    Book a demo and see how a centralized platform can fit into your workflow
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-ink-soft">
                    Review asset tracking, QR Code management, maintenance, warranties and reports
                    in one guided product walkthrough.
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
                    <Button
                      asChild
                      className="h-11 rounded-full bg-primary px-6 font-semibold text-white"
                    >
                      <a href="#demo-form">Book a Demo</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-full px-6 font-semibold"
                    >
                      <Link to={ROUTES.assetManagementHome}>Explore Asset Management</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link
        to={ROUTES.bookDemo}
        className="fixed bottom-5 right-5 z-40 hidden rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-[0_18px_45px_rgba(11,92,255,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
      >
        Book Demo
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
    </div>
  );
}
