import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Crown,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";

type PurchasePlan = "basic" | "professional" | "premium";

type PlanMeta = {
  name: string;
  monthlyPrice: number;
  limit: number;
  accent: string;
  icon: React.ReactNode;
  summary: string;
  features: string[];
};

const plans: Record<PurchasePlan, PlanMeta> = {
  basic: {
    name: "Basic",
    monthlyPrice: 21,
    limit: 25,
    accent: "bg-primary-soft text-primary",
    icon: <BadgeCheck className="h-5 w-5" />,
    summary: "Core HR, attendance, leave and administration for compact teams.",
    features: ["Employee records", "Attendance essentials", "Leave and reporting"],
  },
  professional: {
    name: "Professional",
    monthlyPrice: 36,
    limit: 100,
    accent: "bg-[#ecfdf3] text-success",
    icon: <ShieldCheck className="h-5 w-5" />,
    summary: "Broader HR operations with payroll, documents, compliance and assets.",
    features: ["Recruitment and documents", "Payroll and compliance", "Assets and performance"],
  },
  premium: {
    name: "Premium",
    monthlyPrice: 53,
    limit: 250,
    accent: "bg-surface text-ink",
    icon: <Crown className="h-5 w-5" />,
    summary: "Full coverage for larger rollouts and advanced operational needs.",
    features: ["Shift management", "Deep reporting", "Full feature coverage"],
  },
};

const planOrder: PurchasePlan[] = ["basic", "professional", "premium"];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

function resolvePlan(planParam: string | null): PurchasePlan {
  if (planParam === "basic" || planParam === "professional" || planParam === "premium") {
    return planParam;
  }

  return "professional";
}

export default function HrmsPricingPurchasePage() {
  const [searchParams] = useSearchParams();
  const planKey = resolvePlan(searchParams.get("plan"));
  const employeeCount = Number.parseInt(searchParams.get("employees") ?? "100", 10) || 100;
  const billingCycle = searchParams.get("billing") === "yearly" ? "Yearly" : "Monthly";
  const [tab, setTab] = useState<"login" | "register">("register");

  const selectedPlan = plans[planKey];
  const subtotal = selectedPlan.monthlyPrice * employeeCount;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const formStep = tab === "register" ? "Create account" : "Login";

  const availablePlanSummary = useMemo(
    () => planOrder.map((key) => plans[key]),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${selectedPlan.name} Purchase | Altroz HRMS`}
        description="Complete login or registration before proceeding to HRMS subscription checkout."
        canonicalPath={ROUTES.hrmsPricingPurchase}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="overflow-x-hidden">
        <section className="hero-gradient relative overflow-hidden py-10 sm:py-14 lg:py-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-12 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

          <div className="container-x">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="border-primary/20 bg-primary-soft px-4 py-2 text-primary shadow-sm">
                Pricing to activation flow
              </Badge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                Login or register to continue with {selectedPlan.name}
              </h1>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                We keep the selected plan attached to your session so the purchase flow stays
                aligned from pricing to subscription activation.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader className="space-y-3 border-b border-border/60 pb-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-black text-ink">
                        {formStep}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-ink-soft">
                        Choose the option that matches your current stage in the purchase flow.
                      </CardDescription>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <Ticket className="h-5 w-5" />
                    </div>
                  </div>

                  <Tabs value={tab} onValueChange={(value) => setTab(value as "login" | "register")}>
                    <TabsList className="grid h-11 w-full grid-cols-2 rounded-full bg-surface/70 p-1">
                      <TabsTrigger
                        value="login"
                        className="rounded-full text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-ink"
                      >
                        Login
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="rounded-full text-sm font-semibold data-[state=active]:bg-white data-[state=active]:text-ink"
                      >
                        Register
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="login-identifier">Email address or mobile number</Label>
                          <Input id="login-identifier" placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="login-password">Password</Label>
                          <Input id="login-password" type="password" placeholder="Enter password" />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link to={ROUTES.hrmsContact} className="text-sm font-medium text-primary">
                          Forgot password?
                        </Link>
                        <Button className="min-w-44">
                          Continue to checkout
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="register" className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="company-name">Company name</Label>
                          <Input id="company-name" placeholder="Your company name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-name">Admin / HR name</Label>
                          <Input id="admin-name" placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mobile-number">Mobile number</Label>
                          <Input id="mobile-number" placeholder="+91 98765 43210" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="email-address">Email address</Label>
                          <Input id="email-address" type="email" placeholder="you@company.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Create password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm password</Label>
                          <Input id="confirm-password" type="password" placeholder="Re-enter password" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="company-note">Basic company information</Label>
                          <Textarea
                            id="company-note"
                            placeholder="Industry, employee count, or anything useful for onboarding"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm text-ink-soft">
                          By continuing, you agree to the purchase and onboarding flow.
                        </span>
                        <Button className="min-w-44">
                          Create company account
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {availablePlanSummary.map((plan) => (
                      <div
                        key={plan.name}
                        className={cn(
                          "rounded-2xl border p-4 shadow-sm",
                          plan.name === selectedPlan.name ? "border-primary bg-primary-soft/30" : "bg-white",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            {plan.name}
                          </div>
                          <div className={cn("grid h-9 w-9 place-items-center rounded-xl", plan.accent)}>
                            {plan.icon}
                          </div>
                        </div>
                        <div className="mt-3 text-2xl font-black text-ink">
                          ₹{formatPrice(plan.monthlyPrice)}
                        </div>
                        <p className="mt-1 text-xs text-ink-soft">{plan.summary}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[1.5rem] border border-border bg-surface/40 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
                          Flow alignment
                        </div>
                        <h2 className="mt-2 text-xl font-black tracking-tight text-ink">
                          Keep purchase, login and registration on one clean path
                        </h2>
                      </div>
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Plan selected from pricing page",
                        "Login and register options in one place",
                        "Employee limit carried forward",
                        "Order summary before payment",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span className="text-sm leading-6 text-ink">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-border/80 bg-white shadow-float">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl font-black text-ink">
                          Order summary
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm text-ink-soft">
                          What will be carried to checkout after authentication.
                        </CardDescription>
                      </div>
                      <Badge className="border-primary/20 bg-primary-soft text-primary">
                        {billingCycle}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-border bg-surface/30 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Selected plan
                          </div>
                          <div className="mt-2 text-2xl font-black text-ink">{selectedPlan.name}</div>
                          <p className="mt-1 text-sm text-ink-soft">{selectedPlan.summary}</p>
                        </div>
                        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", selectedPlan.accent)}>
                          {selectedPlan.icon}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-ink-soft">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          Employee limit
                        </span>
                        <span className="font-semibold text-ink">{selectedPlan.limit} employees</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          Billing cycle
                        </span>
                        <span className="font-semibold text-ink">{billingCycle}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Monthly subtotal
                        </span>
                        <span className="font-semibold text-ink">₹{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>GST / taxes</span>
                        <span className="font-semibold text-ink">₹{formatPrice(gst)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
                        <span className="font-semibold text-ink">Total payable</span>
                        <span className="font-black text-ink">₹{formatPrice(total)}</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                      Selected plan, employee count and billing details stay attached to this flow
                      so registration and payment remain aligned.
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/80 bg-white shadow-float">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black text-ink">What happens next</CardTitle>
                    <CardDescription className="mt-1 text-sm text-ink-soft">
                      A short, clean sequence that keeps the rest of the site unchanged.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "1. Authenticate with login or register a company",
                      "2. Review order summary",
                      "3. Proceed to payment",
                      "4. Verify payment and activate subscription",
                      "5. Redirect to dashboard",
                    ].map((step) => (
                      <div key={step} className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{step}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
