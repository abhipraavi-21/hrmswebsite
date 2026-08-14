import { isAxiosError } from "axios";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Crown,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserRound,
  UserRoundPlus,
  Users,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { usePublicContent } from "@/hooks/usePublicContent";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import type { PublicPricingPlan } from "@/services/cmsTypes";
import { fetchPricingPage } from "@/services/pricingService";
import { getSeedPricingPageFallback } from "@/services/seedFallback";
import {
  loginCustomerAccount,
  registerCustomerAccount,
  type CustomerAuthSession,
} from "@/services/customerAccountAuthService";
import { loadCustomerSession, saveCustomerSession } from "@/services/customerSessionStorage";
import {
  submitSubscriptionPurchase,
  type BillingCycle,
  type SubscriptionPurchase,
} from "@/services/subscriptionPurchaseService";

type PurchasePlanCard = PublicPricingPlan & {
  accent: string;
  icon: ReactNode;
  audience: string;
};

type PurchaseFormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  notes: string;
  paymentMethod: "upi" | "card" | "bank-transfer";
};

type PurchaseMode = "login" | "register";
type FlowMessage = {
  tone: "success" | "error" | "info";
  text: string;
} | null;
type CheckoutAddon = {
  id: string;
  name: string;
  description: string;
  price: number;
  pricingType: "per-employee-month" | "per-cycle";
};
type SavedCheckoutAddon = CheckoutAddon & {
  total: number;
};
type SavedSetupCharge = {
  label: string;
  ratePerEmployee: number;
  employeeCount: number;
  total: number;
};

const GST_RATE = 0.18;
const BASIC_SETUP_CHARGE_PER_EMPLOYEE = 150;
const MIN_EMPLOYEES = 1;
const MAX_EMPLOYEES = 3000;

const fallbackPlanCatalog: PurchasePlanCard[] = [
  {
    id: 1,
    name: "Basic",
    slug: "basic",
    shortDescription: "Core HR, attendance, leave and administration for compact teams.",
    currency: "INR",
    monthlyPrice: 21,
    yearlyPrice: null,
    originalPrice: null,
    billingLabel: "per employee / month",
    badgeText: null,
    buttonText: "Purchase now",
    buttonLink: ROUTES.hrmsPricingPurchase,
    isPopular: false,
    isActive: true,
    displayOrder: 0,
    settings: {
      accent: "bg-primary-soft text-primary",
      audience: "Smaller teams",
    },
    features: [
      { id: 1, featureText: "Employee records", isIncluded: true, displayOrder: 0, category: null },
      {
        id: 2,
        featureText: "Attendance essentials",
        isIncluded: true,
        displayOrder: 1,
        category: null,
      },
      { id: 3, featureText: "Leave workflows", isIncluded: true, displayOrder: 2, category: null },
    ],
    accent: "bg-primary-soft text-primary",
    icon: <BadgeCheck className="h-5 w-5" />,
    audience: "Smaller teams",
  },
  {
    id: 2,
    name: "Professional",
    slug: "professional",
    shortDescription: "Broader HR operations with payroll, documents, compliance and assets.",
    currency: "INR",
    monthlyPrice: 36,
    yearlyPrice: null,
    originalPrice: null,
    billingLabel: "per employee / month",
    badgeText: null,
    buttonText: "Purchase now",
    buttonLink: ROUTES.hrmsPricingPurchase,
    isPopular: true,
    isActive: true,
    displayOrder: 1,
    settings: {
      accent: "bg-[#ecfdf3] text-success",
      audience: "Growing teams",
    },
    features: [
      { id: 4, featureText: "Payroll coverage", isIncluded: true, displayOrder: 0, category: null },
      { id: 5, featureText: "Compliance tools", isIncluded: true, displayOrder: 1, category: null },
      { id: 6, featureText: "Asset workflows", isIncluded: true, displayOrder: 2, category: null },
    ],
    accent: "bg-[#ecfdf3] text-success",
    icon: <ShieldCheck className="h-5 w-5" />,
    audience: "Growing teams",
  },
  {
    id: 3,
    name: "Premium",
    slug: "premium",
    shortDescription: "Full coverage for larger rollouts and advanced operational needs.",
    currency: "INR",
    monthlyPrice: 53,
    yearlyPrice: null,
    originalPrice: null,
    billingLabel: "per employee / month",
    badgeText: null,
    buttonText: "Purchase now",
    buttonLink: ROUTES.hrmsPricingPurchase,
    isPopular: false,
    isActive: true,
    displayOrder: 2,
    settings: {
      accent: "bg-surface text-ink",
      audience: "Larger rollouts",
    },
    features: [
      {
        id: 7,
        featureText: "Advanced reporting",
        isIncluded: true,
        displayOrder: 0,
        category: null,
      },
      { id: 8, featureText: "Shift management", isIncluded: true, displayOrder: 1, category: null },
      {
        id: 9,
        featureText: "Full suite access",
        isIncluded: true,
        displayOrder: 2,
        category: null,
      },
    ],
    accent: "bg-surface text-ink",
    icon: <Crown className="h-5 w-5" />,
    audience: "Larger rollouts",
  },
];

const billingCycles: Array<{
  value: BillingCycle;
  label: string;
  months: number;
  note: string;
}> = [
  { value: "monthly", label: "Monthly", months: 1, note: "Best for smaller monthly rollouts." },
  {
    value: "half-yearly",
    label: "6 Months",
    months: 6,
    note: "Locks pricing for half-year onboarding cycles.",
  },
  {
    value: "yearly",
    label: "1 Year",
    months: 12,
    note: "Best when you want an annual renewal date.",
  },
];

const paymentMethods: Array<{
  value: PurchaseFormState["paymentMethod"];
  label: string;
  description: string;
}> = [
  { value: "upi", label: "UPI", description: "Quick confirmation for smaller online payments." },
  { value: "card", label: "Card", description: "For standard card-based checkout approvals." },
  {
    value: "bank-transfer",
    label: "Bank Transfer",
    description: "For finance teams that settle through direct transfer.",
  },
];

const checkoutAddons: CheckoutAddon[] = [
  {
    id: "geo-tracking",
    name: "Geo Tracking",
    description: "Location-aware attendance tracking for field and branch teams.",
    price: 5,
    pricingType: "per-employee-month",
  },
  {
    id: "mobile-app",
    name: "Mobile App Access",
    description: "Employee self-service, attendance, leave and profile access on mobile.",
    price: 7,
    pricingType: "per-employee-month",
  },
  {
    id: "whatsapp-integration",
    name: "WhatsApp Integration",
    description: "Send attendance, leave, payroll and HR notifications on WhatsApp.",
    price: 1499,
    pricingType: "per-cycle",
  },
  {
    id: "biometric-device",
    name: "Biometric Device Setup",
    description: "Device integration and attendance sync setup for biometric machines.",
    price: 2499,
    pricingType: "per-cycle",
  },
  {
    id: "custom-development",
    name: "Custom Development",
    description: "Custom workflow, report or approval logic for your HR process.",
    price: 4999,
    pricingType: "per-cycle",
  },
];

const purchaseModeOptions: Array<{
  value: PurchaseMode;
  audienceLabel: string;
  title: string;
  description: string;
  continueLabel: string;
  summary: string;
}> = [
  {
    value: "login",
    audienceLabel: "Existing user",
    title: "Login with existing details",
    description:
      "Use the login route when the buyer already has an account and only needs a username and password to continue.",
    continueLabel: "Login and continue",
    summary: "Login with username and password, then continue with the saved billing profile.",
  },
  {
    value: "register",
    audienceLabel: "New user",
    title: "Register first",
    description:
      "Use the register route when this is a fresh buyer setup. Create the account with a password before checkout.",
    continueLabel: "Register and continue",
    summary: "Create the account, save the buyer profile, and then continue to checkout.",
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrency(value: number) {
  return `\u20B9${formatPrice(value)}`;
}

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function normalizeEmployeeCount(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed)) {
    return 100;
  }

  return Math.min(MAX_EMPLOYEES, Math.max(MIN_EMPLOYEES, parsed));
}

function resolveBillingCycle(value: string | null): BillingCycle {
  return value === "half-yearly" || value === "yearly" ? value : "monthly";
}

function resolvePurchaseMode(value: string | null): PurchaseMode {
  return value === "login" ? "login" : "register";
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function getPlanVisuals(slug: string, name: string) {
  if (slug === "basic" || name === "Basic") {
    return {
      accent: "bg-primary-soft text-primary",
      icon: <BadgeCheck className="h-5 w-5" />,
      audience: "Smaller teams",
    };
  }

  if (slug === "professional" || name === "Professional") {
    return {
      accent: "bg-[#ecfdf3] text-success",
      icon: <ShieldCheck className="h-5 w-5" />,
      audience: "Growing teams",
    };
  }

  return {
    accent: "bg-surface text-ink",
    icon: <Crown className="h-5 w-5" />,
    audience: "Larger rollouts",
  };
}

function buildPlanCatalog(plans: PublicPricingPlan[] | undefined) {
  if (!plans?.length) {
    return fallbackPlanCatalog;
  }

  return plans
    .filter((plan) => plan.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((plan) => ({
      ...plan,
      ...getPlanVisuals(plan.slug, plan.name),
    }));
}

function getSelectedPlan(planCatalog: PurchasePlanCard[], planSlug: string | null) {
  if (!planCatalog.length) {
    return fallbackPlanCatalog[0];
  }

  return planCatalog.find((plan) => plan.slug === planSlug) ?? planCatalog[0];
}

function getSavedCheckoutAddons(purchase: SubscriptionPurchase | null): SavedCheckoutAddon[] {
  const selectedAddOns = purchase?.extraData?.selectedAddOns;

  if (!Array.isArray(selectedAddOns)) {
    return [];
  }

  return selectedAddOns
    .map((selectedAddon) => {
      if (!selectedAddon || typeof selectedAddon !== "object") {
        return null;
      }

      const addon = selectedAddon as Partial<SavedCheckoutAddon>;

      if (!addon.id || !addon.name || typeof addon.total !== "number") {
        return null;
      }

      return {
        id: addon.id,
        name: addon.name,
        description: addon.description ?? "",
        price: typeof addon.price === "number" ? addon.price : 0,
        pricingType: addon.pricingType ?? "per-cycle",
        total: addon.total,
      };
    })
    .filter((addon): addon is SavedCheckoutAddon => addon !== null);
}

function getSavedSetupCharge(purchase: SubscriptionPurchase | null): SavedSetupCharge | null {
  const setupCharge = purchase?.extraData?.setupCharge;

  if (!setupCharge || typeof setupCharge !== "object") {
    return null;
  }

  const charge = setupCharge as Partial<SavedSetupCharge>;

  if (
    typeof charge.ratePerEmployee !== "number" ||
    typeof charge.employeeCount !== "number" ||
    typeof charge.total !== "number" ||
    charge.total <= 0
  ) {
    return null;
  }

  return {
    label: charge.label ?? "Basic setup charges",
    ratePerEmployee: charge.ratePerEmployee,
    employeeCount: charge.employeeCount,
    total: charge.total,
  };
}

export default function HrmsPricingPurchasePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const seedPricingPage = useMemo(() => getSeedPricingPageFallback(), []);
  const { data: pricingPage } = usePublicContent(fetchPricingPage, [], seedPricingPage);
  const planCatalog = useMemo(() => buildPlanCatalog(pricingPage?.plans), [pricingPage?.plans]);
  const selectedPlan = getSelectedPlan(planCatalog, searchParams.get("plan"));
  const employeeCount = normalizeEmployeeCount(searchParams.get("employees"));
  const billingCycle = resolveBillingCycle(searchParams.get("billing"));
  const purchaseMode = resolvePurchaseMode(searchParams.get("mode"));
  const purchaseModeMeta =
    purchaseModeOptions.find((option) => option.value === purchaseMode) ?? purchaseModeOptions[1];
  const cycleMeta = billingCycles.find((cycle) => cycle.value === billingCycle) ?? billingCycles[0];
  const [step, setStep] = useState<"details" | "checkout" | "success">("details");
  const [isContinuing, setIsContinuing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purchase, setPurchase] = useState<SubscriptionPurchase | null>(null);
  const [customerSession, setCustomerSession] = useState<CustomerAuthSession | null>(null);
  const [flowMessage, setFlowMessage] = useState<FlowMessage>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [form, setForm] = useState<PurchaseFormState>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    notes: "",
    paymentMethod: "upi",
  });

  const pricing = useMemo(() => {
    const planSubtotal =
      billingCycle === "yearly" &&
      selectedPlan.yearlyPrice !== null &&
      selectedPlan.yearlyPrice !== undefined
        ? selectedPlan.yearlyPrice * employeeCount
        : selectedPlan.monthlyPrice * employeeCount * cycleMeta.months;
    const addonSubtotal = checkoutAddons
      .filter((addon) => selectedAddonIds.includes(addon.id))
      .reduce((sum, addon) => {
        const addonTotal =
          addon.pricingType === "per-employee-month"
            ? addon.price * employeeCount * cycleMeta.months
            : addon.price;

        return sum + addonTotal;
      }, 0);
    const setupCharge =
      selectedPlan.slug === "basic" ? employeeCount * BASIC_SETUP_CHARGE_PER_EMPLOYEE : 0;
    const subtotal = planSubtotal + addonSubtotal + setupCharge;
    const roundedSubtotal = Math.round(subtotal);
    const gstAmount = Math.round(roundedSubtotal * GST_RATE);
    const totalAmount = roundedSubtotal + gstAmount;

    return {
      planSubtotal: Math.round(planSubtotal),
      addonSubtotal: Math.round(addonSubtotal),
      setupCharge: Math.round(setupCharge),
      subtotal: roundedSubtotal,
      gstAmount,
      totalAmount,
      renewalDate: addMonths(new Date(), cycleMeta.months),
    };
  }, [
    billingCycle,
    cycleMeta.months,
    employeeCount,
    selectedPlan.monthlyPrice,
    selectedPlan.slug,
    selectedPlan.yearlyPrice,
    selectedAddonIds,
  ]);
  const selectedAddons = useMemo(
    () => checkoutAddons.filter((addon) => selectedAddonIds.includes(addon.id)),
    [selectedAddonIds],
  );
  const purchaseAddons = useMemo(() => getSavedCheckoutAddons(purchase), [purchase]);
  const purchaseSetupCharge = useMemo(() => getSavedSetupCharge(purchase), [purchase]);

  const customerAccount = customerSession?.account ?? null;
  const normalizedUsername = form.username.trim().toLowerCase();
  const activeIdentifier = normalizedUsername;
  const sessionMatchesIdentifier =
    Boolean(customerSession && activeIdentifier) &&
    [
      customerSession?.account.username,
      customerSession?.account.email,
      customerSession?.account.phone,
    ]
      .filter(Boolean)
      .some((value) => value?.trim().toLowerCase() === activeIdentifier);

  useEffect(() => {
    const session = loadCustomerSession();

    if (session) {
      syncAccountIntoForm(session);
    }
  }, []);

  const updateQuery = (
    updates: Partial<Record<"plan" | "employees" | "billing" | "mode", string>>,
  ) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      }
    });

    setSearchParams(next, { replace: true });
    setPurchase(null);
    setIsContinuing(false);
    setFlowMessage(null);

    if (step === "success") {
      setStep("details");
    }

    if (updates.mode && updates.mode !== purchaseMode) {
      setCustomerSession(null);
      setForm((current) => ({
        ...current,
        username: "",
        password: "",
      }));
    }
  };

  const updateForm = <K extends keyof PurchaseFormState>(key: K, value: PurchaseFormState[K]) => {
    setFlowMessage(null);
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((current) =>
      current.includes(addonId)
        ? current.filter((selectedAddonId) => selectedAddonId !== addonId)
        : [...current, addonId],
    );
  };

  const getAddonTotal = (addon: CheckoutAddon) =>
    addon.pricingType === "per-employee-month"
      ? addon.price * employeeCount * cycleMeta.months
      : addon.price;

  const syncAccountIntoForm = (session: CustomerAuthSession) => {
    setCustomerSession(session);
    saveCustomerSession(session);
    setForm((current) => ({
      ...current,
      companyName: session.account.companyName,
      contactName: session.account.contactName,
      email: session.account.email,
      phone: session.account.phone ?? "",
      username: session.account.username,
      password: "",
    }));
  };

  const switchToRegister = () => {
    const identifier = form.username.trim();

    updateQuery({ mode: "register" });

    if (/\S+@\S+\.\S+/.test(identifier)) {
      setForm((current) => ({
        ...current,
        email: identifier,
        username: "",
        password: "",
      }));
    }
  };

  const validatePlanAndBilling = () => {
    if (employeeCount < MIN_EMPLOYEES) {
      setFlowMessage({ tone: "error", text: "Select at least one employee." });
      toast.error("Select at least one employee.");
      return false;
    }

    return true;
  };

  const validateRegisterDetails = () => {
    if (!validatePlanAndBilling()) {
      return false;
    }

    if (!form.companyName.trim()) {
      setFlowMessage({ tone: "error", text: "Enter the company name before continuing." });
      toast.error("Enter the company name before continuing.");
      return false;
    }

    if (!form.contactName.trim()) {
      setFlowMessage({ tone: "error", text: "Enter the billing contact name before continuing." });
      toast.error("Enter the billing contact name before continuing.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setFlowMessage({ tone: "error", text: "Enter a valid billing email address." });
      toast.error("Enter a valid billing email address.");
      return false;
    }

    if (!form.username.trim()) {
      setFlowMessage({ tone: "error", text: "Enter a username for the new account." });
      toast.error("Enter a username for the new account.");
      return false;
    }

    if (form.password.trim().length < 6) {
      setFlowMessage({ tone: "error", text: "Enter a password with at least 6 characters." });
      toast.error("Enter a password with at least 6 characters.");
      return false;
    }

    return true;
  };

  const validateLoginDetails = () => {
    if (!validatePlanAndBilling()) {
      return false;
    }

    if (!form.username.trim()) {
      setFlowMessage({
        tone: "error",
        text: "Enter your email, mobile number or username before logging in.",
      });
      toast.error("Enter your email, mobile number or username before logging in.");
      return false;
    }

    if (!form.password.trim()) {
      setFlowMessage({ tone: "error", text: "Enter the password before logging in." });
      toast.error("Enter the password before logging in.");
      return false;
    }

    return true;
  };

  const continueToCheckout = async () => {
    setFlowMessage(null);

    if (purchaseMode === "login") {
      if (sessionMatchesIdentifier && !form.password.trim()) {
        setStep("checkout");
        setFlowMessage({
          tone: "success",
          text: "You are already logged in. Continue to payment confirmation.",
        });
        return;
      }

      if (!validateLoginDetails()) {
        return;
      }

      setIsContinuing(true);

      try {
        const session = await loginCustomerAccount({
          username: form.username.trim(),
          password: form.password,
        });

        syncAccountIntoForm(session);
        setStep("checkout");
        setFlowMessage({
          tone: "success",
          text: "Login successful. Review the payment details below.",
        });
        toast.success("Login successful. Continue with checkout.");
      } catch (error) {
        if (isAxiosError(error)) {
          const message =
            (typeof error.response?.data?.message === "string" && error.response.data.message) ||
            (typeof error.response?.data?.error === "string" && error.response.data.error) ||
            null;

          if (!error.response) {
            setFlowMessage({
              tone: "error",
              text: "The login API is not reachable. Start the backend and try again.",
            });
            toast.error("The login API is not reachable. Start the backend and try again.");
          } else {
            const loginMessage =
              error.response.status === 401
                ? "This login did not match an existing account. Check the password, or register first if this is a new customer."
                : (message ?? "Unable to log in right now.");
            setFlowMessage({ tone: "error", text: loginMessage });
            toast.error(loginMessage);
          }

          return;
        }

        setFlowMessage({ tone: "error", text: "Unable to log in right now." });
        toast.error("Unable to log in right now.");
      } finally {
        setIsContinuing(false);
      }

      return;
    }

    if (
      sessionMatchesIdentifier &&
      customerSession.account.email === form.email.trim().toLowerCase()
    ) {
      setStep("checkout");
      setFlowMessage({
        tone: "success",
        text: "Account is ready. Review the payment details below.",
      });
      return;
    }

    if (!validateRegisterDetails()) {
      return;
    }

    setIsContinuing(true);

    try {
      const session = await registerCustomerAccount({
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        username: form.username.trim(),
        password: form.password,
      });

      syncAccountIntoForm(session);
      setStep("checkout");
      setFlowMessage({
        tone: "success",
        text: "Registration successful. Review the payment details below.",
      });
      toast.success("Registration successful. Continue with checkout.");
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          (typeof error.response?.data?.message === "string" && error.response.data.message) ||
          (typeof error.response?.data?.error === "string" && error.response.data.error) ||
          null;

        if (!error.response) {
          setFlowMessage({
            tone: "error",
            text: "The registration API is not reachable. Start the backend and try again.",
          });
          toast.error("The registration API is not reachable. Start the backend and try again.");
        } else {
          const registerMessage = message ?? "Unable to register right now.";
          setFlowMessage({ tone: "error", text: registerMessage });
          toast.error(registerMessage);
        }

        return;
      }

      setFlowMessage({ tone: "error", text: "Unable to register right now." });
      toast.error("Unable to register right now.");
    } finally {
      setIsContinuing(false);
    }
  };

  const completePurchase = async () => {
    if (!validatePlanAndBilling()) {
      return;
    }

    if (!customerSession?.token || !customerAccount) {
      setFlowMessage({ tone: "error", text: "Login or register before completing the purchase." });
      toast.error("Login or register before completing the purchase.");
      return;
    }

    setIsSubmitting(true);

    try {
      const createdPurchase = await submitSubscriptionPurchase(
        {
          companyName: customerAccount.companyName,
          contactName: customerAccount.contactName,
          email: customerAccount.email,
          phone: customerAccount.phone ?? null,
          planSlug: selectedPlan.slug,
          employeeCount,
          billingCycle,
          paymentMethod: form.paymentMethod,
          notes: form.notes.trim() || null,
          sourcePage: ROUTES.hrmsPricingPurchase,
          extraData: {
            planName: selectedPlan.name,
            billingCycleLabel: cycleMeta.label,
            selectedAddOns: selectedAddons.map((addon) => ({
              id: addon.id,
              name: addon.name,
              price: addon.price,
              pricingType: addon.pricingType,
              total: getAddonTotal(addon),
            })),
            addOnSubtotal: pricing.addonSubtotal,
            setupCharge: {
              label: "Basic setup charges",
              ratePerEmployee: BASIC_SETUP_CHARGE_PER_EMPLOYEE,
              employeeCount,
              total: pricing.setupCharge,
            },
          },
        },
        customerSession.token,
      );

      setPurchase(createdPurchase);
      setStep("success");
      setFlowMessage({ tone: "success", text: "Purchase recorded and pushed to the admin panel." });
      toast.success("Purchase recorded and pushed to the admin panel.");
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          (typeof error.response?.data?.message === "string" && error.response.data.message) ||
          (typeof error.response?.data?.error === "string" && error.response.data.error) ||
          null;

        if (!error.response) {
          setFlowMessage({
            tone: "error",
            text: "The checkout API is not reachable. Start the backend and try again.",
          });
          toast.error("The checkout API is not reachable. Start the backend and try again.");
        } else {
          const checkoutMessage = message ?? "Unable to complete the purchase right now.";
          setFlowMessage({ tone: "error", text: checkoutMessage });
          toast.error(checkoutMessage);
        }

        return;
      }

      setFlowMessage({ tone: "error", text: "Unable to complete the purchase right now." });
      toast.error("Unable to complete the purchase right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={`${selectedPlan.name} Checkout | Altroz HRMS`}
        description="Select your HRMS plan, billing cycle, GST-inclusive total, and complete the checkout flow."
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
                Subscription checkout
              </Badge>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
                Review the plan, billing cycle and total before activation
              </h1>
              <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
                The selected plan, employee count, GST amount and renewal date stay aligned from
                this page into the admin panel.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <Card className="border-border/80 bg-white shadow-float">
                <CardHeader className="space-y-3 border-b border-border/60 pb-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-black text-ink">
                        {step === "checkout"
                          ? "Checkout details"
                          : step === "success"
                            ? "Purchase confirmed"
                            : purchaseModeMeta.value === "login"
                              ? "Login to continue"
                              : "Register to continue"}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-ink-soft">
                        {step === "checkout"
                          ? "Payment details and renewal timing are confirmed here before activation."
                          : step === "success"
                            ? "The order is now recorded for admin follow-up and renewal tracking."
                            : purchaseModeMeta.description}
                      </CardDescription>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                      {step === "success" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : step === "checkout" ? (
                        <CreditCard className="h-5 w-5" />
                      ) : (
                        <Building2 className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  {step === "success" && purchase ? (
                    <div className="space-y-5">
                      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
                              Payment received
                            </div>
                            <h2 className="mt-2 text-2xl font-black text-ink">
                              {purchase.referenceCode}
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-ink-soft">
                              {purchase.companyName} is now queued in the admin panel with the
                              chosen plan, billing cycle and renewal schedule.
                            </p>
                          </div>
                          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                            <ReceiptText className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-surface/50 p-4">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Total paid
                          </div>
                          <div className="mt-2 text-2xl font-black text-ink">
                            {formatCurrency(purchase.totalAmount)}
                          </div>
                        </div>
                        <div className="rounded-2xl bg-surface/50 p-4">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Renewal due
                          </div>
                          <div className="mt-2 text-2xl font-black text-ink">
                            {formatDate(purchase.renewalDueAt)}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-surface/40 p-5">
                        <div className="grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
                          <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                            <Users className="mt-0.5 h-4 w-4 text-primary" />
                            <span>
                              {purchase.employeeCount} employees on the {purchase.planName} plan
                            </span>
                          </div>
                          <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                            <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
                            <span>
                              {purchase.billingCycleLabel} billing cycle saved for renewals
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-border bg-white p-5">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Charges saved
                        </div>
                        {purchaseSetupCharge ? (
                          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-surface/50 px-4 py-3 text-sm">
                            <span className="font-semibold text-ink">
                              {purchaseSetupCharge.label} ({purchaseSetupCharge.employeeCount}{" "}
                              employees x {formatCurrency(purchaseSetupCharge.ratePerEmployee)})
                            </span>
                            <span className="font-black text-ink">
                              {formatCurrency(purchaseSetupCharge.total)}
                            </span>
                          </div>
                        ) : null}
                        {purchaseAddons.length ? (
                          <div className="mt-4 space-y-3">
                            {purchaseAddons.map((addon) => (
                              <div
                                key={addon.id}
                                className="flex items-center justify-between gap-3 rounded-2xl bg-surface/50 px-4 py-3 text-sm"
                              >
                                <span className="font-semibold text-ink">{addon.name}</span>
                                <span className="font-black text-ink">
                                  {formatCurrency(addon.total)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="mt-3 text-sm leading-7 text-ink-soft">
                            No optional add-on features were selected for this order.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link to={ROUTES.hrmsPricing}>
                            Back to pricing
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setStep("details");
                            setPurchase(null);
                          }}
                        >
                          Create another order
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Buyer status
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {purchaseModeOptions.map((option) => {
                            const isSelected = purchaseMode === option.value;

                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => updateQuery({ mode: option.value })}
                                className={cn(
                                  "rounded-2xl border p-4 text-left shadow-sm transition-all",
                                  isSelected
                                    ? "border-primary bg-primary-soft/30 ring-1 ring-primary/10"
                                    : "border-border bg-white hover:border-primary/30 hover:bg-surface/50",
                                )}
                              >
                                <div className="text-sm font-semibold text-ink">
                                  {option.audienceLabel}
                                </div>
                                <div className="mt-1 text-xs leading-6 text-ink-soft">
                                  {option.value === "login"
                                    ? "Show only the login route for this buyer."
                                    : "Register first, then use login on the next visit."}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="rounded-[1.5rem] border border-border bg-surface/40 p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                {purchaseModeMeta.value === "login" ? "Login" : "Register"}
                              </div>
                              <h2 className="mt-2 text-xl font-black text-ink">
                                {purchaseModeMeta.title}
                              </h2>
                              <p className="mt-2 text-sm leading-7 text-ink-soft">
                                {purchaseModeMeta.description}
                              </p>
                            </div>
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                              {purchaseModeMeta.value === "login" ? (
                                <LockKeyhole className="h-5 w-5" />
                              ) : (
                                <UserRoundPlus className="h-5 w-5" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Select plan
                          </div>
                          <Link
                            to={ROUTES.hrmsPricing}
                            className="text-sm font-medium text-primary"
                          >
                            Back to pricing
                          </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          {planCatalog.map((plan) => {
                            const isSelected = plan.slug === selectedPlan.slug;

                            return (
                              <button
                                key={plan.slug}
                                type="button"
                                onClick={() => updateQuery({ plan: plan.slug })}
                                className={cn(
                                  "rounded-2xl border p-4 text-left shadow-sm transition-all",
                                  isSelected
                                    ? "border-primary bg-primary-soft/30 ring-1 ring-primary/10"
                                    : "border-border bg-white hover:border-primary/30 hover:bg-surface/50",
                                )}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                    {plan.name}
                                  </div>
                                  <div
                                    className={cn(
                                      "grid h-9 w-9 place-items-center rounded-xl",
                                      plan.accent,
                                    )}
                                  >
                                    {plan.icon}
                                  </div>
                                </div>
                                <div className="mt-3 text-2xl font-black text-ink">
                                  {formatCurrency(plan.monthlyPrice)}
                                </div>
                                <p className="mt-1 text-xs text-ink-soft">
                                  {plan.shortDescription}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                        <div className="space-y-2">
                          <Label htmlFor="employee-count">Selected employees</Label>
                          <Input
                            id="employee-count"
                            type="number"
                            min={MIN_EMPLOYEES}
                            max={MAX_EMPLOYEES}
                            value={employeeCount}
                            onChange={(event) =>
                              updateQuery({
                                employees: String(
                                  Math.min(
                                    MAX_EMPLOYEES,
                                    Math.max(
                                      MIN_EMPLOYEES,
                                      Number(event.target.value) || MIN_EMPLOYEES,
                                    ),
                                  ),
                                ),
                              })
                            }
                          />
                        </div>

                        <div className="rounded-[1.5rem] border border-border bg-surface/40 px-4 py-3 text-sm text-ink-soft md:min-w-52">
                          <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                            Best fit
                          </div>
                          <div className="mt-2 font-semibold text-ink">{selectedPlan.audience}</div>
                          <p className="mt-1">
                            Adjust employees any time and the total updates instantly.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                          Billing cycle
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                          {billingCycles.map((cycle) => {
                            const isSelected = cycle.value === billingCycle;

                            return (
                              <button
                                key={cycle.value}
                                type="button"
                                onClick={() => updateQuery({ billing: cycle.value })}
                                className={cn(
                                  "rounded-2xl border p-4 text-left shadow-sm transition-all",
                                  isSelected
                                    ? "border-primary bg-primary-soft/30 ring-1 ring-primary/10"
                                    : "border-border bg-white hover:border-primary/30 hover:bg-surface/50",
                                )}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <div className="text-sm font-semibold text-ink">
                                      {cycle.label}
                                    </div>
                                    <div className="text-xs text-ink-soft">{cycle.note}</div>
                                  </div>
                                  <Badge className="border-primary/20 bg-white text-primary">
                                    {cycle.months}m
                                  </Badge>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {purchaseMode === "login" ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {customerAccount ? (
                            <div className="rounded-[1.5rem] border border-border bg-surface/40 p-4 sm:col-span-2">
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                Authenticated user
                              </div>
                              <p className="mt-2 text-sm leading-7 text-ink-soft">
                                {customerAccount.username} is already authenticated on this page.
                                You can continue directly or enter another username and password.
                              </p>
                            </div>
                          ) : null}
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="login-username">
                              Email address, mobile number or username
                            </Label>
                            <Input
                              id="login-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Enter email, mobile number or username"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input
                              id="login-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Enter password"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {customerAccount ? (
                            <div className="rounded-[1.5rem] border border-border bg-surface/40 p-4 sm:col-span-2">
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                Registered account
                              </div>
                              <p className="mt-2 text-sm leading-7 text-ink-soft">
                                {customerAccount.username} has already been created on this page.
                                You can continue with checkout or adjust the registration details
                                before creating another account.
                              </p>
                            </div>
                          ) : null}
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="company-name">Company name</Label>
                            <Input
                              id="company-name"
                              value={form.companyName}
                              onChange={(event) => updateForm("companyName", event.target.value)}
                              placeholder="Your company name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contact-name">Billing contact</Label>
                            <Input
                              id="contact-name"
                              value={form.contactName}
                              onChange={(event) => updateForm("contactName", event.target.value)}
                              placeholder="Full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone-number">Phone number</Label>
                            <Input
                              id="phone-number"
                              value={form.phone}
                              onChange={(event) => updateForm("phone", event.target.value)}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="billing-email">Billing email</Label>
                            <Input
                              id="billing-email"
                              type="email"
                              value={form.email}
                              onChange={(event) => updateForm("email", event.target.value)}
                              placeholder="billing@company.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-username">Username</Label>
                            <Input
                              id="register-username"
                              value={form.username}
                              onChange={(event) => updateForm("username", event.target.value)}
                              placeholder="Choose a username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-password">Password</Label>
                            <Input
                              id="register-password"
                              type="password"
                              value={form.password}
                              onChange={(event) => updateForm("password", event.target.value)}
                              placeholder="Create a password"
                            />
                          </div>
                        </div>
                      )}

                      {flowMessage ? (
                        <div
                          className={cn(
                            "rounded-[1.25rem] border px-4 py-3 text-sm leading-6",
                            flowMessage.tone === "success"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                              : flowMessage.tone === "error"
                                ? "border-rose-200 bg-rose-50 text-rose-800"
                                : "border-primary/20 bg-primary-soft text-primary",
                          )}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span>{flowMessage.text}</span>
                            {purchaseMode === "login" && flowMessage.tone === "error" ? (
                              <button
                                type="button"
                                className="font-bold text-primary underline-offset-4 hover:underline"
                                onClick={switchToRegister}
                              >
                                Register first
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null}

                      {step === "checkout" ? (
                        <div className="space-y-4 rounded-[1.5rem] border border-border bg-surface/40 p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                                Add-on features
                              </div>
                              <h2 className="mt-2 text-xl font-black text-ink">
                                Select optional features before payment
                              </h2>
                              <p className="mt-2 text-sm leading-7 text-ink-soft">
                                Choose extra modules only if this customer needs them. Selected
                                features immediately increase the subtotal, GST and payable amount.
                              </p>
                            </div>
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
                              <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            {checkoutAddons.map((addon) => {
                              const isSelected = selectedAddonIds.includes(addon.id);
                              const addonTotal = getAddonTotal(addon);

                              return (
                                <button
                                  key={addon.id}
                                  type="button"
                                  onClick={() => toggleAddon(addon.id)}
                                  className={cn(
                                    "rounded-2xl border p-4 text-left shadow-sm transition-all",
                                    isSelected
                                      ? "border-primary bg-white ring-1 ring-primary/10"
                                      : "border-border bg-white/70 hover:border-primary/30 hover:bg-white",
                                  )}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <div className="text-sm font-bold text-ink">{addon.name}</div>
                                      <p className="mt-1 text-xs leading-6 text-ink-soft">
                                        {addon.description}
                                      </p>
                                    </div>
                                    <div
                                      className={cn(
                                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border",
                                        isSelected
                                          ? "border-primary bg-primary text-white"
                                          : "border-border bg-surface text-ink-soft",
                                      )}
                                    >
                                      <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-surface/60 px-3 py-2">
                                    <span className="text-xs font-semibold text-ink-soft">
                                      {addon.pricingType === "per-employee-month"
                                        ? `${formatCurrency(addon.price)} / employee / month`
                                        : "One-time per billing cycle"}
                                    </span>
                                    <span className="text-sm font-black text-ink">
                                      + {formatCurrency(addonTotal)}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="rounded-2xl border border-dashed border-primary/25 bg-white p-4 text-sm leading-7 text-ink-soft">
                            Add-ons selected:{" "}
                            <span className="font-semibold text-ink">
                              {selectedAddons.length
                                ? selectedAddons.map((addon) => addon.name).join(", ")
                                : "None"}
                            </span>
                          </div>

                          <div className="border-t border-border pt-4">
                            <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                              Payment method
                            </div>
                            <p className="mt-2 text-sm leading-7 text-ink-soft">
                              The account profile from {customerAccount?.username ?? "this user"}{" "}
                              will be used for the billing entry.
                            </p>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                              <UserRound className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm leading-6 text-ink">
                                {customerAccount?.contactName ?? form.contactName} from{" "}
                                {customerAccount?.companyName ?? form.companyName}
                              </span>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                              <LockKeyhole className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm leading-6 text-ink">
                                Logged in as {customerAccount?.username ?? form.username}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="purchase-notes">Notes for onboarding or billing</Label>
                            <Textarea
                              id="purchase-notes"
                              value={form.notes}
                              onChange={(event) => updateForm("notes", event.target.value)}
                              placeholder="Add GST, onboarding, branch or approval notes if needed"
                            />
                          </div>

                          <div className="grid gap-3 md:grid-cols-3">
                            {paymentMethods.map((method) => {
                              const isSelected = form.paymentMethod === method.value;

                              return (
                                <button
                                  key={method.value}
                                  type="button"
                                  onClick={() => updateForm("paymentMethod", method.value)}
                                  className={cn(
                                    "rounded-2xl border p-4 text-left shadow-sm transition-all",
                                    isSelected
                                      ? "border-primary bg-white ring-1 ring-primary/10"
                                      : "border-border bg-surface/40 hover:border-primary/30 hover:bg-white",
                                  )}
                                >
                                  <div className="text-sm font-semibold text-ink">
                                    {method.label}
                                  </div>
                                  <div className="mt-1 text-xs leading-6 text-ink-soft">
                                    {method.description}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                              <Users className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm leading-6 text-ink">
                                {employeeCount} employees on {selectedPlan.name}
                              </span>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl bg-white p-3">
                              <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
                              <span className="text-sm leading-6 text-ink">
                                Renewal preview: {formatDate(pricing.renewalDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm text-ink-soft">
                          {step === "checkout"
                            ? "Completing payment records the subscription in the admin panel."
                            : purchaseModeMeta.summary}
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {step === "checkout" ? (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep("details")}
                            >
                              <ArrowLeft className="h-4 w-4" />
                              Back
                            </Button>
                          ) : null}

                          <Button
                            type="button"
                            className="min-w-44"
                            onClick={step === "checkout" ? completePurchase : continueToCheckout}
                            disabled={isSubmitting || isContinuing}
                          >
                            {step === "checkout"
                              ? isSubmitting
                                ? "Processing..."
                                : "Complete payment"
                              : isContinuing
                                ? purchaseMode === "login"
                                  ? "Logging in..."
                                  : "Registering..."
                                : purchaseModeMeta.continueLabel}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
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
                          Pricing updates instantly when you switch plan, employee count or billing
                          cycle.
                        </CardDescription>
                      </div>
                      <Badge className="border-primary/20 bg-primary-soft text-primary">
                        {cycleMeta.label}
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
                          <div className="mt-2 text-2xl font-black text-ink">
                            {selectedPlan.name}
                          </div>
                          <p className="mt-1 text-sm text-ink-soft">
                            {selectedPlan.shortDescription}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "grid h-12 w-12 place-items-center rounded-2xl",
                            selectedPlan.accent,
                          )}
                        >
                          {selectedPlan.icon}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-ink-soft">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          Selected employees
                        </span>
                        <span className="font-semibold text-ink">{employeeCount}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-primary" />
                          Billing cycle
                        </span>
                        <span className="font-semibold text-ink">{cycleMeta.label}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Rate / employee / month
                        </span>
                        <span className="font-semibold text-ink">
                          {formatCurrency(selectedPlan.monthlyPrice)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Plan subtotal
                        </span>
                        <span className="font-semibold text-ink">
                          {formatCurrency(pricing.planSubtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          Add-on features
                        </span>
                        <span className="font-semibold text-ink">
                          {formatCurrency(pricing.addonSubtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <ReceiptText className="h-4 w-4 text-primary" />
                          Basic setup charges
                        </span>
                        <span className="font-semibold text-ink">
                          {pricing.setupCharge > 0
                            ? `${employeeCount} x ${formatCurrency(
                                BASIC_SETUP_CHARGE_PER_EMPLOYEE,
                              )} = ${formatCurrency(pricing.setupCharge)}`
                            : formatCurrency(0)}
                        </span>
                      </div>
                      {selectedAddons.length ? (
                        <div className="rounded-2xl bg-surface/50 p-3">
                          <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Selected add-ons
                          </div>
                          <div className="mt-3 space-y-2">
                            {selectedAddons.map((addon) => (
                              <div
                                key={addon.id}
                                className="flex items-center justify-between gap-3"
                              >
                                <span>{addon.name}</span>
                                <span className="font-semibold text-ink">
                                  {formatCurrency(getAddonTotal(addon))}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-surface/50 p-3 text-sm text-ink-soft">
                          No optional add-on features selected.
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Subtotal before GST
                        </span>
                        <span className="font-semibold text-ink">
                          {formatCurrency(pricing.subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>GST / taxes (18%)</span>
                        <span className="font-semibold text-ink">
                          {formatCurrency(pricing.gstAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
                        <span className="font-semibold text-ink">Total payable</span>
                        <span className="font-black text-ink">
                          {formatCurrency(pricing.totalAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-sm leading-7 text-ink-soft">
                      Renewal is currently projected for{" "}
                      <span className="font-semibold text-ink">
                        {formatDate(pricing.renewalDate)}
                      </span>{" "}
                      based on the selected {cycleMeta.label.toLowerCase()} cycle.
                    </div>

                    {purchase ? (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-ink-soft">
                        Admin entry created with reference{" "}
                        <span className="font-semibold text-ink">{purchase.referenceCode}</span>,
                        renewal date{" "}
                        <span className="font-semibold text-ink">
                          {formatDate(purchase.renewalDueAt)}
                        </span>
                        , and billing cycle{" "}
                        <span className="font-semibold text-ink">{purchase.billingCycleLabel}</span>
                        .
                      </div>
                    ) : null}
                  </CardContent>
                </Card>

                <Card className="border-border/80 bg-white shadow-float">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black text-ink">
                      What gets saved in admin
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-ink-soft">
                      The checkout now creates a subscription record that the admin panel can track.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Selected plan and billing cycle",
                      "Employee count and GST-inclusive total",
                      "Payment method and purchase timestamp",
                      "Renewal date for 1 month, 6 month and 1 year cycles",
                      "Billing contact details for follow-up",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-surface/40 p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm leading-6 text-ink">{item}</span>
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
