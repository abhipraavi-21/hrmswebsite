import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  Layers3,
  LayoutTemplate,
  Search,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { ReactNode } from "react";

import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { ScrollReveal, StaggerReveal } from "@/components/site/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/routes/routeConfig.js";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroHighlights = [
  "Generate employee and applicant documents from pre-built templates",
  "Preview the layout and placeholder data before you generate",
  "Manage all templates, versions and placeholders from one place",
  "Search and filter generated documents using stored record details",
];

const summaryCards = [
  {
    title: "Generate Documents in Minutes",
    desc: "Create employee and applicant documents from pre-built templates instead of drafting them manually every time.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Preview Before You Generate",
    desc: "Check the document layout and placeholder data before the final document is generated.",
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    title: "Centralised Template Management",
    desc: "Manage all HR document templates, versions and placeholders from a single template configuration screen.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
];

const manualProblemSections = [
  {
    title: "Problems with Manual Document Creation",
    bullets: [
      "Every offer letter, appointment letter or joining letter is typed out separately, which takes up valuable HR time.",
      "Manual typing increases the chances of errors in names, designations, salary figures and joining dates.",
      "There is no single place to check which documents have already been generated and when.",
    ],
  },
  {
    title: "Problems with Editing Documents Repeatedly",
    bullets: [
      "HR teams often copy an old document and edit it for a new employee, which can carry forward outdated details by mistake.",
      "Repeated manual edits make it difficult to maintain a uniform tone, structure and format across documents.",
      "Any change in company details, such as address or contact information, has to be manually updated across every document.",
    ],
  },
  {
    title: "Problems Maintaining Multiple Templates",
    bullets: [
      "Different departments or teams may end up using different versions of the same letter format.",
      "Without version control, it becomes difficult to know which template is the current, approved one.",
      "Older, inactive templates can accidentally be reused instead of the latest version.",
    ],
  },
];

const centralisedBenefits = [
  {
    title: "Work From Defined Templates",
    desc: "HR teams use a fixed set of templates, so every document follows the same structure.",
  },
  {
    title: "Fill Data Automatically",
    desc: "Templates can be configured once with placeholders, and the correct details are filled in automatically for each applicant or employee.",
  },
  {
    title: "Search Documents Later",
    desc: "Generated documents can be searched and filtered later using details such as candidate name, document name, created date and sent date.",
  },
];

const coreFeatureCards = [
  {
    title: "Generate Documents",
    whatItIs: "The core screen where HR users generate a document for a selected applicant or employee.",
    howItWorks:
      "The user selects whether the document is for an applicant or an employee, chooses the relevant document template, and generates the document based on the details already available in the system.",
    businessBenefit:
      "HR teams no longer need to open a blank document and type out every letter from scratch. Document creation becomes a quick, guided action instead of a manual writing task.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Preview Document",
    whatItIs: "A preview option that shows how the document will look before it is actually generated.",
    howItWorks:
      "Before finalising, the user can preview the document with the applied template and placeholder details, allowing a quick visual check.",
    businessBenefit:
      "Reduces the chances of sending out a document with incorrect formatting or missing details, since HR can review it beforehand.",
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    title: "Generate for Applicant and Generate for Employee",
    whatItIs: "The system supports document generation for two entity types - Applicant and Employee.",
    howItWorks:
      "Based on the Entity Type selected, the relevant candidate or employee record is linked to the document, and the applicable template is used to generate it.",
    businessBenefit:
      "The same document generation screen can be used across the employee lifecycle, from candidates who are yet to join to existing employees who need internal letters.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Document Template Type and Document Template",
    whatItIs: "Templates are organised by Document Template Type, with each individual template listed under Document Template.",
    howItWorks:
      "When generating a document, the user first selects the relevant Document Template Type and then the specific Document Template to be used.",
    businessBenefit:
      "Makes it easy to organise multiple templates - for example, different templates for offer letters, appointment letters and joining letters - without confusion.",
    icon: <Layers3 className="h-5 w-5" />,
  },
  {
    title: "Document Layout and Output Format",
    whatItIs: "Settings that define how the generated document is structured and in what format it is produced.",
    howItWorks:
      "Each template has a defined Document Layout and Output Format, which is applied automatically whenever that template is used to generate a document.",
    businessBenefit:
      "Ensures every document generated from a given template looks and reads the same way, without the user having to reformat it manually.",
    icon: <LayoutTemplate className="h-5 w-5" />,
  },
  {
    title: "Template Version and Default Template",
    whatItIs: "Version control for templates, along with the ability to mark a template as the Default Template.",
    howItWorks:
      "As templates are updated, the Template Version helps track changes, while the Default Template setting ensures the correct template is used when a document is generated.",
    businessBenefit:
      "HR teams always generate documents from the correct, current version of a template, reducing the risk of using outdated content.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Display Order and Active / Inactive Template",
    whatItIs: "Settings that control how templates are listed and whether a template is currently available for use.",
    howItWorks:
      "Display Order determines the sequence in which templates appear, while the Active / Inactive Template setting controls whether a template can be selected during document generation.",
    businessBenefit:
      "Outdated templates can be marked inactive so they are not used by mistake, and frequently used templates can be arranged for quick access.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Search Generated Documents and Document Filters",
    whatItIs: "A search and filter function for documents that have already been generated.",
    howItWorks:
      "Users can search and filter generated documents using Candidate Type, Candidate Name, Document Name, Created Date, Sent Date and Document Template Type.",
    businessBenefit:
      "HR teams can quickly locate a specific document that was generated earlier, without having to search through folders or email records.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Placeholders",
    whatItIs: "Template fields that are automatically filled with relevant data.",
    howItWorks:
      "Placeholders fill in employee, applicant, company and salary details automatically, such as Employee Name, Applicant Name, Department, Position, Joining Date, Offered Date, Salary and Basic Salary.",
    businessBenefit:
      "Cuts manual data entry errors and keeps generated letters accurate and consistent.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Template Management",
    whatItIs: "A dedicated area to configure and manage the HR document templates used for generation.",
    howItWorks:
      "Templates are configured under Template Configuration, and the actual content and layout of a template is built or edited in the Template Editor, which supports HTML Template formatting.",
    businessBenefit:
      "HR teams are not dependent on IT or external design help every time a template needs to be created or updated. Templates can be maintained directly within the system.",
    icon: <ClipboardList className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Select Applicant or Employee",
    desc: "The user starts by choosing the Entity Type and selects the relevant candidate or employee record.",
  },
  {
    step: "02",
    title: "Select Document Template",
    desc: "The user selects the applicable Document Template Type and then the specific Document Template, such as an offer letter, appointment letter or joining letter template.",
  },
  {
    step: "03",
    title: "Preview Document",
    desc: "Before generating, the user can preview the document to check that the layout, format and placeholder details are correctly applied.",
  },
  {
    step: "04",
    title: "Generate Document",
    desc: "Once the preview looks correct, the user generates the document and the system applies the selected layout and output format automatically.",
  },
  {
    step: "05",
    title: "Store Generated Record",
    desc: "The generated document is stored as a record that can later be found using search and filters.",
  },
];

const benefits = [
  {
    title: "Reduce Manual Document Creation",
    desc: "HR teams generate documents from templates instead of typing each one from scratch, saving repetitive manual effort.",
  },
  {
    title: "Standardise HR Documents",
    desc: "Every document generated from a template follows the same layout, format and structure across the organisation.",
  },
  {
    title: "Save HR Time",
    desc: "Selecting a template and generating a document takes far less time than drafting and formatting a letter manually.",
  },
  {
    title: "Improve Accuracy",
    desc: "Placeholders fill in employee, applicant, company and salary details automatically, reducing manual data entry errors.",
  },
  {
    title: "Easy Template Management",
    desc: "Templates can be created, edited, versioned and marked active or inactive directly through Template Configuration.",
  },
  {
    title: "Centralised Document Generation",
    desc: "All HR document generation, from templates to generated records, is managed within a single module.",
  },
];

const industries = [
  {
    title: "Information Technology",
    desc: "IT companies that hire frequently can use standard templates for offer, appointment and joining letters, so every new hire receives consistently formatted documents.",
  },
  {
    title: "Manufacturing",
    desc: "Manufacturing units with distinct departments and roles can maintain separate templates using the Department and Position placeholders for accurate, role-specific documents.",
  },
  {
    title: "Healthcare",
    desc: "Healthcare organisations that onboard clinical and non-clinical staff can use defined templates to keep documentation formats consistent across employee categories.",
  },
  {
    title: "Education",
    desc: "Educational institutions hiring teaching and administrative staff across the year can rely on active templates to keep the joining process organised.",
  },
  {
    title: "Retail",
    desc: "Retail businesses with multiple store locations can use the Company Address and Company Name placeholders to correctly reflect the relevant branch on each document.",
  },
  {
    title: "Hospitality",
    desc: "Hospitality businesses with seasonal or high-volume hiring can generate applicant and employee documents quickly using pre-configured templates.",
  },
  {
    title: "Construction",
    desc: "Construction firms managing project-based hiring can use Document Template Type and Entity Type settings to separate applicant and employee documentation.",
  },
  {
    title: "Professional Services",
    desc: "Professional services firms that issue formal appointment and engagement documentation can maintain version-controlled templates through Template Version and Default Template settings.",
  },
];

const faqs = [
  {
    q: "What is HR Document Generation Software?",
    a: "HR Document Generation Software is a module in Altroz HR that lets HR teams generate employee and applicant documents, such as offer letters, appointment letters and joining letters, using pre-configured templates instead of drafting them manually.",
  },
  {
    q: "Can Altroz HR generate documents for both applicants and employees?",
    a: "Yes. The system supports document generation for two entity types, Generate for Applicant and Generate for Employee, depending on the Entity Type configured for the template.",
  },
  {
    q: "Can I preview a document before it is generated?",
    a: "Yes. The Preview Document option lets HR users check the document layout and placeholder details before the final document is generated.",
  },
  {
    q: "How are HR document templates managed in Altroz HR?",
    a: "Templates are managed through Template Configuration and edited in the Template Editor, which supports HTML template formatting.",
  },
  {
    q: "Does Altroz HR support offer and appointment letter functionality?",
    a: "Yes. Offer letters, appointment letters and joining letters can be created as Document Templates and generated for applicants or employees through the Generate Documents screen.",
  },
  {
    q: "What are placeholders in Altroz HR document templates?",
    a: "Placeholders are template fields that are automatically filled with relevant data, such as the Employee Name Placeholder, Applicant Name Placeholder, Department Placeholder, Position Placeholder, Joining Date Placeholder, Offered Date Placeholder, Salary Placeholder and Basic Salary Placeholder.",
  },
  {
    q: "Can company details be added automatically to a document?",
    a: "Yes, using the Company Name Placeholder, Company Logo Placeholder, Company Address Placeholder, Company Email Placeholder and Company Phone Placeholder configured in the template.",
  },
  {
    q: "How do I find a document that was generated earlier?",
    a: "You can use Search Generated Documents along with Document Filters, such as Candidate Type, Candidate Name, Document Name, Created Date and Sent Date.",
  },
  {
    q: "Can old or unused templates be removed from selection?",
    a: "Templates can be marked as Active or Inactive. Inactive templates are not available for selection during document generation, which prevents outdated templates from being used by mistake.",
  },
  {
    q: "Does Altroz HR support multiple versions of the same template?",
    a: "Yes. Template Version allows HR teams to track changes to a template, while the Default Template setting ensures the correct version is used during generation.",
  },
  {
    q: "What output format is used for generated documents?",
    a: "Each Document Template has a defined Document Layout and Output Format, which is applied automatically whenever that template is used to generate a document.",
  },
  {
    q: "Is Altroz HR Document Generation Software suitable for large enterprises with multiple departments?",
    a: "Yes. Templates can be organised by Document Template Type and Entity Type, and can use Department and Position placeholders, making the module suitable for organisations with multiple departments and roles.",
  },
];

function FeatureIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
      {icon}
    </div>
  );
}

export default function DocumentGenerationPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="HR Document Generation Software | Offer, Appointment & Joining Letter Generator - Altroz HR"
        description="Generate offer letters, appointment letters and joining letters in minutes with Altroz HR Document Generation Software. Template-based, accurate and centralised HR documentation."
        canonicalPath={ROUTES.documentGeneration}
        ogTitle="HR Document Generation Software - Altroz HR"
        ogDescription="Create standardised employee and applicant documents using ready-to-use templates with Altroz HR Document Generation Software."
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section
          className="hero-gradient relative overflow-hidden scroll-mt-24 !pt-0 !pb-6"
          style={{ display: "block", minHeight: "auto" }}
        >
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-0 pt-0 lg:py-0">
            <ScrollReveal variant="fade-up" className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                HR Document Generation Software
              </span>

              <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                HR document generation software for fast, accurate and standardised employee
                documentation
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-ink-soft sm:text-lg">
                Altroz HR Document Generation Software helps HR teams create offer letters,
                appointment letters, joining letters and other employee documents directly from
                ready-to-use templates. Instead of drafting each document manually in Word or
                Excel, HR teams can select a template, preview the document and generate it in a
                few clicks.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
              <ScrollReveal variant="fade-up" className="lg:col-span-6 self-start">
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary">
                  Request a Free Demo of Altroz HR Document Generation Software
                </a>
                <a href="#features" className="btn-outline">
                  Explore HR Document Templates
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {summaryCards.map((item) => (
                  <article key={item.title} className="soft-card h-full p-4">
                    <div className="flex items-start gap-3">
                      <FeatureIcon icon={item.icon} />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-6 text-ink">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-left text-ink-soft">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 max-w-xl rounded-[1.5rem] border border-border bg-white/80 p-5 shadow-card backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  What this page covers
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {heroHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={100} className="lg:col-span-6 self-start">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={modelScreenshots.generatedDocuments}
                      alt="HR document generation software preview"
                      className="block h-auto w-full bg-white object-contain"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Generate", value: "Templates in minutes" },
                      { label: "Preview", value: "Check before sending" },
                      { label: "Manage", value: "Templates and versions" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-surface p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {item.label}
                        </div>
                        <div className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <Workflow className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          Template-first workflow
                        </div>
                        <div className="text-lg font-bold text-ink">Consistent documents every time</div>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        "Offer letters from ready-to-use templates",
                        "Appointment letters with standard formatting",
                        "Joining letters and employee documents",
                        "Searchable generated document records",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                          <span className="text-sm leading-6 text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="mx-auto max-w-4xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Overview
              </span>
              <h2 className="mx-auto mt-2 max-w-3xl text-3xl font-bold text-ink sm:text-4xl">
                What is HR Document Generation Software?
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-justify leading-7 text-ink-soft">
                HR Document Generation Software is a module within Altroz HR that allows HR teams
                to generate standard employee and applicant documents using pre-configured
                templates, instead of creating each document manually. It replaces repetitive,
                manual document drafting with a structured, template-based document generation
                process.
              </p>
              <p className="mx-auto mt-4 max-w-4xl text-justify leading-7 text-ink-soft">
                In most organisations, HR documents such as offer letters, appointment letters and
                joining letters are still created manually. This creates several recurring problems
                for HR teams.
              </p>
            </ScrollReveal>

            <StaggerReveal step={85} className="mt-10 grid gap-5 lg:grid-cols-3">
              {manualProblemSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <h3 className="text-lg font-bold text-ink">{section.title}</h3>
                  <div className="mt-4 space-y-3">
                    {section.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                        <span className="text-sm leading-6 text-ink-soft">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </StaggerReveal>

            <div className="mt-10 rounded-[1.75rem] border border-border bg-surface p-6 shadow-card">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink">
                    Benefits of Centralised HR Document Generation
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    HR teams work from a defined set of templates, so every document follows the
                    same structure. Templates can be configured once with placeholders, and the
                    correct details are filled in automatically for each applicant or employee.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {centralisedBenefits.map((benefit) => (
                  <article key={benefit.title} className="rounded-2xl bg-white p-5 shadow-sm">
                    <h4 className="text-base font-bold text-ink">{benefit.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{benefit.desc}</p>
                  </article>
                ))}
              </div>

              <p className="mt-5 text-sm leading-6 text-ink-soft">
                Altroz HR Document Generation Software is built around this template-first
                approach, so HR teams spend less time drafting documents and more time on the
                people side of HR.
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="bg-surface py-16 lg:py-20 scroll-mt-24">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core features
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Core features of Altroz HR Document Generation Software
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                The template-first structure is represented here as easy-to-scan cards so teams can
                understand generation, preview, configuration and search at a glance.
              </p>
            </ScrollReveal>

            <StaggerReveal step={80} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {coreFeatureCards.map((item) => (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <FeatureIcon icon={item.icon} />
                    <div>
                      <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                      <div className="mt-3 space-y-3 text-sm leading-6 text-ink-soft">
                        <p>
                          <span className="font-semibold text-ink">What it is:</span>{" "}
                          {item.whatItIs}
                        </p>
                        <p>
                          <span className="font-semibold text-ink">How it works:</span>{" "}
                          {item.howItWorks}
                        </p>
                        <p>
                          <span className="font-semibold text-ink">Business benefit:</span>{" "}
                          {item.businessBenefit}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal
              variant="fade-up"
              className="soft-card p-6 lg:sticky lg:top-24 lg:col-span-4 lg:self-start"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Document workflow
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">Document Generation Workflow</h3>
              <p className="mt-3 text-sm text-ink-soft">
                Altroz HR Document Generation Software follows a simple, step-by-step process, so
                HR teams always know what to expect when generating a document.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Select Applicant or Employee",
                  "Select Document Template",
                  "Preview Document",
                  "Generate Document",
                  "Store Generated Record",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <StaggerReveal step={80} className="grid gap-4 md:grid-cols-2 lg:col-span-8">
              {workflowSteps.map((item, index) => (
                <article
                  key={item.step}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-border bg-white p-5 shadow-card ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-success/60" />
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-base font-bold text-primary">
                      {item.step}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                        {index < workflowSteps.length - 1 ? (
                          <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-soft md:block" />
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Business benefits
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Business Benefits of Altroz HR Document Generation Software
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                A template-first approach reduces manual effort, improves accuracy and keeps HR
                documentation consistent across the organisation.
              </p>
            </ScrollReveal>

            <StaggerReveal step={75} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{benefit.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-x">
            <ScrollReveal variant="fade-up" className="section-heading">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Use cases
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Industry Use Cases</h2>
              <p className="mx-auto mt-4 max-w-3xl text-ink-soft">
                HR document generation is relevant to any organisation that regularly issues offer
                letters, appointment letters, joining letters and similar employee documents.
              </p>
            </ScrollReveal>

            <StaggerReveal step={70} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {industries.map((industry) => (
                <article
                  key={industry.title}
                  className="h-full rounded-[1.5rem] border border-border bg-white p-6 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Workflow className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{industry.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{industry.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="bg-surface py-16 lg:py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <ScrollReveal variant="fade-up" className="soft-card p-6 lg:col-span-7 lg:self-start">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                FAQ
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 rounded-[1.5rem] border border-border bg-white px-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((item, index) => (
                    <AccordionItem key={item.q} value={`item-${index + 1}`}>
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-ink hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pr-8 text-sm leading-6 text-ink-soft">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>

            <ScrollReveal
              variant="fade-left"
              delay={120}
              className="soft-card p-6 lg:col-span-5 lg:self-start"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Final CTA
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Bring Structure and Speed to Your HR Documentation
              </h2>
              <p className="mt-4 text-ink-soft">
                Stop recreating the same offer letters, appointment letters and joining letters
                from scratch. With Altroz HR Document Generation Software, your HR team can
                generate accurate, consistently formatted employee and applicant documents from
                ready-to-use templates and find any generated document in seconds.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Generate documents from ready-to-use templates",
                  "Find generated records in seconds",
                  "Reduce manual editing and formatting",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary justify-center">
                  Request a Free Demo of Altroz HR Document Generation Software
                </a>
                <a href="#features" className="btn-outline justify-center">
                  Explore HR Document Templates
                </a>
                <a href={ROUTES.contact} className="btn-outline justify-center">
                  Talk to Our HR Software Experts
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
