import Link from "next/link";
import { Reveal } from "@/components/landing/motion/primitives";
import { PRICING } from "@/lib/site";

const money = (n: number) => `${PRICING.currency}${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

/**
 * The three plans at a glance, high up the page, so nobody has to reach the bottom or
 * click away to find out what RingPost costs. Full detail lives on /pricing.
 */
export function PlansSnapshot() {
  return (
    <section id="plans" className="relative z-10 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-pink)]">Plans</p>
          <h2 className="mb-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Three plans, one {money(PRICING.setup.amount)} setup, a week free.
          </h2>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Your {PRICING.trial.days}-day free trial starts the moment setup is paid. Cancel in that week and the setup fee comes
            back in full; stay {PRICING.setupCredit.afterDays} paid days and half of it comes back anyway.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80}>
              <div
                className={`flex h-full flex-col border p-6 ${plan.highlight ? "border-[var(--brand-pink)]/50 bg-[var(--brand-pink)]/[0.05]" : "border-foreground/10 bg-foreground/[0.02]"}`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">{plan.name}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl tracking-tight">{money(plan.monthly)}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>
                <p className="mt-4 font-mono text-xs text-foreground/70">
                  {plan.minutes.toLocaleString()} min · {plan.messages.toLocaleString()} messages a month
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link href="/pricing" className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4">
          Compare every feature, see top-ups and the fine print
        </Link>
      </div>
    </section>
  );
}
