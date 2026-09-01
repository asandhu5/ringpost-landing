"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useIsMobileDevice, useReducedMotion } from "@/hooks/use-motion";

/* ==================================================================
 *  SCROLL-DRIVEN MOTION
 *  These mirror what GSAP's ScrollTrigger gives you — an element's
 *  own progress through the viewport, scroll velocity, and pinned
 *  sections — but implemented natively so we don't pull in a whole
 *  animation library for five effects.
 * ================================================================== */

/* ------------------------------------------------------------------ *
 *  useScrollTrigger — 0 → 1 as an element travels through the
 *  viewport. 0 when its top hits the bottom of the screen, 1 when its
 *  bottom leaves the top. This is the value you drive scrub
 *  animations off: scale, rotation, opacity, clip-path, anything.
 * ------------------------------------------------------------------ */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Start earlier/later. 0 = element top at viewport bottom. */
  offset?: number;
}): [RefObject<T | null>, number] {
  const { offset = 0 } = options ?? {};
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Skip work well outside the viewport.
      if (rect.bottom < -vh || rect.top > vh * 2) return;

      const total = rect.height + vh;
      const travelled = vh - rect.top + offset;
      setProgress(Math.max(0, Math.min(1, travelled / total)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [offset]);

  return [ref, progress];
}

/* ------------------------------------------------------------------ *
 *  useScrollVelocity — how fast and which way the page is moving,
 *  normalised roughly to -1 … 1 and eased back to 0 when you stop.
 *  Drives the skew-on-scroll effect that makes fast scrolling feel
 *  physical rather than instant.
 * ------------------------------------------------------------------ */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const reduced = useReducedMotion();
  const isMobile = useIsMobileDevice();

  useEffect(() => {
    // Skip entirely on phones: a per-frame re-render of large grids is
    // the single most expensive thing this page could do on mobile.
    if (reduced || isMobile) {
      setVelocity(0);
      return;
    }

    let lastY = window.scrollY;
    let lastT = performance.now();
    let current = 0;
    let raf = 0;

    const loop = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT, 1);
      const raw = ((y - lastY) / dt) * 16; // px per frame-equivalent

      lastY = y;
      lastT = now;

      // Clamp, then ease toward the target so it decays smoothly.
      const target = Math.max(-1, Math.min(1, raw / 45));
      current += (target - current) * 0.12;

      // Snap tiny residuals to zero, and only publish when the value
      // actually moved — otherwise this re-renders every single frame.
      if (Math.abs(current) < 0.002) current = 0;
      setVelocity((prev) =>
        Math.abs(prev - current) > 0.004 ? current : prev
      );

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, isMobile]);

  return velocity;
}

/* ------------------------------------------------------------------ *
 *  useSmoothScroll — lerped page scrolling (the "buttery" feel in
 *  most GSAP showcase sites, normally done with Lenis). Applied at
 *  the root; disabled for reduced-motion and touch, where native
 *  momentum scrolling is already better than anything we'd fake.
 * ------------------------------------------------------------------ */
export function useSmoothScroll(enabled = true) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const content = document.getElementById("smooth-content");
    if (!content) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = 0;

    const setBodyHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };

    const loop = () => {
      target = window.scrollY;
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.1) current = target;
      content.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    content.style.position = "fixed";
    content.style.top = "0";
    content.style.left = "0";
    content.style.width = "100%";
    content.style.willChange = "transform";
    setBodyHeight();

    const ro = new ResizeObserver(setBodyHeight);
    ro.observe(content);
    window.addEventListener("resize", setBodyHeight);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", setBodyHeight);
      document.body.style.height = "";
      content.removeAttribute("style");
    };
  }, [enabled, reduced]);
}
