"use client";

import { useState } from "react";
import {
  Car,
  Dumbbell,
  Scale,
  Scissors,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import { Reveal, SplitText } from "@/components/landing/motion/primitives";

/**
 * "Local business" is true but generic — a salon owner reading it has to do
 * the work of imagining themselves in it. These are the actual verticals the
 * platform ships templates for, each with the specific call that costs that
 * specific business money.
 *
 * Every scenario describes a situation, not a result. None of them claim an
 * outcome ("recovers 30% of missed bookings") because there's no data behind
 * a number like that yet.
 */
const verticals = [
  {
    id: "salon",
    label: "Salons & spas",
    icon: Scissors,
    headline: "The grid hasn't moved in three weeks.",
    body: "You finish a colour you're genuinely proud of and mean to post it. Then it's eight o'clock, you're sweeping up, and it never happens. Three weeks later your Instagram looks abandoned to anyone deciding where to book. RingPost makes the posts from your own services and prices, with your logo and pricing already on them, and puts them out.",
    detail: "Eleven platforms. Your branding. Nothing posts until you approve it.",
  },
  {
    id: "dental",
    label: "Dental clinics",
    icon: Stethoscope,
    headline: "Sixty calls a day, one front desk.",
    body: "Appointment requests, insurance questions, a last-minute cancellation that just opened a slot someone else wants. Your front desk can't be on three calls at once. RingPost answers the routine ones, books the straightforward ones, and escalates anything clinical straight to your team.",
    detail: "Routine questions handled. Anything clinical goes to a human.",
  },
  {
    id: "gym",
    label: "Gyms & studios",
    icon: Dumbbell,
    headline: "Enquiries arrive at 10pm, not 10am.",
    body: "Someone decides to join at eleven at night, messages your Instagram, and hears nothing until morning. By then the impulse is gone. RingPost answers then, with your real class times and membership pricing, and books the trial session while they still want it.",
    detail: "Answers on Instagram and WhatsApp, where fitness enquiries actually arrive.",
  },
  {
    id: "restaurant",
    label: "Restaurants",
    icon: UtensilsCrossed,
    headline: "Four people said the same thing and nobody noticed.",
    body: "You read reviews one at a time, between shifts, weeks apart, so you never spot that four of them this month mention the wait on a Friday. RingPost reads every one as it lands, drafts a reply in your voice for you to approve, and tells you when several customers are independently saying the same thing.",
    detail: "Every review answered. Patterns surfaced before they become a rating.",
  },
  {
    id: "detailing",
    label: "Auto & detailing",
    icon: Car,
    headline: "You're under a car, not next to a phone.",
    body: "Quotes are the whole game and they always come by phone. RingPost answers with your actual pricing for the job they're describing, books them into a real slot, and texts a confirmation while you keep working.",
    detail: "Quotes from your real price list, never a guess.",
  },
  {
    id: "law",
    label: "Consultations",
    icon: Scale,
    headline: "The first call decides whether they hire you.",
    body: "A prospective client rings three firms. The one that answers gets the consultation. RingPost picks up on the first ring, captures what the matter is about, and books the initial consultation into your calendar without you leaving what you're doing.",
    detail: "Captures the enquiry, books the consult, never gives legal advice.",
  },
];

export function VerticalsSection() {
  const [active, setActive] = useState(0);
  const current = verticals[active];
  const Icon = current.icon;

  return (
    <section
      id="verticals"
      className="relative z-10 bg-[var(--surface-2)] py-16 sm:py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-pink)]">
            Built for your trade
          </p>
        </Reveal>

        <h2 className="mb-12 max-w-3xl font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-[56px]">
          <SplitText text="Every trade loses it" stagger={55} />
          <SplitText
            text="somewhere different."
            delay={180}
            stagger={55}
            className="text-muted-foreground"
          />
        </h2>

        {/* Selector */}
        <Reveal delay={180}>
          <div
            className="mb-12 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Business types"
          >
            {verticals.map((v, i) => {
              const isActive = i === active;
              return (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="vertical-panel"
                  onClick={() => setActive(i)}
                  // min-h-11 (44px) is the iOS/Android minimum comfortable
                  // touch target — without it these land at 42px on a phone.
                  className={`flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10 text-foreground"
                      : "border-foreground/15 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <v.icon className="h-3.5 w-3.5" />
                  {v.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <Reveal delay={260}>
          <div
            id="vertical-panel"
            role="tabpanel"
            className="relative border border-foreground/10 bg-background/40 p-8 lg:p-14"
          >
            {/* key forces a remount so the copy re-animates on switch */}
            <div key={current.id} className="animate-in fade-in duration-500">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-pink)]/30 bg-[var(--brand-pink)]/10">
                  <Icon
                    className="h-5 w-5 text-[var(--brand-pink)]"
                    aria-hidden="true"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {current.label}
                </span>
              </div>

              <h3 className="mb-6 max-w-2xl font-display text-2xl leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {current.headline}
              </h3>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {current.body}
              </p>

              <div className="flex items-center gap-3 border-t border-foreground/10 pt-6">
                <span className="h-px w-8 bg-[var(--brand-pink)]" />
                <p className="font-mono text-sm text-muted-foreground">
                  {current.detail}
                </p>
              </div>
            </div>

            {/* corner rules, matching the CTA block */}
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 border-b border-l border-foreground/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 border-r border-t border-foreground/10" />
          </div>
        </Reveal>

        <Reveal delay={340}>
          <p className="mt-8 text-sm text-muted-foreground">
            Not on this list? Every one of these runs on the same platform, so
            you get the answering, the booking, the content and the reviews
            whichever trade you&rsquo;re in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
