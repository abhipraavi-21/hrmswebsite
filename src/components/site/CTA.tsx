import { Link } from "react-router-dom";
import { ScrollReveal } from "./ScrollReveal";
import { ROUTES } from "@/routes/routeConfig.js";

export default function CTA() {
  return (
    <section id="trial" className="cta-section bg-white scroll-mt-24">
      <div className="site-container">
        <ScrollReveal variant="scale" className="cta-box relative overflow-hidden bg-gradient-to-br from-primary to-[#0a4fda] text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-success/30 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Ready to simplify HR and business communication?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join thousands of growing businesses already running their teams and campaigns on one
              platform.
            </p>
            <div className="button-group mt-7 justify-center">
              <Link
                to={ROUTES.bookDemo}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                Book Free Demo
              </Link>
              <Link to={ROUTES.pricing} className="btn-success">
                View Pricing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
