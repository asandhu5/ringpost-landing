"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SplitText } from "@/components/landing/motion/primitives";
import { ScrollLine } from "@/components/landing/motion/scroll-primitives";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

/**
 * The objections a local business owner actually raises on a first call,
 * answered plainly.
 *
 * Two rules held throughout:
 *  1. No answer claims a capability the product doesn't have. "Does it
 *     sound human?" is answered honestly rather than aspirationally.
 *  2. No invented numbers. There is no "our customers see a 40% lift" here,
 *     because there is no data yet to support one.
 */
const faqs = [
  {
    q: "Do I have to change my phone number?",
    a: "No. Your existing number keeps working exactly as it does now — RingPost sits alongside it. If you'd rather have a separate number for the AI to answer, we can set one up for you during onboarding. Either way, nothing about how customers already reach you has to change.",
  },
  {
    q: "What happens if the AI doesn't know the answer?",
    a: "It hands the conversation to you rather than guessing. You'll see it flagged in your dashboard, and you can take over the conversation yourself at any point. The AI only states prices, hours and availability that it has just looked up from your real business data — if it doesn't have the answer, it says so and escalates instead of inventing one.",
  },
  {
    q: "Will my customers know they're talking to an AI?",
    a: "On a phone call it introduces itself as the business's virtual receptionist — that's both the honest thing to do and, in many places, a legal requirement. In text and messaging it answers in your business's voice. We don't pretend a machine is a person, and we'd steer you away from any setup that did.",
  },
  {
    // The single most important answer on this page. A visitor who leaves
    // thinking "AI receptionist" will price-anchor against the $25–125/mo
    // tools and read our price as absurd. This resets the category before
    // they ever reach the cost question further down.
    q: "How is this different from the cheaper AI receptionists I've seen?",
    a: "Those answer your phone, and most of them do it well. That's roughly a quarter of what RingPost does. The rest is the work that never gets done because nobody has time for it: marketing content generated and published across nine platforms, reviews read and answered, patterns flagged when several customers say the same thing, and customers who haven't been back in a while quietly followed up. If all you need is someone to pick up the phone, a cheaper tool will do that fine. RingPost is for owners who also don't have a marketing person.",
  },
  {
    q: "Do I have to write the marketing content myself?",
    a: "No. It's generated from your own business — your services, your prices, your brand voice — as finished images and short videos, with your logo and pricing already composited onto them. Everything lands in an approvals queue where you can edit it, approve it or bin it before anything goes out in your name. If you'd rather it just run, you can switch autopilot on per platform.",
  },
  {
    q: "What does it actually do about reviews?",
    a: "It reads every review as it arrives, drafts a reply in your voice, and holds it for you — nothing is posted in your name until you approve it. It also watches for patterns across reviews. If four people this month independently mention the same thing, it tells you, instead of leaving you to spot it yourself across weeks of reading them one at a time between jobs.",
  },
  {
    q: "How long does setup take?",
    a: "We set each business up individually rather than handing you a signup form and wishing you luck. Once we have your services, prices, hours and policies, most of the configuration happens on our side. The realistic bottleneck is external: connecting a phone number and getting messaging approvals through the carriers and platforms can take days to a few weeks depending on the channel. We'll tell you what applies to you on the call.",
  },
  {
    q: "I already have someone answering the phone. Why would I need this?",
    a: "Because nobody answers every call. The AI covers the gaps — evenings, weekends, the twenty minutes your receptionist is with a customer, the call that comes in while the phone's already engaged. It's not a replacement for your team; it's what catches the calls your team was never going to reach.",
  },
  {
    q: "What does it cost?",
    a: "A one-time setup fee plus a flat monthly fee — no tiers, no per-message pricing, no surprise overage bills. We quote it on the call once we understand your business, because setup genuinely differs between a two-chair salon and a multi-room clinic.",
  },
  {
    q: "Who owns my customer data?",
    a: "You do. Your customer list, conversation history and bookings are yours — we process them to run the service for you and nothing else. We don't sell data to anyone. Every third party involved in running the platform is named openly in our privacy policy rather than hidden behind a phrase like “trusted partners”.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time. Cancelling takes effect at the end of the billing period you've already paid for — no lock-in contract, no notice period, no cancellation fee. The full detail is in our refund policy.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-pink)]">
                Questions
              </p>
            </Reveal>

            <h2 className="mb-8 font-display text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-[56px]">
              <SplitText text={["The things", "owners ask"]} stagger={55} />
              <SplitText
                text="on the first call."
                delay={200}
                stagger={55}
                className="text-muted-foreground"
              />
            </h2>

            <Reveal delay={260}>
              <ScrollLine className="mb-8 max-w-[180px]" />
            </Reveal>

            <Reveal delay={320}>
              <p className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
                If yours isn&rsquo;t here, ask it directly — a real answer beats
                a page of marketing copy.
              </p>
            </Reveal>

            <Reveal delay={380}>
              <div className="flex flex-col gap-3 text-sm">
                <a
                  href={BOOKING_URL}
                  className="group inline-flex w-fit items-center gap-2 text-foreground transition-colors"
                >
                  Book a call
                  <span className="h-px w-8 bg-[var(--brand-pink)] transition-all duration-400 group-hover:w-12" />
                </a>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="w-fit text-muted-foreground transition-colors hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <Accordion
                type="single"
                collapsible
                className="border-t border-foreground/10"
              >
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`item-${i}`}
                    className="border-b border-foreground/10"
                  >
                    <AccordionTrigger className="py-6 text-left text-lg font-normal text-foreground hover:no-underline md:text-xl [&[data-state=open]]:text-[var(--brand-pink)]">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-6 text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
