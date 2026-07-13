import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Clock3,
  Fingerprint,
  Globe,
  MapPin,
  ScanText,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Users,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import { modelScreenshots } from "@/lib/modelScreenshots";

const heroImage = modelScreenshots.attendanceDashboard;
const trustBadge = "https://www.datocms-assets.com/40521/1703066650-g2_logo_red_rgb.png";

const attendanceMethods = [
  {
    title: "Third-party attendance hardware",
    desc: "Capture swipes from connected devices across multiple locations and keep the data flowing into one attendance stream.",
    image: "https://www.datocms-assets.com/40521/1705312175-third-party-attendance-hardware.png",
  },
  {
    title: "Web sign-in through the portal",
    desc: "Let employees mark time from the browser when they are working without a physical device.",
    image: "https://www.datocms-assets.com/40521/1705312244-web-sign-in-through-greythr-portal.png",
  },
  {
    title: "GeoMark",
    desc: "Use location-aware check-ins to keep attendance tied to the right place and shift context.",
    image: "https://www.datocms-assets.com/40521/1705312299-greythr-geomark.png",
  },
  {
    title: "GPS live tracking",
    desc: "Track field attendance with GPS-enabled capture for teams that move between sites.",
    image: "https://www.datocms-assets.com/40521/1705312334-greythr-geotag.png",
  },
  {
    title: "Selfie attendance",
    desc: "Support selfie-based attendance for mobile-first teams that need a quick, secure way to check in.",
    image: "https://www.datocms-assets.com/40521/1705312375-greythr-selfie-attendance.png",
  },
  {
    title: "Visage",
    desc: "Use face-based attendance where a more controlled verification method is helpful.",
    image: "https://www.datocms-assets.com/40521/1705312418-greythr-visage.png",
  },
];

const policyCards = [
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Flexible policy setup",
    desc: "Create multiple shifts, rotation logic, weekend rules, and exception handling for different teams.",
  },
  {
    icon: <Clock3 className="h-5 w-5" />,
    title: "Work-hour logic",
    desc: "Configure fixed, flexi, and shift-based computation rules so time is calculated the way you need it.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Category-based schemes",
    desc: "Apply different attendance schemes across employee groups without building everything from scratch.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Shift rotation",
    desc: "Automate shift plans so rostering stays predictable and easier to manage across locations.",
  },
];

const processingBullets = [
  "View attendance in real time as swipes and check-ins come in",
  "Schedule automatic download of device swipes",
  "Run daily attendance processing without manual effort",
  "Finalize attendance automatically at month end",
  "Trigger alerts for attendance events that need attention",
  "Detect shifts automatically and keep leave integration aligned",
];

const selfServiceColumns = [
  {
    title: "Attendance marking",
    icon: <Fingerprint className="h-5 w-5" />,
    items: [
      "Mark attendance from the web app without a device",
      "Use IP-based control to define where attendance can be marked",
      "Support GPS, geo-fencing, geo-tracking, and selfie-based checks",
    ],
  },
  {
    title: "Complete visibility",
    icon: <ScanText className="h-5 w-5" />,
    items: [
      "Let employees see their attendance details at a glance",
      "Use calendar views to make monthly patterns easy to understand",
      "Allow drill-down into a specific day for more context",
      "Give managers dashboards for on-time, late, and absent status",
    ],
  },
  {
    title: "Attendance regularisation",
    icon: <Smartphone className="h-5 w-5" />,
    items: [
      "Send daily issue alerts to employees",
      "Provide a simple online regularisation flow",
      "Alert managers so approvals happen on time",
    ],
  },
];

const overtimeBullets = [
  "Configure overtime rules for different employee categories",
  "Generate detailed overtime payslips",
  "Apply overtime in bulk or for a single employee",
];

const permissionBullets = [
  "Customize permission rules for short absences",
  "Apply for short absence from the portal",
  "Apply on behalf of employees when needed",
  "Approve or reject permission requests quickly",
  "Generate detailed reports for audit and tracking",
];

const complianceBullets = [
  "Maintain muster roll records",
  "Keep overtime registers accurate",
  "Maintain attendance registers with less manual effort",
];

const outcomeCards = [
  {
    value: "Improve",
    label: "productivity and workforce discipline",
  },
  {
    value: "Implement",
    label: "real-time attendance capture",
  },
  {
    value: "Achieve",
    label: "statutory compliance",
  },
  {
    value: "Ensure",
    label: "policy transparency and consistency",
  },
  {
    value: "Simplify",
    label: "shift management and rostering",
  },
  {
    value: "Enable",
    label: "live attendance processing",
  },
];

export default function AttendancePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x grid gap-8 py-12 lg:grid-cols-12 lg:items-start lg:py-16">
            <div className="lg:col-span-6 fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Attendance Management
              </span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Real-time attendance that keeps workforce operations moving
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft">
                A live attendance system helps teams work with less friction, better discipline, and
                clearer control across shifts, sites, and policies.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Explore now
                </a>
                <a href="#methods" className="btn-outline">
                  View attendance methods
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Capture", value: "real-time swipes" },
                  { label: "Control", value: "rules and shifts" },
                  { label: "Outcome", value: "better discipline" },
                ].map((item) => (
                  <div key={item.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-2xl">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-5 shadow-float">
                  <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                    <img
                      src={heroImage}
                      alt="Attendance management dashboard preview"
                      className="block h-auto w-full object-contain bg-white"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-primary/5 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Clock3 className="h-4 w-4" />
                        Real time matters
                      </div>
                      <p className="mt-3 text-sm text-ink-soft">
                        Attendance data is most useful when it is captured and processed without
                        delay.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#ecfdf3] p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-success">
                        <ShieldCheck className="h-4 w-4" />
                        Policy control
                      </div>
                      <p className="mt-3 text-sm text-ink-soft">
                        Rules for lateness, absences, overtime, and permissions stay centralized.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary-soft p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Globe className="h-4 w-4" />
                        Multi-location fit
                      </div>
                      <p className="mt-3 text-sm text-ink-soft">
                        Support teams in offices, field roles, and shift-based operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                The outcome
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Six practical gains from a better attendance layer
              </h2>
              <p className="mt-3 text-ink-soft">
                The source page emphasized productivity, compliance, policy transparency, and
                simpler rostering. This version keeps those priorities and rewrites the language for
                your app.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {outcomeCards.map((card) => (
                <article key={card.value} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.value}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{card.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="methods" className="bg-surface py-20">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Attendance methods
              </span>
              <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                Support the marking style each team actually needs
              </h2>
              <p className="mt-3 text-ink-soft">
                The reference page shows multiple check-in methods. We kept the same idea and
                translated it into a clean, original visual layout.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {attendanceMethods.map((method) => (
                <article key={method.title} className="soft-card overflow-hidden p-0">
                  <div className="aspect-[676/430] bg-white">
                    <img
                      src={method.image}
                      alt={method.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink">{method.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft">{method.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Customisable policies
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Build attendance rules around how your business really runs
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Configure late-in, early-out, absence, shortfall, overtime, and shift logic without
                forcing every team into the same attendance pattern.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {policyCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-border bg-surface p-5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      {card.icon}
                    </div>
                    <h4 className="mt-4 text-base font-bold text-ink">{card.title}</h4>
                    <p className="mt-2 text-sm text-ink-soft">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Automatic processing
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Let the system process attendance instead of chasing it manually
              </h3>
              <div className="mt-6 space-y-3">
                {processingBullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card overflow-hidden lg:col-span-5">
              <img
                src="https://www.datocms-assets.com/40521/1705306001-automatic-attendance-processing.png"
                alt="Automatic attendance processing"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Employee self service
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Give employees and managers more visibility and control
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                The portal and mobile experience make attendance marking, checking, and
                regularisation easier for everyone involved.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {selfServiceColumns.map((column) => (
                  <div key={column.title} className="rounded-2xl border border-border bg-white p-5">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      {column.icon}
                    </div>
                    <h4 className="mt-4 text-base font-bold text-ink">{column.title}</h4>
                    <ul className="mt-3 space-y-2">
                      {column.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card p-6 lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Overtime and permissions
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Handle overtime, short absences, and attendance exceptions cleanly
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-surface p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <BarChart3 className="h-4 w-4" />
                    Overtime management
                  </div>
                  <ul className="mt-3 space-y-2">
                    {overtimeBullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-surface p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Workflow className="h-4 w-4" />
                    Attendance permissions
                  </div>
                  <ul className="mt-3 space-y-2">
                    {permissionBullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="soft-card p-6 lg:col-span-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Statutory compliance
              </div>
              <h3 className="mt-2 text-2xl font-bold text-ink">
                Keep compliance records in shape without the manual burden
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Attendance data should support operational discipline and the records your business
                needs for compliance.
              </p>

              <div className="mt-6 space-y-3">
                {complianceBullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border p-3"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
                <img
                  src="https://www.datocms-assets.com/40521/1705306168-statutory-compliance-simplified.png"
                  alt="Statutory compliance simplified"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card overflow-hidden lg:col-span-4">
              <img
                src="https://www.datocms-assets.com/40521/1705306073-comprehensive-overtime-management.png"
                alt="Comprehensive overtime management"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card overflow-hidden lg:col-span-4">
              <img
                src="https://www.datocms-assets.com/40521/1705306126-attendance-permissions.png"
                alt="Attendance permissions"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="soft-card overflow-hidden lg:col-span-4">
              <img
                src="https://www.datocms-assets.com/40521/1705560459-customizable-attendance-policies.png"
                alt="Customisable attendance policies"
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Trusted by teams that need accuracy
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Attendance should be easy to manage and hard to get wrong
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    This page keeps the same themes as the reference site, but it is written and
                    assembled fresh for your project.
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3">
                    <img src={trustBadge} alt="G2 logo" className="h-8 w-auto" />
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        Meet the clients who made us No. 1
                      </div>
                      <div className="text-xs text-ink-soft">
                        A trust signal style strip inspired by the source page.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                  <a href="#methods" className="btn-outline">
                    Review methods
                  </a>
                  <a href="/company/contact-us" className="btn-primary">
                    Contact sales
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
