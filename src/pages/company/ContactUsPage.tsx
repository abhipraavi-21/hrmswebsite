import { ArrowRight, CheckCircle2, Megaphone, ShieldCheck, Users } from "lucide-react";
import CompanyDetailPage from "@/components/site/CompanyDetailPage";

export default function ContactUsPage() {
  return (
    <CompanyDetailPage
      eyebrow="Contact sales"
      title="Talk to the Altroz sales team"
      description="Get guidance on the right HRMS modules for your team, including Core HR, Attendance, Payroll, Leave Management, Recruitment, Performance, Reports, Security, and Automation."
      icon={<Megaphone className="h-6 w-6" />}
      highlights={[
        "Book a tailored product walkthrough",
        "Discuss pricing, rollout, and implementation",
        "Match the platform to your team size and workflow",
      ]}
      sections={[
        {
          title: "Sales guidance",
          desc: "Compare the right modules, pricing path, and rollout options for your team.",
        },
        {
          title: "Who should reach out",
          desc: "Founders, HR teams, finance teams, operations leaders, and partners planning a rollout.",
        },
        {
          title: "What to discuss",
          desc: "Share your team size, current process, and the modules you want to improve.",
        },
      ]}
      visual={
        <div className="soft-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Sales focus
              </div>
              <div className="mt-2 text-2xl font-bold text-ink">
                Choose the right HRMS setup for your team
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Tell us what you want to fix and we&apos;ll help map the right product modules and
                next steps.
              </p>
            </div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-white">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Core modules",
                desc: "HR, attendance, payroll, leave, recruitment, and self-service.",
                icon: <CheckCircle2 className="h-4 w-4 text-success" />,
              },
              {
                title: "Control & visibility",
                desc: "Reports, analytics, access control, and approval workflows.",
                icon: <ShieldCheck className="h-4 w-4 text-primary" />,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-surface p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{item.title}</div>
                    <div className="mt-1 text-xs leading-5 text-ink-soft">{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-white p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Popular discussion topics
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Attendance",
                "Payroll",
                "Leave Management",
                "Recruitment",
                "Performance",
                "Reports",
                "Security",
                "Automation",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <a
            href="/company/book-demo"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all hover:gap-2"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      }
      primaryAction={{ label: "Book a demo", href: "/company/book-demo" }}
    />
  );
}
