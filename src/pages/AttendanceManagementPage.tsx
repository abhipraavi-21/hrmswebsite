import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Fingerprint,
  Globe2,
  LayoutDashboard,
  MapPin,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import Footer from "@/components/site/Footer";
import AnimatedCounter from "@/components/site/AnimatedCounter";
import MainNavbar from "@/components/site/MainNavbar";
import TopNavbar from "@/components/site/TopNavbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { modelScreenshots } from "@/lib/modelScreenshots";

type Method = {
  id: string;
  label: string;
  title: string;
  icon: ReactNode;
  desc: string;
  bullets: string[];
};

type ReportCategory = {
  id: string;
  label: string;
  title: string;
  desc: string;
  filters: string[];
  metrics: { label: string; value: number; suffix?: string }[];
  rows: { employee: string; branch: string; status: string; hours: string }[];
};

const heroMetrics = [
  { label: "Methods", value: 4 },
  { label: "Locations", value: 7 },
  { label: "Focus", value: 100 },
];

const attendanceMethods: Method[] = [
  {
    id: "gps",
    label: "GPS Attendance",
    title: "GPS-Based Attendance",
    icon: <MapPin className="h-5 w-5" />,
    desc: "Allow employees to mark attendance from approved locations using GPS-enabled mobile devices.",
    bullets: [
      "Approved location checks",
      "Field-team friendly",
      "Location-aware submissions",
      "Useful for distributed teams",
    ],
  },
  {
    id: "geolocation",
    label: "Geolocation",
    title: "Geolocation Attendance",
    icon: <Globe2 className="h-5 w-5" />,
    desc: "Record the location from which an employee marks attendance for improved transparency.",
    bullets: [
      "Visible check-in location",
      "Better attendance transparency",
      "Helps reduce ambiguity",
      "Simple for managers to review",
    ],
  },
  {
    id: "geofence",
    label: "Geofencing",
    title: "Geofencing",
    icon: <ShieldCheck className="h-5 w-5" />,
    desc: "Restrict attendance marking to predefined office, branch, factory, or project-site boundaries.",
    bullets: [
      "Boundary-based attendance",
      "Office and branch support",
      "Project-site validation",
      "Controlled check-in zones",
    ],
  },
  {
    id: "mobile",
    label: "Mobile Attendance",
    title: "Mobile App Attendance",
    icon: <Smartphone className="h-5 w-5" />,
    desc: "Enable employees to mark attendance, view records, and submit correction requests through the mobile application.",
    bullets: [
      "Attendance on the go",
      "View records and history",
      "Submit correction requests",
      "Access from mobile devices",
    ],
  },
];

const methodsStrip = [
  { label: "GPS Attendance", icon: <MapPin className="h-4 w-4" /> },
  { label: "Geofencing", icon: <ShieldCheck className="h-4 w-4" /> },
  { label: "Mobile Attendance", icon: <Smartphone className="h-4 w-4" /> },
  { label: "Real-Time Reports", icon: <BarChart3 className="h-4 w-4" /> },
];

const workflowSteps = [
  "Employee marks attendance",
  "Device or location is validated",
  "Assigned shift rules are applied",
  "Late marks, overtime, or missing punches are calculated",
  "Correction requests are submitted",
  "Managers approve or reject requests",
  "Attendance records are finalized",
  "Approved data supports payroll processing",
];

const businessBenefits = [
  {
    title: "Improve Attendance Accuracy",
    desc: "Automate attendance capture and reduce errors caused by manual records.",
  },
  {
    title: "Save HR Time",
    desc: "Reduce work related to calculations, corrections, approvals, and reporting.",
  },
  {
    title: "Simplify Payroll Processing",
    desc: "Use approved attendance, working hours, absences, late marks, and overtime data for payroll.",
  },
  {
    title: "Improve Employee Transparency",
    desc: "Allow employees to view attendance records and track correction requests.",
  },
  {
    title: "Manage Multiple Locations",
    desc: "Monitor attendance across offices, factories, branches, and project sites.",
  },
  {
    title: "Improve Workforce Productivity",
    desc: "Identify absenteeism, punctuality issues, attendance patterns, and overtime trends.",
  },
];

const selfServicePoints = [
  "Mark attendance through supported methods",
  "View daily attendance",
  "View monthly attendance",
  "Check working hours",
  "Submit regularization requests",
  "Track approval status",
  "View missing punches",
  "Check late marks",
  "Review overtime information",
  "Receive attendance notifications",
];

const locationCards = [
  "Office locations",
  "Factory locations",
  "Branch locations",
  "Project sites",
  "Client locations",
  "Remote employees",
  "Field teams",
];

const industries = [
  "Information Technology",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Retail",
  "Hospitality",
  "Logistics",
  "Construction",
  "Banking and Finance",
  "Professional Services",
  "Field Service Organizations",
  "Startups and SMEs",
];

const faqItems = [
  {
    q: "What is Attendance Management Software?",
    a: "Attendance Management Software helps organizations record, monitor, and manage employee attendance, working hours, shifts, late marks, overtime, absences, and correction requests.",
  },
  {
    q: "Which attendance methods does Altroz HRMS support?",
    a: "Altroz HRMS can support biometric, GPS, geolocation, geofencing, QR code, and mobile attendance based on the organization's enabled configuration.",
  },
  {
    q: "Can field employees mark attendance?",
    a: "Field and remote employees can use supported GPS or mobile attendance features to mark attendance from approved locations.",
  },
  {
    q: "What is geofencing in attendance management?",
    a: "Geofencing creates a virtual boundary around an approved location. Employees can mark attendance only when they are inside the configured boundary.",
  },
  {
    q: "Can employees correct missing punches?",
    a: "Employees can submit regularization requests for missing or incorrect records, which managers can approve or reject.",
  },
  {
    q: "Can Altroz HRMS manage multiple shifts?",
    a: "Organizations can create multiple shifts, assign employees, configure weekly offs, and manage rotational schedules.",
  },
  {
    q: "Can attendance information support payroll?",
    a: "Approved attendance, working hours, absences, late marks, and overtime information can support payroll processing.",
  },
  {
    q: "Can attendance be tracked across multiple branches?",
    a: "Altroz HRMS provides centralized branch-wise and department-wise attendance monitoring and reporting.",
  },
];

const reportCategories: ReportCategory[] = [
  {
    id: "daily",
    label: "Daily Attendance Report",
    title: "Daily Attendance Report",
    desc: "Review today's attendance status, presence, absences, and exceptions in one quick snapshot.",
    filters: ["Date", "Branch", "Department", "Shift"],
    metrics: [
      { label: "Present", value: 286 },
      { label: "Absent", value: 14 },
      { label: "Late", value: 22 },
      { label: "On leave", value: 31 },
    ],
    rows: [
      { employee: "Aarav Shah", branch: "HQ", status: "Present", hours: "08:12" },
      { employee: "Riya Patel", branch: "Branch A", status: "Late", hours: "07:40" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "Absent", hours: "00:00" },
      { employee: "Meera Joshi", branch: "HQ", status: "On leave", hours: "00:00" },
    ],
  },
  {
    id: "monthly",
    label: "Monthly Attendance Report",
    title: "Monthly Attendance Report",
    desc: "Track monthly attendance patterns, productivity signals, and attendance exceptions.",
    filters: ["Month", "Branch", "Department", "Employee"],
    metrics: [
      { label: "Attendance", value: 94, suffix: "%" },
      { label: "Overtime hrs", value: 412 },
      { label: "Missing punches", value: 19 },
      { label: "Corrections", value: 48 },
    ],
    rows: [
      { employee: "Aarav Shah", branch: "HQ", status: "96%", hours: "186" },
      { employee: "Riya Patel", branch: "Branch A", status: "93%", hours: "181" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "89%", hours: "177" },
      { employee: "Meera Joshi", branch: "HQ", status: "98%", hours: "184" },
    ],
  },
  {
    id: "employee",
    label: "Employee-Wise Report",
    title: "Employee-Wise Report",
    desc: "See an individual employee's attendance, shifts, and working hours at a glance.",
    filters: ["Employee", "Date range", "Shift", "Status"],
    metrics: [
      { label: "Shifts", value: 26 },
      { label: "Late marks", value: 3 },
      { label: "Overtime hrs", value: 16 },
      { label: "Leaves", value: 2 },
    ],
    rows: [
      { employee: "Aarav Shah", branch: "HQ", status: "On time", hours: "184" },
      { employee: "Riya Patel", branch: "Branch A", status: "2 late", hours: "180" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "1 absent", hours: "172" },
      { employee: "Meera Joshi", branch: "HQ", status: "0 missing", hours: "186" },
    ],
  },
  {
    id: "department",
    label: "Department-Wise Report",
    title: "Department-Wise Report",
    desc: "Compare departments to spot attendance trends, staffing pressure, and exceptions.",
    filters: ["Department", "Month", "Branch"],
    metrics: [
      { label: "Best dept", value: 97, suffix: "%" },
      { label: "Avg rate", value: 93, suffix: "%" },
      { label: "Late marks", value: 18 },
      { label: "On leave", value: 28 },
    ],
    rows: [
      { employee: "Sales", branch: "HQ", status: "96%", hours: "1,246" },
      { employee: "Operations", branch: "Plant 2", status: "93%", hours: "1,102" },
      { employee: "Support", branch: "Branch A", status: "95%", hours: "948" },
      { employee: "R&D", branch: "HQ", status: "97%", hours: "732" },
    ],
  },
  {
    id: "branch",
    label: "Branch-Wise Report",
    title: "Branch-Wise Report",
    desc: "Monitor branch performance and compare attendance across office, factory, and field setups.",
    filters: ["Branch", "Date range", "Department"],
    metrics: [
      { label: "Branches", value: 7 },
      { label: "Avg rate", value: 94, suffix: "%" },
      { label: "Exceptions", value: 16 },
      { label: "Overtime", value: 52 },
    ],
    rows: [
      { employee: "HQ", branch: "Central", status: "96%", hours: "1,824" },
      { employee: "Plant 2", branch: "Manufacturing", status: "92%", hours: "1,612" },
      { employee: "Branch A", branch: "Sales", status: "95%", hours: "1,105" },
      { employee: "Field Ops", branch: "Regional", status: "91%", hours: "816" },
    ],
  },
  {
    id: "late",
    label: "Late Mark Report",
    title: "Late Mark Report",
    desc: "See who is arriving late and how often, so trends can be addressed quickly.",
    filters: ["Date range", "Branch", "Employee", "Shift"],
    metrics: [
      { label: "Late marks", value: 22 },
      { label: "Repeat", value: 8 },
      { label: "Avg delay", value: 14 },
      { label: "Resolved", value: 15 },
    ],
    rows: [
      { employee: "Riya Patel", branch: "Branch A", status: "14 min", hours: "3" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "11 min", hours: "4" },
      { employee: "Ananya Roy", branch: "HQ", status: "09 min", hours: "2" },
      { employee: "Vikram Mehta", branch: "HQ", status: "17 min", hours: "5" },
    ],
  },
  {
    id: "missing",
    label: "Missing Punch Report",
    title: "Missing Punch Report",
    desc: "Track missed check-ins or check-outs and keep correction workflows visible.",
    filters: ["Date range", "Branch", "Employee", "Approver"],
    metrics: [
      { label: "Missing", value: 19 },
      { label: "Pending", value: 7 },
      { label: "Approved", value: 9 },
      { label: "Rejected", value: 3 },
    ],
    rows: [
      { employee: "Aarav Shah", branch: "HQ", status: "Check-out", hours: "2" },
      { employee: "Meera Joshi", branch: "HQ", status: "Check-in", hours: "1" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "Both", hours: "3" },
      { employee: "Neha Verma", branch: "Branch A", status: "Check-out", hours: "1" },
    ],
  },
  {
    id: "overtime",
    label: "Overtime Report",
    title: "Overtime Report",
    desc: "Review overtime hours and understand where extra work is being logged.",
    filters: ["Employee", "Branch", "Date range", "Shift"],
    metrics: [
      { label: "Overtime hrs", value: 412 },
      { label: "Employees", value: 64 },
      { label: "Highest", value: 28 },
      { label: "Adjusted", value: 18 },
    ],
    rows: [
      { employee: "Aarav Shah", branch: "HQ", status: "28 hrs", hours: "28" },
      { employee: "Riya Patel", branch: "Branch A", status: "17 hrs", hours: "17" },
      { employee: "Sahil Khan", branch: "Plant 2", status: "24 hrs", hours: "24" },
      { employee: "Meera Joshi", branch: "HQ", status: "19 hrs", hours: "19" },
    ],
  },
  {
    id: "summary",
    label: "Attendance Summary Report",
    title: "Attendance Summary Report",
    desc: "Bring together the most important attendance numbers for HR and management review.",
    filters: ["Month", "Branch", "Department"],
    metrics: [
      { label: "Rate", value: 94, suffix: "%" },
      { label: "Present", value: 1_124 },
      { label: "Late", value: 22 },
      { label: "Leave", value: 31 },
    ],
    rows: [
      { employee: "Present", branch: "1,124", status: "Late", hours: "22" },
      { employee: "Absent", branch: "14", status: "Leave", hours: "31" },
      { employee: "Missing", branch: "19", status: "Overtime", hours: "412" },
      { employee: "Branches", branch: "7", status: "Departments", hours: "12" },
    ],
  },
];

const featureHighlights = [
  {
    title: "Multiple attendance tracking methods",
    desc: "Biometric, GPS, geolocation, geofencing, QR code, and mobile attendance.",
    icon: <Fingerprint className="h-5 w-5" />,
  },
  {
    title: "Shift and weekly-off management",
    desc: "Create schedules, manage weekly offs, and keep rosters clear.",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    title: "Attendance regularization workflows",
    desc: "Handle missing punches and correction requests with manager approval.",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Late mark and overtime tracking",
    desc: "Capture late marks, absences, and overtime for payroll-ready records.",
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: "Branch-wise and department-wise reports",
    desc: "See attendance by branch, department, and team without manual consolidation.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Centralized attendance records",
    desc: "Keep attendance history in one place for better oversight and reporting.",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
];

const methodVisuals: Record<string, ReactNode> = {
  biometric: (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white p-4 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Device capture
            </div>
            <div className="mt-1 text-lg font-bold text-ink">Biometric terminal sync</div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Fingerprint className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["Swipe in", "Validated", "Synced"].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl bg-surface p-3 text-center"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item}
              </div>
              <div className="mt-2 text-sm font-semibold text-ink">
                {index === 0 ? "08:45" : index === 1 ? "OK" : "Live"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Recent swipes
          </div>
          <div className="mt-3 space-y-2">
            {["Aarav Shah", "Riya Patel", "Sahil Khan"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-sm"
              >
                <span className="font-medium text-ink">{name}</span>
                <span className="text-primary">
                  08:{name === "Aarav Shah" ? "45" : name === "Riya Patel" ? "52" : "57"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">
            Attendance health
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-xl font-bold text-primary">
              94%
            </div>
            <div className="space-y-2 text-sm text-ink-soft">
              <div>Connected device capture</div>
              <div>Shift-aware record sync</div>
              <div>Payroll-ready attendance data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  gps: (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="text-xs font-bold uppercase tracking-wider text-primary">GPS map view</div>
      <div className="relative mt-4 overflow-hidden rounded-[1.5rem] bg-surface p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(11,92,255,0.12),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(22,163,74,0.12),transparent_32%)]" />
        <div className="relative grid min-h-[19rem] place-items-center rounded-3xl border border-dashed border-primary/20 bg-white/70">
          <div className="absolute left-8 top-10 rounded-2xl bg-white p-3 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Approved zone
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">Office perimeter</div>
          </div>
          <div className="absolute bottom-8 right-6 rounded-2xl bg-white p-3 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-wider text-success">
              Location
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">Field check-in active</div>
          </div>
          <div className="grid h-24 w-24 place-items-center rounded-full border border-primary/30 bg-primary/10">
            <MapPin className="h-10 w-10 animate-pulse text-primary motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  ),
  geolocation: (
    <div className="grid gap-3 sm:grid-cols-2">
      {["HQ", "Branch A", "Plant 2", "Client Site"].map((item, index) => (
        <div key={item} className="rounded-[1.5rem] border border-border bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">{item}</div>
              <div className="text-sm font-medium text-ink-soft">
                {index === 0
                  ? "12.9716, 77.5946"
                  : index === 1
                    ? "18.5204, 73.8567"
                    : index === 2
                      ? "19.0760, 72.8777"
                      : "18.5204, 73.8567"}
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-2xl bg-surface p-3 text-sm text-ink-soft">
            Attendance marked from a transparent location record.
          </div>
        </div>
      ))}
    </div>
  ),
  geofence: (
    <div className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
      <div className="text-xs font-bold uppercase tracking-wider text-primary">
        Geofence boundary
      </div>
      <div className="relative mt-4 grid min-h-[19rem] place-items-center rounded-[1.5rem] bg-surface">
        <div className="absolute inset-10 rounded-full border border-dashed border-primary/30 bg-white/40" />
        <div className="absolute inset-20 rounded-full border border-primary/20" />
        <div className="absolute left-8 top-8 rounded-2xl bg-white p-3 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Office</div>
          <div className="text-sm font-medium text-ink">Allowed boundary</div>
        </div>
        <div className="absolute bottom-8 right-8 rounded-2xl bg-white p-3 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wider text-success">Status</div>
          <div className="text-sm font-medium text-ink">Inside geofence</div>
        </div>
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-primary text-white shadow-float">
          <Building2 className="h-10 w-10" />
        </div>
      </div>
    </div>
  ),
  qr: (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="lg:col-span-5 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="text-xs font-bold uppercase tracking-wider text-primary">QR check-in</div>
        <div className="mt-4 grid grid-cols-6 gap-1 rounded-3xl bg-surface p-4">
          {Array.from({ length: 36 }).map((_, index) => (
            <span
              key={index}
              className={`aspect-square rounded-[3px] ${index % 3 === 0 || index % 7 === 0 ? "bg-ink" : "bg-white"}`}
            />
          ))}
        </div>
      </div>
      <div className="lg:col-span-7 rounded-[1.75rem] border border-border bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-success">
              Authorized scan
            </div>
            <div className="text-lg font-bold text-ink">Front desk QR attendance</div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["Scan", "Validate", "Confirm"].map((item) => (
            <div key={item} className="rounded-2xl bg-surface p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item}
              </div>
              <div className="mt-2 text-sm font-medium text-ink">Fast and simple</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  mobile: (
    <div className="flex justify-center">
      <div className="relative w-full max-w-sm">
        <div className="absolute -right-6 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-success/10 blur-2xl" />
        <div className="relative rounded-[2.5rem] border border-border bg-ink p-3 shadow-float">
          <div className="rounded-[2rem] bg-white p-4">
            <div className="flex items-center justify-between text-xs text-ink-soft">
              <span>9:30</span>
              <span>Attendance</span>
              <span>100%</span>
            </div>
            <div className="mt-4 rounded-[1.5rem] bg-primary-soft p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">Today</div>
              <div className="mt-2 text-2xl font-bold text-ink">Mark attendance</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary">
                  <Fingerprint className="h-6 w-6" />
                </div>
                <div className="text-sm text-ink-soft">
                  Use supported attendance methods from your phone.
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {["View records", "Submit regularization", "Track approvals"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">{item}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title;
    const existingMeta = document.querySelector('meta[name="description"]');
    const previousDescription = existingMeta?.getAttribute("content");
    let metaTag = existingMeta as HTMLMetaElement | null;

    document.title = title;

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "description";
      document.head.appendChild(metaTag);
    }

    metaTag.content = description;

    return () => {
      document.title = previousTitle;
      if (metaTag) {
        if (previousDescription !== null && previousDescription !== undefined) {
          metaTag.content = previousDescription;
        } else {
          metaTag.remove();
        }
      }
    };
  }, [title, description]);
}

function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`.trim()}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-3 text-ink-soft">{description}</p>
    </div>
  );
}

function DashboardMetric({
  title,
  value,
  suffix,
  icon,
}: {
  title: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
}) {
  return (
    <div className="soft-card flex min-h-[112px] flex-col justify-between p-3 sm:min-h-[120px] sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          {icon}
        </div>
        <div className="text-right text-xl font-bold text-ink sm:text-2xl">
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
      </div>
      <div className="text-sm font-semibold leading-tight text-ink">{title}</div>
    </div>
  );
}

function ReportPreview({ report }: { report: ReportCategory }) {
  return (
    <div key={report.id} className="fade-up space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Preview</div>
          <h3 className="mt-1 text-2xl font-bold text-ink">{report.title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">{report.desc}</p>
        </div>
        <div className="rounded-2xl bg-primary-soft px-4 py-3 text-right">
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Filters</div>
          <div className="mt-1 text-sm font-semibold text-ink">{report.filters.join("  |  ")}</div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {report.metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl bg-surface p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              {metric.label}
            </div>
            <div className="mt-2 text-2xl font-bold text-ink">
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
        <div className="grid grid-cols-4 gap-0 border-b border-border bg-surface px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-soft">
          <div>Employee</div>
          <div>Branch</div>
          <div>Status</div>
          <div className="text-right">Hours</div>
        </div>
        <div className="divide-y divide-border">
          {report.rows.map((row) => (
            <div
              key={`${row.employee}-${row.branch}`}
              className="grid grid-cols-4 gap-0 px-4 py-3 text-sm"
            >
              <div className="font-medium text-ink">{row.employee}</div>
              <div className="text-ink-soft">{row.branch}</div>
              <div className="text-primary">{row.status}</div>
              <div className="text-right font-semibold text-ink">{row.hours}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AttendanceManagementPage() {
  usePageMeta(
    "Attendance Management Software in Pune | Altroz HRMS",
    "Track employee attendance through biometric, GPS, geolocation, geofencing, QR code, and mobile attendance with Altroz HRMS Attendance Management Software.",
  );

  const [activeMethod, setActiveMethod] = useState(attendanceMethods[0].id);
  const [activeReport, setActiveReport] = useState(reportCategories[0].id);
  const [openException, setOpenException] = useState<string>("regularization");
  const currentReport =
    reportCategories.find((report) => report.id === activeReport) ?? reportCategories[0];
  const comparisonBullets = {
    manual: ["Registers", "Excel sheets", "Delayed corrections", "Payroll mismatches"],
    altroz: [
      "Automated tracking",
      "Real-time visibility",
      "Approval workflows",
      "Payroll-ready data",
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />
          <div className="pointer-events-none absolute left-1/3 top-1/3 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

          <div className="container-x py-8 lg:py-10">
            <div className="mx-auto max-w-3xl text-center fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Smart Attendance Management
              </span>
              <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
                Smart Attendance Management Software for Modern Businesses
              </h1>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="/company/book-demo" className="btn-primary">
                  Book Free Demo
                </a>
                <a href="#features" className="btn-outline">
                  Explore Attendance Features
                </a>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="soft-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {metric.label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">
                      <AnimatedCounter
                        value={metric.value}
                        suffix={
                          metric.label === "Focus"
                            ? "%"
                            : metric.label === "Methods"
                              ? " methods"
                              : ""
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden lg:left-1/2 lg:right-1/2 lg:w-screen lg:-ml-[50vw] lg:-mr-[50vw]">
              <div className="absolute -inset-x-8 -top-4 h-72 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-success/15 blur-2xl" />
              <div className="relative flex min-h-[72vh] items-center overflow-hidden bg-white sm:min-h-[80vh] lg:min-h-[88vh]">
                <img
                  src={modelScreenshots.attendanceDashboard}
                  alt="Attendance management dashboard preview"
                  className="block h-full w-full object-contain object-top bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-6">
          <div className="container-x">
            <div className="rounded-[1.75rem] border border-border bg-white px-4 py-4 shadow-card">
              <div className="flex w-full flex-nowrap justify-start gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center md:overflow-visible">
                {methodsStrip.map((item, index) => (
                  <div
                    key={item.label}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary">
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Attendance basics"
                title="What Is Attendance Management?"
                description="Attendance Management helps businesses record, monitor, and manage employee working hours, check-ins, check-outs, shifts, late arrivals, overtime, absences, and attendance correction requests."
              />
              <p className="mt-4 max-w-2xl text-ink-soft">
                With Altroz HRMS, organizations can replace manual attendance registers and Excel
                sheets with automated attendance tracking, structured workflows, and real-time
                reports.
              </p>
              <p className="mt-4 max-w-2xl text-ink-soft">
                Whether employees work from an office, factory, branch, project site, field
                location, or remotely, Altroz HRMS makes attendance tracking simple, transparent,
                and reliable.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="soft-card overflow-hidden p-0">
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                      Manual attendance
                    </div>
                    <div className="mt-4 space-y-3">
                      {comparisonBullets.manual.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl bg-surface p-3"
                        >
                          <Clock3 className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary-soft/35 p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Altroz HRMS attendance
                    </div>
                    <div className="mt-4 space-y-3">
                      {comparisonBullets.altroz.map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-3">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="text-sm text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="attendance-features" className="bg-surface py-20 scroll-mt-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Attendance methods"
              title="Multiple Ways to Mark Attendance"
              description="Choose the method that matches how your teams actually work and keep all options in one accessible control center."
            />

            <div className="mt-10">
              <Tabs value={activeMethod} onValueChange={setActiveMethod}>
                <TabsList className="flex h-auto w-full flex-wrap gap-2 bg-transparent p-0">
                  {attendanceMethods.map((method) => (
                    <TabsTrigger
                      key={method.id}
                      value={method.id}
                      className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <span className="mr-2 inline-flex">{method.icon}</span>
                      {method.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {attendanceMethods.map((method) => (
                  <TabsContent key={method.id} value={method.id} className="mt-6">
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                      <div className="lg:col-span-5">
                        <div className="soft-card p-6">
                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                            {method.icon}
                          </div>
                          <h3 className="mt-4 text-2xl font-bold text-ink">{method.title}</h3>
                          <p className="mt-3 text-sm text-ink-soft">{method.desc}</p>
                          <div className="mt-5 grid gap-3">
                            {method.bullets.map((bullet) => (
                              <div
                                key={bullet}
                                className="flex items-start gap-3 rounded-xl bg-surface p-3"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                                <span className="text-sm text-ink">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-7">{methodVisuals[method.id]}</div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Workflow"
              title="From Check-In to Payroll in One Connected Workflow"
              description="Attendance records flow from capture to validation, approval, and payroll-ready finalization."
            />

            <div className="mt-10 hidden md:block">
              <div className="grid gap-4 lg:grid-cols-8">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="relative">
                    {index < workflowSteps.length - 1 ? (
                      <div className="absolute left-[calc(50%+2.5rem)] top-7 hidden h-0.5 w-[calc(100%-5rem)] bg-primary/20 lg:block" />
                    ) : null}
                    <div className="soft-card relative h-full p-4">
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-base font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="mt-3 text-center text-sm font-medium text-ink">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:hidden">
              {workflowSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="soft-card flex-1 p-4">
                    <p className="text-sm font-medium text-ink">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Smart features"
              title="Smart Attendance Features"
              description="Use flexible layouts to highlight scheduling, exceptions, working hours, and centralized visibility."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="soft-card overflow-hidden p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Shift and schedule management
                    </div>
                    <h3 className="mt-2 text-2xl font-bold text-ink">Plan shifts with clarity</h3>
                  </div>
                  <CalendarDays className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Multiple shift creation",
                    "Employee shift assignment",
                    "Weekly-off management",
                    "Rotational shift planning",
                    "Department-wise shift allocation",
                  ].map((item) => (
                    <div key={item} className="rounded-xl bg-surface p-3 text-sm text-ink">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-border bg-white p-4">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs text-ink-soft">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className="rounded-xl bg-surface p-3 text-center">
                        <div className="mx-auto h-2 w-8 rounded-full bg-primary/20" />
                        <div className="mt-3 text-xs font-semibold text-ink-soft">
                          {index % 2 === 0 ? "Day" : "Night"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="soft-card overflow-hidden p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Attendance exception management
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Expand the exception cards when review is needed
                </h3>
                <div className="mt-5 space-y-3">
                  {[
                    {
                      id: "regularization",
                      title: "Attendance regularization",
                      desc: "Raise corrections for missed or incorrect attendance data.",
                    },
                    {
                      id: "missing",
                      title: "Missing punch management",
                      desc: "Track missing check-ins and check-outs in a structured flow.",
                    },
                    {
                      id: "late",
                      title: "Late mark management",
                      desc: "Review late marks and keep attendance exceptions visible.",
                    },
                  ].map((item) => (
                    <Collapsible
                      key={item.id}
                      open={openException === item.id}
                      onOpenChange={(open) => setOpenException(open ? item.id : "")}
                    >
                      <div className="rounded-2xl border border-border bg-white p-4">
                        <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 text-left">
                          <div>
                            <div className="text-base font-semibold text-ink">{item.title}</div>
                            <div className="mt-1 text-sm text-ink-soft">{item.desc}</div>
                          </div>
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                            <ArrowRight
                              className={`h-4 w-4 transition-transform duration-200 ${openException === item.id ? "rotate-90" : ""}`}
                            />
                          </span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            {[
                              "Submit correction requests",
                              "Manager approval flow",
                              "Audit-friendly history",
                              "Payroll-ready updates",
                            ].map((point) => (
                              <div
                                key={point}
                                className="flex items-center gap-2 rounded-xl bg-surface p-3 text-sm text-ink"
                              >
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                {point}
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              </article>

              <article className="soft-card overflow-hidden p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Working hours and overtime
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Calculate hours with visible progress and simple metrics
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-surface p-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Shift hours
                    </div>
                    <div className="mt-2 text-3xl font-bold text-ink">08:12</div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-primary to-success" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-surface p-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-success">
                      Overtime
                    </div>
                    <div className="mt-2 text-3xl font-bold text-ink">48 hrs</div>
                    <div className="mt-3 h-2 rounded-full bg-white">
                      <div className="h-2 w-[64%] rounded-full bg-success" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Working hours calculation",
                    "Overtime tracking",
                    "Break-time monitoring",
                    "Shift-based working-hour analysis",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border bg-white p-3 text-sm text-ink"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="soft-card overflow-hidden p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Centralized attendance visibility
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">
                  Track daily, weekly, and monthly attendance from one place
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "Attendance dashboard",
                    "Daily attendance summary",
                    "Weekly attendance summary",
                    "Monthly attendance summary",
                    "Branch-wise monitoring",
                    "Department-wise monitoring",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-surface p-3">
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      <span className="text-sm text-ink">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-border bg-white p-4">
                  <div className="flex items-end gap-3">
                    {[42, 54, 61, 77, 69, 88, 96].map((height, index) => (
                      <div key={index} className="flex-1">
                        <div
                          className="rounded-t-full bg-primary"
                          style={{ height: `${height}px` }}
                        />
                        <div className="mt-2 text-center text-xs text-ink-soft">
                          {["M", "T", "W", "T", "F", "S", "S"][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Dashboard"
              title="Complete Attendance Visibility from One Dashboard"
              description="A large dashboard mockup helps teams understand daily activity, branch comparisons, and trends without switching between views."
              className="mx-auto max-w-4xl text-center"
            />

            <div className="mt-10 soft-card overflow-hidden p-4 md:p-6 lg:p-8">
              <div className="overflow-hidden rounded-3xl border border-border bg-white">
                <img
                  src={modelScreenshots.workforceDashboard}
                  alt="Attendance dashboard showcase"
                  className="block h-auto w-full object-contain bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "Present today", value: 286, icon: <Users className="h-4 w-4" /> },
                { title: "Absent today", value: 14, icon: <Clock3 className="h-4 w-4" /> },
                {
                  title: "Late arrivals",
                  value: 22,
                  icon: <CalendarDays className="h-4 w-4" />,
                },
                {
                  title: "Employees on leave",
                  value: 31,
                  icon: <BadgeCheck className="h-4 w-4" />,
                },
                {
                  title: "Missing punches",
                  value: 19,
                  icon: <Workflow className="h-4 w-4" />,
                },
                {
                  title: "Overtime hours",
                  value: 412,
                  icon: <TrendingUp className="h-4 w-4" />,
                },
              ].map((item) => (
                <DashboardMetric
                  key={item.title}
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                />
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <div className="text-sm font-semibold text-ink">Attendance percentage</div>
                <div className="mt-2 text-3xl font-bold text-primary">
                  <AnimatedCounter value={94} suffix="%" />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <div className="text-sm font-semibold text-ink">Department attendance chart</div>
                <div className="mt-4 flex items-end gap-2">
                  {[38, 64, 52, 78].map((bar, index) => (
                    <div key={index} className="flex-1">
                      <div className="rounded-t-xl bg-primary" style={{ height: `${bar}px` }} />
                      <div className="mt-2 text-center text-xs text-ink-soft">
                        {["HR", "IT", "Ops", "Sales"][index]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl bg-white/95 p-4 shadow-card">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Branch comparison
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-surface">
                    <div className="h-2 w-[82%] rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-semibold text-ink">HQ</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-surface">
                    <div className="h-2 w-[68%] rounded-full bg-success" />
                  </div>
                  <span className="text-sm font-semibold text-ink">Plant 2</span>
                </div>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-card">
                <div className="text-xs font-bold uppercase tracking-wider text-success">
                  Recent attendance activity
                </div>
                <div className="mt-2 space-y-1 text-sm text-ink-soft">
                  <div>Aarav Shah checked in at 08:45</div>
                  <div>Riya Patel regularization approved</div>
                  <div>Sahil Khan missing punch corrected</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4 lg:self-start">
                <div className="md:hidden">
                  <select
                    value={activeReport}
                    onChange={(event) => setActiveReport(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {reportCategories.map((report) => (
                      <option key={report.id} value={report.id}>
                        {report.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hidden space-y-2 md:block">
                  {reportCategories.map((report) => (
                    <button
                      key={report.id}
                      type="button"
                      onClick={() => setActiveReport(report.id)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                        activeReport === report.id
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-white text-ink hover:bg-surface"
                      }`}
                    >
                      <div className="text-sm font-semibold">{report.label}</div>
                      <div className="mt-1 text-xs text-ink-soft">{report.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 lg:self-start">
                <div className="soft-card p-6 md:p-8">
                  <ReportPreview report={currentReport} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="soft-card relative overflow-hidden p-8">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
                  <div className="relative">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Business benefits
                    </div>
                    <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                      Why Businesses Choose Automated Attendance Management
                    </h2>
                    <p className="mt-3 text-sm text-ink-soft">
                      Automated attendance improves accuracy, reduces HR effort, and keeps payroll
                      and workforce decisions easier to manage.
                    </p>
                    <div className="mt-6 rounded-3xl bg-primary-soft/40 p-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        Featured benefit
                      </div>
                      <div className="mt-2 text-2xl font-bold text-ink">
                        Improve attendance accuracy at scale
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">
                        Capture attendance reliably through approved methods and keep records ready
                        for review.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-5 md:grid-cols-2">
                  {businessBenefits.map((benefit) => (
                    <article key={benefit.title} className="soft-card p-6">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-ink">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-ink-soft">{benefit.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Employee self-service"
                title="Empower Employees with Attendance Self-Service"
                description="Allow employees to manage attendance-related activities without depending on HR for every request."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {selfServicePoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-border bg-ink p-3 shadow-float">
                  <div className="rounded-[2rem] bg-white p-4">
                    <div className="flex items-center justify-between text-xs text-ink-soft">
                      <span>Employee portal</span>
                      <span>Attendance</span>
                    </div>
                    <div className="mt-4 rounded-[1.5rem] bg-primary-soft p-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">
                        Today
                      </div>
                      <div className="mt-2 text-2xl font-bold text-ink">Attendance summary</div>
                      <div className="mt-3 grid gap-2">
                        {["Mark attendance", "View daily attendance", "Submit regularization"].map(
                          (item) => (
                            <div
                              key={item}
                              className="flex items-center justify-between rounded-2xl bg-white px-3 py-2"
                            >
                              <span className="text-sm font-medium text-ink">{item}</span>
                              <ArrowRight className="h-4 w-4 text-primary" />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {[
                        "Track approval status",
                        "View late marks and overtime",
                        "Receive attendance notifications",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3"
                        >
                          <Bell className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Multi-location"
              title="Manage Attendance Across Every Workplace"
              description="Use a map-inspired layout to visualize offices, plants, branches, project sites, and remote teams without a heavy map dependency."
            />

            <div className="mt-10 rounded-[2rem] border border-border bg-white p-6 shadow-float">
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-4">
                  {locationCards.slice(0, 3).map((item) => (
                    <div key={item} className="soft-card flex items-center gap-3 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                        <MapPin className="h-4 w-4 animate-pulse motion-reduce:animate-none" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-ink">{item}</div>
                        <div className="text-xs text-ink-soft">Connected attendance source</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-dashed border-primary/25 bg-surface p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,92,255,0.08),transparent_35%),radial-gradient(circle_at_15%_20%,rgba(22,163,74,0.1),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(11,92,255,0.1),transparent_24%)]" />
                  <div className="relative flex h-full items-center justify-center">
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-primary/30 bg-white shadow-float">
                      <Building2 className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div className="absolute left-6 top-6 rounded-2xl bg-white p-3 shadow-card">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      Central hub
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">Attendance HQ</div>
                  </div>
                  <div className="absolute bottom-6 right-6 rounded-2xl bg-white p-3 shadow-card">
                    <div className="text-xs font-bold uppercase tracking-wider text-success">
                      Live
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink">
                      Remote, field, and branch teams
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {locationCards.slice(3).map((item) => (
                    <div key={item} className="soft-card flex items-center gap-3 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary">
                        <MapPin className="h-4 w-4 animate-pulse motion-reduce:animate-none" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-ink">{item}</div>
                        <div className="text-xs text-ink-soft">Centralized monitoring enabled</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Why Altroz"
              title="Why Choose Altroz HRMS Attendance Management?"
              description="The feature set combines attendance capture, regularization, reporting, and employee self-service in one platform."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {featureHighlights.map((item) => (
                <article key={item.title} className="soft-card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Industries"
              title="Attendance Management for Every Industry"
              description="Attendance management works across office, factory, branch, and field-driven organizations."
              className="mx-auto max-w-4xl text-center"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="soft-card flex items-center justify-between gap-3 px-4 py-4"
                >
                  <div className="text-sm font-semibold text-ink">{industry}</div>
                  <Users className="h-4 w-4 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20" id="faq">
          <div className="container-x grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Questions"
                title="Frequently Asked Questions"
                description="An accessible accordion keeps answers easy to scan and expand."
              />
            </div>

            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="rounded-2xl border border-border bg-white px-4"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-ink no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-sm leading-6 text-ink-soft">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-x">
            <div className="soft-card relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-0 h-48 w-48 rounded-full bg-success/10 blur-3xl" />
              <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    Final CTA
                  </div>
                  <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
                    Simplify Employee Attendance with Altroz HRMS
                  </h2>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Automate employee attendance, manage shifts, monitor working hours, handle
                    missing punches, track overtime, and generate detailed reports from one
                    centralized platform.
                  </p>
                  <p className="mt-3 max-w-2xl text-ink-soft">
                    Improve attendance accuracy, reduce manual work, and manage your workforce more
                    efficiently with Altroz HRMS.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                  <a href="/company/book-demo" className="btn-primary">
                    Book Your Free Demo Today
                  </a>
                  <a href="/company/contact-us" className="btn-outline">
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
