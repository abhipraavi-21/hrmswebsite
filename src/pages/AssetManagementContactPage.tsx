import ProductContactPage from "@/components/site/ProductContactPage";
import { ROUTES } from "@/routes/routeConfig.js";

const assetManagementModuleOptions = [
  "Asset Dashboard",
  "Asset Registration",
  "Asset Allocation",
  "Asset Tracking",
  "QR Code Asset Management",
  "Asset Maintenance",
  "Asset Reports",
  "Warranty Tracking",
  "Other",
] as const;

const assetManagementServiceOptions = [
  {
    id: "product-demo",
    label: "Product Demonstration",
    enquiryType: "Demo request",
    description: "See the asset-management workflows in action and explore the modules you need.",
  },
  {
    id: "consultation",
    label: "Operational Consultation",
    enquiryType: "Consultation",
    description: "Discuss current asset workflows, handovers, branches and reporting needs.",
  },
  {
    id: "tracking",
    label: "Asset Tracking",
    enquiryType: "Tracking enquiry",
    description: "Review assignment, return, transfer and movement visibility requirements.",
  },
  {
    id: "qr-code",
    label: "QR Code Workflows",
    enquiryType: "QR code enquiry",
    description: "Plan scan-ready asset identification and simpler field verification.",
  },
  {
    id: "maintenance",
    label: "Maintenance Planning",
    enquiryType: "Maintenance enquiry",
    description: "Explore service schedules, due alerts, warranty follow-ups and maintenance records.",
  },
  {
    id: "reports",
    label: "Reports and Audits",
    enquiryType: "Reporting enquiry",
    description: "Discuss reporting visibility, audit readiness and branch-wise tracking summaries.",
  },
  {
    id: "implementation",
    label: "Implementation Support",
    enquiryType: "Implementation enquiry",
    description: "Plan rollout, setup, branch onboarding and operational adoption.",
  },
  {
    id: "support",
    label: "Technical Support",
    enquiryType: "Technical support",
    description: "Report an issue or ask for help with an existing setup.",
  },
  {
    id: "commercial",
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

export default function AssetManagementContactPage() {
  return (
    <ProductContactPage
      pageKey="asset-management-contact-us"
      canonicalPath={ROUTES.assetManagementContact}
      fallbackTitle="Contact Altroz Asset Management | Book a Demo or Sales Consultation"
      fallbackDescription="Contact Altroz Asset Management for product demonstrations, asset tracking consultation, QR workflows, maintenance planning, reporting, and customer enquiries."
      heroFallbackDescription="We are here to help you simplify your asset operations. Whether you are evaluating asset management software, requesting a product demonstration, planning your tracking workflow, or looking for product support, the Altroz Technologies team can help you identify the right next step."
      ctaFallbackDescription="Connect with Altroz Asset Management to explore asset registration, tracking, assignment, maintenance, QR workflows and reporting from one centralised platform."
      messagePlaceholder="Tell us about your asset tracking goals, current challenges, or what you want to explore."
      productLabel="Asset Management"
      navbarVariant="assetManagement"
      moduleOptions={assetManagementModuleOptions}
      serviceOptions={assetManagementServiceOptions}
    />
  );
}
