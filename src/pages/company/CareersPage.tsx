"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Brush,
  Bug,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  Layers3,
  Lightbulb,
  Loader2,
  MapPin,
  Megaphone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wallet,
  Workflow,
  MessageSquare,
  Clock3,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { modelScreenshots } from "@/lib/modelScreenshots";
import type { IconKey } from "./careers-data";
import {
  capabilityStrip,
  careerAreas,
  careersSeo,
  departmentOptions,
  departments,
  experienceOptions,
  faqItems,
  growthPanels,
  hiringSteps,
  impactSteps,
  noticePeriodOptions,
  positionOptions,
  sourceOptions,
  skillsWeValue,
  workplacePrinciples,
  whyWorkPoints,
} from "./careers-data";

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

const careerFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  emailAddress: z.string().email("Please enter a valid email address."),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number.")
    .regex(/^[0-9+()\-\s]+$/, "Please enter a valid mobile number."),
  currentCity: z.string().min(2, "Please enter your current city."),
  preferredWorkLocation: z.string().min(2, "Please share your preferred work location."),
  positionAppliedFor: z.string().min(1, "Please select a position."),
  department: z.string().min(1, "Please select a department."),
  totalExperience: z.string().min(1, "Please select your experience level."),
  currentCompany: z.string().optional().or(z.literal("")),
  currentRole: z.string().optional().or(z.literal("")),
  highestQualification: z.string().min(2, "Please enter your highest qualification."),
  noticePeriod: z.string().min(1, "Please select your notice period."),
  keySkills: z.string().min(3, "Please add a few skills or tools."),
  portfolioUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  linkedInUrl: z.string().url("Please enter a valid LinkedIn URL.").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal("")),
  coverMessage: z.string().min(20, "Please add a short cover message."),
  resumeFile: z
    .union([z.instanceof(File), z.null()])
    .refine((file) => file !== null, "Please upload your resume.")
    .refine((file) => file === null || ALLOWED_RESUME_TYPES.includes(file.type), {
      message: "Upload a PDF, DOC, or DOCX file.",
    })
    .refine((file) => file === null || file.size <= MAX_RESUME_SIZE_BYTES, {
      message: "Resume file must be 5 MB or smaller.",
    }),
  howDidYouHearAboutUs: z.string().min(1, "Please choose how you heard about us."),
  consent: z.boolean().refine((value) => value, "Please agree to the recruitment consent."),
  futureConsideration: z.boolean().default(false),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;
type ApplicationState = "idle" | "saving" | "draft-ready";

const defaultFormValues: CareerFormValues = {
  fullName: "",
  emailAddress: "",
  mobileNumber: "",
  currentCity: "",
  preferredWorkLocation: "",
  positionAppliedFor: "General Application",
  department: "General Application",
  totalExperience: "",
  currentCompany: "",
  currentRole: "",
  highestQualification: "",
  noticePeriod: "",
  keySkills: "",
  portfolioUrl: "",
  linkedInUrl: "",
  githubUrl: "",
  coverMessage: "",
  resumeFile: null,
  howDidYouHearAboutUs: "",
  consent: false,
  futureConsideration: false,
};

const iconMap: Record<IconKey, ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  users: Users,
  lightbulb: Lightbulb,
  rocket: Rocket,
  barChart: BarChart3,
  code: Code2,
  brush: Brush,
  bug: Bug,
  clipboard: ClipboardList,
  headphones: Headphones,
  megaphone: Megaphone,
  wallet: Wallet,
  workflow: Workflow,
  briefcase: BriefcaseBusiness,
  handshake: Handshake,
  graduation: GraduationCap,
  message: MessageSquare,
  shield: ShieldCheck,
  badge: BadgeCheck,
  clock: Clock3,
  map: MapPin,
  check: CheckCircle2,
  search: Search,
  fileText: FileText,
  book: BookOpen,
  chart: BarChart3,
  target: Target,
};

function usePageSeo(title: string, description: string, canonicalPath: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const head = document.head;

    let meta = head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href");

    document.title = title;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      head.appendChild(meta);
    }
    meta.content = description;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${canonicalPath}`;

    return () => {
      document.title = previousTitle;

      if (meta) {
        if (previousDescription == null) {
          meta.remove();
        } else {
          meta.content = previousDescription;
        }
      }

      if (canonical) {
        if (previousCanonical == null) {
          canonical.remove();
        } else {
          canonical.href = previousCanonical;
        }
      }
    };
  }, [canonicalPath, description, title]);
}

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
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn("fade-up motion-reduce:animate-none", className)}
    >
      {children}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
      <div className="mt-1 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

function IconBadge({ iconKey, className }: { iconKey: IconKey; className?: string }) {
  const Icon = iconMap[iconKey];
  return <Icon className={className} />;
}

function FieldShell({
  label,
  children,
  description,
}: {
  label: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      {description ? <p className="text-[0.8rem] leading-5 text-ink-soft">{description}</p> : null}
      <FormMessage />
    </FormItem>
  );
}

export default function CareersPage() {
  usePageSeo(careersSeo.title, careersSeo.description, careersSeo.canonical);

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: defaultFormValues,
    mode: "onSubmit",
  });

  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [applicationState, setApplicationState] = useState<ApplicationState>("idle");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(departments[0].id);
  const [statusMessage, setStatusMessage] = useState(
    "Live application submission is not connected in this repository yet. The form validates locally and keeps your profile draft in the browser session.",
  );
  const resumeFile = form.watch("resumeFile");

  const heroTiles = [
    { title: "Product Development", iconKey: "code" as const },
    { title: "UI/UX Design", iconKey: "brush" as const },
    { title: "Customer Success", iconKey: "headphones" as const },
    { title: "Sales and Marketing", iconKey: "megaphone" as const },
    { title: "HR Technology", iconKey: "workflow" as const },
    { title: "Learning and Growth", iconKey: "graduation" as const },
  ];

  const onSubmit = async (values: CareerFormValues) => {
    setApplicationState("saving");
    setStatusMessage("Saving your application draft locally.");

    await new Promise((resolve) => window.setTimeout(resolve, 450));

    setApplicationState("draft-ready");
    setStatusMessage(
      "Your application draft is ready. A live recruitment endpoint is not configured in this repository yet, so the form has not been sent anywhere.",
    );

    void values;
  };

  const handleRemoveResume = () => {
    form.setValue("resumeFile", null, { shouldValidate: true, shouldDirty: true });
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const selectedDepartment =
    departments.find((department) => department.id === selectedDepartmentId) ?? departments[0];

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden scroll-mt-24">
          <div className="pointer-events-none absolute -top-24 right-6 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-8 py-10 lg:grid-cols-12 lg:items-start lg:py-14">
            <div className="lg:col-span-6 fade-up motion-reduce:animate-none">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Join Our Growing Team
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Shape the Future of HR Technology with Altroz HRMS
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                At Altroz Technologies Pvt. Ltd., we believe great people build meaningful products.
                We are interested in passionate, talented, and motivated professionals who want to
                contribute to the future of HR technology.
              </p>
              <p className="mt-3 max-w-xl text-base leading-7 text-ink-soft">
                Whether you are beginning your career or looking for your next professional
                opportunity, Altroz Technologies aims to provide an environment where people can
                learn, collaborate, solve real business problems, and grow with the organization.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#openings" className="btn-primary">
                  View Open Positions
                </a>
                <a href="#apply" className="btn-outline">
                  Apply Now
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MetricCard label="Career focus" value="Practical HR technology" />
                <MetricCard label="Team style" value="Collaborative and respectful" />
                <MetricCard label="Application mode" value="General profile welcome" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-3xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-transparent to-success/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                            Careers visual
                          </div>
                          <h2 className="mt-2 text-2xl font-bold text-ink">
                            Product teams, customer teams, and growth-focused roles
                          </h2>
                        </div>
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-sm">
                          <Layers3 className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        {heroTiles.map((tile, index) => (
                          <Reveal key={tile.title} delay={index * 55}>
                            <div className="h-full rounded-2xl border border-border bg-white p-4 shadow-card">
                              <div className="flex flex-col items-center gap-3 text-center">
                                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                                  <IconBadge iconKey={tile.iconKey} className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold leading-5 text-ink break-words">
                                    {tile.title}
                                  </div>
                                  <div className="mt-1 text-xs leading-5 text-ink-soft break-words">
                                    Part of the Altroz HRMS journey
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>

                      <div className="mt-4 rounded-[1.25rem] bg-primary-soft/40 p-4">
                        <div className="text-sm font-semibold text-primary">
                          General Application
                        </div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">
                          No published openings are listed at the moment, but you can still submit
                          your profile for future opportunities.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 content-start">
                      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-card">
                        <img
                          src={modelScreenshots.workforceDashboard}
                          alt="Altroz HRMS workplace dashboard illustration"
                          className="block w-full object-contain"
                          loading="eager"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="grid gap-3">
                        {[
                          { label: "Learning", value: "Practical exposure" },
                          { label: "Collaboration", value: "Cross-team work" },
                          { label: "Growth", value: "Role-based progress" },
                        ].map((item, index) => (
                          <Reveal key={item.label} delay={index * 60}>
                            <div className="rounded-2xl border border-border bg-surface p-4 shadow-card">
                              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                                {item.label}
                              </div>
                              <div className="mt-1 text-sm font-semibold text-ink">
                                {item.value}
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>

                      <div className="rounded-[1.25rem] border border-border bg-white p-4 shadow-card">
                        <div className="text-sm font-semibold text-primary">
                          General Application
                        </div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">
                          You can still submit your profile for future opportunities, even when no
                          active vacancy is published.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container-x">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
              {capabilityStrip.map((item, index) => (
                <Reveal key={item.title} delay={index * 45}>
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <IconBadge iconKey={item.iconKey} className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{item.title}</div>
                      <div className="text-xs leading-5 text-ink-soft">{item.description}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why Work with Altroz HRMS?"
                title="Build practical software that supports real business operations"
                description="At Altroz HRMS, we do more than build software. We develop practical technology that helps organizations simplify attendance, payroll, leave, employee records, reporting, recruitment, and other HR processes."
              />

              <div className="mt-6 rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                  What you may experience
                </div>
                <div className="mt-4 grid gap-3">
                  {whyWorkPoints.map((item, index) => (
                    <Reveal key={item} delay={index * 35}>
                      <div className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.employeeReport}
                      alt="Altroz HRMS employee report illustration"
                      className="block w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Solve real business problems",
                      "Learn about HR technology",
                      "Work across product and customer use cases",
                      "Collaborate with different teams",
                    ].map((item, index) => (
                      <Reveal key={item} delay={index * 35}>
                        <div className="rounded-2xl border border-border bg-surface p-4">
                          <div className="flex items-start gap-3">
                            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span className="text-sm leading-6 text-ink">{item}</span>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Practical Technology",
                      description:
                        "You can help create product experiences that make attendance, payroll, and HR operations easier to manage.",
                      iconKey: "code" as const,
                    },
                    {
                      title: "Shared Ownership",
                      description:
                        "Work with product, design, QA, sales, and support teams to improve the end-to-end experience.",
                      iconKey: "users" as const,
                    },
                    {
                      title: "Continuous Improvement",
                      description:
                        "Contribute ideas, feedback, and refinements that help the platform evolve over time.",
                      iconKey: "lightbulb" as const,
                    },
                  ].map((item, index) => (
                    <Reveal key={item.title} delay={index * 40}>
                      <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <IconBadge iconKey={item.iconKey} className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                      </div>
                    </Reveal>
                  ))}

                  <div className="rounded-[1.5rem] border border-primary/20 bg-primary-soft/30 p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-wider text-primary">
                          Workplace focus
                        </div>
                        <div className="text-lg font-bold text-ink">Real business exposure</div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">
                      Employees may work on real product requirements, customer challenges, and
                      business processes rather than fictional practice scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Life at Altroz"
              title="A workplace built around learning, clarity, and collaboration"
              description="We aim to create a workplace where people can learn new skills, share ideas, collaborate across teams, and contribute to meaningful business solutions."
              align="center"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {workplacePrinciples.map((item, index) => (
                <Reveal key={item.title} delay={index * 35}>
                  <article
                    className={cn(
                      "rounded-[1.5rem] border border-border bg-white p-5 shadow-card",
                      index % 4 === 0 ? "sm:col-span-2 xl:col-span-1" : "",
                    )}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <IconBadge iconKey={item.iconKey} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-4">
                <SectionHeading
                  eyebrow="Why Join Us?"
                  title="Build skills, solve problems, and grow professionally"
                  description="These panels reflect the kind of professional experience we want to support as people grow within the organization."
                />

                <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    What this section highlights
                  </div>
                  <div className="mt-4 space-y-3">
                    {[growthPanels[4], growthPanels[5]].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl bg-surface p-3"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                          <IconBadge iconKey={item.iconKey} className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink">{item.title}</div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
                {growthPanels.slice(0, 4).map((item, index) => (
                  <Reveal key={item.title} delay={index * 40}>
                    <article className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <IconBadge iconKey={item.iconKey} className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Your Impact"
              title="Your work can support real business operations"
              description="This connected workflow shows how different teams contribute to the Altroz HRMS experience."
              align="center"
            />

            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
              {impactSteps.map((item, index) => (
                <Reveal key={item} delay={index * 30}>
                  <li className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      {index < impactSteps.length - 1 ? (
                        <ArrowRight className="hidden h-4 w-4 text-primary xl:block" />
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-ink">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Departments"
              title="Explore career areas at Altroz Technologies"
              description="Select a department to see the type of work, useful skills, and the kinds of roles we may hire for when opportunities are published."
            />

            <div className="mt-8">
              <Tabs
                value={selectedDepartmentId}
                onValueChange={setSelectedDepartmentId}
                className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]"
              >
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <TabsList className="flex h-auto w-full gap-2 overflow-x-auto bg-transparent p-0 lg:grid lg:grid-cols-1 lg:overflow-visible">
                    {departments.map((department, index) => (
                      <TabsTrigger
                        key={department.id}
                        value={department.id}
                        className="min-w-[12rem] justify-start rounded-2xl border border-border bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-card data-[state=active]:border-primary data-[state=active]:bg-primary-soft data-[state=active]:text-primary lg:min-w-0"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <span className="flex items-center gap-2">
                          <IconBadge iconKey={department.iconKey} className="h-4 w-4 shrink-0" />
                          <span className="whitespace-normal">{department.title}</span>
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="min-w-0">
                  {departments.map((department) => (
                    <TabsContent key={department.id} value={department.id} className="mt-0">
                      <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                              Department overview
                            </div>
                            <h3 className="mt-2 text-2xl font-bold text-ink">{department.title}</h3>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
                              {department.overview}
                            </p>
                          </div>
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <IconBadge iconKey={department.iconKey} className="h-6 w-6" />
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                          <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                            <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                              Typical responsibilities
                            </div>
                            <ul className="mt-4 space-y-3">
                              {department.responsibilities.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                  <span className="text-sm leading-6 text-ink">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid gap-4">
                            <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                                Useful skills
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {department.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-sm font-semibold text-primary"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                                  Possible entry-level roles
                                </div>
                                <div className="mt-3 space-y-2">
                                  {department.entryRoles.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2 text-sm text-ink"
                                    >
                                      <BadgeCheck className="h-4 w-4 shrink-0 text-success" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                                <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                                  Possible experienced roles
                                </div>
                                <div className="mt-3 space-y-2">
                                  {department.experiencedRoles.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2 text-sm text-ink"
                                    >
                                      <BadgeCheck className="h-4 w-4 shrink-0 text-success" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 rounded-[1.5rem] border border-primary/20 bg-primary-soft/30 p-4 text-sm leading-6 text-ink">
                          No published openings are listed for this department right now. You can
                          still submit your profile below for future opportunities.
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Career areas"
              title="Example career areas"
              description="These descriptions explain the kinds of work Altroz Technologies may need from time to time. They are not active vacancies."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {careerAreas.map((item, index) => (
                <Reveal key={item.title} delay={index * 35}>
                  <article
                    className={cn(
                      "rounded-[1.5rem] border border-border bg-white p-5 shadow-card",
                      index % 5 === 0 ? "md:col-span-2 xl:col-span-1" : "",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <IconBadge iconKey={item.iconKey} className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="openings" className="bg-surface py-12 md:py-16 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Open positions"
              title="Current open positions"
              description="The repository does not contain verified live vacancies yet, so this section uses a polished empty state instead of invented openings."
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-float">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                        No published openings
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-ink">
                        There are no published openings at the moment.
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
                        You may submit your profile for future opportunities. Our team can review it
                        when a suitable position becomes available.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      "No fake openings or salaries",
                      "No fabricated work locations",
                      "Profile submission still available",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-surface p-4 text-sm font-semibold text-ink"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#apply" className="btn-primary">
                      Submit Your Profile
                    </a>
                    <a href="#departments" className="btn-outline">
                      Explore career areas
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    What you can do now
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Select General Application in the form below.",
                      "Share your skills, experience, and profile links.",
                      "Upload a resume in PDF, DOC, or DOCX format.",
                      "We will only present verified openings when they exist.",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Skills we value"
              title="Skills and qualities we value"
              description="Exact requirements depend on the role, but these habits and strengths help candidates succeed in a technology-focused workplace."
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                <div className="grid gap-3 sm:grid-cols-2">
                  {skillsWeValue.map((item, index) => (
                    <Reveal key={item} delay={index * 20}>
                      <div className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 grid gap-4">
                <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    Culture fit
                  </div>
                  <div className="mt-4 grid gap-3">
                    {[
                      "Problem-solving with context",
                      "Respectful communication",
                      "Documentation and quality focus",
                      "Professional responsibility and ownership",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-primary/20 bg-primary-soft/30 p-6 shadow-card">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                    What exact requirements depend on
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink">
                    The role, team structure, experience level, and current business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="Hiring process"
              title="Our hiring process"
              description="The number of interview rounds and assessment steps may vary according to the position."
              align="center"
            />

            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {hiringSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 35}>
                  <li className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary">
                        {index + 1}
                      </div>
                      <IconBadge iconKey={step.iconKey} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section id="apply" className="py-12 md:py-16 scroll-mt-24">
          <div className="container-x">
            <div className="rounded-[2.25rem] border border-border bg-white p-6 shadow-float md:p-8">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <SectionHeading
                    eyebrow="Application form"
                    title="Apply to join Altroz Technologies"
                    description="Share your profile, skills, and resume so the team can review your details for current or future opportunities."
                  />

                  <div className="mt-6 rounded-[1.5rem] border border-primary/20 bg-primary-soft/30 p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Important note
                    </div>
                    <p className="mt-3 text-sm leading-7 text-ink">
                      Current Salary and Expected Salary fields are intentionally omitted because no
                      official policy is published in this repository.
                    </p>
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-surface p-5">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                      Form status
                    </div>
                    <div className="mt-3 flex items-start gap-3" role="status" aria-live="polite">
                      <div
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
                          applicationState === "draft-ready"
                            ? "bg-[#ecfdf3] text-success"
                            : applicationState === "saving"
                              ? "bg-primary-soft text-primary"
                              : "bg-white text-primary",
                        )}
                      >
                        {applicationState === "saving" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <BadgeCheck className="h-4 w-4" />
                        )}
                      </div>
                      <p className="text-sm leading-6 text-ink">{statusMessage}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FieldShell label="Full Name *">
                              <Input
                                autoComplete="name"
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emailAddress"
                          render={({ field }) => (
                            <FieldShell label="Email Address *">
                              <Input
                                autoComplete="email"
                                type="email"
                                placeholder="name@example.com"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobileNumber"
                          render={({ field }) => (
                            <FieldShell label="Mobile Number *">
                              <Input
                                autoComplete="tel"
                                inputMode="tel"
                                placeholder="Enter mobile number"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currentCity"
                          render={({ field }) => (
                            <FieldShell label="Current City *">
                              <Input
                                autoComplete="address-level2"
                                placeholder="Your current city"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredWorkLocation"
                          render={({ field }) => (
                            <FieldShell
                              label="Preferred Work Location *"
                              description="Share a preference if applicable."
                            >
                              <Input placeholder="Preferred work location" {...field} />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="positionAppliedFor"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Position Applied For *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a position" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {positionOptions.map((option) => (
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
                          name="department"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Department *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {departmentOptions.map((option) => (
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
                          name="totalExperience"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Total Experience *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {experienceOptions.map((option) => (
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
                          name="noticePeriod"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Notice Period *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select notice period" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {noticePeriodOptions.map((option) => (
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
                          name="currentCompany"
                          render={({ field }) => (
                            <FieldShell label="Current Company">
                              <Input
                                autoComplete="organization"
                                placeholder="Current company"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currentRole"
                          render={({ field }) => (
                            <FieldShell label="Current Role">
                              <Input placeholder="Current role or title" {...field} />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="highestQualification"
                          render={({ field }) => (
                            <FieldShell label="Highest Qualification *">
                              <Input placeholder="Your highest qualification" {...field} />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="howDidYouHearAboutUs"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>How Did You Hear About Us? *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select source" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {sourceOptions.map((option) => (
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
                        name="keySkills"
                        render={({ field }) => (
                          <FieldShell
                            label="Key Skills *"
                            description="Add your strongest tools, technologies, or professional skills."
                          >
                            <Textarea
                              rows={4}
                              placeholder="JavaScript, React, testing, communication, design, sales..."
                              {...field}
                            />
                          </FieldShell>
                        )}
                      />

                      <div className="grid gap-5 md:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="portfolioUrl"
                          render={({ field }) => (
                            <FieldShell label="Portfolio URL">
                              <Input
                                type="url"
                                placeholder="https://portfolio.example.com"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="linkedInUrl"
                          render={({ field }) => (
                            <FieldShell label="LinkedIn URL">
                              <Input
                                type="url"
                                placeholder="https://linkedin.com/in/yourprofile"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="githubUrl"
                          render={({ field }) => (
                            <FieldShell label="GitHub URL">
                              <Input
                                type="url"
                                placeholder="https://github.com/yourprofile"
                                {...field}
                              />
                            </FieldShell>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="coverMessage"
                        render={({ field }) => (
                          <FieldShell
                            label="Cover Message *"
                            description="Share a short note about your interest in Altroz Technologies."
                          >
                            <Textarea
                              rows={5}
                              placeholder="Tell us about your background, motivation, and the type of role you are looking for."
                              {...field}
                            />
                          </FieldShell>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="resumeFile"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Resume Upload *</FormLabel>
                            <div className="rounded-[1.25rem] border border-dashed border-border bg-surface p-4">
                              <FormControl>
                                <Input
                                  ref={(node) => {
                                    field.ref(node);
                                    resumeInputRef.current = node;
                                  }}
                                  type="file"
                                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/90 focus-visible:ring-0"
                                  onChange={(event) => {
                                    const file = event.target.files?.[0] ?? null;
                                    field.onChange(file);
                                  }}
                                />
                              </FormControl>
                              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-xs leading-5 text-ink-soft">
                                  Accepted formats: PDF, DOC, DOCX. Maximum file size: 5 MB.
                                </p>
                                {resumeFile ? (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRemoveResume}
                                  >
                                    Remove file
                                  </Button>
                                ) : null}
                              </div>
                              {resumeFile ? (
                                <div className="mt-3 rounded-2xl bg-white p-3 text-sm font-semibold text-ink shadow-sm">
                                  Selected file: {resumeFile.name}
                                </div>
                              ) : null}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 rounded-[1.5rem] border border-border bg-surface p-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="rounded-[1.25rem] border border-border bg-white p-4">
                              <div className="flex items-start gap-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="text-sm font-medium text-ink">
                                    I agree that Altroz Technologies may review and store my
                                    submitted information for recruitment-related purposes. *
                                  </FormLabel>
                                  <p className="text-xs leading-5 text-ink-soft">
                                    We use candidate information only for recruitment-related review
                                    and follow-up until a live recruitment workflow is available.
                                  </p>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="futureConsideration"
                          render={({ field }) => (
                            <FormItem className="rounded-[1.25rem] border border-border bg-white p-4">
                              <div className="flex items-start gap-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="text-sm font-medium text-ink">
                                    I would like my profile to be considered for future relevant
                                    opportunities.
                                  </FormLabel>
                                  <p className="text-xs leading-5 text-ink-soft">
                                    This helps us keep your details in mind if a suitable opening is
                                    published later.
                                  </p>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-xs leading-5 text-ink-soft">
                          Live submission is not connected yet. The form will validate your profile
                          locally and keep your draft in this browser session.
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="submit"
                            disabled={form.formState.isSubmitting || applicationState === "saving"}
                            className="h-11 rounded-md bg-primary px-5 text-white hover:bg-primary/90"
                          >
                            {applicationState === "saving" ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving Draft...
                              </>
                            ) : (
                              "Save Application Draft"
                            )}
                          </Button>
                          <a href="#openings" className="btn-outline">
                            Review openings
                          </a>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-12 md:py-16">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Professional and respectful hiring
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
                We aim to provide a professional and respectful recruitment experience
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Altroz Technologies aims to evaluate candidates based on role requirements, skills,
                experience, potential, professional conduct, and business needs.
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Employment decisions are based on applicable role requirements and business needs.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-card">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                How candidate information is used
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Reviewing role suitability",
                  "Contacting selected candidates",
                  "Scheduling discussions and interviews",
                  "Maintaining recruitment records",
                  "Considering future opportunities when consent is given",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface p-3">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-ink-soft">
                Uploaded resumes are not exposed publicly. This repository does not include a live
                backend for storing submitted resumes, so the current form only validates data in
                the browser.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              description="These answers are intentionally careful and avoid claiming any unpublished job or internship policy."
              align="center"
            />

            <div className="mx-auto mt-8 max-w-4xl">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-2xl border border-border bg-white px-5 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline [&>svg]:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-7 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white p-8 shadow-float md:p-10">
              <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl float-slow" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-success/10 blur-3xl float-slow" />

              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-7">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Build your career with Altroz Technologies
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    Join a team focused on building practical HR technology and solving real
                    business challenges.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Explore available opportunities, contribute your skills, and grow through
                    meaningful product, technology, customer, and business experience.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#openings" className="btn-primary">
                      View Open Positions
                    </a>
                    <a href="#apply" className="btn-outline">
                      Submit Your Profile
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Product development",
                      "User experience",
                      "Customer success",
                      "Sales and marketing",
                      "Learning pathways",
                      "General applications",
                    ].map((item, index) => (
                      <Reveal key={item} delay={index * 30}>
                        <div
                          className={cn(
                            "rounded-[1.5rem] border border-border p-4 shadow-card",
                            index % 3 === 0 ? "bg-primary-soft/35" : "bg-white",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-sm">
                              <BadgeCheck className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold leading-5 text-ink break-normal">
                                {item}
                              </div>
                              <div className="text-xs text-ink-soft">Careers focus area</div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
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
