"use client";

import { useEffect, useRef } from "react";
type CallPhase = "idle" | "connecting" | "live" | "ended";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/**
 * Zara's orb: the site's one memorable object. Layered light that breathes when idle,
 * spins up while connecting, and swells with Zara's voice during a call (levelRef is
 * read every frame and written straight to CSS, so React doesn't re-render per frame).
 */
export function ZaraOrb({ phase = "idle", levelRef, size = 220, className }: { phase?: CallPhase; levelRef?: React.MutableRefObject<number>; size?: number; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const l = levelRef?.current ?? 0;
      el.current?.style.setProperty("--lvl", l.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [levelRef]);

  return (
    <div
      ref={el}
      aria-hidden
      className={cx("zara-orb relative", phase === "connecting" && "zara-orb--connecting", phase === "live" && "zara-orb--live", className)}
      style={{ width: size, height: size }}
    >
      <div className="zara-orb__halo" />
      <div className="zara-orb__core">
        <div className="zara-orb__swirl" />
        <div className="zara-orb__swirl zara-orb__swirl--b" />
        <div className="zara-orb__shine" />
      </div>
    </div>
  );
}
