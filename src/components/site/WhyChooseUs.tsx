import { Timer, ShieldCheck, Eye, MapPin, Layers } from "lucide-react";

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
  {
    icon: <Layers />,
    title: "HR + marketing in one place",
    desc: "Stop juggling tools — one login, one bill, one platform.",
    tone: "primary",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="resources" className="py-20 bg-surface scroll-mt-24">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Why teams switch to us
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-ink">
            Designed for outcomes, not just features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => {
            const isPrimary = r.tone === "primary";
            const accentClass = isPrimary
              ? "bg-primary-soft text-primary"
              : "bg-[#dcfce7] text-success";
            const ringClass = isPrimary ? "hover:border-primary/30" : "hover:border-success/30";
            return (
              <div
                key={r.title}
                className={`soft-card relative overflow-hidden p-6 ${
                  i === 4 ? "lg:col-span-1 md:col-span-2" : ""
                } ${ringClass} transition-transform hover:scale-[1.02]`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/50 via-primary/20 to-success/40" />
                <div
                  className={`grid h-11 w-11 place-items-center rounded-lg ${accentClass} [&>svg]:h-5 [&>svg]:w-5`}
                >
                  {r.icon}
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink">{r.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
