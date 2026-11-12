"use client";

import { useEffect, useRef, useState } from "react";

/** True while the element is on screen and the visitor welcomes motion. `motion` alone
 * says whether motion is welcome at all (false before scripts run and under reduced motion). */
export function useLive<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(ok);
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView, motion, live: inView && motion };
}
