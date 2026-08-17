import { useState, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

type PricingAccessSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  productLabel: string;
  loginHref: string;
  registerHref: string;
  note?: string;
};

type AccessAudience = "existing" | "new";

function ActionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function PricingAccessSection({
  eyebrow = "Pricing access",
  title = "Choose whether this buyer is already registered",
  description = "Use one consistent access step across pricing pages so existing buyers continue with login and new buyers register first.",
  productLabel,
  loginHref,
  registerHref,
  note = "Existing users continue with login. New buyers register first and use login on their next visit.",
}: PricingAccessSectionProps) {
  const [accessAudience, setAccessAudience] = useState<AccessAudience>("existing");
  const isExistingUser = accessAudience === "existing";
  const actionHref = isExistingUser ? loginHref : registerHref;
  const actionLabel = isExistingUser ? "Login" : "Register";
  const actionTitle = isExistingUser ? "Login with existing details" : "Register first";
  const actionDescription = isExistingUser
    ? `Use this path when the buyer already has approved ${productLabel} details and only needs to continue.`
    : `Use this path when the buyer is new and needs a fresh ${productLabel} registration before checkout or sales follow-up.`;
  const actionBullets = isExistingUser
    ? [
        "Shows only the login route for returning buyers",
        "Keeps plan and pricing context attached",
        "Moves straight into the next approved step",
      ]
    : [
        "Starts with registration for a new buyer",
        "Keeps pricing and onboarding details together",
        "Makes login the next step after registration is saved",
      ];
  const actionNote = isExistingUser
    ? "Returning buyers only need login here."
    : "New buyers should register first. Login becomes the follow-up step after registration.";

  return (
    <section className="hero-gradient py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
              {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">{description}</p>
          </div>

          <div className="mt-8">
            <div className="mx-auto grid max-w-2xl gap-3 rounded-[1.5rem] border border-border bg-surface/40 p-3 sm:grid-cols-2">
              {([
                {
                  value: "existing",
                  title: "Existing user",
                  description: "Show only the login step.",
                },
                {
                  value: "new",
                  title: "New user",
                  description: "Register first, then use login later.",
                },
              ] as const).map((option) => {
                const isSelected = accessAudience === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAccessAudience(option.value)}
                    className={`rounded-[1.25rem] border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-white shadow-sm ring-1 ring-primary/10"
                        : "border-transparent bg-transparent hover:border-primary/20 hover:bg-white/80"
                    }`}
                  >
                    <div className="text-sm font-semibold text-ink">{option.title}</div>
                    <div className="mt-1 text-xs leading-6 text-ink-soft">{option.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl rounded-[1.5rem] border border-border bg-surface/40 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {actionLabel}
                </div>
                <h3 className="mt-2 text-2xl font-black text-ink">{actionTitle}</h3>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                {isExistingUser ? <LockKeyhole className="h-5 w-5" /> : <UserRoundPlus className="h-5 w-5" />}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{actionDescription}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {actionBullets.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-sm leading-6 text-ink">{item}</span>
                </div>
              ))}
            </div>
            <ActionLink href={actionHref} className="btn-primary mt-6 inline-flex">
              {actionLabel}
              <ArrowRight className="h-4 w-4" />
            </ActionLink>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-primary/25 bg-primary-soft/20 p-4 text-center text-sm leading-7 text-ink-soft">
            {note} {actionNote}
          </div>
        </div>
      </div>
    </section>
  );
}
