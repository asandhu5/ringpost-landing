"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ------------------------------------------------------------------ *
 *  useReducedMotion — respects the OS "reduce motion" preference.
 *  Every animation primitive in this project checks this and degrades
 *  to a plain, instantly-visible state instead of moving.
 * ------------------------------------------------------------------ */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------ *
 *  useInView — fires once when an element scrolls into view.
 *  `rootMargin` lets us start animations slightly before the element
 *  is technically on screen so nothing pops in visibly late.
 * ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Guard for older browsers / SSR-adjacent edge cases.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
            window.removeEventListener("scroll", safetyCheck);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    /* Safety net — fail OPEN, never closed.
     *
     * A fast flick-scroll can carry a short element from below the fold
     * to above it between two observer samples, crossing no threshold
     * and firing no callback. The element would then stay hidden
     * forever, which for a reveal animation means content the visitor
     * simply never sees. So we also check on scroll: if the element's
     * top has reached the viewport at all, reveal it. */
    let frame = 0;
    function safetyCheck() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();

        /* Three ways an element must end up visible:
         *   1. it has entered the viewport far enough to be read
         *   2. the user flicked straight past it and it's now above
         *      the fold — no lower bound, or it stays hidden forever
         *   3. we're at the very bottom of the document, so whatever
         *      is still only half on screen (the footer) can never be
         *      scrolled further into view and must show now */
        const atDocumentEnd =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;

        if (rect.top < window.innerHeight * 0.8 || rect.top < 0 || atDocumentEnd) {
          setInView(true);
          if (once) {
            observer.disconnect();
            window.removeEventListener("scroll", safetyCheck);
          }
        }
      });
    }

    observer.observe(el);
    window.addEventListener("scroll", safetyCheck, { passive: true });
    safetyCheck();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", safetyCheck);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/* ------------------------------------------------------------------ *
 *  useScrollProgress — 0 → 1 across the whole document.
 *  Used for the hairline progress bar under the nav.
 * ------------------------------------------------------------------ */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      frame = 0;
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
  }, []);

  return progress;
}

/* ------------------------------------------------------------------ *
 *  useParallax — returns a translateY (px) driven by how far the
 *  element has travelled through the viewport. Runs on rAF, and is
 *  disabled entirely under reduced-motion.
 * ------------------------------------------------------------------ */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.15
): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }

    let frame = 0;

    const update = () => {
      const el = ref.current;
      frame = 0;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Skip work when the element is nowhere near the viewport.
      if (rect.bottom < -viewport || rect.top > viewport * 2) return;

      // -1 (just below the fold) → 1 (just above it)
      const centre = rect.top + rect.height / 2;
      const normalised = (centre - viewport / 2) / viewport;
      setOffset(normalised * speed * 100);
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
  }, [speed, reduced]);

  return [ref, offset];
}

/* ------------------------------------------------------------------ *
 *  useIsMobileDevice — coarse pointer OR narrow viewport.
 *
 *  Starts `false` on both server and first client render so hydration
 *  matches, then flips after mount. Everything expensive on this page
 *  (canvas particle fields, per-frame scroll maths, the background
 *  video, blend-mode overlays) is gated on this: phones get the same
 *  layout and content, without the work that flattens a battery or
 *  stalls Safari's compositor.
 * ------------------------------------------------------------------ */
export function useIsMobileDevice(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024
      );

    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
