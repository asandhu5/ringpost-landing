import type { Metadata } from "next";
import { RingStill } from "@/components/site/three/ring-still";
import { Button } from "@/components/site/ui/button";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

/** A friendly dead end: the ring, one line, and the three places people are usually headed. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden className="rp-hero-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[720px] px-4 py-12 text-center sm:px-6">
        <RingStill id="lost-ring" className="mx-auto h-[clamp(96px,20svh,160px)] w-[clamp(96px,20svh,160px)]" />
        <p className="mt-6 text-small font-semibold text-violet">Page not found</p>
        <h1 className="mt-2 font-display text-h1 text-ink">This page went quiet.</h1>
        <p className="mx-auto mt-4 max-w-[30rem] text-body text-muted-ink">The link may be old, or the address mistyped. Here is where most people are headed.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/">Home</Button>
          <Button href={ROUTES.pricing} variant="secondary">Pricing</Button>
          <Button href={ROUTES.contact} variant="secondary">Contact</Button>
        </div>
      </div>
    </section>
  );
}
