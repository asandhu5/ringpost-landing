"use client";

import { useEffect, useRef, useState } from "react";
import {
  useIsMobileDevice,
  useReducedMotion,
  useScrollProgress,
} from "@/hooks/use-motion";

/* ------------------------------------------------------------------ *
 *  ScrollProgress — hairline bar pinned to the top of the page.
 * ------------------------------------------------------------------ */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-px bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[var(--brand-violet)] via-[var(--brand-pink)] to-[var(--brand-cyan)]"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 90ms linear",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Grain — fixed film-grain layer, keeps the large plum fields alive.
 * ------------------------------------------------------------------ */
export function Grain() {
  const isMobile = useIsMobileDevice();

  // Another full-viewport blended layer — not worth the compositing
  // cost on a phone, and invisible at that pixel density anyway.
  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* ================================================================== *
 *  CustomCursor
 *  A precise dot that tracks the pointer exactly, plus a ring that
 *  lags behind and swells over anything interactive. On links and
 *  buttons the ring picks up the brand pink, so the pointer itself
 *  tells you what is clickable.
 * ================================================================== */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest('a, button, [role="button"], input, textarea, select')));
    };

    /* The ring eases toward the pointer — that lag is what gives the
       cursor a sense of weight. */
    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setEnabled(false);
    const onEnter = () => setEnabled(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[68] hidden h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)] lg:block"
        style={{ opacity: pressed ? 0.5 : 1, transition: "opacity 160ms ease" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[67] hidden rounded-full border lg:block"
        style={{
          width: hot ? 54 : 30,
          height: hot ? 54 : 30,
          borderColor: hot ? "var(--brand-pink)" : "rgba(255,255,255,0.32)",
          backgroundColor: hot ? "rgba(236,168,214,0.10)" : "transparent",
          transform: "translate(-50%, -50%)",
          transition:
            "width 320ms cubic-bezier(0.16,1,0.3,1), height 320ms cubic-bezier(0.16,1,0.3,1), border-color 320ms ease, background-color 320ms ease",
        }}
      />
    </>
  );
}

/* ================================================================== *
 *  AuroraField
 *  A fixed, very soft colour field that follows the pointer around
 *  the page. This is what stops the long dark scroll from reading as
 *  flat black — the plum background shifts hue under the cursor.
 * ================================================================== */
export function AuroraField() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobileDevice();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setOn(true);

    const target = { x: 0.5, y: 0.4 };
    const cur = { ...target };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };

    const loop = () => {
      cur.x += (target.x - cur.x) * 0.045;
      cur.y += (target.y - cur.y) * 0.045;
      if (ref.current) {
        const x = cur.x * 100;
        const y = cur.y * 100;
        ref.current.style.background = [
          `radial-gradient(680px circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, rgba(236,168,214,0.10), transparent 60%)`,
          `radial-gradient(900px circle at ${(100 - x).toFixed(2)}% ${(y + 18).toFixed(2)}%, rgba(167,139,250,0.075), transparent 62%)`,
          `radial-gradient(520px circle at ${(x + 14).toFixed(2)}% ${(100 - y).toFixed(2)}%, rgba(103,232,249,0.045), transparent 60%)`,
        ].join(",");
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[64] ${
        isMobile ? "" : "mix-blend-screen"
      }`}
      style={{
        /* Static fallback so touch and reduced-motion visitors still get
           a tinted field rather than flat black. */
        background:
          "radial-gradient(760px circle at 30% 20%, rgba(236,168,214,0.07), transparent 60%), radial-gradient(900px circle at 75% 70%, rgba(167,139,250,0.055), transparent 62%)",
        // iOS Safari composites `position: fixed` + `mix-blend-mode`
        // badly — it can flicker or blank the layer underneath. Phones
        // get the same tint as a plain, un-blended gradient.
        opacity: isMobile ? 0.7 : on ? 1 : 0.85,
        transition: "opacity 900ms ease",
      }}
    />
  );
}
