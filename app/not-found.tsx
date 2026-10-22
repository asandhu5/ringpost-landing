import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHero, Section, TrialButtons } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Where most people are headed when a link breaks. */
const PLACES = [
  { href: "/product", title: "What RingPost does", body: "The AI front desk, from answering to booking." },
  { href: "/industries", title: "Your kind of business", body: "How it works for salons, clinics, trades, restaurants and more." },
  { href: "/pricing", title: "Pricing", body: "Three plans, no setup fee." },
  { href: "/resources/blog", title: "Blog", body: "Guides for local businesses." },
  { href: "/faq", title: "Questions", body: "Setup, numbers, channels and the AI." },
  { href: "/contact", title: "Contact", body: "Talk to the RingPost team." },
];

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="This page isn't here." lede="The link may be old, or the address mistyped. These are the places most people are looking for.">
        <TrialButtons />
      </PageHero>
      <Section className="!pt-0">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLACES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="rp-card rp-card-hover group flex h-full items-start justify-between gap-4 rounded-2xl p-6">
                  <span>
                    <span className="block text-[16px] font-medium text-ink">{p.title}</span>
                    <span className="mt-1 block text-[14px] text-muted-ink">{p.body}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
