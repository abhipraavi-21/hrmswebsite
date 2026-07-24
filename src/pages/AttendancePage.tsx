import { useState } from "react";
import { Link } from "react-router-dom";
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
import { ROUTES } from "@/routes/routeConfig.js";
const trustBadge = "https://www.datocms-assets.com/40521/1703066650-g2_logo_red_rgb.png";

function getAttendanceCardHref(viewId: string, label: string) {
  const normalized = label.toLowerCase();

  if (viewId === "dashboard") {
    if (normalized.includes("total")) {
      return ROUTES.coreHR;
    }

    if (normalized.includes("present")) {
      return `${ROUTES.attendanceManagement}#methods`;
    }

    if (normalized.includes("absent") || normalized.includes("leave")) {
      return ROUTES.leaveManagement;
    }

    return ROUTES.reports;
  }

  if (viewId === "employee-core") {
    if (normalized.includes("department")) {
      return ROUTES.workforce;
    }

    if (normalized.includes("file") || normalized.includes("verified")) {
      return ROUTES.security;
    }

    return ROUTES.coreHR;
  }

  if (viewId === "biometric") {
    if (normalized.includes("sync") || normalized.includes("device")) {
      return `${ROUTES.attendanceManagement}#methods`;
    }

    return ROUTES.integrations;
  }

  if (viewId === "punch") {
    if (normalized.includes("missing") || normalized.includes("late")) {
      return ROUTES.reports;
    }

    return `${ROUTES.attendanceManagement}#self-service`;
  }

  if (viewId === "timesheet") {
    if (normalized.includes("payroll") || normalized.includes("overtime")) {
      return ROUTES.payroll;
    }

    return ROUTES.reports;
  }

  if (normalized.includes("open positions") || normalized.includes("applications")) {
    return ROUTES.recruitment;
  }

  if (normalized.includes("payroll") || normalized.includes("hours") || normalized.includes("overtime")) {
    return ROUTES.payroll;
  }

  return ROUTES.reports;
}

function getAttendancePanelHref(viewId: string) {
  switch (viewId) {
    case "dashboard":
      return ROUTES.analytics;
    case "employee-core":
      return ROUTES.coreHR;
    case "biometric":
      return `${ROUTES.attendanceManagement}#methods`;
    case "punch":
      return `${ROUTES.attendanceManagement}#self-service`;
    case "timesheet":
      return ROUTES.reports;
    default:
      return ROUTES.attendanceManagement;
  }
}

function getAttendanceDashboardView(viewId: string) {
  if (viewId === "attendance" || viewId === "dashboard") {
    return attendanceDashboardViews.dashboard;
  }

  return (
    attendanceDashboardViews[viewId as keyof typeof attendanceDashboardViews] ??
    attendanceDashboardViews.dashboard
  );
}

const attendanceDashboardItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    detail: "Live overview",
    title: "Attendance",
    subtitle: "Live workforce overview",
  },
  {
    id: "employee-core",
    label: "Employee Core",
    detail: "People data",
    title: "Employee Core",
    subtitle: "Core workforce details and employee records",
  },
  {
    id: "attendance",
    label: "Attendance",
    detail: "Selected view",
    title: "Attendance",
    subtitle: "Live workforce overview",
  },
  {
    id: "biometric",
    label: "Biometric",
    detail: "Device capture",
    title: "Biometric",
    subtitle: "Device-based attendance capture and validation",
  },
  {
    id: "punch",
    label: "Punch",
    detail: "Check-ins",
    title: "Punch",
    subtitle: "Quick punch-in and punch-out workflow",
  },
  {
    id: "timesheet",
    label: "Timesheet",
    detail: "Hours view",
    title: "Timesheet",
    subtitle: "Shift hours and daily time tracking",
  },
];

const attendanceDashboardViews = {
  dashboard: {
    title: "Attendance",
    subtitle: "Live workforce overview",
    stats: [
      { label: "Total Employees", value: "22", note: "+2 from last month", tone: "primary" },
      { label: "Present Today", value: "0", note: "0% attendance rate", tone: "success" },
      { label: "Absent Today", value: "22", note: "100% of total employees", tone: "violet" },
      { label: "Perfect Attendance", value: "0", note: "This Month", tone: "success" },
    ],
    trendTitle: "Attendance Trend (Last 7 Days)",
    trendDelta: "+4.2%",
    trendBars: [42, 58, 50, 66, 54, 72, 60],
    trendLabels: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"],
    statusTitle: "Today's Status",
    statusRingValue: "22",
    statusRingLabel: "Total",
    statusItems: [
      ["Present", "0 (0%)", "bg-success"],
      ["On Leave", "0 (0%)", "bg-amber-500"],
      ["Absent", "22 (100%)", "bg-red-500"],
      ["Late Arrival", "0 (0%)", "bg-violet-500"],
      ["Early Leaving", "0 (0%)", "bg-cyan-500"],
    ],
    departmentTitle: "Attendance By Department",
    departmentBars: [
      { label: "HR", value: 3 },
      { label: "IT", value: 19, active: true },
      { label: "OPS", value: 5 },
    ],
  },
  "employee-core": {
    title: "Employee Core",
    subtitle: "Core workforce details and employee records",
    stats: [
      { label: "Employee Profiles", value: "1,248", note: "All active records", tone: "primary" },
      { label: "Departments", value: "12", note: "Organized workforce", tone: "success" },
      { label: "Pending Updates", value: "18", note: "Needs review", tone: "violet" },
      { label: "Digital Files", value: "984", note: "Stored securely", tone: "success" },
    ],
    trendTitle: "Employee Growth (Last 7 Days)",
    trendDelta: "+8.1%",
    trendBars: [30, 34, 38, 44, 48, 53, 57],
    trendLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    statusTitle: "Profile Status",
    statusRingValue: "1.2K",
    statusRingLabel: "Records",
    statusItems: [
      ["Active", "1,102", "bg-success"],
      ["Pending", "18", "bg-amber-500"],
      ["Incomplete", "28", "bg-red-500"],
      ["Verified", "1,004", "bg-violet-500"],
      ["Archived", "46", "bg-cyan-500"],
    ],
    departmentTitle: "Profiles By Team",
    departmentBars: [
      { label: "Sales", value: 10 },
      { label: "Support", value: 14, active: true },
      { label: "Ops", value: 9 },
    ],
  },
  biometric: {
    title: "Biometric",
    subtitle: "Device-based attendance capture and validation",
    stats: [
      { label: "Devices Online", value: "18", note: "All locations connected", tone: "primary" },
      { label: "Punches Today", value: "312", note: "Captured in real time", tone: "success" },
      { label: "Exceptions", value: "7", note: "Requires review", tone: "violet" },
      { label: "Sync Health", value: "99%", note: "Device sync rate", tone: "success" },
    ],
    trendTitle: "Device Activity (Last 7 Days)",
    trendDelta: "+2.8%",
    trendBars: [48, 52, 55, 60, 58, 64, 68],
    trendLabels: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"],
    statusTitle: "Device Status",
    statusRingValue: "18",
    statusRingLabel: "Online",
    statusItems: [
      ["Online", "18", "bg-success"],
      ["Warning", "2", "bg-amber-500"],
      ["Offline", "1", "bg-red-500"],
      ["Calibrating", "0", "bg-violet-500"],
      ["Linked", "99%", "bg-cyan-500"],
    ],
    departmentTitle: "Captures By Department",
    departmentBars: [
      { label: "HR", value: 4 },
      { label: "IT", value: 18, active: true },
      { label: "OPS", value: 12 },
    ],
  },
  punch: {
    title: "Punch",
    subtitle: "Quick punch-in and punch-out workflow",
    stats: [
      { label: "Punch-ins", value: "298", note: "This morning", tone: "primary" },
      { label: "Punch-outs", value: "276", note: "Recorded today", tone: "success" },
      { label: "Missing Punches", value: "9", note: "Needs correction", tone: "violet" },
      { label: "Late Punches", value: "14", note: "After shift start", tone: "success" },
    ],
    trendTitle: "Punch Activity (Last 7 Days)",
    trendDelta: "+5.0%",
    trendBars: [34, 40, 46, 54, 48, 60, 62],
    trendLabels: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"],
    statusTitle: "Punch Summary",
    statusRingValue: "298",
    statusRingLabel: "In",
    statusItems: [
      ["Punch-in", "298", "bg-success"],
      ["Punch-out", "276", "bg-amber-500"],
      ["Missing", "9", "bg-red-500"],
      ["Late", "14", "bg-violet-500"],
      ["Grace", "21", "bg-cyan-500"],
    ],
    departmentTitle: "Punches By Team",
    departmentBars: [
      { label: "HR", value: 7 },
      { label: "IT", value: 16, active: true },
      { label: "OPS", value: 11 },
    ],
  },
  timesheet: {
    title: "Timesheet",
    subtitle: "Shift hours and daily time tracking",
    stats: [
      { label: "Timesheets", value: "248", note: "Submitted this week", tone: "primary" },
      { label: "Approved Hours", value: "1,842", note: "Payroll ready", tone: "success" },
      { label: "Pending Review", value: "16", note: "Awaiting approval", tone: "violet" },
      { label: "Overtime Hours", value: "124", note: "Tracked automatically", tone: "success" },
    ],
    trendTitle: "Timesheet Hours (Last 7 Days)",
    trendDelta: "+6.3%",
    trendBars: [38, 44, 50, 58, 56, 61, 65],
    trendLabels: ["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"],
    statusTitle: "Timesheet Status",
    statusRingValue: "248",
    statusRingLabel: "Sheets",
    statusItems: [
      ["Approved", "184", "bg-success"],
      ["Pending", "16", "bg-amber-500"],
      ["Rejected", "4", "bg-red-500"],
      ["Overtime", "124", "bg-violet-500"],
      ["Locked", "220", "bg-cyan-500"],
    ],
    departmentTitle: "Hours By Department",
    departmentBars: [
      { label: "HR", value: 6 },
      { label: "IT", value: 17, active: true },
      { label: "OPS", value: 13 },
    ],
  },
} as const;

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
    value: "Accurate Attendance Tracking",
    label: "Track employee attendance in real time with reliable attendance records.",
  },
  {
    value: "Easy to Implement",
    label: "Get started quickly with an easy-to-use attendance management system.",
  },
  {
    value: "Improve Productivity",
    label: "Reduce manual attendance work and help HR teams save valuable time.",
  },
  {
    value: "Better Workforce Visibility",
    label: "Monitor employee attendance and working hours from a centralized dashboard.",
  },
  {
    value: "Simplify Daily Attendance",
    label: "Automate attendance tracking and reduce repetitive HR tasks.",
  },
  {
    value: "Real-Time Attendance Reports",
    label: "Generate attendance reports that support better workforce planning.",
  },
];

export default function AttendancePage() {
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("dashboard");
  const activeSidebarItem =
    attendanceDashboardItems.find((item) => item.id === selectedSidebarItem) ??
    attendanceDashboardItems[0];
  const activeDashboardView = getAttendanceDashboardView(selectedSidebarItem);

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="container-x py-8 lg:py-10">
            <div className="mx-auto max-w-4xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Attendance
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Track Employee Attendance with Accuracy and Ease
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-base text-ink-soft">
                Altroz HRMS Attendance Management Software helps businesses track employee
                attendance in real time using biometric devices, GPS, and shift-based tracking.
                Reduce manual work, improve accuracy, and manage attendance from one secure
                platform.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="#methods" className="btn-outline">
                  Explore Features
                </a>
              </div>
            </div>

            <div className="relative mx-auto mt-8 max-w-7xl">
              <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-white text-ink shadow-float">
                <div className="relative flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-xl">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-3 text-xs font-bold uppercase tracking-[0.3em] text-ink-soft">
                    Attendance digital ops center
                  </div>
                  <div className="ml-auto hidden items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary sm:flex">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_6px_rgba(11,92,255,0.12)]" />
                    Live sync
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <aside className="border-b border-border bg-white p-4 lg:border-b-0 lg:border-r">
                    <div className="rounded-2xl border border-border bg-surface px-3 py-2 text-sm text-ink-soft backdrop-blur-sm">
                      search...
                    </div>
                    <div className="mt-5 space-y-2">
                      {attendanceDashboardItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedSidebarItem(item.id)}
                          aria-pressed={selectedSidebarItem === item.id}
                          className={`group flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                            selectedSidebarItem === item.id
                              ? "border-primary/20 bg-primary-soft text-primary shadow-sm"
                              : "border-transparent text-ink-soft hover:border-border hover:bg-surface hover:text-ink"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          <span>{item.label}</span>
                          <span className="ml-auto rounded-full border border-border bg-white px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-ink-soft group-hover:text-primary">
                            {item.detail}
                          </span>
                        </button>
                      ))}
                    </div>
                  </aside>

                  <div className="p-4 md:p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div>
                        <div className="text-2xl font-bold text-ink">{activeDashboardView.title}</div>
                        <div className="mt-1 text-sm text-ink-soft">{activeDashboardView.subtitle}</div>
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {activeSidebarItem.detail}
                        </div>
                      </div>
                      <div className="ml-auto flex flex-wrap gap-2">
                        {[
                          { label: "Analytics", href: ROUTES.analytics },
                          { label: "Payroll", href: ROUTES.payroll },
                          { label: "Reports", href: ROUTES.reports },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-4 py-2 text-sm text-ink-soft shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary-soft hover:text-primary"
                          >
                            {item.label}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {activeDashboardView.stats.map((card) => (
                        <Link
                          key={card.label}
                          to={getAttendanceCardHref(selectedSidebarItem, card.label)}
                          className="group rounded-[1.35rem] border border-border bg-white p-4 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-float"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xs font-medium text-ink-soft">{card.label}</div>
                              <div className="mt-1 text-3xl font-bold text-ink">{card.value}</div>
                            </div>
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary transition-all group-hover:translate-x-0.5 group-hover:bg-primary group-hover:text-white">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                          <div
                            className={`mt-2 text-xs font-semibold ${
                              card.tone === "violet"
                                ? "text-violet-500"
                                : card.tone === "success"
                                  ? "text-success"
                                  : "text-primary"
                            }`}
                          >
                            {card.note}
                          </div>
                          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface">
                            <div
                              className={`h-full rounded-full ${
                                card.tone === "violet"
                                  ? "bg-gradient-to-r from-violet-400 to-pink-400"
                                  : card.tone === "success"
                                    ? "bg-gradient-to-r from-success to-primary"
                                    : "bg-gradient-to-r from-primary to-sky-500"
                              }`}
                            />
                          </div>
                          <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft group-hover:text-primary">
                            Tap to open
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 xl:grid-cols-[1.25fr_1fr]">
                      <Link
                        to={getAttendancePanelHref(selectedSidebarItem)}
                        className="group rounded-[1.75rem] border border-border bg-white p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-float"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-base font-bold text-ink">{activeDashboardView.trendTitle}</div>
                          <div className="rounded-full border border-success/20 bg-[#dcfce7] px-2.5 py-1 text-xs font-semibold text-success">
                            {activeDashboardView.trendDelta}
                          </div>
                        </div>
                        <div className="mt-4 flex h-44 items-end gap-2 sm:h-52">
                          {activeDashboardView.trendBars.map((bar, index) => (
                            <div key={index} className="flex h-full flex-1 flex-col justify-end">
                              <div
                                className="rounded-t-xl bg-gradient-to-t from-primary via-sky-500 to-violet-500 shadow-[0_0_20px_rgba(11,92,255,0.12)]"
                                style={{ height: `${bar}%` }}
                              />
                              <div className="mt-2 text-center text-[11px] text-ink-soft">
                                {activeDashboardView.trendLabels[index]}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-ink-soft">
                          <span>Real-time attendance pulse</span>
                          <span className="text-primary group-hover:text-primary">Open live view</span>
                        </div>
                      </Link>

                      <div className="grid gap-3">
                        <Link
                          to={ROUTES.reports}
                          className="group rounded-[1.75rem] border border-border bg-white p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-float"
                        >
                          <div className="text-base font-bold text-ink">{activeDashboardView.statusTitle}</div>
                          <div className="mt-4 flex items-center gap-5">
                            <div className="grid h-28 w-28 place-items-center rounded-full border-[14px] border-primary/20 bg-white shadow-card">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-ink">
                                  {activeDashboardView.statusRingValue}
                                </div>
                                <div className="text-xs text-ink-soft">
                                  {activeDashboardView.statusRingLabel}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              {activeDashboardView.statusItems.map(([label, value, color]) => (
                                <div key={label} className="flex items-center gap-3">
                                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                                  <span className="min-w-28 text-ink">{label}</span>
                                  <span className="ml-auto text-ink-soft">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 border-t border-border pt-3 text-xs text-ink-soft">
                            Click to open reporting drill-down
                          </div>
                        </Link>

                        <Link
                          to={ROUTES.workforce}
                          className="group rounded-[1.75rem] border border-border bg-white p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-float"
                        >
                          <div className="text-base font-bold text-ink">
                            {activeDashboardView.departmentTitle}
                          </div>
                          <div className="mt-4 flex h-36 items-end gap-5">
                            {activeDashboardView.departmentBars.map((item) => (
                              <div key={item.label} className="flex flex-1 flex-col items-center">
                                <div className="flex h-28 w-full items-end justify-center">
                                  <div
                                    className={`w-10 rounded-t-xl shadow-[0_0_18px_rgba(11,92,255,0.12)] ${
                                      item.active
                                        ? "bg-gradient-to-t from-violet-500 to-pink-400"
                                        : "bg-gradient-to-t from-primary to-sky-500"
                                    }`}
                                    style={{ height: `${item.value * 5}px` }}
                                  />
                                </div>
                                <div className="mt-2 text-sm text-ink-soft">{item.label}</div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 border-t border-border pt-3 text-xs text-ink-soft">
                            Tap for workforce detail
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Capture", value: "real-time swipes", href: `${ROUTES.attendanceManagement}#methods` },
                { label: "Control", value: "rules and shifts", href: ROUTES.leaveManagement },
                { label: "Outcome", value: "better discipline", href: ROUTES.reports },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="soft-card group p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-float"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink">{item.value}</div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-ink-soft">
                    Open detail <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="policies" className="py-20">
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
          <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="soft-card p-6 lg:col-span-7 lg:self-start">
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

            <div className="soft-card p-6 lg:col-span-5 lg:self-start">
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

        <section id="self-service" className="bg-surface py-20">
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

        <section id="compliance" className="py-20">
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

              <div className="mt-6 overflow-visible rounded-2xl border border-border bg-white p-3">
                <img
                  src="https://www.datocms-assets.com/40521/1705306168-statutory-compliance-simplified.png"
                  alt="Statutory compliance simplified"
                  className="block h-auto w-full scale-[1.06] object-contain bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-6 lg:grid-cols-12">
            <div className="soft-card overflow-visible lg:col-span-4">
              <div className="bg-white p-3">
                <img
                  src="https://www.datocms-assets.com/40521/1705306073-comprehensive-overtime-management.png"
                  alt="Comprehensive overtime management"
                  className="block h-auto w-full scale-[1.1] object-contain bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="soft-card overflow-visible lg:col-span-4">
              <div className="bg-white p-3">
                <img
                  src="https://www.datocms-assets.com/40521/1705306126-attendance-permissions.png"
                  alt="Attendance permissions"
                  className="block h-auto w-full scale-[1.1] object-contain bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="soft-card overflow-visible lg:col-span-4">
              <div className="bg-white p-3">
                <img
                  src="https://www.datocms-assets.com/40521/1705560459-customizable-attendance-policies.png"
                  alt="Customisable attendance policies"
                  className="block h-auto w-full scale-[1.1] object-contain bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
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



