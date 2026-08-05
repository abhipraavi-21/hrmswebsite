import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Factory,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  MailCheck,
  Megaphone,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/site/Footer";
import BulkEmailNavbar from "@/components/site/BulkEmailNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import PageSEO from "@/components/site/PageSEO";
import { ROUTES } from "@/routes/routeConfig.js";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

type InfoCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type BenefitCard = InfoCard & {
  benefit: string;
};

type FeatureCard = {
  title: string;
  description: string;
  benefit: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
};

type Step = {
  step: string;
  title: string;
  description: string;
};

type Faq = {
  q: string;
  a: string;
};

function AnimatedTitle({
  as = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  children: string;
}) {
  const Component = as;
  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Component
      className={cn(
        "bulk-email-animated-title mx-auto font-black leading-[1.03] tracking-[-0.04em]",
        className,
      )}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("inline-block", index % 2 === 0 ? "text-[#1d4ed8]" : "text-[#b45309]")}
          style={{
            animation: "bulkEmailSmtpWordRise 0.55s ease-out both",
            animationDelay: `${index * 55}ms`,
            marginRight: index < words.length - 1 ? "0.28em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

function SectionHeading({
  eyebrow,
  title,
  summary,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  align?: "center" | "left";
}) {
  return (
    <ScrollReveal
      variant="fade-up"
      className={cn(
        "space-y-3",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl text-left",
      )}
    >
      <span className="eyebrow text-xs font-bold uppercase tracking-[0.28em] text-[#b45309]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h2>
      <p className="text-ink-soft sm:text-lg">{summary}</p>
    </ScrollReveal>
  );
}

const heroStats: Stat[] = [
  {
    label: "SMTP Ready",
    value: "100%",
    note: "Connect your own mail server",
    icon: ServerCog,
  },
  {
    label: "Sender Identity",
    value: "Brand Safe",
    note: "Use your business domain",
    icon: ShieldCheck,
  },
  {
    label: "Delivery Tracking",
    value: "Live",
    note: "Monitor what goes out",
    icon: BarChart3,
  },
  {
    label: "Scale Support",
    value: "Enterprise",
    note: "Built for growing teams",
    icon: TrendingUp,
  },
];

const smtpExplainers: InfoCard[] = [
  {
    title: "SMTP, Explained Simply",
    description:
      "SMTP stands for Simple Mail Transfer Protocol. It is the standard handoff that moves email from your application to the recipient's mail server.",
    icon: MailCheck,
  },
  {
    title: "Why SMTP Is Required",
    description:
      "Without SMTP, your business email tool would have no standard way to send messages across the internet to the inbox.",
    icon: Workflow,
  },
  {
    title: "How Emails Travel",
    description:
      "When you send from Altroz Bulk Email, the configured SMTP server checks identity, relays the message and passes it forward until it reaches the recipient.",
    icon: ServerCog,
  },
  {
    title: "SMTP vs the Inbox",
    description:
      "SMTP moves the email. The inbox stores the email. They are different jobs in the same delivery chain.",
    icon: FileText,
  },
];

const smtpBenefits: BenefitCard[] = [
  {
    title: "Reliable Business Email",
    description:
      "A properly configured SMTP connection helps messages send consistently instead of depending on personal or unverified accounts.",
    benefit: "Fewer failed or delayed sends for critical business communication.",
    icon: CheckCircle2,
  },
  {
    title: "Professional Sender Identity",
    description:
      "Use your own business domain and sender address so recipients see a trusted company identity.",
    benefit: "People instantly recognise emails from your organisation.",
    icon: ShieldCheck,
  },
  {
    title: "Better Email Management",
    description:
      "Keep sending settings in one place so IT teams can monitor and troubleshoot email more easily.",
    benefit: "Less time spent chasing delivery issues across multiple tools.",
    icon: LayoutDashboard,
  },
  {
    title: "Secure Authentication",
    description:
      "SMTP requires valid credentials before email can be sent, reducing unauthorised use of your business identity.",
    benefit: "Only verified users and systems can send on your behalf.",
    icon: Wrench,
  },
  {
    title: "Centralized Configuration",
    description:
      "Set up SMTP once at the organisation level rather than asking every employee to manage separate sending rules.",
    benefit: "Consistent settings and easier onboarding for new team members.",
    icon: Building2,
  },
  {
    title: "Scalable Email Infrastructure",
    description:
      "Your SMTP setup can grow as your business communication needs grow, without needing to be rebuilt from scratch.",
    benefit: "Support for larger campaign volume and more teams.",
    icon: Gauge,
  },
];

const smtpFeatures: FeatureCard[] = [
  {
    title: "SMTP Server Configuration",
    description: "Connect your preferred SMTP server with host, port and credential fields.",
    benefit: "One central setup for outgoing email.",
    href: ROUTES.bulkEmailBroadcast,
    linkLabel: "Email Broadcast",
    icon: ServerCog,
  },
  {
    title: "Sender Email Setup",
    description: "Define the sender name and sender email address that recipients will see.",
    benefit: "Consistent sender identity across campaigns.",
    href: ROUTES.bulkEmailTemplates,
    linkLabel: "Email Templates",
    icon: MailCheck,
  },
  {
    title: "Authentication",
    description: "Require valid username and password before sending is allowed.",
    benefit: "Prevents unauthorised sending through your setup.",
    href: ROUTES.support,
    linkLabel: "Help Center",
    icon: ShieldCheck,
  },
  {
    title: "TLS / SSL Support",
    description: "Protect mail traffic with secure TLS or SSL connection settings.",
    benefit: "Encrypted connection to your SMTP server.",
    href: ROUTES.support,
    linkLabel: "Help Center",
    icon: Workflow,
  },
  {
    title: "Business Email Setup",
    description: "Use your organisation's business domain email rather than generic addresses.",
    benefit: "Sender identity reflects your brand.",
    href: ROUTES.bulkEmailBroadcast,
    linkLabel: "Email Broadcast",
    icon: Building2,
  },
  {
    title: "Email Routing",
    description: "Route every outgoing message automatically through the saved SMTP settings.",
    benefit: "No manual setup for each email.",
    href: ROUTES.bulkEmailScheduling,
    linkLabel: "Email Scheduling",
    icon: Workflow,
  },
  {
    title: "Dashboard Integration",
    description: "See status and usage directly in the Altroz Bulk Email dashboard.",
    benefit: "Monitor sending activity in one place.",
    href: ROUTES.bulkEmailAnalytics,
    linkLabel: "Email Analytics",
    icon: LayoutDashboard,
  },
  {
    title: "Delivery Tracking",
    description: "Track delivery status and campaign history after messages are sent.",
    benefit: "Understand what was sent and follow up fast.",
    href: ROUTES.bulkEmailAnalytics,
    linkLabel: "Email Analytics",
    icon: FileText,
  },
];

const smtpSteps: Step[] = [
  {
    step: "Step 1",
    title: "Configure SMTP Server",
    description:
      "Enter the host address and port inside the SMTP Configuration screen to connect Altroz Bulk Email to your mail server.",
  },
  {
    step: "Step 2",
    title: "Add Sender Email",
    description:
      "Set the sender email address and display name that will appear to recipients from your business domain.",
  },
  {
    step: "Step 3",
    title: "Authenticate Credentials",
    description:
      "Enter valid SMTP credentials and let Altroz Bulk Email verify them before sending is allowed.",
  },
  {
    step: "Step 4",
    title: "Create Email Campaign",
    description:
      "Build the message, choose recipients and schedule the send using Campaign Management.",
  },
  {
    step: "Step 5",
    title: "Send Email",
    description:
      "Once the campaign is ready, Altroz Bulk Email hands it off through your configured SMTP server.",
  },
  {
    step: "Step 6",
    title: "Track Delivery",
    description:
      "Review delivery reports and email analytics to see delivery status and campaign history.",
  },
];

const providers = [
  "Microsoft 365",
  "Google Workspace",
  "Zoho Mail",
  "Amazon SES",
  "SendGrid",
  "Mailgun",
];

const securityItems: InfoCard[] = [
  {
    title: "Strong Passwords",
    description:
      "Use strong, unique passwords for SMTP credentials to reduce the risk of unauthorised access.",
    icon: ShieldCheck,
  },
  {
    title: "TLS Encryption",
    description:
      "Where supported, TLS encrypts the connection between Altroz Bulk Email and your mail server.",
    icon: Workflow,
  },
  {
    title: "SSL Encryption",
    description:
      "Some SMTP servers still support SSL, which can secure the transmission path during sending.",
    icon: Wrench,
  },
  {
    title: "Secure Authentication",
    description:
      "Every message requires valid authentication so only approved credentials can trigger a send.",
    icon: CheckCircle2,
  },
  {
    title: "Restricted Access",
    description:
      "Limit who can view or edit SMTP settings so control stays with authorised IT administrators.",
    icon: Building2,
  },
  {
    title: "Credential Protection",
    description:
      "Handle SMTP usernames and passwords carefully and share them only with the people who need access.",
    icon: ServerCog,
  },
  {
    title: "Sender Verification",
    description:
      "Confirming your sender email and domain helps recipient servers recognise a legitimate source.",
    icon: MailCheck,
  },
  {
    title: "Email Security",
    description:
      "Authentication, encryption and access control together give your business a stronger posture.",
    icon: ShieldCheck,
  },
];

const useCases: InfoCard[] = [
  {
    title: "HR Communication",
    description:
      "Send policy updates, onboarding information, attendance reminders and internal announcements from a recognised sender.",
    icon: Users,
  },
  {
    title: "Marketing",
    description:
      "Run campaigns, newsletters and promotional updates using your own sender identity.",
    icon: Megaphone,
  },
  {
    title: "Educational Institutes",
    description:
      "Communicate with students, parents and faculty about circulars, exam updates and admissions.",
    icon: GraduationCap,
  },
  {
    title: "Healthcare",
    description:
      "Send appointment reminders, administrative updates and internal notices through your verified sender identity.",
    icon: HeartPulse,
  },
  {
    title: "Manufacturing",
    description:
      "Share supplier updates, internal notices and coordination messages between departments and locations.",
    icon: Factory,
  },
  {
    title: "Retail",
    description:
      "Send offers, order updates and customer communication under your brand's sender address.",
    icon: ShoppingBag,
  },
  {
    title: "Corporate Communication",
    description:
      "Keep internal and external communication consistent, trackable and professional across the company.",
    icon: Building2,
  },
];

const benefits: InfoCard[] = [
  {
    title: "Professional Email Delivery",
    description:
      "Emails go out through a properly authenticated, business-owned sender identity.",
    icon: MailCheck,
  },
  {
    title: "Centralized Email Management",
    description:
      "All outgoing email settings are managed from one place inside Altroz Bulk Email.",
    icon: LayoutDashboard,
  },
  {
    title: "Business Branding",
    description:
      "Sender name and sender email reflect your organisation, strengthening recognition.",
    icon: Sparkles,
  },
  {
    title: "Secure Email Sending",
    description:
      "Authentication and encryption support help protect the sending process.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Infrastructure",
    description:
      "As your communication needs grow, the same SMTP Configuration keeps supporting you.",
    icon: TrendingUp,
  },
  {
    title: "Easy Configuration",
    description:
      "The setup is guided and straightforward so IT can configure it once with confidence.",
    icon: Wrench,
  },
  {
    title: "Reliable Communication",
    description:
      "A dedicated SMTP connection helps HR, marketing and corporate emails stay dependable.",
    icon: CheckCircle2,
  },
  {
    title: "Campaign Control",
    description:
      "Combined with Campaign Management and Email Scheduling, you stay in control of sending.",
    icon: Workflow,
  },
];

const faqs: Faq[] = [
  {
    q: "What is SMTP?",
    a: "SMTP stands for Simple Mail Transfer Protocol. It is the standard method used to send outgoing email from your application to the recipient's mail server.",
  },
  {
    q: "Why is SMTP important for a business?",
    a: "SMTP is the mechanism that actually delivers your business email. Without it, HR updates, marketing campaigns and company announcements cannot be sent out properly.",
  },
  {
    q: "How does SMTP work in Altroz Bulk Email?",
    a: "You configure the server details, add your sender email and authenticate the credentials. After that, every campaign uses that SMTP connection automatically.",
  },
  {
    q: "Can I use my business email for SMTP Configuration?",
    a: "Yes. Altroz Bulk Email is designed to work with your own business email and SMTP server so the sender identity reflects your organisation.",
  },
  {
    q: "Can I use Gmail SMTP with Altroz Bulk Email?",
    a: "If your organisation uses Google Workspace and has valid SMTP credentials, you can configure that connection inside Altroz Bulk Email, subject to the provider's sending rules.",
  },
  {
    q: "Can I use Microsoft 365 SMTP?",
    a: "Yes, if your organisation has an active Microsoft 365 account with valid SMTP credentials, those can be used for sending.",
  },
  {
    q: "Does Altroz Bulk Email support SMTP Configuration?",
    a: "Yes. SMTP Configuration is a core part of Altroz Bulk Email for sending campaigns and business email through your own server.",
  },
  {
    q: "What is SMTP Authentication?",
    a: "SMTP Authentication verifies a username and password, or another supported method, before allowing email to be sent through the server.",
  },
  {
    q: "What is TLS?",
    a: "TLS, or Transport Layer Security, is an encryption protocol that helps secure the connection between Altroz Bulk Email and your SMTP server.",
  },
  {
    q: "What is SSL?",
    a: "SSL is an earlier encryption standard that some SMTP servers still support for securing the connection during sending.",
  },
  {
    q: "How do I configure SMTP in Altroz Bulk Email?",
    a: "Go to the SMTP Configuration section, enter the server details, add your sender email, enter the credentials and save the configuration.",
  },
  {
    q: "How do I secure my SMTP Configuration?",
    a: "Use strong passwords, limit access to authorised staff and use TLS or SSL encryption where your provider supports it.",
  },
  {
    q: "How do I test my SMTP setup?",
    a: "After saving your configuration, send a test email and check Delivery Reports and Email Status to confirm it was sent successfully.",
  },
  {
    q: "Can I change my SMTP settings later?",
    a: "Yes. You can update SMTP settings any time if your business changes provider or credentials.",
  },
  {
    q: "Who should configure SMTP settings for a business?",
    a: "SMTP Configuration is usually handled by an IT manager or system administrator because it includes server details and secure credentials.",
  },
  {
    q: "Can multiple teams use the same SMTP Configuration?",
    a: "Yes. Once SMTP is configured at the organisation level, HR, marketing and other teams can use it through Campaign Management.",
  },
];

export default function BulkEmailSmtpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f6faff] to-[#fffbf4]">
      <PageSEO
        title="SMTP Configuration Software for Secure Business Email Delivery | Altroz Bulk Email"
        description="Altroz Bulk Email lets businesses connect their own SMTP server, configure sender identity, secure delivery and monitor email activity from one dashboard."
        canonicalPath={ROUTES.bulkEmailSmtp}
      />
      <style>{`
        @keyframes bulkEmailSmtpWordRise {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bulk-email-animated-title span {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <BulkEmailNavbar />

      <main className="overflow-hidden">
        <section className="hero-gradient smtp-hero relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-[#1d4ed8]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#d97706]/10 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <ScrollReveal variant="fade-up" className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/20 bg-gradient-to-r from-white via-[#eff6ff] to-[#fffbf4] px-4 py-2 text-xs font-extrabold tracking-normal text-[#1d4ed8] shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Enterprise Email Infrastructure
                  </div>

                  <AnimatedTitle
                    as="h1"
                    className="mx-auto mt-4 max-w-6xl text-4xl sm:text-5xl lg:mx-0 lg:text-[4.25rem]"
                  >
                    SMTP Configuration Software for Secure Business Email Delivery
                  </AnimatedTitle>

                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg lg:mx-0">
                    Altroz Bulk Email lets your business connect its own SMTP server, so every email
                    you send, from HR updates and marketing campaigns to transactional alerts and
                    corporate announcements, goes out through infrastructure your team controls and
                    trusts.
                  </p>

                  <div className="button-group mt-7 justify-center lg:justify-start">
                    <Link to={ROUTES.bookDemo} className="btn-primary">
                      Book Free Demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="#features" className="btn-outline">
                      View Features
                    </a>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {heroStats.map((stat, index) => (
                      <ScrollReveal key={stat.label} variant="fade-up" delay={80 + index * 45}>
                        <article className="soft-card h-full p-4 text-left">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                            <stat.icon className="h-5 w-5" />
                          </span>
                          <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                            {stat.label}
                          </div>
                          <div className="mt-2 text-2xl font-black tracking-tight text-ink">
                            {stat.value}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-ink-soft">{stat.note}</p>
                        </article>
                      </ScrollReveal>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal variant="scale" className="relative">
                  <div className="dashboard-glow left-1/2 top-10 -translate-x-1/2" />
                  <div className="soft-card relative overflow-hidden rounded-[2rem] border border-border bg-white/95 p-5 shadow-float">
                    <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b45309]">
                          SMTP Configuration Screen
                        </div>
                        <div className="mt-1 text-lg font-semibold text-ink">
                          Sender setup and delivery control
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end gap-2">
                        {["Authenticated", "TLS Secured", "Server Connected"].map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full bg-[#1d4ed8]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                      <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1d4ed8]/6 via-white to-[#d97706]/6 p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#1d4ed8]">
                          Connection Details
                        </div>
                        <div className="mt-3 space-y-3 text-sm text-ink-soft">
                          {[
                            ["Host", "smtp.company.com"],
                            ["Port", "587"],
                            ["Encryption", "TLS"],
                            ["Authentication", "Enabled"],
                          ].map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm"
                            >
                              <span>{label}</span>
                              <span className="font-semibold text-ink">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">Email Flow</div>
                          <div className="mt-3 space-y-2">
                            {[
                              "Your Business",
                              "Altroz Bulk Email",
                              "SMTP Server",
                              "Recipient Mail Server",
                              "Inbox",
                            ].map((step, index) => (
                              <div
                                key={step}
                                className="flex items-center gap-3 rounded-xl bg-surface/70 p-3 text-sm text-ink"
                              >
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1d4ed8]/10 text-xs font-bold text-[#1d4ed8]">
                                  {index + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                          <div className="text-sm font-semibold text-ink">Status Snapshot</div>
                          <div className="mt-3 grid gap-2">
                            {[
                              "HR updates ready to send",
                              "Marketing campaigns queued",
                              "Corporate alerts delivered securely",
                            ].map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                              >
                                <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section id="what-is-smtp" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="What is SMTP?"
              title="SMTP, how email gets from your business to the inbox"
              summary="SMTP is the delivery protocol that hands an email from the sender's system to the recipient's mail server. Altroz Bulk Email uses it so your outgoing communication follows a controlled, standard sending path."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <StaggerReveal step={70} className="grid gap-4 sm:grid-cols-2">
                {smtpExplainers.map((card) => (
                  <article
                    key={card.title}
                    className="soft-card h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                ))}
              </StaggerReveal>

              <ScrollReveal variant="fade-left" className="space-y-5">
                <article className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                    Email Flow Diagram
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      "Your Business",
                      "Altroz Bulk Email",
                      "SMTP Server",
                      "Recipient Mail Server",
                      "Inbox",
                    ].map((item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#1d4ed8]/10 font-bold text-[#1d4ed8]">
                          {index + 1}
                        </div>
                        <div className="flex-1 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm">
                          {item}
                        </div>
                        {index < 4 ? <ArrowRight className="h-4 w-4 text-[#b45309]" /> : null}
                      </div>
                    ))}
                  </div>
                </article>

                <article className="soft-card p-6">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                    Sending vs Receiving
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        title: "SMTP",
                        description: "Handles sending and relaying outgoing mail.",
                        icon: ArrowRight,
                      },
                      {
                        title: "Inbox",
                        description: "Stores incoming mail so recipients can read it.",
                        icon: FileText,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.25rem] border border-border bg-surface/60 p-4"
                      >
                        <item.icon className="h-5 w-5 text-[#1d4ed8]" />
                        <div className="mt-3 text-base font-semibold text-ink">{item.title}</div>
                        <p className="mt-1 text-sm leading-6 text-ink-soft">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="why-smtp" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Why SMTP Matters"
              title="SMTP gives your bulk email workflow the control it needs"
              summary="A controlled sending setup helps businesses manage delivery, sender identity and campaign reliability from one place."
            />

            <StaggerReveal step={55} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {smtpBenefits.map((card) => (
                <article
                  key={card.title}
                  className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 text-lg font-bold text-ink">{card.title}</div>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  <div className="mt-4 rounded-2xl bg-[#1d4ed8]/5 p-3 text-sm text-ink-soft">
                    <span className="font-semibold text-ink">Business Benefit: </span>
                    {card.benefit}
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="features" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="SMTP Features"
              title="The complete SMTP feature set inside Altroz Bulk Email"
              summary="Everything needed for a secure, organisation-level setup is built into the product and connected to the dashboard."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {smtpFeatures.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 45}>
                  <article className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                    <div className="mt-4 rounded-2xl border border-border bg-white p-3">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b45309]">
                        Business Benefit
                      </div>
                      <div className="mt-1 text-sm leading-6 text-ink-soft">{card.benefit}</div>
                    </div>
                    <Link
                      to={card.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1d4ed8] transition-colors hover:text-[#0f3fd1]"
                    >
                      Learn More: {card.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="How SMTP Works"
              title="From server setup to delivery tracking in six simple steps"
              summary="The workflow stays clear and predictable so teams can configure once, send confidently and review results afterward."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {smtpSteps.map((step, index) => (
                <ScrollReveal key={step.step} variant="fade-up" delay={index * 45}>
                  <article className="soft-card relative h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-gradient-to-r from-[#1d4ed8]/12 via-white to-[#d97706]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                        {step.step}
                      </span>
                      <span className="rounded-full bg-surface px-2 py-1 text-[10px] font-semibold text-ink-soft">
                        {index + 1}/6
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{step.description}</p>
                    {index < smtpSteps.length - 1 ? (
                      <ArrowRight className="mt-4 hidden h-4 w-4 text-[#b45309] lg:block" />
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="providers" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Supported Providers"
              title="Works with standard SMTP providers your business already uses"
              summary="Altroz Bulk Email is built for standard SMTP connectivity, so you can connect a provider that already supports sending with valid credentials."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScrollReveal variant="fade-up" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Common Providers
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {providers.map((provider) => (
                    <span
                      key={provider}
                      className="rounded-full border border-[#1d4ed8]/15 bg-[#1d4ed8]/6 px-4 py-2 text-sm font-medium text-ink"
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" className="soft-card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Provider Note
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  Use the SMTP credentials your business already trusts
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  These are examples of widely used SMTP providers. Altroz Bulk Email supports
                  standard SMTP connectivity and does not claim any official partnership or
                  endorsement from the providers listed above.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Valid SMTP credentials",
                    "Active provider account",
                    "Supported sending policy",
                    "Organisation-level access",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="security" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="SMTP Security"
              title="Security practices that keep your sender setup protected"
              summary="Authentication, encryption and access control work together to strengthen the sending workflow and protect your business identity."
            />

            <StaggerReveal step={50} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {securityItems.map((card) => (
                <article key={card.title} className="soft-card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="use-cases" className="section scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Business Use Cases"
              title="Teams use SMTP to keep important business email reliable"
              summary="Built for organisations that need predictable sending and easy review after delivery."
            />

            <StaggerReveal step={50} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((card) => (
                <article
                  key={card.title}
                  className="soft-card group h-full p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-float"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section id="benefits" className="section bg-white scroll-mt-24">
          <div className="site-container">
            <SectionHeading
              eyebrow="Benefits"
              title="Benefits of SMTP Configuration inside Altroz Bulk Email"
              summary="The right SMTP setup gives businesses reliable delivery, stronger branding and better control over campaign sending."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {benefits.map((card, index) => (
                <ScrollReveal key={card.title} variant="fade-up" delay={index * 40}>
                  <article className="soft-card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#1d4ed8]/12 via-white to-[#d97706]/14 text-[#1d4ed8] shadow-sm">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{card.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section scroll-mt-24">
          <div className="site-container grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="lg:col-span-8">
              <SectionHeading
                eyebrow="Frequently Asked Questions"
                title="Answers to the most common SMTP questions"
                summary="Clear answers that help visitors understand how SMTP fits into the bulk email workflow."
                align="left"
              />

              <Accordion type="single" collapsible className="mt-8 space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${index}`}
                    className="overflow-hidden rounded-[1.25rem] border border-border bg-white px-4 shadow-card"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-sm leading-6 text-ink-soft">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-4">
              <div className="soft-card sticky top-24 p-6">
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">
                  Need a tailored setup?
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
                  We can help you configure SMTP for your team
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Bring your server details, sender identity and workflow goals to a live demo.
                </p>

                <div className="mt-5 space-y-3">
                  {[
                    "SMTP host and port",
                    "Sender email setup",
                    "TLS / SSL settings",
                    "Delivery tracking",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-medium text-ink shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#d97706]" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="button-group mt-6">
                  <Link to={ROUTES.bookDemo} className="btn-primary">
                    Book Free Demo
                  </Link>
                  <Link to={ROUTES.support} className="btn-ghost">
                    Help Center
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="cta-section bg-white scroll-mt-24">
          <div className="site-container">
            <ScrollReveal
              variant="scale"
              className="cta-box relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] to-[#d97706] text-center"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#d97706]/18 blur-3xl" />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
                  Configure Secure Business Email with Altroz Bulk Email
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-white/80">
                  Set up your SMTP connection once and let HR, marketing and corporate teams send
                  professional email through the server your organisation already trusts.
                </p>
                <div className="button-group mt-7 justify-center">
                  <Link
                    to={ROUTES.bookDemo}
                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#1d4ed8] transition-colors hover:bg-[#fffbf4]"
                  >
                    Book Free Demo
                  </Link>
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Talk to Our Experts
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
