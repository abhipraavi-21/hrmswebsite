import {
  BarChart3,
  CalendarClock,
  FileText,
  Mail,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/routes/routeConfig.js";

export type BulkEmailTabId = "campaigns" | "templates" | "contacts" | "analytics" | "automation";

export type BulkEmailFeatureCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type BulkEmailPageConfig = {
  id: BulkEmailTabId;
  pageTitle: string;
  canonicalPath: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  overview: Array<{ label: string; value: string }>;
  cards: BulkEmailFeatureCard[];
};

export const bulkEmailTabs = [
  { id: "campaigns", label: "Campaigns", href: ROUTES.bulkEmailCampaigns },
  { id: "templates", label: "Templates", href: ROUTES.bulkEmailTemplates },
  { id: "contacts", label: "Contacts", href: ROUTES.bulkEmailContacts },
  { id: "analytics", label: "Analytics", href: ROUTES.bulkEmailAnalytics },
  { id: "automation", label: "Automation", href: ROUTES.bulkEmailAutomation },
] as const;

export const bulkEmailPages: Record<BulkEmailTabId, BulkEmailPageConfig> = {
  campaigns: {
    id: "campaigns",
    pageTitle: "Bulk Email Campaigns | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailCampaigns,
    eyebrow: "Campaigns",
    title: "Plan and send HR messages at the right time",
    description:
      "Use bulk campaigns for employee announcements, payroll reminders, policy updates, onboarding messages, and time-sensitive notices.",
    summary: "Campaign tools for audience targeting, bulk delivery, and scheduled sends.",
    overview: [
      { label: "Audience", value: "Department and role targeting" },
      { label: "Delivery", value: "Bulk sends at scale" },
      { label: "Timing", value: "Schedule by workflow" },
    ],
    cards: [
      {
        icon: Target,
        title: "Audience targeting",
        description:
          "Group employees by department, location, role, or status so each campaign reaches the right people.",
      },
      {
        icon: Mail,
        title: "Bulk delivery",
        description:
          "Send one message to many recipients without copy-paste work or scattered follow-up emails.",
      },
      {
        icon: CalendarClock,
        title: "Scheduled sends",
        description:
          "Time campaign delivery around payroll cycles, shift changes, or internal communication windows.",
      },
    ],
  },
  templates: {
    id: "templates",
    pageTitle: "Bulk Email Templates | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailTemplates,
    eyebrow: "Templates",
    title: "Reuse approved layouts for faster communication",
    description:
      "Create message structures once and reuse them across HR announcements, reminders, and recurring communication flows.",
    summary: "Template tools for reusable layouts, quick edits, and approval-friendly messaging.",
    overview: [
      { label: "Reusable", value: "Approved layouts you can save" },
      { label: "Editing", value: "Fast updates before send" },
      { label: "Consistency", value: "Stable communication format" },
    ],
    cards: [
      {
        icon: FileText,
        title: "Reusable layouts",
        description:
          "Build templates for policy notes, event invitations, reminders, and onboarding updates with the same structure every time.",
      },
      {
        icon: Sparkles,
        title: "Quick editing",
        description:
          "Update subject lines, body copy, and calls to action quickly before sending the next batch.",
      },
      {
        icon: ShieldCheck,
        title: "Approval-friendly",
        description:
          "Keep messaging consistent and review-ready when communications need a stable, approved format.",
      },
    ],
  },
  contacts: {
    id: "contacts",
    pageTitle: "Bulk Email Contacts | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailContacts,
    eyebrow: "Contacts",
    title: "Organize employee lists for cleaner sends",
    description:
      "Keep contact lists tidy and segmented so campaigns remain accurate, relevant, and easy to maintain.",
    summary: "Contact tools for segmentation, hygiene, and reusable lists.",
    overview: [
      { label: "Segments", value: "Teams, branches, and roles" },
      { label: "Clean lists", value: "Less clutter, more accuracy" },
      { label: "Reuse", value: "Import groups once, send often" },
    ],
    cards: [
      {
        icon: Users,
        title: "Segmented lists",
        description:
          "Separate employees by team, branch, or role to keep bulk messages focused and useful.",
      },
      {
        icon: ShieldCheck,
        title: "List hygiene",
        description:
          "Reduce clutter by keeping the active contact list clean and ready for reliable communication.",
      },
      {
        icon: Target,
        title: "Import and reuse",
        description:
          "Bring in existing groups and reuse them for recurring HR updates without rebuilding lists each time.",
      },
    ],
  },
  analytics: {
    id: "analytics",
    pageTitle: "Bulk Email Analytics | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailAnalytics,
    eyebrow: "Analytics",
    title: "Measure reach and engagement after sending",
    description:
      "Review how your bulk emails perform so you can improve subject lines, timing, and audience targeting over time.",
    summary: "Analytics for opens, clicks, and campaign review.",
    overview: [
      { label: "Open rate", value: "Track who sees the message" },
      { label: "Clicks", value: "Review link activity" },
      { label: "Review", value: "Compare campaign performance" },
    ],
    cards: [
      {
        icon: BarChart3,
        title: "Open tracking",
        description:
          "See which campaigns are opened so you can understand how well the message reached the audience.",
      },
      {
        icon: Mail,
        title: "Click activity",
        description:
          "Track which links or calls to action are being used most often inside the email content.",
      },
      {
        icon: Sparkles,
        title: "Campaign review",
        description:
          "Compare message performance across different sends to refine communication strategy.",
      },
    ],
  },
  automation: {
    id: "automation",
    pageTitle: "Bulk Email Automation | Altroz HRMS",
    canonicalPath: ROUTES.bulkEmailAutomation,
    eyebrow: "Automation",
    title: "Set repeatable workflows for recurring communication",
    description:
      "Automate common communication tasks so your team spends less time on repeated follow-up emails and reminders.",
    summary: "Automation tools for trigger-based flows and recurring reminders.",
    overview: [
      { label: "Recurring", value: "Repeat important reminders" },
      { label: "Triggers", value: "Launch on process events" },
      { label: "Follow-up", value: "Keep messaging consistent" },
    ],
    cards: [
      {
        icon: Repeat2,
        title: "Recurring reminders",
        description:
          "Automatically repeat important notifications for payroll, attendance, policy updates, or internal deadlines.",
      },
      {
        icon: CalendarClock,
        title: "Trigger-based flows",
        description:
          "Launch messages when a process or event happens so communication stays timely and relevant.",
      },
      {
        icon: ShieldCheck,
        title: "Consistent follow-up",
        description:
          "Keep communication patterns stable for employee touchpoints that need reliable repetition.",
      },
    ],
  },
};

export function getBulkEmailPage(id: BulkEmailTabId) {
  return bulkEmailPages[id];
}
