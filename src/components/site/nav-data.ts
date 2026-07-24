import { ROUTES } from "@/routes/routeConfig.js";

export const featureMenuColumns = [
  {
    title: "Core HR Suite",
    links: [
      { label: "Core HR", href: ROUTES.coreHR },
      { label: "Attendance Management", href: ROUTES.attendanceManagement },
      { label: "Payroll", href: ROUTES.payroll },
      { label: "Leave Management", href: ROUTES.leaveManagement },
    ],
  },
  {
    title: "Talent & Operations",
    links: [
      { label: "Recruitment (ATS)", href: ROUTES.recruitment },
      { label: "Performance Management", href: ROUTES.performance },
      { label: "Asset Management", href: `${ROUTES.assetManagement}#asset-management` },
      { label: "Expense Management", href: ROUTES.expenseManagement },
      { label: "Visitor Management", href: ROUTES.visitorManagement },
      { label: "Exit Management", href: ROUTES.exitManagement },
    ],
  },
  {
    title: "Insights & Control",
    links: [
      { label: "Employee Self Service", href: ROUTES.employeeSelfService },
      { label: "HR Analytics", href: ROUTES.analytics },
      { label: "HR Automation", href: ROUTES.automation },
      { label: "Attendance Features", href: `${ROUTES.attendanceManagement}#attendance-features` },
      { label: "Reports", href: ROUTES.reports },
      { label: "Security", href: ROUTES.security },
    ],
  },
];

export const solutionMenuItems = [
  { label: "Industry Solutions", href: ROUTES.industrySolutions },
  { label: "Workforce Management", href: ROUTES.workforce },
  { label: "Business Apps", href: ROUTES.businessApps },
  { label: "Accounting", href: ROUTES.accounting },
];

export const resourcesMenuItems = [{ label: "Learn", href: ROUTES.learn }];

export const companyMenuColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Why Altroz", href: ROUTES.whyAltroz },
      { label: "Customers", href: ROUTES.customers },
    ],
  },
  {
    title: "Stories",
    links: [
      { label: "Testimonials", href: ROUTES.testimonials },
      { label: "Careers", href: ROUTES.careers },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us", href: ROUTES.contact },
      { label: "Support", href: ROUTES.support },
      { label: "Book Demo", href: ROUTES.bookDemo },
    ],
  },
];

export const navItems = [
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Partner With Us", href: ROUTES.partner },
];

export const hrmsLinks = [
  {
    label: "Attendance Management",
    desc: "GPS, biometric & shifts",
    href: ROUTES.attendanceManagement,
  },
  { label: "Payroll", desc: "Automated salary runs", href: ROUTES.payroll },
  { label: "Leave Management", desc: "Policies & approvals", href: ROUTES.leaveManagement },
  { label: "Employee Management", desc: "Profiles & documents", href: ROUTES.coreHR },
  { label: "Reports", desc: "Insights & exports", href: ROUTES.reports },
  { label: "Security", desc: "Roles & access controls", href: ROUTES.security },
];

export const emailLinks = [
  { label: "Campaigns", desc: "Send at scale", href: ROUTES.bulkEmailCampaigns },
  { label: "Templates", desc: "Drag & drop builder", href: ROUTES.bulkEmailTemplates },
  { label: "Contacts", desc: "Segmentation & lists", href: ROUTES.bulkEmailContacts },
  { label: "Analytics", desc: "Open & click tracking", href: ROUTES.bulkEmailAnalytics },
  { label: "Automation", desc: "Drip workflows", href: ROUTES.bulkEmailAutomation },
];
