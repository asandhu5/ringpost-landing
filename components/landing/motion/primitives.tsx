"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useInView, useParallax, useReducedMotion } from "@/hooks/use-motion";

/* ================================================================== *
 *  Reveal
 *  Scroll-triggered fade + slide + de-blur. The workhorse used on
 *  almost every block on the page.
 * ================================================================== */
type RevealDirection = "up" | "down" | "left" | "right" | "none";

export function Reveal({
  children,
  delay = 0,
  duration = 900,
  distance = 28,
  direction = "up",
  blur = 8,
  className = "",
  as: Tag = "div",
  threshold,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: RevealDirection;
  blur?: number;
  className?: string;
  as?: "div" | "span" | "li" | "section" | "header" | "p";
  threshold?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: threshold ?? 0.15 });
  const reduced = useReducedMotion();

  const hidden = useMemo(() => {
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      default:
        return "none";
    }
  }, [direction, distance]);

  const style: CSSProperties = reduced
    ? {}
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : hidden,
        filter: inView ? "blur(0px)" : `blur(${blur}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform, filter",
      };

  const Component = Tag as "div";

  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}

/* ================================================================== *
 *  SplitText
 *  Splits a heading into words (or characters) and reveals them in a
 *  staggered blur-up. Used on every display-size headline so the big
 *  type actually performs rather than just fading.
 * ================================================================== */
export function SplitText({
  text,
  by = "word",
  delay = 0,
  stagger = 55,
  duration = 850,
  className = "",
  lineClassName = "",
}: {
  /** A single line, or an array of lines rendered as separate rows. */
  text: string | string[];
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  lineClassName?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const lines = Array.isArray(text) ? text : [text];

  let unitIndex = 0;

  return (
    <span ref={ref} className={className}>
      {lines.map((line, lineIdx) => {
        const units = by === "char" ? Array.from(line) : line.split(" ");

        return (
          <span
            key={`${line}-${lineIdx}`}
            className={`block ${lineClassName}`}
            style={{ overflow: "hidden", paddingBottom: "0.08em" }}
          >
            {units.map((unit, i) => {
              const idx = unitIndex++;
              const isSpace = unit === " ";

              const style: CSSProperties = reduced
                ? {}
                : {
                    display: "inline-block",
                    opacity: inView ? 1 : 0,
                    transform: inView
                      ? "translate3d(0,0,0)"
                      : "translate3d(0, 0.85em, 0)",
                    filter: inView ? "blur(0px)" : "blur(10px)",
                    transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
                      delay + idx * stagger
                    }ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
                      delay + idx * stagger
                    }ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
                      delay + idx * stagger
                    }ms`,
                  };

              return (
                <span key={`${unit}-${i}`} style={style}>
                  {isSpace ? "\u00A0" : unit}
                  {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

/* ================================================================== *
 *  Parallax
 *  Slow-drifts a layer against the scroll direction. Applied to the
 *  big photographic panels so the page has depth as you move.
 * ================================================================== */
export function Parallax({
  children,
  speed = 0.15,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const [ref, offset] = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <div style={{ transform: `translate3d(0, ${offset}px, 0)` }}>{children}</div>
    </div>
  );
}

/* ================================================================== *
 *  Marquee
 *  Seamless infinite scroll. Duplicates its children once and shifts
 *  by exactly -50%, so the loop has no visible seam.
 * ================================================================== */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher = slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`flex gap-12 overflow-hidden ${className}`}>{children}</div>
    );
  }

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 items-center ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animation: `${
              reverse ? "ringpost-marquee-reverse" : "ringpost-marquee"
            } ${speed}s linear infinite`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

/* ================================================================== *
 *  Magnetic
 *  Pulls the element gently toward the cursor. Reserved for primary
 *  calls to action so the one thing we want clicked feels alive.
 * ================================================================== */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) * strength,
          y: (e.clientY - (rect.top + rect.height / 2)) * strength,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {children}
    </span>
  );
}

/* ================================================================== *
 *  TiltCard
 *  Subtle 3D tilt plus a cursor-tracking sheen. Used on the feature
 *  grid so a wall of cards reacts to the pointer.
 * ================================================================== */
export function TiltCard({
  children,
  className = "",
  max = 6,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2 });
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0 });
    setCursor(null);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={
        reduced
          ? undefined
          : {
              transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              transformStyle: "preserve-3d",
            }
      }
    >
      {glow && cursor && !reduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(340px circle at ${cursor.x}px ${cursor.y}px, rgba(236,168,214,0.10), transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

/* ================================================================== *
 *  Scramble
 *  Decodes a label character by character. Applied to the mono
 *  eyebrows so the small type has its own personality.
 * ================================================================== */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>-_=+*#";

export function Scramble({
  text,
  className = "",
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    let raf = 0;
    let last = 0;
    const chars = Array.from(text);

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame += 1;
        setDisplay(
          chars
            .map((c, i) => {
              if (c === " ") return " ";
              if (i < frame / 2) return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );
      }
      if (frame / 2 < chars.length) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ================================================================== *
 *  CountUp
 *  Eased number roll-in, triggered on scroll. Supports a non-numeric
 *  display value (e.g. "24/7") by counting the numeric part only.
 * ================================================================== */
export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1800,
  decimals = 0,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(end);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(eased * end);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
