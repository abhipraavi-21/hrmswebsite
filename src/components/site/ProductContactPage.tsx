import { useMemo, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CalendarDays, Headphones, Loader2, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import AssetManagementNavbar from "@/components/site/AssetManagementNavbar";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import Footer from "@/components/site/Footer";
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
import {
  buildWhatsAppHref,
  contactConfig,
  contactMethods,
  employeeRangeOptions,
  industryOptions,
  preferredContactMethods,
} from "@/config/contactInfo";
import { usePublicContent } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import { getSection } from "@/services/cmsHelpers";
import { submitContactEnquiry } from "@/services/contactService";
import { fetchPageByKey } from "@/services/pageService";
import type { ProductNamespace } from "@/services/pageService";
import { getSeedPageFallback } from "@/services/seedFallback";

type ProductServiceOption = {
  id: string;
  label: string;
  enquiryType: string;
  description: string;
};

type StatusState =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

type ProductContactPageProps = {
  pageKey: string;
  canonicalPath: string;
  fallbackTitle: string;
  fallbackDescription: string;
  heroFallbackDescription: string;
  ctaFallbackDescription: string;
  messagePlaceholder: string;
  productLabel: string;
  navbarVariant: "bulkEmail" | "assetManagement";
  moduleOptions: readonly string[];
  serviceOptions: readonly ProductServiceOption[];
};

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

function sanitize(value: string) {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

function buildProductMessage(
  values: FormValues,
  serviceLabel: string,
  productLabel: string,
) {
  return [
    `Altroz ${productLabel} enquiry`,
    `Service: ${serviceLabel}`,
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

export default function ProductContactPage({
  pageKey,
  canonicalPath,
  fallbackTitle,
  fallbackDescription,
  heroFallbackDescription,
  ctaFallbackDescription,
  messagePlaceholder,
  productLabel,
  navbarVariant,
  moduleOptions,
  serviceOptions,
}: ProductContactPageProps) {
  const [status, setStatus] = useState<StatusState>({ type: "idle", message: "" });
  const Navbar = navbarVariant === "bulkEmail" ? BulkEmailNavbar : AssetManagementNavbar;
  const productNamespace: ProductNamespace =
    navbarVariant === "bulkEmail" ? "bulk-email" : "asset-management";
  const productDemoRoute =
    navbarVariant === "bulkEmail"
      ? ROUTES.bulkEmailBookDemo
      : ROUTES.assetManagementBookDemo;
  const seedPage = useMemo(() => getSeedPageFallback(pageKey), [pageKey]);
  const { data: remoteContent } = usePublicContent(
    () => fetchPageByKey(pageKey, productNamespace),
    [pageKey, productNamespace],
    seedPage,
  );
  const heroSection = getSection(remoteContent, "contact-hero");
  const quickContactSection = getSection(remoteContent, "quick-contact");
  const formSection = getSection(remoteContent, "contact-form");
  const ctaSection = getSection(remoteContent, "contact-cta");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      businessEmail: "",
      mobileNumber: "",
      city: "",
      industry: "",
      employeeRange: "",
      interestedModule: moduleOptions[0] ?? "Other",
      enquiryType: serviceOptions[0]?.enquiryType ?? "General enquiry",
      preferredContactMethod: preferredContactMethods[0],
      message: "",
      consent: false,
    },
    mode: "onSubmit",
  });

  const enquiryType = form.watch("enquiryType");
  const activeService =
    serviceOptions.find((item) => item.enquiryType === enquiryType) ?? serviceOptions[0];

  const heroPaths = useMemo(() => {
    if (!heroSection?.items?.length) {
      return [
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
          href: productDemoRoute,
        },
        {
          iconKey: "headphones" as const,
          title: "Support",
          text: "Use the support route for customer help and product questions.",
          href: ROUTES.support,
        },
      ];
    }

    return heroSection.items.map((item) => ({
      iconKey: (item.icon as keyof typeof iconMap | undefined) ?? "messageSquare",
      title: item.title ?? "",
      text: item.description ?? "",
      href: item.buttonLink ?? "#contact-form",
    }));
  }, [heroSection?.items, productDemoRoute]);

  const quickCards = useMemo(() => {
    if (!quickContactSection?.items?.length) {
      return contactMethods.slice(0, 3).map((item) => ({
        label: item.label,
        description: item.description,
        href: item.href,
        iconKey: item.icon as keyof typeof iconMap,
      }));
    }

    return quickContactSection.items.map((item) => ({
      label: item.title ?? "",
      description: item.description ?? "",
      href: item.buttonLink ?? "#",
      iconKey: (item.icon as keyof typeof iconMap | undefined) ?? "messageSquare",
    }));
  }, [quickContactSection?.items]);

  const onSubmit = async (values: FormValues) => {
    setStatus({ type: "loading", message: "Preparing your WhatsApp enquiry..." });

    try {
      await submitContactEnquiry({
        fullName: values.fullName,
        email: values.businessEmail,
        phone: values.mobileNumber,
        companyName: values.companyName,
        subject: values.enquiryType,
        message: values.message,
        sourcePage: canonicalPath,
        extraData: {
          city: values.city,
          industry: values.industry,
          employeeRange: values.employeeRange,
          interestedModule: values.interestedModule,
          preferredContactMethod: values.preferredContactMethod,
          pageKey,
          productLabel,
        },
      });

      const message = buildProductMessage(values, activeService.label, productLabel);
      const href = buildWhatsAppHref(message);
      const opened = window.open(href, "_blank", "noopener,noreferrer");

      if (!opened) {
        setStatus({
          type: "error",
          message:
            "Your browser blocked the WhatsApp window. Please allow popups and try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Your enquiry draft opened in WhatsApp. Send it there to complete submission.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Unable to submit your enquiry right now.",
      });
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        navbarVariant === "bulkEmail"
          ? "bulk-email-theme bg-gradient-to-b from-white via-[#f6faff] to-[#fff7ef]"
          : "asset-management-theme asset-management-theme-shell bg-background",
      )}
    >
      <PageSEO
        title={remoteContent?.metaTitle ?? fallbackTitle}
        description={remoteContent?.metaDescription ?? fallbackDescription}
        canonicalPath={canonicalPath}
        image={remoteContent?.ogImage ?? undefined}
        imageAlt={remoteContent?.ogImageAlt ?? undefined}
        ogTitle={remoteContent?.ogTitle ?? remoteContent?.metaTitle ?? fallbackTitle}
        ogDescription={
          remoteContent?.ogDescription ?? remoteContent?.metaDescription ?? fallbackDescription
        }
      />

      <Navbar />

      <main>
        <section className="page-banner hero-gradient relative overflow-hidden">
          <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-extrabold tracking-normal text-primary shadow-sm">
                <MessageSquare className="h-4 w-4" />
                {heroSection?.subheading ?? "Contact Us"}
              </div>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                {heroSection?.heading ?? `Get in Touch with Altroz ${productLabel}`}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                {heroSection?.description ?? heroFallbackDescription}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft">
                {(heroSection?.settings?.secondaryDescription as string | undefined) ??
                  "Use the verified WhatsApp route or the enquiry form below. Our team will review your enquiry and contact you using the details provided."}
              </p>

              <div className="button-group mt-6">
                <Button asChild className="btn-primary">
                  <a href={heroSection?.buttonLink ?? "#contact-form"}>
                    {heroSection?.buttonText ?? "Send an Enquiry"}
                  </a>
                </Button>
                <Button asChild variant="outline" className="btn-outline">
                  <Link
                    to={
                      ((heroSection?.settings?.secondaryButtonLink as string | undefined) ??
                        productDemoRoute)
                    }
                  >
                    {(heroSection?.settings?.secondaryButtonText as string | undefined) ??
                      "Book Free Demo"}
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={80} className="lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {heroPaths.map((item) => (
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
              eyebrow={quickContactSection?.subheading ?? "Quick Contact"}
              title={
                quickContactSection?.heading ??
                `Choose the best way to reach the Altroz ${productLabel} team`
              }
              description={
                quickContactSection?.description ??
                `Use one of the verified paths below to reach the Altroz ${productLabel} team.`
              }
            />

            <StaggerReveal
              step={70}
              className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {quickCards.map((item) => (
                <ContactCard
                  key={`${item.label}-${item.href}`}
                  label={item.label}
                  description={item.description}
                  href={item.href}
                  iconKey={item.iconKey}
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
                eyebrow={formSection?.subheading ?? "Send a Message"}
                title={
                  formSection?.heading ?? `Share your enquiry with the Altroz ${productLabel} team`
                }
                description={
                  formSection?.description ??
                  "Fill in the details below and the form will prepare a WhatsApp enquiry draft using the verified channel."
                }
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
                              {serviceOptions.map((option) => (
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
                            placeholder={messagePlaceholder}
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
                              and relevant {productLabel} services.
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
                    {ctaSection?.subheading ?? "Ready to Start"}
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {ctaSection?.heading ?? `Ready to Simplify Your ${productLabel} Operations?`}
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink-soft">
                    {ctaSection?.description ?? ctaFallbackDescription}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="button-group lg:justify-end">
                    <Button asChild className="btn-primary">
                      <a href={ctaSection?.buttonLink ?? "#contact-form"}>
                        {ctaSection?.buttonText ?? "Send an Enquiry"}
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="btn-outline">
                      <Link
                        to={
                          ((ctaSection?.settings?.secondaryButtonLink as string | undefined) ??
                            productDemoRoute)
                        }
                      >
                        {(ctaSection?.settings?.secondaryButtonText as string | undefined) ??
                          "Book Free Demo"}
                      </Link>
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
