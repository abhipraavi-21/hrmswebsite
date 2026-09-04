import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  LayoutTemplate,
  Mail,
  Send,
} from "lucide-react";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";
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
import { buildWhatsAppHref } from "@/config/contactInfo";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

const seoTitle = "Book a Demo | Altroz Bulk Email";
const seoDescription =
  "Book a demo of Altroz Bulk Email and explore broadcasts, templates, scheduling, analytics and SMTP workflows.";

const demoFocusOptions = [
  "Email Broadcasts",
  "Email Templates",
  "Campaign Scheduling",
  "Delivery Analytics",
  "SMTP Configuration",
  "Complete Platform",
] as const;

const volumeOptions = [
  "Up to 1,000 emails per month",
  "1,000 to 10,000 emails per month",
  "10,000 to 100,000 emails per month",
  "More than 100,000 emails per month",
] as const;

const industryOptions = [
  "IT and Technology",
  "Manufacturing",
  "Education",
  "Healthcare",
  "Retail",
  "Professional Services",
  "Other",
] as const;

const demoTopics = [
  {
    title: "Campaign Broadcasting",
    description: "Create and send professional email campaigns from one central workspace.",
    icon: <Send className="h-5 w-5" />,
  },
  {
    title: "Reusable Templates",
    description: "Build consistent communications with reusable, on-brand email templates.",
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    title: "Scheduling and Automation",
    description: "Plan recurring communications and deliver them at the right time.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Delivery Analytics",
    description: "Review campaign performance with clear delivery and engagement reporting.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const faqItems = [
  {
    question: "What will the Altroz Bulk Email demo cover?",
    answer:
      "The demo can cover campaign broadcasting, templates, scheduling, analytics, recipient workflows and SMTP configuration based on your requirements.",
  },
  {
    question: "Can I discuss my current email process?",
    answer:
      "Yes. Share your current workflow, sending volume and communication goals so the walkthrough can focus on the areas most useful to your team.",
  },
  {
    question: "Who should attend the demo?",
    answer:
      "Marketing, HR, operations, customer communication and business owners can all benefit from the walkthrough.",
  },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email address."),
  phoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid phone number."),
  monthlyEmailVolume: z.string().optional(),
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
  monthlyEmailVolume: "",
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

export default function BulkEmailBookDemoPage() {
  const location = useLocation();
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = (values: FormValues) => {
    setStatus({ type: "loading", message: "Preparing your demo request..." });

    const message = [
      "Altroz Bulk Email demo request",
      `Name: ${sanitize(values.fullName)}`,
      `Company: ${sanitize(values.companyName)}`,
      `Business email: ${sanitize(values.businessEmail)}`,
      `Phone number: ${sanitize(values.phoneNumber)}`,
      `Monthly email volume: ${sanitize(values.monthlyEmailVolume) || "Not provided"}`,
      `Industry: ${sanitize(values.industry) || "Not provided"}`,
      `Preferred demo date: ${sanitize(values.preferredDemoDate) || "Not provided"}`,
      `Preferred time: ${sanitize(values.preferredTime) || "Not provided"}`,
      `What to explore: ${sanitize(values.demoFocus)}`,
      "",
      "Message / requirements:",
      sanitize(values.message) || "Not provided",
    ].join("\n");

    const opened = window.open(buildWhatsAppHref(message), "_blank", "noopener,noreferrer");

    if (!opened) {
      setStatus({
        type: "error",
        message: "Your browser blocked the WhatsApp window. Please allow popups and try again.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: "Your Bulk Email demo request draft opened in WhatsApp. Send it there to complete your booking.",
    });
    form.reset(defaultValues);
  };

  return (
    <div className="bulk-email-theme min-h-screen bg-[radial-gradient(circle_at_top,_rgba(238,104,1,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#fff8f1_100%)]">
      <PageSEO title={seoTitle} description={seoDescription} canonicalPath={location.pathname} />
      <BulkEmailNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-[#EE6801]/10 py-14 sm:py-18 lg:py-24">
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#EE6801]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="site-container relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#EE6801]/25 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#C95100] shadow-sm">
                  <Mail className="h-4 w-4" />
                  Book a Bulk Email Demo
                </span>
                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  See How Altroz Bulk Email Can Simplify Business Communication
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                  Explore broadcasts, templates, scheduling, analytics and SMTP workflows in one
                  guided walkthrough designed around the way your team communicates.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#demo-form" className="btn-primary inline-flex items-center gap-2 bg-[#EE6801] hover:bg-[#C95100]">
                    Book My Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to={ROUTES.bulkEmail} className="btn-outline inline-flex items-center gap-2">
                    Explore Bulk Email
                  </Link>
                </div>
              </div>

              <div className="soft-card overflow-hidden border-[#EE6801]/15 bg-white p-5 shadow-float sm:p-7">
                <div className="rounded-[1.5rem] border border-border bg-[#fff8f1] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#EE6801]/12 text-[#C95100]">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#C95100]">
                        Demo Overview
                      </div>
                      <h2 className="mt-2 text-2xl font-bold text-ink">
                        What your Bulk Email demo will focus on
                      </h2>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {["Campaign broadcasting", "Reusable templates", "Scheduling and automation", "Delivery analytics"].map(
                      (item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#EE6801]" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo-form" className="section">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[#EE6801]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#C95100] shadow-sm">
                Request Your Demo
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Share your details and our team will get in touch
              </h2>
              <p className="mt-3 text-base leading-7 text-ink-soft">
                Tell us about your communication goals and we will tailor the walkthrough to your
                campaigns, audience and sending volume.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <div className="soft-card p-5 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        name="monthlyEmailVolume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Email Volume</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sending volume" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {volumeOptions.map((option) => (
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
                              placeholder="Tell us about your campaigns, audience, sending volume or communication goals."
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
                        <FormItem className="flex items-start gap-3 rounded-2xl border border-border bg-[#fff8f1] px-4 py-3">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="text-sm font-medium text-ink">
                              I agree to be contacted about this demo request *
                            </FormLabel>
                            <p className="text-xs leading-5 text-ink-soft">
                              Our team will use your email or phone number to schedule your Altroz
                              Bulk Email demo.
                            </p>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs leading-5 text-ink-soft">
                        The form opens a WhatsApp draft so the team can confirm your demo request
                        quickly.
                      </div>
                      <Button
                        type="submit"
                        className="h-11 rounded-full bg-[#EE6801] px-6 font-semibold text-white hover:bg-[#C95100]"
                      >
                        Request Demo
                      </Button>
                    </div>

                    {status.type !== "idle" && (
                      <div
                        className={cn(
                          "rounded-2xl border px-4 py-3 text-sm leading-6",
                          status.type === "success" && "border-success/20 bg-success/10 text-success",
                          status.type === "error" && "border-destructive/20 bg-destructive/10 text-destructive",
                          status.type === "loading" && "border-primary/20 bg-primary/10 text-primary",
                        )}
                      >
                        {status.message}
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-[#fff8f1]">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[#EE6801]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#C95100] shadow-sm">
                What We Will Show You
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                A practical walkthrough of your business email workflow
              </h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {demoTopics.map((item) => (
                <article key={item.title} className="soft-card h-full bg-white p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#EE6801]/12 text-[#C95100]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-[#EE6801]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#C95100] shadow-sm">
                Frequently Asked Questions
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Quick answers before you book
              </h2>
            </div>
            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.question}
                    value={item.question}
                    className="rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-[#EE6801]">
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
      </main>

      <Footer />
    </div>
  );
}
