import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Headphones, House } from "lucide-react";
import PageSEO from "../components/site/PageSEO";
import TopNavbar from "../components/site/TopNavbar";
import MainNavbar from "../components/site/MainNavbar";
import Footer from "../components/site/Footer";
import { ROUTES } from "../routes/routeConfig.js";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="404 | Page Not Found"
        description="The page you tried to open could not be found."
        canonicalPath={location.pathname}
      />
      <TopNavbar />
      <MainNavbar />

      <main>
        <section className="hero-gradient relative overflow-hidden py-20">
          <div className="pointer-events-none absolute -top-24 right-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-success/15 blur-3xl" />

          <div className="site-container">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-white p-8 text-center shadow-float sm:p-12">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary">
                <House className="h-8 w-8" />
              </div>
              <div className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Page not found
              </div>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">404</h1>
              <p className="mx-auto mt-4 max-w-xl text-base text-ink-soft">
                The page at <span className="font-medium text-ink">{location.pathname}</span> does
                not exist or has moved. Use the links below to get back to a working page.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to={ROUTES.home} className="btn-primary inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
                <Link to={ROUTES.support} className="btn-outline inline-flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
