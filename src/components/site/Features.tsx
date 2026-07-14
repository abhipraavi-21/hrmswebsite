import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  DoorOpen,
  FileBarChart2,
  LogOut,
  MapPin,
  Package,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

const features = [
  {
    id: "core-hr",
    icon: <Building2 />,
    title: "Core HR",
    desc: "Keep employee records, roles and org structure in one place.",
    href: "/products/core-hr",
  },
  {
    id: "attendance",
    icon: <Clock3 />,
    title: "Attendance",
    desc: "Track shifts, check-ins and time logs accurately.",
    href: "/products/attendance",
  },
  {
    id: "payroll",
    icon: <Wallet />,
    title: "Payroll",
    desc: "Run salaries, deductions and approvals without manual work.",
    href: "/products/payroll",
  },
  {
    id: "leave-management",
    icon: <CalendarDays />,
    title: "Leave Management",
    desc: "Handle leave rules, balances and approvals with ease.",
    href: "/products/leave-management",
  },
  {
    id: "recruitment-ats",
    icon: <BriefcaseBusiness />,
    title: "Recruitment (ATS)",
    desc: "Track candidates from sourcing to offer acceptance.",
    href: "/products/recruitment-ats",
  },
  {
    id: "performance-management",
    icon: <Users />,
    title: "Performance Management",
    desc: "Plan reviews, goals and feedback in one workflow.",
    href: "/products/performance-management",
  },
  {
    id: "asset-management",
    icon: <Package />,
    title: "Asset Management",
    desc: "Assign, track and recover company assets confidently.",
    href: "/integrations/asset-management#asset-management",
  },
  {
    id: "expense-management",
    icon: <ReceiptText />,
    title: "Expense Management",
    desc: "Submit, review and reimburse business expenses smoothly.",
    href: "/products/expense-management#expense-management",
  },
  {
    id: "visitor-management",
    icon: <DoorOpen />,
    title: "Visitor Management",
    desc: "Register and authorize visitors with a clear log.",
    href: "/products/visitor-management",
  },
  {
    id: "exit-management",
    icon: <LogOut />,
    title: "Exit Management",
    desc: "Manage resignations, clearance and offboarding steps.",
    href: "/products/exit-management",
  },
  {
    id: "employee-self-service",
    icon: <UserRound />,
    title: "Employee Self Service",
    desc: "Give employees and managers a fast, secure way to manage HR tasks.",
    href: "/products/employee-self-service",
  },
  {
    id: "hr-analytics",
    icon: <BarChart3 />,
    title: "HR Analytics",
    desc: "See trends, headcount and people metrics at a glance.",
  },
  {
    id: "automation",
    icon: <Bot />,
    title: "HR Automation",
    desc: "Automate approvals, tasks and repetitive HR workflows.",
    href: "/hr-automation",
  },
  {
    id: "attendance-features",
    icon: <MapPin />,
    title: "Attendance Features",
    desc: "Use GPS, geo-fencing and shift rules for precision.",
    href: "/attendance-management#attendance-features",
  },
  {
    id: "reports",
    icon: <FileBarChart2 />,
    title: "Reports",
    desc: "Export-ready reports for operations and compliance.",
  },
  {
    id: "security",
    icon: <ShieldCheck />,
    title: "Security",
    desc: "Protect data with roles, permissions and audits.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-surface scroll-mt-24">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Everything you need
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-ink">
            Powerful features, beautifully simple
          </h2>
          <p className="mt-3 text-ink-soft">
            Explore each capability as a dedicated section, so the feature menu can jump straight to
            the right area.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) =>
            f.href ? (
              <a
                key={f.title}
                id={f.id}
                href={f.href}
                className="soft-card p-6 group scroll-mt-24 block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors [&>svg]:h-5 [&>svg]:w-5">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{f.desc}</p>
              </a>
            ) : (
              <div key={f.title} id={f.id} className="soft-card p-6 group scroll-mt-24">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors [&>svg]:h-5 [&>svg]:w-5">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{f.desc}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
