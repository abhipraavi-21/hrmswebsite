import { Timer, ShieldCheck, Eye, MapPin } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";

const reasons = [
  {
    icon: <Timer />,
    title: "Save HR time",
    desc: "Automate repetitive tasks and free your team for what matters.",
    tone: "primary",
  },
  {
    icon: <ShieldCheck />,
    title: "Reduce payroll errors",
    desc: "Pre-built compliance rules eliminate manual mistakes.",
    tone: "success",
  },
  {
    icon: <Eye />,
    title: "Improve transparency",
    desc: "Employees see attendance, leaves and payslips in real time.",
    tone: "primary",
  },
  {
    icon: <MapPin />,
    title: "Track field staff easily",
    desc: "Live GPS check-ins keep your distributed team accountable.",
    tone: "success",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="resources" className="section bg-surface scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="fade-up" className="section-heading">
          <span className="eyebrow text-xs font-bold uppercase tracking-wider text-primary">
            Why teams switch to us
          </span>
          <h2 className="text-3xl font-bold text-ink md:text-4xl">
            Designed for outcomes, not just features
          </h2>
        </ScrollReveal>

        <StaggerReveal
          variant="fade-down"
          step={80}
          className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2 md:gap-4 md:auto-rows-fr"
        >
          {reasons.map((r) => {
            const isPrimary = r.tone === "primary";
            const accentClass = isPrimary
              ? "bg-primary-soft text-primary"
              : "bg-[#dcfce7] text-success";
            return (
              <div
                key={r.title}
                className="content-card soft-card relative min-h-[160px] overflow-hidden p-4 sm:p-5 transition-transform hover:scale-[1.015]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/50 via-primary/20 to-success/40" />
                <div
                  className={`card-icon grid h-9 w-9 place-items-center rounded-lg ${accentClass} [&>svg]:h-4 [&>svg]:w-4`}
                >
                  {r.icon}
                </div>
                <h3 className="mt-3 text-base font-bold text-ink sm:text-lg">{r.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-5 text-ink-soft">{r.desc}</p>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
