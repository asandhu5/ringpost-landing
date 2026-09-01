"use client";

import { useRef, useState } from "react";
import {
  Reveal,
  Scramble,
  SplitText,
} from "@/components/landing/motion/primitives";
import { useReducedMotion } from "@/hooks/use-motion";
import {
  ScrollLine,
  VelocitySkew,
} from "@/components/landing/motion/scroll-primitives";

/* ==================================================================
 *  EVERYTHING INCLUDED
 *  The complete offer in one place — every channel, every platform,
 *  every capability named explicitly rather than summarised. This is
 *  the section a sceptical owner scrolls to when they want to know
 *  exactly what they're getting.
 * ================================================================== */

const groups = [
  {
    key: "answering",
    label: "Answering",
    headline: "Every conversation, picked up",
    items: [
      { name: "Phone calls", detail: "answered live, 24/7" },
      { name: "Text messages", detail: "replied to instantly" },
      { name: "WhatsApp", detail: "chats handled end to end" },
      { name: "Instagram DMs", detail: "answered in the inbox" },
      { name: "Facebook Messenger", detail: "answered in the inbox" },
      { name: "Email", detail: "read, answered, and routed" },
      { name: "Website chat", detail: "widget on your own site" },
      { name: "Missed-call text-back", detail: "within about 90 seconds" },
    ],
  },
  {
    key: "booking",
    label: "Booking & customers",
    headline: "Real appointments, real records",
    items: [
      { name: "Booking on any channel", detail: "call, text, DM, or email" },
      { name: "Google Calendar sync", detail: "written automatically" },
      { name: "No double-booking", detail: "slots checked before offering" },
      { name: "No manual entry", detail: "nothing to retype" },
      { name: "Customer records", detail: "built from every conversation" },
      { name: "Contact details", detail: "who they are, how to reach them" },
      { name: "Preferred channel", detail: "stored per customer" },
      { name: "Last visit", detail: "tracked automatically" },
      { name: "Searchable list", detail: "you never build it by hand" },
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    headline: "Content made, posted, and watched",
    items: [
      { name: "Promo images", detail: "generated on-brand" },
      { name: "Short videos", detail: "generated on-brand" },
      { name: "Seasonal offers", detail: "made for you" },
      { name: "Your logo composited", detail: "onto every asset" },
      { name: "Your pricing composited", detail: "onto every asset" },
      { name: "Instagram · Facebook · TikTok", detail: "published from one place" },
      { name: "YouTube · X · LinkedIn", detail: "published from one place" },
      { name: "Threads · Bluesky · Pinterest", detail: "published from one place" },
    ],
  },
  {
    key: "reviews",
    label: "Reviews & dashboard",
    headline: "Reputation handled, all in one view",
    items: [
      { name: "Reviews read", detail: "as they come in" },
      { name: "Replies drafted", detail: "for you to approve" },
      { name: "Pattern spotting", detail: "repeated complaints flagged" },
      { name: "One owner dashboard", detail: "every conversation" },
      { name: "Bookings in one place", detail: "nothing to cross-check" },
      { name: "Customers in one place", detail: "the whole list" },
      { name: "Content in one place", detail: "made and scheduled" },
      { name: "One login", detail: "not five different tools" },
    ],
  },
] as const;

/* A card that lights up radially from wherever the pointer sits. */
function GlowItem({
  name,
  detail,
  index,
}: {
  name: string;
  detail: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className="group relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors duration-500 hover:border-[var(--brand-pink)]/40"
      style={{ transitionDelay: `${index * 12}ms` }}
    >
      {pos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(190px circle at ${pos.x}px ${pos.y}px, rgba(236,168,214,0.16), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-start gap-3">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-pink)]/50 transition-all duration-500 group-hover:scale-150 group-hover:bg-[var(--brand-pink)]" />
        <div>
          <span className="block text-sm font-medium leading-snug">{name}</span>
          <span className="mt-1 block text-xs leading-snug text-muted-foreground">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );
}

export function IncludedSection() {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      id="included"
      className="relative z-10 overflow-hidden bg-[var(--surface-2)] py-32 lg:py-40"
    >
      {/* soft brand wash so this block reads as part of the same world */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[var(--brand-violet)]/[0.07] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[var(--brand-pink)]/[0.07] blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-muted-foreground">
                <span className="h-px w-12 bg-foreground/25" />
                <Scramble text="What's included" />
              </span>
            </Reveal>

            <h2 className="font-display text-5xl leading-[0.92] tracking-tight md:text-6xl lg:text-[110px]">
              <SplitText text="Everything" stagger={75} />
              <SplitText
                text="in one desk."
                delay={160}
                stagger={75}
                className="text-muted-foreground"
              />
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={220}>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Not a phone bot with add-ons. Every capability below is part of
                the same system, running on the same customer records, in the
                same dashboard.
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl text-[var(--brand-pink)]">
                  {total}
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  things it does for you
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* group switcher */}
        <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              className={`group relative overflow-hidden border-t-2 px-1 pb-2 pt-4 text-left transition-all duration-500 ${
                active === i
                  ? "border-[var(--brand-pink)]"
                  : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              <span
                className={`block font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  active === i ? "text-[var(--brand-pink)]" : "text-muted-foreground"
                }`}
              >
                {g.label}
              </span>
              <span
                className={`mt-1.5 block text-lg transition-colors duration-500 ${
                  active === i ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {g.items.length} included
              </span>
            </button>
          ))}
        </div>

        {/* active group */}
        <div key={group.key} className="animate-bubble-in">
          <h3 className="mb-6 font-display text-2xl lg:text-3xl">
            {group.headline}
          </h3>

          <VelocitySkew strength={2}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {group.items.map((item, i) => (
              <GlowItem
                key={item.name}
                name={item.name}
                detail={item.detail}
                index={i}
              />
            ))}
          </div>
          </VelocitySkew>
        </div>

        <Reveal delay={200}>
          <p className="mt-10 border-t border-foreground/10 pt-6 font-mono text-sm text-muted-foreground">
            Set up on your business&apos;s own services, prices, hours, and
            policies — whatever kind of business you run.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
