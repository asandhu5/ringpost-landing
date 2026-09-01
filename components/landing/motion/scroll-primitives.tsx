"use client";

import { useMemo, type CSSProperties, type ReactNode } from "react";
import {
  useScrollTrigger,
  useScrollVelocity,
} from "@/hooks/use-scroll-motion";
import {
  useInView,
  useIsMobileDevice,
  useReducedMotion,
} from "@/hooks/use-motion";

/* ==================================================================
 *  SCROLL-SCRUBBED PRIMITIVES
 *  Techniques borrowed from the GSAP showcase set — scroll-scrubbed
 *  zoom, clip-path mask reveals, velocity skew — rebuilt on the
 *  native scroll hooks so the bundle stays light.
 * ================================================================== */

/* ------------------------------------------------------------------ *
 *  ScrollScrub
 *  Scale + opacity tied directly to scroll position rather than to a
 *  fixed timer. Scroll up and it plays backwards — that reversibility
 *  is what separates a scrub from a one-shot reveal.
 * ------------------------------------------------------------------ */
export function ScrollScrub({
  children,
  from = 0.86,
  to = 1,
  fade = true,
  className = "",
}: {
  children: ReactNode;
  /** Scale at the start of the scroll range. */
  from?: number;
  /** Scale at the end. */
  to?: number;
  fade?: boolean;
  className?: string;
}) {
  const [ref, progress] = useScrollTrigger<HTMLDivElement>();
  const reduced = useReducedMotion();

  /* Ease the raw linear progress so the middle of the range moves
     fastest — a flat lerp reads mechanical. */
  const eased = 1 - Math.pow(1 - Math.min(progress * 1.35, 1), 3);
  const scale = from + (to - from) * eased;

  const style: CSSProperties = reduced
    ? {}
    : {
        transform: `scale(${scale.toFixed(4)})`,
        opacity: fade ? Math.min(0.35 + eased * 0.9, 1) : 1,
        willChange: "transform, opacity",
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  MaskReveal
 *  Wipes content in behind a moving clip-path edge instead of fading
 *  it. Much sharper than an opacity transition for big imagery and
 *  full-bleed panels.
 * ------------------------------------------------------------------ */
export function MaskReveal({
  children,
  direction = "up",
  duration = 1200,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();

  const hidden = useMemo(() => {
    switch (direction) {
      case "up":
        return "inset(100% 0 0 0)";
      case "down":
        return "inset(0 0 100% 0)";
      case "left":
        return "inset(0 0 0 100%)";
      default:
        return "inset(0 100% 0 0)";
    }
  }, [direction]);

  const style: CSSProperties = reduced
    ? {}
    : {
        clipPath: inView ? "inset(0 0 0 0)" : hidden,
        transition: `clip-path ${duration}ms cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms`,
        willChange: "clip-path",
      };

  /* The observed element and the clipped element MUST be different
     nodes. `clip-path: inset(100%)` zeroes an element's paint area,
     and the browser then reports it as not intersecting — so if the
     observer watched the clipped node it would never fire, and the
     reveal would stay shut forever. Outer div observes, inner clips. */
  return (
    <div ref={ref} className={className}>
      <div className="h-full w-full" style={style}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  VelocitySkew
 *  Skews and squashes slightly in proportion to scroll speed, then
 *  springs back to rest. Subtle by design — you should feel it more
 *  than notice it.
 * ------------------------------------------------------------------ */
export function VelocitySkew({
  children,
  strength = 3,
  className = "",
}: {
  children: ReactNode;
  /** Max skew in degrees at full scroll velocity. */
  strength?: number;
  className?: string;
}) {
  const velocity = useScrollVelocity();
  const reduced = useReducedMotion();
  const isMobile = useIsMobileDevice();

  // Transform on a large grid forces a repaint of the whole subtree.
  // Fine on desktop, expensive on a phone — skip it entirely.
  if (reduced || isMobile) return <div className={className}>{children}</div>;

  return (
    <div
      className={className}
      style={{
        transform: `skewY(${(velocity * strength).toFixed(3)}deg) scaleY(${(
          1 - Math.abs(velocity) * 0.03
        ).toFixed(4)})`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  ScrollLine
 *  A rule that draws itself across as the section scrolls past.
 *  Cheap, and it gives long pages a sense of forward motion.
 * ------------------------------------------------------------------ */
export function ScrollLine({ className = "" }: { className?: string }) {
  const [ref, progress] = useScrollTrigger<HTMLDivElement>();
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`h-px w-full overflow-hidden bg-foreground/10 ${className}`}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[var(--brand-violet)] via-[var(--brand-pink)] to-transparent"
        style={{
          transform: reduced
            ? "scaleX(1)"
            : `scaleX(${Math.min(progress * 1.6, 1).toFixed(3)})`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  ScrollCharStagger
 *  Characters resolve one at a time as the block scrolls through the
 *  viewport, rather than all at once on entry. Scrubbing it to scroll
 *  means the reader controls the pace of the reveal.
 * ------------------------------------------------------------------ */
export function ScrollCharStagger({
  text,
  className = "",
  dimColor = "text-foreground/15",
}: {
  text: string;
  className?: string;
  dimColor?: string;
}) {
  const [ref, progress] = useScrollTrigger<HTMLParagraphElement>();
  const reduced = useReducedMotion();
  const words = text.split(" ");

  // Consume the middle 55% of the scroll range so the sentence is
  // fully lit well before the block leaves the screen.
  const p = Math.max(0, Math.min(1, (progress - 0.15) / 0.55));

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const threshold = i / words.length;
        const lit = reduced || p >= threshold;
        return (
          <span
            key={`${word}-${i}`}
            className={`transition-colors duration-500 ${
              lit ? "text-foreground" : dimColor
            }`}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
