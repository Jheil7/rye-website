import Link from "next/link";
import { Reveal } from "./Reveal";

type PageHeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

type PageHeroStat = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: PageHeroAction[];
  stats?: PageHeroStat[];
};

function PageHeroLink({ action }: { action: PageHeroAction }) {
  const className =
    action.variant === "secondary"
      ? "arcane-button-secondary"
      : "arcane-button-primary";

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  stats = [],
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-8 pb-14 sm:pt-10">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="arcane-panel relative overflow-hidden px-7 py-9 sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,125,255,0.75),transparent)]"
          />

          <div className="max-w-3xl">
            <div className="arcane-kicker">{eyebrow}</div>
            <h1 className="arcane-title mt-4 max-w-3xl text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95]">
              {title}
            </h1>
            <p className="arcane-copy mt-5 max-w-2xl text-base sm:text-lg">
              {description}
            </p>
          </div>

          {actions.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <PageHeroLink
                  key={`${action.href}-${action.label}`}
                  action={action}
                />
              ))}
            </div>
          ) : null}

          {stats.length ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/8 bg-white/4 px-5 py-4 backdrop-blur-md"
                >
                  <div className="font-cinzel text-3xl font-bold text-[#f1e8fd]">
                    {stat.value}
                  </div>
                  <div className="font-rajdhani mt-2 text-xs font-semibold tracking-[0.35em] text-[#9c90b3] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
