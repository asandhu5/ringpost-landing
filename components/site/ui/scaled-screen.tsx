"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows a picture drawn at a fixed size (`w` × `h` pixels) at whatever width its box is
 * given, keeping its proportions. The first paint is sized with CSS alone (container
 * units), so it is right before any script runs.
 */
export function ScaledScreen({ w, h, children, className }: { w: number; h: number; children: React.ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / w);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className={`relative overflow-hidden ${className ?? ""}`} style={{ aspectRatio: `${w} / ${h}`, containerType: "inline-size" }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: scale === null ? `scale(calc(100cqw / ${w}px))` : `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
