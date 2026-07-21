import { Link } from "react-router-dom";

type HeroAction = {
  label: string;
  href: string;
};

type PageHeroIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  className?: string;
};

export default function PageHeroIntro({
  eyebrow,
  title,
  description,
  actions = [],
  className = "",
}: PageHeroIntroProps) {
  return (
    <div className={`mx-auto max-w-4xl px-6 py-6 text-center ${className}`.trim()}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm">
        {eyebrow}
      </span>
      <h1 className="mt-2 text-4xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-2 max-w-3xl text-base text-ink-soft">{description}</p>

      {actions.length > 0 ? (
        <div className="button-group mt-4 justify-center">
          {actions.map((action, index) => (
            <Link
              key={`${action.label}-${action.href}`}
              to={action.href}
              className={index === 0 ? "btn-primary" : "btn-outline"}
            >
              {action.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
