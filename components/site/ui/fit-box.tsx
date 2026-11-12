"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows its child at natural size when there is room, and scales it down (never up) to
 * fit the box it is given when there is not. Used so a demo always sits fully inside a
 * pinned stage on a short laptop screen. The box needs a height from its parent.
 */
export function FitBox({ children, className }: { children: React.ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const b = box.current;
    const i = inner.current;
    if (!b || !i) return;
    const fit = () => {
      const s = Math.min(1, b.clientHeight / Math.max(1, i.offsetHeight), b.clientWidth / Math.max(1, i.offsetWidth));
      setScale(Number.isFinite(s) && s > 0 ? s : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={`flex items-center justify-center ${className ?? ""}`}>
      <div ref={inner} className="w-full shrink-0" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
