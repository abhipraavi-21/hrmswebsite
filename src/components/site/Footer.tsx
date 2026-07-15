import { Linkedin, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import BrandMark from "./BrandMark";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Core HR", href: "/products/core-hr" },
      { label: "Attendance", href: "/products/attendance" },
      { label: "Workforce Management", href: "/products/workforce-management" },
      { label: "Payroll", href: "/products/payroll" },
      { label: "Leave Management", href: "/products/leave-management" },
      { label: "HR Reports", href: "/hr-reports" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Attendance Management", href: "/attendance-management" },
      { label: "HR Automation", href: "/hr-automation" },
      { label: "HR Analytics", href: "/hr-analytics" },
      { label: "HR Security", href: "/hrms-security" },
      { label: "Employee Self Service", href: "/products/employee-self-service" },
      { label: "HR Reports", href: "/hr-reports" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why Altroz", href: "/why-altroz" },
      { label: "Customers", href: "/customers" },
      { label: "Testimonials", href: "/company/testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Partner With Us", href: "/partner-with-us" },
      { label: "Contact Us", href: "/company/contact-us" },
      { label: "Support", href: "/company/support" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Learn", href: "/learn" },
      { label: "Pricing", href: "/pricing" },
      { label: "Industry Solutions", href: "/industry-solutions" },
      { label: "Business Apps", href: "/integrations/business-apps" },
      { label: "Accounting", href: "/integrations/accounting" },
      { label: "Asset Management", href: "/integrations/asset-management" },
      { label: "Devices API", href: "/integrations/devices-api" },
      { label: "Book Demo", href: "/company/book-demo" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589382159854",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/altrozhrms/",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/80272399/admin/dashboard/",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCvht-kbPRfOLllLrxt2v4pQ",
    icon: Youtube,
  },
] as const;

export default function Footer() {
  return (
    <footer id="company" className="bg-ink text-white scroll-mt-24">
      <div className="container-x py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandMark variant="dark" className="scale-[0.8] origin-left" />
            <p className="mt-2 max-w-xs text-xs leading-5 text-white/70">
              The all-in-one HRMS and bulk email platform for modern Indian businesses.
            </p>

            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                Subscribe to newsletter
              </label>
              <div className="mt-2 flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-white/15 bg-white/10 py-1.5 pl-9 pr-3 text-xs placeholder:text-white/40 focus:border-primary focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-success px-3 py-1.5 text-xs">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:col-span-8">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                  {c.title}
                </div>
                <ul className="mt-2 space-y-1">
                  {c.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[12px] text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="text-xs text-white/60 md:justify-self-start">
            (c) {new Date().getFullYear()} HRMS. All rights reserved. Designed By{" "}
            <a
              href="https://webakoof.com/index.html"
              target="_blank"
              rel="noreferrer"
              className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Webakoof
            </a>
            </div>
            <div className="flex items-center justify-center gap-2 justify-self-center">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-7 w-7 place-items-center rounded-md bg-white/10 transition-colors hover:bg-primary"
                  aria-label={label}
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
