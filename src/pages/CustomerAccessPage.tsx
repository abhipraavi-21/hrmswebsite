import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { ArrowRight, LockKeyhole, UserRoundPlus } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/site/Footer";
import MainNavbar from "@/components/site/MainNavbar";
import PageSEO from "@/components/site/PageSEO";
import TopNavbar from "@/components/site/TopNavbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  loginCustomerAccount,
  registerCustomerAccount,
  type CustomerAuthSession,
} from "@/services/customerAccountAuthService";
import { loadCustomerSession, saveCustomerSession } from "@/services/customerSessionStorage";

type AccessMode = "login" | "register";

type AccessFormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

export default function CustomerAccessPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || ROUTES.dashboard;
  const [mode, setMode] = useState<AccessMode>(() => (searchParams.get("mode") === "login" ? "login" : "register"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerSession, setCustomerSession] = useState<CustomerAuthSession | null>(() => loadCustomerSession());
  const [form, setForm] = useState<AccessFormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (!customerSession) {
      return;
    }

    navigate(redirectTarget, { replace: true });
  }, [customerSession, navigate, redirectTarget]);

  const updateForm = <K extends keyof AccessFormState>(key: K, value: AccessFormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateMode = (nextMode: AccessMode) => {
    setMode(nextMode);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("mode", nextMode);
    setSearchParams(nextParams, { replace: true });
  };

  const validate = () => {
    if (!form.username.trim()) {
      toast.error("Enter the username to continue.");
      return false;
    }

    if (!form.password.trim()) {
      toast.error("Enter the password to continue.");
      return false;
    }

    if (mode === "register") {
      if (!form.companyName.trim()) {
        toast.error("Enter the company name before continuing.");
        return false;
      }

      if (!form.contactName.trim()) {
        toast.error("Enter the billing contact before continuing.");
        return false;
      }

      if (!/\S+@\S+\.\S+/.test(form.email)) {
        toast.error("Enter a valid billing email address.");
        return false;
      }
    }

    return true;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const session =
        mode === "login"
          ? await loginCustomerAccount({
              username: form.username.trim(),
              password: form.password,
            })
          : await registerCustomerAccount({
              companyName: form.companyName.trim(),
              contactName: form.contactName.trim(),
              email: form.email.trim(),
              phone: form.phone.trim() || null,
              username: form.username.trim(),
              password: form.password,
            });

      saveCustomerSession(session);
      setCustomerSession(session);
      toast.success(mode === "login" ? "Login successful." : "Registration successful.");
    } catch (requestError) {
      if (isAxiosError(requestError)) {
        const message =
          (typeof requestError.response?.data?.message === "string" && requestError.response.data.message) ||
          (typeof requestError.response?.data?.error === "string" && requestError.response.data.error) ||
          null;

        toast.error(message ?? "Unable to continue right now.");
      } else {
        toast.error("Unable to continue right now.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Customer Access | Altroz"
        description="Login with username and password or register a new billing account for the shared Altroz subscription dashboard."
        canonicalPath={ROUTES.customerAccess}
      />
      <TopNavbar />
      <MainNavbar />

      <main className="hero-gradient min-h-[calc(100vh-160px)] py-14 sm:py-16 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="border-primary/20 bg-primary-soft px-4 py-2 text-primary shadow-sm">
                Customer access
              </Badge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                Access the shared subscription dashboard
              </h1>
              <p className="mt-4 text-base leading-8 text-ink-soft sm:text-lg">
                Use the same account for HRMS, Bulk Email and Asset Management subscriptions. Existing users log in with username and password, while new users register once.
              </p>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader className="space-y-3">
                  <div className="grid gap-3 rounded-[1.5rem] border border-border bg-surface/40 p-3 sm:grid-cols-2">
                    {[
                      {
                        value: "login",
                        title: "Existing user",
                        description: "Continue with username and password only.",
                        icon: LockKeyhole,
                      },
                      {
                        value: "register",
                        title: "New user",
                        description: "Create the billing account before using the dashboard.",
                        icon: UserRoundPlus,
                      },
                    ].map((option) => {
                      const isSelected = mode === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateMode(option.value as AccessMode)}
                          className={`rounded-[1.25rem] border p-4 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-white shadow-sm ring-1 ring-primary/10"
                              : "border-transparent bg-transparent hover:border-primary/20 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                            <option.icon className="h-4 w-4 text-primary" />
                            {option.title}
                          </div>
                          <div className="mt-2 text-xs leading-6 text-ink-soft">{option.description}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-ink">
                      {mode === "login" ? "Login to your customer account" : "Create your customer account"}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-ink-soft">
                      {mode === "login"
                        ? "Use the same credentials from checkout to open your subscription dashboard."
                        : "Register once, then use the same account across all Altroz product subscriptions."}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {mode === "register" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="access-company-name">Company name</Label>
                        <Input
                          id="access-company-name"
                          value={form.companyName}
                          onChange={(event) => updateForm("companyName", event.target.value)}
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="access-contact-name">Billing contact</Label>
                          <Input
                            id="access-contact-name"
                            value={form.contactName}
                            onChange={(event) => updateForm("contactName", event.target.value)}
                            placeholder="Full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="access-phone">Phone number</Label>
                          <Input
                            id="access-phone"
                            value={form.phone}
                            onChange={(event) => updateForm("phone", event.target.value)}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="access-email">Billing email</Label>
                        <Input
                          id="access-email"
                          type="email"
                          value={form.email}
                          onChange={(event) => updateForm("email", event.target.value)}
                          placeholder="billing@company.com"
                        />
                      </div>
                    </>
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="access-username">Username</Label>
                      <Input
                        id="access-username"
                        value={form.username}
                        onChange={(event) => updateForm("username", event.target.value)}
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-password">Password</Label>
                      <Input
                        id="access-password"
                        type="password"
                        value={form.password}
                        onChange={(event) => updateForm("password", event.target.value)}
                        placeholder={mode === "login" ? "Enter password" : "Create a password"}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-ink-soft">
                      {mode === "login"
                        ? "Login uses username and password only."
                        : "Registration creates the billing account used by all shared product subscriptions."}
                    </span>
                    <Button type="button" onClick={() => void submit()} disabled={isSubmitting}>
                      {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Register"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-ink">What you can manage after login</CardTitle>
                  <CardDescription className="mt-1 text-sm text-ink-soft">
                    The shared billing dashboard keeps every product subscription, invoice and payment record under one customer account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "See active HRMS, Bulk Email and Asset Management subscriptions together",
                    "Review product-specific renewal dates and billing cycles",
                    "Open payment history, invoice references and total spend",
                    "Return to product-specific dashboards when a subscription is active",
                    "Use one account even when your company subscribes to multiple Altroz products",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm leading-6 text-ink">{item}</span>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                    Need a new subscription first? Start from <Link to={ROUTES.hrmsPricing} className="font-semibold text-primary">HRMS</Link>,{" "}
                    <Link to={ROUTES.bulkEmailPricing} className="font-semibold text-primary">Bulk Email</Link> or{" "}
                    <Link to={ROUTES.assetManagementPricing} className="font-semibold text-primary">Asset Management</Link>.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
