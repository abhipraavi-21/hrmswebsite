"use client";

import { useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CalendarDays,
  Headphones,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import PageSEO from "@/components/site/PageSEO";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
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
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  buildWhatsAppHref,
  contactConfig,
  contactMethods,
  employeeRangeOptions,
  industryOptions,
  preferredContactMethods,
} from "@/config/contactInfo";

const bulkEmailModuleOptions = [
  "Email Broadcast",
  "Templates",
  "Analytics",
  "Scheduling",
  "SMTP Configuration",
  "Contacts",
  "Automation",
  "Other",
] as const;

const bulkEmailServiceOptions = [
  {
    id: "product-demo",
    label: "Product Demonstration",
    enquiryType: "Demo request",
    description: "See the platform in action and explore the bulk email modules you need.",
  },
  {
    id: "consultation",
    label: "Campaign Consultation",
    enquiryType: "Consultation",
    description: "Discuss current campaign needs, workflows, and the right starting point.",
  },
  {
    id: "broadcast",
    label: "Email Broadcast Setup",
    enquiryType: "Broadcast enquiry",
    description: "Talk about broadcast structure, audiences and sending setup.",
  },
  {
    id: "templates",
    label: "Templates",
    enquiryType: "Templates enquiry",
    description: "Review reusable email layouts and campaign branding needs.",
  },
  {
    id: "analytics",
    label: "Analytics and Reporting",
    enquiryType: "Analytics enquiry",
    description: "Explore campaign performance, delivery data and reporting needs.",
  },
  {
    id: "scheduling",
    label: "Campaign Scheduling",
    enquiryType: "Scheduling enquiry",
    description: "Plan scheduled sends and timed campaigns for your audience.",
  },
  {
    id: "smtp",
    label: "SMTP Configuration",
    enquiryType: "SMTP enquiry",
    description: "Set up your sending route and delivery infrastructure correctly.",
  },
  {
    id: "support",
    label: "Technical Support",
    enquiryType: "Technical support",
    description: "Report an issue or ask for help with an existing setup.",
  },
  {
    id: "partner",
    label: "Partner Enquiry",
    enquiryType: "Partner enquiry",
    description: "Explore consulting, referral or partnership conversations.",
  },
  {
    id: "billing",
    label: "Commercial Enquiry",
    enquiryType: "Commercial enquiry",
    description: "Discuss pricing, procurement or commercial questions.",
  },
  {
    id: "other",
    label: "Other",
    enquiryType: "General enquiry",
    description: "Use this for any enquiry that does not fit the categories above.",
  },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email."),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid mobile number."),
  city: z.string().min(2, "Please enter your city."),
  industry: z.string().min(1, "Please select your industry."),
  employeeRange: z.string().min(1, "Please select the employee range."),
  interestedModule: z.string().min(1, "Please select a module."),
  enquiryType: z.string().min(1, "Please select an enquiry type."),
  preferredContactMethod: z.string().min(1, "Please select a contact method."),
  message: z.string().min(15, "Please share a short message about your enquiry."),
  consent: z.boolean().refine((value) => value, "Please agree to be contacted about your enquiry."),
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
  interestedModule: bulkEmailModuleOptions[0],
  enquiryType: bulkEmailServiceOptions[0].enquiryType,
  preferredContactMethod: preferredContactMethods[0],
  message: "",
  consent: false,
};

const iconMap = {
  messageSquare: MessageSquare,
  calendarDays: CalendarDays,
  headphones: Headphones,
} as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-ink-soft sm:text-base">{description}</p>
    </div>
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
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function buildBulkEmailMessage(values: FormValues, serviceLabel: string) {
  const clean = (value: string) => value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

  return [
    "Altroz Bulk Email enquiry",
    `Service: ${serviceLabel}`,
    `Name: ${clean(values.fullName)}`,
    `Company: ${clean(values.companyName)}`,
    `Business email: ${clean(values.businessEmail)}`,
    `Mobile number: ${clean(values.mobileNumber)}`,
    `City: ${clean(values.city)}`,
    `Industry: ${clean(values.industry)}`,
    `Employee range: ${clean(values.employeeRange)}`,
    `Interested module: ${clean(values.interestedModule)}`,
    `Preferred contact method: ${clean(values.preferredContactMethod)}`,
    "",
    "Message:",
    clean(values.message),
  ].join("\n");
}

function ContactCard({
  label,
  description,
  href,
  iconKey,
}: {
  label: string;
  description: string;
  href: string;
  iconKey: keyof typeof iconMap;
}) {
  const Icon = iconMap[iconKey];

  return (
    <SmartLink
      href={href}
      className="group h-full rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-base font-semibold text-ink">{label}</div>
          <p className="mt-1 text-sm leading-6 text-ink-soft">{description}</p>
          <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Open path{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </SmartLink>
  );
}

function HeroPathCard({
  label,
  description,
  href,
  iconKey,
}: {
  label: string;
  description: string;
  href: string;
  iconKey: keyof typeof iconMap;
}) {
  const Icon = iconMap[iconKey];

  return (
    <SmartLink
      href={href}
      className="group rounded-[1.4rem] border border-border bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-sm font-semibold text-ink">{label}</div>
          <p className="mt-1 text-xs leading-5 text-ink-soft">{description}</p>
          <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Open{" "}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </SmartLink>
  );
}

export default function BulkEmailContactsPage() {
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const enquiryType = form.watch("enquiryType");
  const activeService =
    bulkEmailServiceOptions.find((item) => item.enquiryType === enquiryType) ??
    bulkEmailServiceOptions[0];

  const quickContactMethods = contactMethods.slice(0, 3);

  const onSubmit = async (values: FormValues) => {
    setStatus({ type: "loading", message: "Preparing your WhatsApp enquiry..." });

    const message = buildBulkEmailMessage(values, activeService.label);
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
      message: "Your enquiry draft opened in WhatsApp. Send it there to complete submission.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Contact Altroz Bulk Email | Book a Demo or Sales Consultation"
        description="Contact Altroz Bulk Email for product demonstrations, campaign consultation, broadcast setup, scheduling, SMTP, and customer enquiries."
        canonicalPath={ROUTES.bulkEmailContacts}
      />

      <BulkEmailNavbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <Mail className="h-4 w-4" />
                Contact Us
              </div>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Get in Touch with Altroz Bulk Email
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                We are here to help you simplify your email communication. Whether you are
                evaluating bulk email software, requesting a product demonstration, planning your
                campaign workflow, or looking for product support, the Altroz Technologies team can
                help you identify the right next step.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                Use the verified WhatsApp route or the enquiry form below. Our team will review your
                enquiry and contact you using the details provided.
              </p>

              <div className="button-group mt-6">
                <Button asChild className="btn-primary">
                  <a href="#contact-form">Send an Enquiry</a>
                </Button>
                <Button asChild variant="outline" className="btn-outline">
                  <Link to={ROUTES.bookDemo}>Book Free Demo</Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    iconKey: "messageSquare" as const,
                    title: "Product Enquiry",
                    text: "Ask about product fit, pricing, or the right starting point.",
                    href: "#contact-form",
                  },
                  {
                    iconKey: "calendarDays" as const,
                    title: "Book a Demo",
                    text: "Open the demo workflow for a guided product walkthrough.",
                    href: ROUTES.bookDemo,
                  },
                  {
                    iconKey: "headphones" as const,
                    title: "Support",
                    text: "Use the support route for customer help and product questions.",
                    href: ROUTES.support,
                  },
                ].map((item) => (
                  <HeroPathCard
                    key={item.title}
                    label={item.title}
                    description={item.text}
                    href={item.href}
                    iconKey={item.iconKey}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <SectionHeading
              align="center"
              eyebrow="Quick Contact"
              title="Choose the best way to reach the Altroz Bulk Email team"
              description="Use one of the verified paths below to reach the Altroz Bulk Email team."
            />

            <StaggerReveal
              step={70}
              className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {quickContactMethods.map((item) => (
                <ContactCard
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  href={item.href}
                  iconKey={item.icon as keyof typeof iconMap}
                />
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="contact-form" className="section">
          <div className="site-container">
            <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-border bg-white p-5 shadow-float md:p-6">
              <SectionHeading
                align="center"
                eyebrow="Send a Message"
                title="Share your enquiry with the Altroz Bulk Email team"
                description="Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel."
              />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input autoComplete="name" placeholder="Enter your full name" {...field} />
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
                            <Input
                              autoComplete="organization"
                              placeholder="Enter company name"
                              {...field}
                            />
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
                            <Input
                              type="email"
                              autoComplete="email"
                              inputMode="email"
                              placeholder="name@company.com"
                              {...field}
                            />
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
                            <Input
                              type="tel"
                              autoComplete="tel"
                              inputMode="tel"
                              placeholder="Enter mobile number"
                              {...field}
                            />
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
                            <Input autoComplete="address-level2" placeholder="Enter your city" {...field} />
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
                          <Select onValueChange={field.onChange} value={field.value}>
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
                          <FormLabel>Number of Employees *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
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
                          <FormLabel>Interested Module *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select module" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bulkEmailModuleOptions.map((option) => (
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
                      name="enquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enquiry Type *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select enquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bulkEmailServiceOptions.map((option) => (
                                <SelectItem key={option.id} value={option.enquiryType}>
                                  {option.enquiryType}
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
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select contact method" />
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
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your bulk email goals, current challenges, or what you want to explore."
                            className="min-h-36 resize-none"
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
                      <FormItem className="rounded-[1.25rem] border border-border bg-surface p-4">
                        <div className="flex items-start gap-3">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="text-sm leading-6">
                              I agree that Altroz Technologies may contact me regarding my enquiry
                              and relevant Bulk Email services.
                            </FormLabel>
                            <p className="text-xs leading-5 text-ink-soft">
                              See the{" "}
                              <Link
                                to={contactConfig.routes.privacyPolicy}
                                className="font-semibold text-primary"
                              >
                                privacy policy
                              </Link>{" "}
                              for more information.
                            </p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div
                      role="status"
                      aria-live="polite"
                      className={cn(
                        "text-sm",
                        status.type === "error" && "text-destructive",
                        status.type === "success" && "text-success",
                        status.type === "loading" && "text-ink-soft",
                        status.type === "idle" && "text-ink-soft",
                      )}
                    >
                      {status.message ||
                        "Your enquiry will open in WhatsApp once the form is complete."}
                    </div>

                    <Button
                      type="submit"
                      className="h-11 rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary/90"
                      disabled={status.type === "loading"}
                    >
                      {status.type === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Preparing...
                        </>
                      ) : (
                        "Send Enquiry"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="site-container">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Ready to Start
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Ready to Simplify Your Bulk Email Operations?
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Connect with Altroz Bulk Email to explore broadcasting, templates, analytics,
                    scheduling, SMTP configuration, and campaign support from one centralised
                    platform.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="button-group lg:justify-end">
                    <Button asChild className="btn-primary">
                      <a href="#contact-form">Send an Enquiry</a>
                    </Button>
                    <Button asChild variant="outline" className="btn-outline">
                      <Link to={ROUTES.bookDemo}>Book Free Demo</Link>
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
