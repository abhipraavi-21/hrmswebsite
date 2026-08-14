import { BriefcaseBusiness, MailCheck, PackageSearch, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/routes/routeConfig.js";

export type BillingProductContent = {
  productSlug: "hrms" | "bulk-email" | "asset-management";
  productLabel: string;
  shortLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroBullets: string[];
  comparisonTitle: string;
  comparisonDescription: string;
  addonTitle: string;
  addonDescription: string;
  faqItems: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaDescription: string;
  contactHref: string;
  openProductHref: string;
  navVariant: "default" | "bulkEmail" | "assetManagement";
  icon: LucideIcon;
};

export const BILLING_PRODUCT_CONTENT: Record<string, BillingProductContent> = {
  hrms: {
    productSlug: "hrms",
    productLabel: "HRMS",
    shortLabel: "HRMS",
    heroEyebrow: "Unified SaaS pricing",
    heroTitle: "Simple HRMS pricing that scales with your workforce",
    heroDescription:
      "Compare the same shared SaaS pricing structure used across Altroz products, then move into one consistent registration, checkout, payment and renewal flow.",
    heroBullets: [
      "Three configurable plans with editable prices and limits",
      "Optional HRMS add-ons like payroll, geo attendance and analytics",
      "One customer account that can later add Bulk Email or Asset Management too",
    ],
    comparisonTitle: "Compare HRMS plans by coverage, features and limits",
    comparisonDescription:
      "Plan names and prices stay editable in admin while the customer-facing layout remains consistent.",
    addonTitle: "Optional HRMS add-ons",
    addonDescription:
      "Layer in payroll, recruitment, geo attendance, analytics or other services during checkout without breaking the common billing flow.",
    faqItems: [
      {
        question: "Can one account subscribe to HRMS and other Altroz products later?",
        answer:
          "Yes. The shared billing architecture lets the same customer account hold HRMS, Bulk Email and Asset Management subscriptions independently.",
      },
      {
        question: "Can I choose a monthly, 6 month or yearly renewal cycle?",
        answer:
          "Yes. The checkout supports 1 month, 6 month and 1 year billing cycles, and the renewal date shown in admin follows the selected cycle.",
      },
      {
        question: "Are GST and totals calculated automatically?",
        answer:
          "Yes. GST is calculated server-side using the current tax configuration, and the final payable amount is returned by the backend.",
      },
    ],
    ctaTitle: "Move from pricing to activation without switching systems",
    ctaDescription:
      "Use the same unified checkout, payment and dashboard flow that now powers HRMS, Bulk Email and Asset Management.",
    contactHref: ROUTES.hrmsContact,
    openProductHref: ROUTES.hrmsHome,
    navVariant: "default",
    icon: BriefcaseBusiness,
  },
  "bulk-email": {
    productSlug: "bulk-email",
    productLabel: "Bulk Email",
    shortLabel: "Bulk Email",
    heroEyebrow: "Unified SaaS pricing",
    heroTitle: "Bulk Email pricing with a shared Altroz checkout flow",
    heroDescription:
      "Keep pricing, add-ons, payment, subscription activation and renewals aligned with the same reusable billing system used by HRMS and Asset Management.",
    heroBullets: [
      "Three plan tiers with editable limits for emails, domains and team members",
      "Product-specific add-ons like dedicated IPs, extra credits and automation",
      "Shared dashboard, invoices and payment history after purchase",
    ],
    comparisonTitle: "Compare Bulk Email plans with the same pricing structure",
    comparisonDescription:
      "Campaign scale, sender infrastructure and usage limits stay product-specific while the overall pricing UX remains consistent.",
    addonTitle: "Optional Bulk Email add-ons",
    addonDescription:
      "Add sender domains, dedicated IPs, analytics or extra credits inside the same common checkout architecture.",
    faqItems: [
      {
        question: "Will extra email credits and sender-domain add-ons appear in admin?",
        answer:
          "Yes. Selected add-ons are recorded against the order, subscription and invoice, and they also contribute to the customer entitlement summary.",
      },
      {
        question: "Can a company renew Bulk Email without affecting HRMS?",
        answer:
          "Yes. Each product subscription renews independently, so renewing Bulk Email changes only the Bulk Email renewal timeline.",
      },
      {
        question: "Does the dashboard show remaining email capacity?",
        answer:
          "Yes. Usage and limits are stored generically, and Bulk Email product cards can show monthly email usage alongside plan and add-on capacity.",
      },
    ],
    ctaTitle: "Launch campaigns with billing, renewals and usage tied together",
    ctaDescription:
      "The new shared system keeps product-specific Bulk Email limits and add-ons while still using one customer account and one billing dashboard.",
    contactHref: ROUTES.bulkEmailContact,
    openProductHref: ROUTES.bulkEmail,
    navVariant: "bulkEmail",
    icon: MailCheck,
  },
  "asset-management": {
    productSlug: "asset-management",
    productLabel: "Asset Management",
    shortLabel: "Asset Management",
    heroEyebrow: "Unified SaaS pricing",
    heroTitle: "Asset Management plans with reusable billing and renewals",
    heroDescription:
      "Give Asset Management the same premium SaaS pricing structure, while keeping product-specific usage caps, add-ons, invoices and renewals intact.",
    heroBullets: [
      "Three configurable plans with asset, user and location limits",
      "Shared checkout, payment and invoice architecture across products",
      "Independent renewal dates for Asset Management subscriptions",
    ],
    comparisonTitle: "Compare Asset Management plans in the same shared layout",
    comparisonDescription:
      "Asset capacity, user limits and maintenance coverage remain configurable per plan without needing a separate checkout system.",
    addonTitle: "Optional Asset Management add-ons",
    addonDescription:
      "Extend capacity with more assets, locations, QR coverage or reporting through the same billing engine and admin records.",
    faqItems: [
      {
        question: "Can asset limits and extra capacity be enforced later?",
        answer:
          "Yes. The subscription architecture stores plan limits and add-on entitlements so backend features can enforce them consistently.",
      },
      {
        question: "Will Asset Management payments show in the shared billing history?",
        answer:
          "Yes. The customer billing history groups payments by product, so Asset Management invoices sit alongside HRMS and Bulk Email records.",
      },
      {
        question: "Can I use the same account for all three products?",
        answer:
          "Yes. One customer account can subscribe to Asset Management only, or combine it with HRMS and Bulk Email later.",
      },
    ],
    ctaTitle: "Turn pricing selections into active asset subscriptions faster",
    ctaDescription:
      "The same reusable checkout now carries Asset Management plan, add-on and renewal data directly into the customer and admin dashboards.",
    contactHref: ROUTES.assetManagementContact,
    openProductHref: ROUTES.assetManagementHome,
    navVariant: "assetManagement",
    icon: PackageSearch,
  },
};

export function getBillingProductContent(productSlug: string) {
  return BILLING_PRODUCT_CONTENT[productSlug] ?? BILLING_PRODUCT_CONTENT.hrms;
}
