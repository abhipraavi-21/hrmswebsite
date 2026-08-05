import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";
import type { PublicCmsSection } from "@/services/cmsTypes";

export default function CTA({ section }: { section?: PublicCmsSection | null }) {
  return (
    <section id="trial" className="cta-section bg-white scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="scale" className="cta-box relative overflow-hidden bg-gradient-to-br from-primary to-[#0a4fda] text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-success/30 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
              {section?.heading ?? "Ready to simplify HR and business communication?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              {section?.description ??
                "Join thousands of growing businesses already running their teams and campaigns on one platform."}
            </p>
            <div className="button-group mt-7 justify-center">
              <Link
                to={section?.buttonLink ?? ROUTES.bookDemo}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                {section?.buttonText ?? "Book Free Demo"}
              </Link>
              <Link
                to={
                  ((section?.settings?.secondaryButtonLink as string | undefined) ??
                    ROUTES.pricing)
                }
                className="btn-success"
              >
                {(section?.settings?.secondaryButtonText as string | undefined) ??
                  "View Pricing"}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
