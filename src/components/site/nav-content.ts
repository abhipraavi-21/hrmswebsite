export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  href?: string;
  links: NavLink[];
};

export type ProductColumn = {
  groups: NavGroup[];
};

export const productDropdownColumns: ProductColumn[] = [
  {
    groups: [
      {
        title: "Global Core HR",
        href: "/products/core-hr",
        links: [
          { label: "Compensation Planning", href: "#compensation-planning" },
          { label: "Localization", href: "#localization" },
        ],
      },
      {
        title: "Workforce Management",
        href: "/products/attendance-management",
        links: [
          { label: "Attendance", href: "/products/attendance-management" },
          { label: "Scheduling", href: "#scheduling" },
        ],
      },
      {
        title: "People Analytics",
        links: [{ label: "People Analytics", href: "#reports-analytics" }],
      },
    ],
  },
  {
    groups: [
      {
        title: "Talent Management",
        links: [
          { label: "Performance Management", href: "/products/performance-management" },
          { label: "Talent Development", href: "#talent-development" },
          { label: "Skills Management", href: "#skills-management" },
          { label: "Succession Planning", href: "#succession-planning" },
          { label: "Recruitment", href: "#recruitment" },
          { label: "Onboarding", href: "#onboarding" },
        ],
      },
    ],
  },
  {
    groups: [
      {
        title: "Payroll",
        href: "/products/payroll",
        links: [
          { label: "GCC", href: "#gcc" },
          { label: "India", href: "#india" },
          { label: "Indonesia", href: "#indonesia" },
          { label: "Malaysia", href: "#malaysia" },
          { label: "Philippines", href: "#philippines" },
          { label: "Singapore", href: "#singapore" },
          { label: "Thailand", href: "#thailand" },
          { label: "Unified Payroll", href: "/products/payroll" },
        ],
      },
    ],
  },
];
