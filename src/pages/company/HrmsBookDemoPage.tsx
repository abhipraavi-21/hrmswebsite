import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Users,
  Wallet,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { buildWhatsAppHref } from "@/config/contactInfo";
import { ROUTES } from "@/routes/routeConfig.js";
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

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email address."),
  phoneNumber: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[0-9+()\-\s]{7,20}$/, "Please enter a valid phone number."),
  employeeRange: z.string().min(1, "Please select your employee range."),
  demoFocus: z.string().min(1, "Please choose what you would like to explore."),
  message: z.string().optional(),
  consent: z
    .boolean()
    .refine((value) => value, "Please agree to be contacted about your demo request."),
});

type FormValues = z.infer<typeof formSchema>;
type StatusState =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const defaultValues: FormValues = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  employeeRange: "",
  demoFocus: "Complete HRMS platform",
  message: "",
  consent: false,
};

const demoTopics = [
  {
    title: "Employee Management",
    description: "Organize employee profiles, documents and lifecycle data.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance and Leave",
    description: "See approvals, shifts, GPS attendance and leave workflows.",
    icon: <CalendarCheck className="h-5 w-5" />,
  },
  {
    title: "Payroll Operations",
    description: "Understand salary runs, reports and connected HR records.",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Automation and Reports",
    description: "Explore reminders, dashboards and day-to-day HR controls.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
];

function sanitize(value = "") {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

export default function HrmsBookDemoPage() {
  const location = useLocation();
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = (values: FormValues) => {
    const message = [
      "Altroz HRMS demo request",
      `Name: ${sanitize(values.fullName)}`,
      `Company: ${sanitize(values.companyName)}`,
      `Business email: ${sanitize(values.businessEmail)}`,
      `Phone number: ${sanitize(values.phoneNumber)}`,
      `Employee range: ${sanitize(values.employeeRange)}`,
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
      message: "Your HRMS demo request draft opened in WhatsApp. Send it there to complete your booking.",
    });
    form.reset(defaultValues);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(11,92,255,0.12),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f4f8ff_100%)]">
      <PageSEO
        title="Book a Demo | Altroz HRMS"
        description="Book an Altroz HRMS demo and explore employee management, attendance, leave, payroll, automation and reporting workflows."
        canonicalPath={location.pathname}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-primary/10 py-14 sm:py-18 lg:py-24">
          <div className="site-container relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-primary shadow-sm">
                  <CalendarCheck className="h-4 w-4" />
                  Book an HRMS Demo
                </span>
                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  See How Altroz HRMS Can Simplify Your People Operations
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                  Explore employee management, attendance, leave, payroll, automation and reports
                  in one guided walkthrough built around your team.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#demo-form" className="btn-primary inline-flex items-center gap-2">
                    Book My Demo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link to={ROUTES.hrmsHome} className="btn-outline inline-flex items-center gap-2">
                    Explore HRMS
                  </Link>
                </div>
              </div>

              <div className="soft-card overflow-hidden border-primary/15 bg-white p-5 shadow-float sm:p-7">
                <div className="rounded-[1.5rem] border border-border bg-primary-soft/40 p-5 sm:p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Demo Overview
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-ink">
                    What your HRMS demo can focus on
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {demoTopics.map((topic) => (
                      <div
                        key={topic.title}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm"
                      >
                        <span className="mt-0.5 shrink-0 text-primary">{topic.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-ink">{topic.title}</div>
                          <p className="mt-1 text-xs leading-5 text-ink-soft">{topic.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo-form" className="section">
          <div className="site-container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                Request Your Demo
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl">
                Share your details and our team will get in touch
              </h2>
              <p className="mt-3 text-base leading-7 text-ink-soft">
                Tell us about your workforce and we will tailor the walkthrough to your HR
                operations.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-border bg-white p-6 shadow-float sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
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
                        <FormLabel>Business email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" {...field} />
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
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeeRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee range</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-25 employees">1-25 employees</SelectItem>
                            <SelectItem value="26-100 employees">26-100 employees</SelectItem>
                            <SelectItem value="101-500 employees">101-500 employees</SelectItem>
                            <SelectItem value="More than 500 employees">
                              More than 500 employees
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="demoFocus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What would you like to explore?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a focus area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Employee management">Employee management</SelectItem>
                            <SelectItem value="Attendance and leave">Attendance and leave</SelectItem>
                            <SelectItem value="Payroll operations">Payroll operations</SelectItem>
                            <SelectItem value="Automation and reports">
                              Automation and reports
                            </SelectItem>
                            <SelectItem value="Complete HRMS platform">
                              Complete HRMS platform
                            </SelectItem>
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
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Message or requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your current HR workflows or goals"
                            className="min-h-28"
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
                      <FormItem className="flex items-start gap-3 space-y-0 sm:col-span-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal leading-6">
                            I agree to be contacted about this HRMS demo request.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Button type="submit" className="btn-primary">
                    Book My HRMS Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  {status.message ? (
                    <p className={status.type === "error" ? "text-sm text-destructive" : "text-sm text-success"}>
                      {status.type === "success" && <CheckCircle2 className="mr-1 inline h-4 w-4" />}
                      {status.message}
                    </p>
                  ) : null}
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
