import TopNavbar from "@/components/site/TopNavbar";
import MainNavbar from "@/components/site/MainNavbar";
import Hero from "@/components/site/Hero";
import CustomerLogos from "@/components/site/CustomerLogos";
import ProductCards from "@/components/site/ProductCards";
import Features from "@/components/site/Features";
import DashboardShowcase from "@/components/site/DashboardShowcase";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";
import PageSEO from "@/components/site/PageSEO";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Altroz HRMS | HR, Payroll and Attendance Platform"
        description="Altroz HRMS helps businesses manage employees, attendance, payroll, leave, recruitment, and analytics from one modern platform."
        canonicalPath="/"
      />
      <TopNavbar />
      <MainNavbar />
      <main>
        <Hero />
        <CustomerLogos />
        <ProductCards />
        <Features />
        <DashboardShowcase />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
