import { Link } from "react-router-dom";
import { Users, Mail, Check, ArrowRight, Building2, UsersRound } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

const products = [
  {
    id: "hrms-platform",
    icon: <Users className="h-6 w-6" />,
    eyebrow: "HRMS Platform",
    title: "Run your entire people operations",
    desc: "From attendance to payroll, everything your HR team needs in one place.",
    href: "/products/core-hr",
    features: [
      "Attendance tracking with GPS & biometric",
      "Payroll automation (PF, ESI, TDS ready)",
      "Leave management & approvals",
      "Employee self-service portal",
      "Real-time reports & analytics",
    ],
    color: "primary",
  },
  {
    id: "hr-insights",
    icon: <Mail className="h-6 w-6" />,
    eyebrow: "HR Insights",
    title: "See workforce trends at a glance",
    desc: "Track attendance, payroll, and approvals with reporting that keeps leaders informed.",
    href: ROUTES.analytics,
    features: [
      "Workforce dashboards and summaries",
      "Attendance and payroll visibility",
      "Department and branch trends",
      "Export-ready reporting views",
      "Automated insights and alerts",
    ],
    color: "success",
  },
];

const featureAnchorIds: Record<string, string> = {
  "Workforce dashboards and summaries": "reports-dashboard",
  "Automated insights and alerts": "automation",
};

const solutionTracks = [
  {
    id: "industry",
    icon: <Building2 className="h-6 w-6" />,
    eyebrow: "Industry",
    title: "Built for industry-specific workflows",
    desc: "Adapt HR operations to manufacturing, retail, healthcare, education and other business environments.",
    features: [
      "Role-based workflows for different sites and departments",
      "Policy handling for location-specific teams",
      "Reporting views that reflect business structure",
      "Fast onboarding for complex organizations",
    ],
    tone: "primary",
  },
  {
    id: "workforce",
    icon: <UsersRound className="h-6 w-6" />,
    eyebrow: "Workforce",
    title: "Designed for distributed teams",
    desc: "Keep attendance, approvals and employee access consistent across field, office and hybrid teams.",
    href: "/products/workforce-management",
    features: [
      "Shift-aware attendance and scheduling",
      "Self-service requests for employees and managers",
      "Mobile-friendly access from anywhere",
      "Clear visibility into team activity and status",
    ],
    tone: "success",
  },
];

export default function ProductCards() {
  return (
    <section id="solutions" className="section bg-white scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="fade-up" className="section-heading">
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Two powerful products. One unified platform.
          </h2>
          <p className="text-ink-soft">
            Built to work seamlessly together - manage your people and your communication from a
            single dashboard.
          </p>
        </ScrollReveal>

        <StaggerReveal step={90} className="grid gap-6 md:grid-cols-2">
          {products.map((p) => {
            const isPrimary = p.color === "primary";
            return (
              <div
                id={p.id}
                key={p.eyebrow}
                className="content-card soft-card relative overflow-hidden"
              >
                <div
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                    isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                  }`}
                />
                <div className="relative flex h-full flex-col">
                  <div
                    className={`card-icon grid h-12 w-12 place-items-center rounded-xl ${
                      isPrimary ? "bg-primary text-white" : "bg-success text-white"
                    }`}
                  >
                    {p.icon}
                  </div>
                  <div
                    className={`mt-4 text-xs font-bold uppercase tracking-wider ${
                      isPrimary ? "text-primary" : "text-success"
                    }`}
                  >
                    {p.eyebrow}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-ink-soft">{p.desc}</p>

                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${isPrimary ? "text-primary" : "text-success"}`}
                        />
                        <span id={featureAnchorIds[f]}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={p.href ?? ROUTES.learn}
                    className={`card-action mt-auto inline-flex items-center gap-1 text-sm font-semibold ${
                      isPrimary ? "text-primary" : "text-success"
                    } transition-all hover:gap-2`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </StaggerReveal>

        <div className="mt-14">
          <ScrollReveal variant="fade-up" className="section-heading text-left">
            <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
              Solutions by need
            </span>
            <h3 className="text-2xl font-bold text-ink md:text-3xl">
              Industry and workforce experiences for the teams that use them
            </h3>
          </ScrollReveal>

          <StaggerReveal step={90} className="grid gap-6 md:grid-cols-2">
            {solutionTracks.map((track) => {
              const isPrimary = track.tone === "primary";
              const cardInner = (
                <div className="relative flex h-full flex-col">
                  <div
                    className={`card-icon grid h-12 w-12 place-items-center rounded-xl ${
                      isPrimary ? "bg-primary text-white" : "bg-success text-white"
                    }`}
                  >
                    {track.icon}
                  </div>
                  <div
                    className={`mt-4 text-xs font-bold uppercase tracking-wider ${
                      isPrimary ? "text-primary" : "text-success"
                    }`}
                  >
                    {track.eyebrow}
                  </div>
                  <h4 className="mt-1 text-2xl font-bold text-ink">{track.title}</h4>
                  <p className="mt-2 text-ink-soft">{track.desc}</p>

                  <ul className="mt-5 space-y-2.5">
                    {track.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-ink">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${isPrimary ? "text-primary" : "text-success"}`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={track.href ?? ROUTES.workforce}
                    className={`card-action mt-auto inline-flex items-center gap-1 text-sm font-semibold ${
                      isPrimary ? "text-primary" : "text-success"
                    } transition-all hover:gap-2`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );

              if (track.href) {
                return (
                  <a
                    key={track.id}
                    id={track.id}
                    href={track.href}
                    className="content-card soft-card relative overflow-hidden scroll-mt-24 block"
                  >
                    <div
                      className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                        isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                      }`}
                    />
                    {cardInner}
                  </a>
                );
              }

              return (
                <article
                  key={track.id}
                  id={track.id}
                  className="content-card soft-card relative overflow-hidden scroll-mt-24"
                >
                  <div
                    className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                      isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                    }`}
                  />
                  {cardInner}
                </article>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
