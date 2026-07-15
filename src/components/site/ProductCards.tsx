import { Users, Mail, Check, ArrowRight, Building2, UsersRound } from "lucide-react";

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
    id: "bulk-email-platform",
    icon: <Mail className="h-6 w-6" />,
    eyebrow: "Bulk Email Platform",
    title: "Send campaigns that get opened",
    desc: "Build, send and track marketing emails at scale with deep analytics.",
    href: "/learn",
    features: [
      "Drag-and-drop campaign creation",
      "Beautiful email templates",
      "Smart contact lists & segmentation",
      "Delivery & engagement analytics",
      "Drip automation workflows",
    ],
    color: "success",
  },
];

const featureAnchorIds: Record<string, string> = {
  "Beautiful email templates": "email-templates",
  "Drip automation workflows": "automation",
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
    <section id="solutions" className="py-20 bg-white scroll-mt-24">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-ink">
            Two powerful products. One unified platform.
          </h2>
          <p className="mt-3 text-ink-soft">
            Built to work seamlessly together — manage your people and your communication from a
            single dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => {
            const isPrimary = p.color === "primary";
            return (
              <div id={p.id} key={p.eyebrow} className="soft-card p-8 relative overflow-hidden">
                <div
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                    isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                  }`}
                />
                <div className="relative">
                  <div
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      isPrimary ? "bg-primary text-white" : "bg-success text-white"
                    }`}
                  >
                    {p.icon}
                  </div>
                  <div
                    className={`mt-4 text-xs font-bold uppercase tracking-wider ${isPrimary ? "text-primary" : "text-success"}`}
                  >
                    {p.eyebrow}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-ink-soft">{p.desc}</p>

                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink">
                        <Check
                          className={`h-4 w-4 mt-0.5 shrink-0 ${isPrimary ? "text-primary" : "text-success"}`}
                        />
                        <span id={featureAnchorIds[f]}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={p.href ?? "/learn"}
                    className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${
                      isPrimary ? "text-primary" : "text-success"
                    } hover:gap-2 transition-all`}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Solutions by need
            </span>
            <h3 className="mt-2 text-2xl md:text-3xl font-bold text-ink">
              Industry and workforce experiences for the teams that use them
            </h3>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
          {solutionTracks.map((track) => {
            const isPrimary = track.tone === "primary";
            if (track.href) {
              return (
                <a
                  key={track.id}
                  id={track.id}
                  href={track.href}
                  className="soft-card p-8 relative overflow-hidden scroll-mt-24 block"
                >
                  <div
                    className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                      isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                    }`}
                  />
                  <div className="relative">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl ${
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
                            className={`h-4 w-4 mt-0.5 shrink-0 ${
                              isPrimary ? "text-primary" : "text-success"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`mt-6 inline-flex items-center gap-1 text-sm font-semibold ${
                        isPrimary ? "text-primary" : "text-success"
                      } hover:gap-2 transition-all`}
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </a>
              );
            }
            return (
              <article
                key={track.id}
                id={track.id}
                  className="soft-card p-8 relative overflow-hidden scroll-mt-24"
                >
                  <div
                    className={`absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-50 ${
                      isPrimary ? "bg-primary-soft" : "bg-[#dcfce7]"
                    }`}
                  />
                  <div className="relative">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl ${
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
                            className={`h-4 w-4 mt-0.5 shrink-0 ${
                              isPrimary ? "text-primary" : "text-success"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
