import { ROUTES } from "@/routes/routeConfig.js";

export const featureMenuColumns = [
  {
    title: "Core HR Suite",
    links: [
      { label: "Core HR", href: ROUTES.coreHR },
      { label: "Attendance", href: ROUTES.attendanceManagement },
      { label: "Payroll", href: ROUTES.payroll },
      { label: "Leave Management", href: ROUTES.leaveManagement },
      { label: "Mobile App", href: ROUTES.mobileAppLanding },
    ],
  },
  {
    title: "Talent & Operations",
    links: [
      { label: "Recruitment (ATS)", href: ROUTES.recruitment },
      { label: "Performance Management", href: ROUTES.performance },
      { label: "Asset Management", href: `${ROUTES.assetManagement}#asset-management` },
      { label: "Expense Management", href: ROUTES.expenseManagement },
      { label: "Document Generation", href: ROUTES.documentGeneration },
      { label: "Exit Management", href: ROUTES.exitManagement },
    ],
  },
  {
    title: "Insights & Control",
    links: [
      { label: "Employee Self Service", href: ROUTES.employeeSelfService },
      { label: "HR Analytics", href: ROUTES.analytics },
      { label: "HR Automation", href: ROUTES.automation },
      { label: "Reports", href: ROUTES.reports },
      { label: "Security", href: ROUTES.security },
    ],
  },
];

export const solutionMenuItems = [
  { label: "Industry Solutions", href: ROUTES.industrySolutions },
  { label: "Workforce Management", href: ROUTES.workforce },
  { label: "HR Business Applications", href: ROUTES.businessApps },
  { label: "Employee Lifecycle", href: `${ROUTES.businessApps}#employee-lifecycle` },
];

export const resourcesMenuItems = [
  { label: "Learn", href: ROUTES.learn },
  { label: "Compliance Guides", href: ROUTES.complianceGuides },
  { label: "Blog", href: ROUTES.blog },
  { label: "FAQ", href: ROUTES.faq },
];

export const companyMenuColumns = [
  {
    title: "About",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Why Altroz", href: ROUTES.whyAltroz },
      { label: "Careers", href: ROUTES.careers },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "Customer Stories", href: ROUTES.customers },
      { label: "Testimonials", href: ROUTES.testimonials },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: ROUTES.contact },
      { label: "Help Center", href: ROUTES.support },
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
    label: "Attendance",
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
