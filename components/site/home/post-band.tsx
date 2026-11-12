"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { AppScreen, DARK_APPS, type PreviewPlatform, type PreviewPost } from "@/components/site/phone/apps";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { Button } from "@/components/site/ui/button";
import { cx } from "@/components/site/ui/cx";
import { Container, Eyebrow, Section } from "@/components/site/ui/primitives";
import { POST_BAND } from "@/lib/content/home";
import { ROUTES } from "@/lib/routes";

type Post = (typeof POST_BAND.posts)[number];
const POSTS = POST_BAND.posts;
const N = POSTS.length;
const HOLD_MS = 3200;

/** A Google Business update, in Google's own look (the phone previews cover the other nine). */
function GoogleUpdate({ post }: { post: Post }) {
  return (
    <div className="flex h-full flex-col bg-white pt-[62px] text-[#202124]">
      <div className="flex items-center gap-3 border-b border-[#e8eaed] px-5 pb-4">
        <ChannelLogo id="google_business_profile" size={44} />
        <div>
          <p className="text-[19px] font-medium leading-tight">{post.business.name}</p>
          <p className="text-[14px] text-[#5f6368]">Plumber · Open now</p>
        </div>
      </div>
      <p className="px-5 pt-4 text-[15px] font-medium text-[#1967d2]">Updates</p>
      <div className="mx-5 mt-3 overflow-hidden rounded-[14px] border border-[#dadce0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.media.src} alt={post.media.alt} className="aspect-[4/3] w-full object-cover" />
        <div className="p-4">
          <p className="text-[17px] leading-snug">{post.caption}</p>
          <p className="mt-2 text-[14px] text-[#5f6368]">Posted just now</p>
          <span className="mt-3 inline-flex rounded-full border border-[#dadce0] px-4 py-2 text-[15px] font-medium text-[#1967d2]">Call now</span>
        </div>
      </div>
    </div>
  );
}

/**
 * "Post everywhere": ten phones in a 3D carousel, each a different app in its own look
 * with different content. It turns by itself, one app at a time, so every one (Google
 * Business included) comes to the front; the visitor can also click a phone, use the
 * arrows, swipe, or pause it. Instagram starts at the front.
 */
export function PostBand() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(false);
  const swipe = useRef<number | null>(null);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || hold || !inView || !motion) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % N), HOLD_MS);
    return () => clearTimeout(t);
  }, [active, playing, hold, inView, motion]);

  const go = useCallback((i: number) => setActive(((i % N) + N) % N), []);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(active + 1);
    else if (e.key === "ArrowLeft") go(active - 1);
    else return;
    e.preventDefault();
    setPlaying(false);
  };

  const cur = POSTS[active];
  return (
    <Section fit className="overflow-hidden">
      <Container className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <Eyebrow area="create">{POST_BAND.eyebrow}</Eyebrow>
          <h2 className="mt-2.5 max-w-[40rem] font-display text-h2 text-ink">{POST_BAND.title}</h2>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <Button href={ROUTES.studio} variant="text">How Content Studio works</Button>
          <Button href={ROUTES.posting} variant="text">How posting works</Button>
        </div>
      </Container>

      <div
        ref={root}
        role="region"
        aria-roledescription="carousel"
        aria-label="The same kind of post, made for ten apps"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) < 40) return;
          go(active + (dx < 0 ? 1 : -1));
          setPlaying(false);
        }}
        className="relative mx-auto mt-[clamp(0.5rem,2svh,1.5rem)] h-[clamp(330px,58svh,520px)] max-w-[1400px] touch-pan-y select-none outline-none"
        style={{ perspective: "1800px" }}
      >
        {POSTS.map((post, i) => {
          let o = i - active;
          if (o > N / 2) o -= N;
          if (o < -N / 2) o += N;
          const a = Math.abs(o);
          const hidden = a > 2;
          return (
            <button
              key={post.platform}
              type="button"
              tabIndex={-1}
              aria-hidden={o !== 0}
              onClick={() => {
                go(i);
                setPlaying(false);
              }}
              className="absolute left-1/2 top-0 h-[calc(100%-44px)] origin-center transition-[transform,opacity,filter] duration-[800ms] ease-rp"
              style={{
                aspectRatio: "0.48",
                transform: `translateX(-50%) translateX(${o * 62}%) translateZ(${-a * 140}px) rotateY(${o * -26}deg)`,
                // Side phones are dimmed with a filter, not transparency, so their text keeps its contrast.
                opacity: hidden ? 0 : 1,
                filter: o === 0 ? "none" : `saturate(${1 - a * 0.2}) brightness(${1 - a * 0.04})`,
                zIndex: 10 - a,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              {/* Only the nearest phones are drawn, and only the front one plays its video:
                  the others show its still, which keeps the page light on a phone. */}
              {!hidden && (
                <IPhone16ProMax width={260} dark={DARK_APPS.has(post.platform as PreviewPlatform)} className="!max-w-none">
                  {post.platform === "google_business_profile" ? <GoogleUpdate post={post} /> : <AppScreen platform={post.platform as PreviewPlatform} post={(o === 0 || post.media.kind !== "video" ? post : { ...post, media: { kind: "image", src: post.media.poster, alt: post.media.alt } }) as unknown as PreviewPost} />}
                </IPhone16ProMax>
              )}
            </button>
          );
        })}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-3" aria-live="polite">
          <button type="button" onClick={() => { go(active - 1); setPlaying(false); }} aria-label="Previous app" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-rp-1 hover:border-primary-line">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <p className="flex min-w-[13rem] items-center justify-center gap-2 whitespace-nowrap text-small font-semibold text-ink">
            <ChannelLogo id={cur.platform} size={24} />
            {cur.name}
            <span className="font-normal text-muted-ink">{cur.format}</span>
          </p>
          <button type="button" onClick={() => { go(active + 1); setPlaying(false); }} aria-label="Next app" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-rp-1 hover:border-primary-line">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
          {motion && (
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} className="flex h-11 w-11 items-center justify-center rounded-full text-muted-ink hover:text-ink">
              {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
            </button>
          )}
        </div>
      </div>
      <ol className="mt-3 flex justify-center gap-0.5" aria-label="Apps">
        {POSTS.map((p, i) => (
          <li key={p.platform}>
            <button type="button" onClick={() => { go(i); setPlaying(false); }} aria-label={`Show ${p.name}`} aria-current={i === active} className="flex h-6 min-w-6 items-center justify-center">
              <span className={cx("block h-1.5 rounded-full transition-all duration-300", i === active ? "w-6 bg-violet" : "w-1.5 bg-line-strong")} />
            </button>
          </li>
        ))}
      </ol>
    </Section>
  );
}
