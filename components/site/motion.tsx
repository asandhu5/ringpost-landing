"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-motion";

/**
 * The site's small motion kit (2026-10-22 redesign). Everything here is CSS-driven or
 * runs off IntersectionObserver / a single scroll listener, so pages stay static and fast,
 * and anyone who asked their OS for reduced motion gets the finished state at once.
 */

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>(options: IntersectionObserverInit = { rootMargin: "0px 0px -10% 0px", threshold: 0 }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/** Children rise in one after another as the group scrolls into view. */
export function Stagger({ children, className, step = 90 }: { children: React.ReactNode[]; className?: string; step?: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} className={`rp-stagger ${inView ? "is-in" : ""}`} style={{ transitionDelay: `${i * step}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}

/** A number that counts up from zero the first time it is seen. */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) return setValue(to);
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** A card with a soft light that follows the cursor across it (PointerGlow sets the
 * position, site-wide). */
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rp-spotlight ${className ?? ""}`}>{children}</div>;
}

/** A thin bar along the top of the window showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} aria-hidden className="rp-progress fixed inset-x-0 top-0 z-[60] h-[2px] origin-left" style={{ transform: "scaleX(0)" }} />;
}

/** An endless horizontal ribbon. The list is drawn twice so the loop has no seam. */
export function Marquee({ children, className, reverse = false, speed = 45 }: { children: React.ReactNode; className?: string; reverse?: boolean; speed?: number }) {
  return (
    <div className={`rp-marquee-mask overflow-hidden ${className ?? ""}`}>
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        <div className="flex gap-3">{children}</div>
        <div aria-hidden className="flex gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Any list or grid whose items should rise in one after another when it scrolls into
 * view. The children keep their own markup (it can be an <ol>, a <dl>, a grid of cards):
 * this only adds a class to the container, and the CSS staggers its direct children.
 */
export function InViewGroup({
  as: Tag = "div",
  className,
  children,
  ...rest
}: { as?: "div" | "ul" | "ol" | "dl" | "section"; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref as React.Ref<never>} className={`rp-group ${inView ? "is-in" : ""} ${className ?? ""}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * One listener for the whole site: whichever card the pointer is over gets the light
 * under it. Cards opt in with `rp-card-hover` or `rp-spotlight`; nothing else runs.
 */
export function PointerGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".rp-card-hover, .rp-spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
