import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import BrandMark from "./BrandMark";
import { ScrollReveal, StaggerReveal } from "./ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import { socialLinks } from "../../data/socialLinks.js";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Core HR", href: ROUTES.coreHR },
      { label: "Attendance Management", href: ROUTES.attendanceManagement },
      { label: "Workforce Management", href: ROUTES.workforce },
      { label: "Payroll", href: ROUTES.payroll },
      { label: "Leave Management", href: ROUTES.leaveManagement },
      { label: "HR Reports", href: ROUTES.reports },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Attendance Management", href: ROUTES.attendanceManagement },
      { label: "HR Automation", href: ROUTES.automation },
      { label: "HR Analytics", href: ROUTES.analytics },
      { label: "HR Security", href: ROUTES.security },
      { label: "Employee Self Service", href: ROUTES.employeeSelfService },
      { label: "HR Reports", href: ROUTES.reports },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Why Altroz", href: ROUTES.whyAltroz },
      { label: "Customers", href: ROUTES.customers },
      { label: "Testimonials", href: ROUTES.testimonials },
      { label: "Careers", href: ROUTES.careers },
      { label: "Partner With Us", href: ROUTES.partner },
      { label: "Contact Us", href: ROUTES.contact },
      { label: "Support", href: ROUTES.support },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Learn", href: ROUTES.learn },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Industry Solutions", href: ROUTES.industrySolutions },
      { label: "Business Apps", href: ROUTES.businessApps },
      { label: "Accounting", href: ROUTES.accounting },
      { label: "Asset Management", href: ROUTES.assetManagement },
      { label: "Devices API", href: ROUTES.devicesApi },
      { label: "Book Demo", href: ROUTES.bookDemo },
    ],
  },
];

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
} as const;

export default function Footer() {
  return (
    <footer id="company" className="site-footer bg-ink text-white scroll-mt-24">
      <div className="site-container">
        <div className="footer-grid grid lg:grid-cols-12">
          <ScrollReveal variant="fade-up" className="lg:col-span-4">
            <BrandMark variant="dark" className="scale-[0.8] origin-left" />
            <p className="mt-2 max-w-xs text-xs leading-5 text-white/70">
              The all-in-one HRMS platform for modern Indian businesses.
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
          </ScrollReveal>

          <StaggerReveal step={70} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                  {column.title}
                </div>
                <ul className="mt-2 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[12px] text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={100} className="footer-bottom border-t border-white/10 pt-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="text-xs text-white/60 md:justify-self-start">
              &copy; {new Date().getFullYear()} Altroz Technologies Pvt. Ltd. All rights reserved. Designed By{" "}
              <a
                href="https://webakoof.com/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Webakoof
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 justify-self-center">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIcons[label as keyof typeof socialIcons];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-7 w-7 place-items-center rounded-md bg-white/10 transition-colors hover:bg-primary"
                    aria-label={label}
                  >
                    <Icon className="h-3 w-3" />
                  </a>
                );
              })}
            </div>
            <div className="hidden md:block" />
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
