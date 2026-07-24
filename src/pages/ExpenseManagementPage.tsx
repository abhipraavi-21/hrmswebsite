import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  Gauge,
  LayoutDashboard,
  MailCheck,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Footer from "@/components/site/Footer";
import { ROUTES } from "@/routes/routeConfig";

const heroMetrics = [
  { label: "Claim details", value: "Claim number, dates, category, amount" },
  { label: "Approval chain", value: "Employee, manager, then finance" },
  { label: "Export output", value: "Excel, PDF, and print ready" },
];

const heroProofCards = [
  {
    title: "Structured Expense Claims",
    desc: "Every claim captures claim number, claim date, transaction date, category and amount.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Defined Approval Workflow",
    desc: "Claims move from employee to reporting manager to finance in a clear, trackable path.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Ready-to-Export Reports",
    desc: "Generate employee, department and branch-wise expense reports in a click.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const whatIsCards = [
  {
    title: "One place for every claim",
    desc: "Employees submit business expense claims online instead of paper vouchers or scattered spreadsheets.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "Clear approval workflow",
    desc: "Managers and finance teams review, approve and process reimbursements in a structured flow.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Exportable records",
    desc: "Every claim, status and payment detail stays ready for reporting, export and audit.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
];

const manualProblemCards = [
  {
    title: "Paper claim forms get lost",
    desc: "Manual vouchers and handwritten claims are easy to misplace, delay or fill incorrectly.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Approvals move too slowly",
    desc: "Employees chase managers over email or WhatsApp when the approval path is not defined.",
    icon: <MailCheck className="h-5 w-5" />,
  },
  {
    title: "Manual re-entry creates errors",
    desc: "Finance teams often type the same data again, which increases the chance of mistakes.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Pending and paid claims blur together",
    desc: "Without a clear reimbursement record, it becomes hard to see what is still waiting to be paid.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const coreRecordFields = [
  {
    title: "Expense Claim",
    desc: "The core record that stores every employee expense request in one standard format.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "Reimbursement Request",
    desc: "An approved claim moves into the reimbursement stage so payment status stays clear.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Claim Number",
    desc: "A unique claim number makes it easy to search, reference and track any request.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Claim Date and Transaction Date",
    desc: "The system records both when the claim was raised and when the expense actually happened.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Expense Description",
    desc: "Employees add the purpose of the spend so approvers get the context they need.",
    icon: <MailCheck className="h-5 w-5" />,
  },
  {
    title: "Employee Selection",
    desc: "Claims link to the right employee record so reimbursements go to the correct person.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Branch Mapping",
    desc: "Every claim can be tied to the employee's branch or work location for clean reporting.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Department Mapping",
    desc: "Claims stay organized by department, which helps leaders compare spending by team.",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Reporting Manager and Approval",
    desc: "The claim routes to the reporting manager first, keeping the approval step accountable.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const controlAndOutputFields = [
  {
    title: "Currency Selection",
    desc: "Employees can choose the correct currency while entering the expense amount.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Expense Categories and Expense Items",
    desc: "Food, travel and custom items can be grouped under clear, configurable categories.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Amount Calculation and Total Amount",
    desc: "The system totals each item automatically so the final claim amount stays accurate.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: "Expense Status",
    desc: "Every claim shows whether it is pending, approved or rejected at any time.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Payment Status",
    desc: "Finance can update the reimbursement stage separately from the approval stage.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Search and Filters",
    desc: "Teams can find claims quickly by number, employee, branch, date or status.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: "Expense Reports",
    desc: "Employee, department, branch, status and payment reports are ready whenever needed.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Excel Export, PDF Export and Print",
    desc: "Claims and reports can be exported or printed in the format the business needs.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Employee Creates Expense Claim",
    desc: "The employee logs the expense with claim date, transaction date, description, category, items and amount.",
  },
  {
    step: "02",
    title: "Manager Review",
    desc: "The claim appears in the reporting manager's queue so the details can be reviewed in context.",
  },
  {
    step: "03",
    title: "Approval",
    desc: "The manager approves or rejects the claim and the expense status updates immediately.",
  },
  {
    step: "04",
    title: "Finance Verification",
    desc: "Finance checks the approved claim, branch mapping, department mapping and total amount before payment.",
  },
  {
    step: "05",
    title: "Payment Processing",
    desc: "Once verified, the reimbursement moves through the team's payment cycle.",
  },
  {
    step: "06",
    title: "Payment Status Update",
    desc: "The claim's payment status changes in the system when the reimbursement is paid.",
  },
  {
    step: "07",
    title: "Reports",
    desc: "The completed claim becomes part of the expense reports used for analysis and compliance.",
  },
];

const dashboardSummary = [
  "Pending claims show what still needs approval.",
  "Approved claims stay visible until payment is processed.",
  "Rejected claims keep the reason for rejection easy to review.",
  "Total expenses give the business a consolidated spend view.",
];

const dashboardCards = [
  {
    title: "Expense dashboard overview",
    desc: "A single screen view for HR, finance and business owners.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Employee claims",
    desc: "View claims raised by individual employees for quick reference and follow-up.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Recent reimbursements",
    desc: "Check the latest reimbursements processed without running a separate report.",
    icon: <ReceiptText className="h-5 w-5" />,
  },
  {
    title: "Payment status",
    desc: "Monitor which reimbursements are paid and which are still pending.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Export and print",
    desc: "Finance can share clean output for audits, management and external reviews.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Audit trail",
    desc: "Every approval, update and payment stays recorded in one place.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Policy visibility",
    desc: "Rules, exceptions and approval chains stay visible across the workflow.",
    icon: <Workflow className="h-5 w-5" />,
  },
];

const benefitCards = [
  {
    title: "Faster reimbursement",
    desc: "A structured workflow moves claims from submission to payment quickly.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Reduce paperwork",
    desc: "Digital expense claims replace paper vouchers and physical filing.",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: "Better expense visibility",
    desc: "HR and finance can see pending, approved and rejected claims in real time.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Simplified approval process",
    desc: "A clear manager-to-finance approval path removes confusion about what happens next.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Accurate record keeping",
    desc: "Claim numbers, dates, categories and amounts are recorded consistently.",
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: "Easy reporting",
    desc: "Employee, department, branch and status-wise reports are ready without manual compilation.",
    icon: <Gauge className="h-5 w-5" />,
  },
  {
    title: "Audit-ready records",
    desc: "Organized claim history makes internal and external audits far less time-consuming.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Improved financial control",
    desc: "Department and branch mapping give finance teams clear insight into spend patterns.",
    icon: <Target className="h-5 w-5" />,
  },
];

const industryCards = [
  {
    title: "Manufacturing",
    desc: "Track site visit, procurement and travel-related expenses across plants and departments.",
  },
  {
    title: "IT Companies",
    desc: "Manage client visit and project-related expense claims with fast manager approvals.",
  },
  {
    title: "Healthcare",
    desc: "Handle expense claims from multiple branches with consistent approval workflows.",
  },
  {
    title: "Retail",
    desc: "Consolidate expense claims across store locations using branch-wise reporting.",
  },
  {
    title: "Education",
    desc: "Track expenses raised by staff for events, travel and institutional needs.",
  },
  {
    title: "Construction",
    desc: "Manage site-related travel and food expenses raised by project teams.",
  },
  {
    title: "Hospitality",
    desc: "Track expenses from staff working across properties or outlets with branch reporting.",
  },
  {
    title: "Professional Services",
    desc: "Manage client-related travel and food expenses with quick approvals.",
  },
  {
    title: "Startups",
    desc: "Set up a simple, structured reimbursement process from day one.",
  },
];

const faqItems = [
  {
    q: "What is Expense Management Software?",
    a: "It is a system that lets employees submit business expense claims online and allows managers and finance teams to review, approve and process reimbursements through a structured workflow.",
  },
  {
    q: "How is Altroz HR Expense Management Software different from spreadsheets?",
    a: "Unlike spreadsheets, Altroz HR captures every claim in a standard format with claim numbers, approval workflow, expense status and payment status, along with search, filters and exportable reports.",
  },
  {
    q: "Can employees track the status of their expense claims?",
    a: "Yes. Every claim shows a clear expense status, so employees can see whether their claim is pending, approved or rejected at any time.",
  },
  {
    q: "Does the software support multiple expense categories?",
    a: "Yes. Claims can be raised under categories such as Food Expenses, Travel Expenses and custom expense items configured to match business needs.",
  },
  {
    q: "Can expense claims be mapped to specific branches and departments?",
    a: "Yes. Every claim supports branch mapping and department mapping, which helps businesses analyze spend by location and team.",
  },
  {
    q: "How does the approval workflow work?",
    a: "A claim moves from the employee to the reporting manager for approval, then to finance for verification and payment processing, with the payment status updated once reimbursed.",
  },
  {
    q: "Can the software handle expenses in different currencies?",
    a: "Yes. Employees can select the applicable currency while entering the expense amount on their claim.",
  },
  {
    q: "What reports are available in Expense Management Software?",
    a: "Altroz HR provides employee expense reports, department reports, branch reports, expense status reports, payment status reports and monthly expense reports.",
  },
  {
    q: "Can expense reports be exported?",
    a: "Yes. Reports can be exported to Excel or PDF, or printed directly from the system.",
  },
  {
    q: "Is there a dashboard to track all expense claims?",
    a: "Yes. The expense dashboard shows pending, approved and rejected claims, total expenses, employee claims, recent reimbursements and payment status in one screen.",
  },
  {
    q: "Which businesses can use Altroz HR Expense Management Software?",
    a: "It is suitable for SMEs and enterprises across manufacturing, healthcare, IT, education, retail, hospitality, construction and professional services.",
  },
  {
    q: "How do I search for a specific expense claim?",
    a: "You can use the search and filter options to find claims by claim number, employee, department, branch, status or date range.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-ink-soft">{description}</p>
    </div>
  );
}

export default function ExpenseManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Expense Management Software for Businesses | Altroz HR"
        description="Altroz HR Expense Management Software simplifies expense claims, approvals and reimbursements. Get a structured expense dashboard, reports and Excel/PDF export. Book a free demo."
        canonicalPath={ROUTES.expenseManagement}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section
          id="expense-management"
          className="hero-gradient relative overflow-hidden scroll-mt-24"
        >
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-10 py-12 lg:grid-cols-12 lg:items-stretch lg:py-14">
            <div className="fade-up lg:col-span-6 lg:flex lg:h-full lg:flex-col">
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  HR - Reimbursements - All in One Place
                </span>
              </div>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Expense Management Software for Faster, Error-Free Employee Reimbursements
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                Altroz HR Expense Management Software helps businesses replace manual expense
                claims and spreadsheets with a simple, structured system. Employees submit
                expense claims online, managers approve them in a defined workflow, and finance
                teams get accurate, exportable expense reports, all from one expense dashboard.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={ROUTES.bookDemo} className="btn-primary">
                  Book a Free Demo
                </a>
                <a href="#what-is" className="btn-outline">
                  Explore Expense Management Features
                </a>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="soft-card min-h-[7.5rem] p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {heroProofCards.map((card) => (
                      <div key={card.title} className="rounded-[1.25rem] border border-border bg-surface p-4">
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                          {card.icon}
                        </div>
                        <div className="mt-3 text-sm font-bold text-ink">{card.title}</div>
                        <p className="mt-2 text-xs leading-5 text-ink-soft">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            Expense dashboard
                          </div>
                          <div className="mt-1 text-lg font-bold text-ink">
                            Submission, approval and payout in one flow
                          </div>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
                          Policy aware
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {[
                          {
                            label: "Drafts",
                            value: "Receipts captured, waiting to submit",
                            tone: "bg-primary-soft text-primary",
                          },
                          {
                            label: "Approvals",
                            value: "Manager review with policy context",
                            tone: "bg-[#ecfdf3] text-success",
                          },
                          {
                            label: "Payouts",
                            value: "Ready for batch processing",
                            tone: "bg-white text-ink",
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-border bg-white p-4 shadow-card"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="text-sm font-bold text-ink">{item.label}</div>
                                <div className="text-xs text-ink-soft">{item.value}</div>
                              </div>
                              <div
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}
                              >
                                Live
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[1.5rem] border border-border bg-white p-5 shadow-card">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                            <ReceiptText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                              Expense status
                            </div>
                            <div className="text-lg font-bold text-ink">Review ready</div>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-ink-soft">
                          A compact command center for policy checks, approvals and finance-ready
                          output.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-surface p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                          Process flow
                        </div>
                        <div className="mt-4 space-y-3">
                          {["Submit", "Approve", "Control", "Process"].map((step, index) => (
                            <div
                              key={step}
                              className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3"
                            >
                              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                                0{index + 1}
                              </div>
                              <div className="text-sm font-semibold text-ink">{step}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="what-is" className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="WHAT IS EXPENSE MANAGEMENT SOFTWARE"
              title="Expense claims, approvals and reimbursements in one structured system"
              description="Expense Management Software is a system that allows employees to submit business expense claims online and allows managers and finance teams to review, approve and process reimbursements in a structured, trackable way."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {whatIsCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="MANUAL EXPENSE PAIN POINTS"
              title="The problems that appear when expense handling stays too manual"
              description="Paper vouchers, spreadsheet versions and email threads create delays, errors and poor visibility across the reimbursement process."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {manualProblemCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="core-features" className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="CORE FEATURES"
              title="Altroz HR Expense Management Software is built around every field and control a team needs"
              description="The feature set mirrors the document in a cleaner card layout so every record field, approval control and reporting output has its own place."
            />

            <div className="mt-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-xl font-bold text-ink">Core record fields</h3>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {coreRecordFields.map((card) => (
                  <article key={card.title} className="soft-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink">{card.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-xl font-bold text-ink">Controls and outputs</h3>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {controlAndOutputFields.map((card) => (
                  <article key={card.title} className="soft-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                        {card.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink">{card.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-4 lg:self-start">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                EXPENSE APPROVAL WORKFLOW
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                A clear expense workflow keeps every claim moving through the right checks
              </h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Altroz HR follows a step-by-step workflow so every claim moves through submission,
                approval, verification, payment and reporting without confusion.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Keep approval status visible across every step",
                  "Batch payouts after approval instead of handling each claim manually",
                  "Retain a clean trail for finance reviews and audits",
                  "Keep rules, exceptions and ownership easy to follow",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-surface p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-4 md:grid-cols-2">
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
                          <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                          {index < workflowSteps.length - 1 ? (
                            <ArrowRight className="hidden h-4 w-4 text-ink-soft md:block" />
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard" className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="EXPENSE DASHBOARD"
              title="A dashboard that gives business owners, HR and finance one screen view of expense activity"
              description="Pending claims, approved claims, rejected claims, total expenses, employee claims and recent reimbursements stay visible without a separate spreadsheet."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="soft-card p-6 lg:col-span-4 lg:self-start">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Dashboard summary
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  The dashboard keeps the high-level spend picture easy to scan
                </h3>
                <div className="mt-6 space-y-3">
                  {dashboardSummary.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-4 md:grid-cols-2">
                  {dashboardCards.map((card, index) => (
                    <article
                      key={card.title}
                      className={`soft-card p-6 ${index === 0 ? "md:col-span-2" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                          {card.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-ink">{card.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="BUSINESS BENEFITS"
              title="Business benefits of Altroz HR Expense Management"
              description="The platform helps teams work with fewer losses, clearer ownership and a cleaner audit trail."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {benefitCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="INDUSTRIES WE SUPPORT"
              title="Expense management for a wide range of businesses"
              description="Manufacturing, IT, healthcare, retail, education, logistics and startups can all use the same structured expense flow."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {industryCards.map((card) => (
                <article key={card.title} className="soft-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-soft">{card.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title="The questions teams usually ask before choosing expense management software"
              description="These answers cover the most common setup, reporting and workflow questions from HR, finance and business teams."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.q} className="rounded-[1.25rem] border border-border bg-white p-5 shadow-card">
                  <h3 className="text-base font-bold text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-8 pb-16">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    FINAL CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Bring structure and speed to your expense reimbursements
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Replace manual expense claims and spreadsheets with Altroz HR Expense
                    Management Software. Give employees a simple way to raise claims, give managers
                    a clear approval process, and give finance teams accurate, audit-ready expense
                    reports in one place.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <a href={ROUTES.bookDemo} className="btn-primary">
                    Book a Free Demo
                  </a>
                  <a href={ROUTES.contact} className="btn-outline">
                    Talk to Our Team
                  </a>
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
