"use client";

import { useEffect, useRef } from "react";

/**
 * Shows its child as a 3D object: turned slightly at rest, and following the mouse on a
 * laptop. On touch screens and with reduced motion it keeps the resting angle and does
 * not move. `rest` is the resting turn, in degrees ([x, y]).
 */
export function Tilt3D({ children, className, rest = [6, -16], depth = 1 }: { children: React.ReactNode; className?: string; rest?: [number, number]; depth?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const card = inner.current;
    if (!el || !card) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let raf = 0;
    let tx = rest[0];
    let ty = rest[1];
    let cx = tx;
    let cy = ty;
    const step = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      card.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tx = rest[0] - y * 10 * depth;
      ty = rest[1] * 0.35 + x * 22 * depth;
      kick();
    };
    const leave = () => {
      tx = rest[0];
      ty = rest[1];
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [rest, depth]);

  return (
    <div ref={box} className={className} style={{ perspective: "1600px" }}>
      <div ref={inner} className="h-full w-full" style={{ transformStyle: "preserve-3d", transform: `rotateX(${rest[0]}deg) rotateY(${rest[1]}deg)` }}>
        {children}
      </div>
    </div>
  );
}
