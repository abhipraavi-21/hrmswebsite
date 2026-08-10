import ProductContactPage from "@/components/site/ProductContactPage";
import { ROUTES } from "@/routes/routeConfig.js";

const bulkEmailModuleOptions = [
  "Email Broadcast",
  "Templates",
  "Analytics",
  "Scheduling",
  "SMTP Configuration",
  "Contacts",
  "Automation",
  "Other",
] as const;

const bulkEmailServiceOptions = [
  {
    id: "product-demo",
    label: "Product Demonstration",
    enquiryType: "Demo request",
    description: "See the platform in action and explore the bulk email modules you need.",
  },
  {
    id: "consultation",
    label: "Campaign Consultation",
    enquiryType: "Consultation",
    description: "Discuss current campaign needs, workflows, and the right starting point.",
  },
  {
    id: "broadcast",
    label: "Email Broadcast Setup",
    enquiryType: "Broadcast enquiry",
    description: "Talk about broadcast structure, audiences and sending setup.",
  },
  {
    id: "templates",
    label: "Templates",
    enquiryType: "Templates enquiry",
    description: "Review reusable email layouts and campaign branding needs.",
  },
  {
    id: "analytics",
    label: "Analytics and Reporting",
    enquiryType: "Analytics enquiry",
    description: "Explore campaign performance, delivery data and reporting needs.",
  },
  {
    id: "scheduling",
    label: "Campaign Scheduling",
    enquiryType: "Scheduling enquiry",
    description: "Plan scheduled sends and timed campaigns for your audience.",
  },
  {
    id: "smtp",
    label: "SMTP Configuration",
    enquiryType: "SMTP enquiry",
    description: "Set up your sending route and delivery infrastructure correctly.",
  },
  {
    id: "support",
    label: "Technical Support",
    enquiryType: "Technical support",
    description: "Report an issue or ask for help with an existing setup.",
  },
  {
    id: "partner",
    label: "Partner Enquiry",
    enquiryType: "Partner enquiry",
    description: "Explore consulting, referral or partnership conversations.",
  },
  {
    id: "billing",
    label: "Commercial Enquiry",
    enquiryType: "Commercial enquiry",
    description: "Discuss pricing, procurement or commercial questions.",
  },
  {
    id: "other",
    label: "Other",
    enquiryType: "General enquiry",
    description: "Use this for any enquiry that does not fit the categories above.",
  },
] as const;

export default function BulkEmailContactsPage() {
  return (
    <ProductContactPage
      pageKey="bulk-email-contact-us"
      canonicalPath={ROUTES.bulkEmailContact}
      fallbackTitle="Contact Altroz Bulk Email | Book a Demo or Sales Consultation"
      fallbackDescription="Contact Altroz Bulk Email for product demonstrations, campaign consultation, broadcast setup, scheduling, SMTP, and customer enquiries."
      heroFallbackDescription="We are here to help you simplify your email communication. Whether you are evaluating bulk email software, requesting a product demonstration, planning your campaign workflow, or looking for product support, the Altroz Technologies team can help you identify the right next step."
      ctaFallbackDescription="Connect with Altroz Bulk Email to explore broadcasting, templates, analytics, scheduling, SMTP configuration, and campaign support from one centralised platform."
      messagePlaceholder="Tell us about your bulk email goals, current challenges, or what you want to explore."
      productLabel="Bulk Email"
      navbarVariant="bulkEmail"
      moduleOptions={bulkEmailModuleOptions}
      serviceOptions={bulkEmailServiceOptions}
    />
  );
}
