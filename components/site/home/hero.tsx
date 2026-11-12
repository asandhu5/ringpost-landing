import { Check, PhoneMissed, Sparkles, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { RingStage } from "@/components/site/three/ring-stage";
import { Button } from "@/components/site/ui/button";
import { HERO } from "@/lib/content/home";
import { START_URL } from "@/lib/site";

const RESULT_ICON: Record<string, React.ReactNode> = {
  call: <span className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-[0.7em] bg-grow-soft text-grow"><PhoneMissed className="h-[1.2em] w-[1.2em]" strokeWidth={1.75} aria-hidden /></span>,
  instagram: <span className="flex h-[2.4em] w-[2.4em] items-center justify-center [&>*]:!h-full [&>*]:!w-full"><ChannelLogo id="instagram" size={32} /></span>,
  post: <span className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-[0.7em] bg-create-soft text-create"><Sparkles className="h-[1.2em] w-[1.2em]" strokeWidth={1.75} aria-hidden /></span>,
  review: <span className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-[0.7em] bg-amber-soft text-amber"><Star className="h-[1.2em] w-[1.2em]" strokeWidth={1.75} aria-hidden /></span>,
};

/** The four corners of the stage: clear of the ring and of each other at every size. */
const SLOTS = ["left-0 top-0", "right-0 top-0", "right-0 bottom-0", "left-0 bottom-0"];

/**
 * The first screen. Everything a visitor needs — what it is, the promise, the button and
 * the picture — sits inside one screen: sizes follow the screen's height as well as its
 * width. The ring takes in what you tell it (left) and results settle around it.
 */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="rp-hero-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col gap-[clamp(1rem,3svh,2rem)] px-4 pb-[84px] pt-[calc(var(--header-h)+clamp(0.75rem,3svh,2rem))] sm:px-6 lg:h-[100svh] lg:max-h-[920px] lg:min-h-[560px] lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:pb-[76px]">
        <div className="relative z-10 lg:w-[50%] lg:shrink-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-small font-semibold text-ink backdrop-blur">
            <span aria-hidden className="h-2 w-2 rounded-full bg-cta shadow-[0_0_0_3px_rgba(34,211,238,0.25)]" />
            {HERO.eyebrow}
          </p>
          <h1 className="mt-[clamp(0.9rem,2.6svh,1.5rem)] font-display text-display text-ink">
            {HERO.headline[0]}
            <br />
            <span className="rp-ink-gradient">{HERO.headline[1]}</span>
          </h1>
          <p className="mt-[clamp(0.9rem,2.6svh,1.5rem)] max-w-[33rem] text-body text-muted-ink lg:text-[clamp(1.0625rem,min(1.45vw,2.9svh),1.25rem)]">{HERO.promise}</p>
          <div className="mt-[clamp(1.1rem,3.4svh,2rem)] flex flex-wrap items-center gap-3">
            <Button href={START_URL}>{HERO.primary}</Button>
            <Button href="#see-it-work" variant="secondary">
              {HERO.secondary}
            </Button>
          </div>
        </div>

        {/* The picture: fills what is left of the screen and never more. */}
        <div className="relative flex flex-1 items-center justify-center lg:h-full lg:min-h-0 lg:min-w-0">
          <div className="rp-hero-stage relative aspect-[1.3] w-full max-w-[420px] lg:aspect-[1.12] sm:max-w-[540px] lg:h-full lg:max-h-[min(100%,540px)] lg:w-auto lg:max-w-full" role="img" aria-label="What you tell RingPost goes in once. Out come booked calls, answered messages, published posts and answered reviews.">
            <div aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(124,107,255,0.2),transparent_65%)] blur-2xl" />
            {/* What you tell it, flowing in from the left along the middle line. */}
            {HERO.inputs.map((t, i) => (
              <span key={t} aria-hidden className="rp-hero-pill absolute left-0 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-primary-line bg-white px-[0.9em] py-[0.5em] font-semibold text-violet shadow-rp-2 motion-safe:block" style={{ "--i": i } as React.CSSProperties}>
                {t}
              </span>
            ))}
            <RingStage className="absolute inset-0" scale={0.6} stillInset="27% 25.5%" />
            {HERO.results.map((r, i) => (
              <div key={r.id} aria-hidden className={`rp-hero-chip absolute ${SLOTS[i]} flex w-[46%] items-center gap-[0.7em] rounded-rp-sm border border-white/80 bg-white/90 p-[0.7em] shadow-rp-2 backdrop-blur-md`} style={{ "--i": i } as React.CSSProperties}>
                {RESULT_ICON[r.id]}
                <span className="min-w-0 leading-tight">
                  <span className="block truncate font-semibold text-ink">{r.title}</span>
                  <span className="mt-[0.15em] flex items-center gap-[0.3em] text-[0.93em] text-muted-ink">
                    <Check className="h-[1em] w-[1em] shrink-0 text-grow" strokeWidth={2.5} aria-hidden />
                    <span>{r.body}</span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
