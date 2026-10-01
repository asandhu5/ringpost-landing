"use client";

import { useEffect, useRef } from "react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useZaraCall, type CallPhase } from "@/lib/use-zara-call";

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

/**
 * A call with Zara: the orb, the countdown, start and end, and friendly states for every
 * way it can fail (mic denied, unsupported browser, rate limit, busy, dropped).
 */
export function ZaraCall({ size = "md", className, hint = true }: { size?: "sm" | "md" | "lg"; className?: string; hint?: boolean }) {
  const { phase, remaining, message, supported, levelRef, start, end } = useZaraCall();
  const orb = size === "lg" ? 240 : size === "md" ? 180 : 120;
  const live = phase === "live";
  return (
    <div className={cx("flex flex-col items-center text-center", className)}>
      <button
        type="button"
        onClick={live ? end : start}
        disabled={!supported || phase === "connecting"}
        aria-label={live ? "End the call with Zara" : "Call Zara"}
        className="group relative rounded-full outline-offset-8 disabled:cursor-not-allowed"
      >
        <ZaraOrb phase={phase} levelRef={levelRef} size={orb} />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className={cx("flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-transform group-hover:scale-110", live ? "bg-cta text-[#1a0d08]" : "bg-white/15 text-white")}>
            {live ? <PhoneOff className="h-5 w-5" /> : supported ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </span>
        </span>
      </button>
      <p className="mt-5 text-[15px] font-medium text-ink" aria-live="polite">
        {live ? `Talking with Zara, 0:${String(remaining ?? 60).padStart(2, "0")} left` : phase === "connecting" ? "Connecting to Zara…" : supported ? "Call Zara" : "Calls need a newer browser"}
      </p>
      {!live && phase !== "connecting" && hint && <p className="mt-1 text-[13px] text-muted-ink">One minute, in your browser. No phone needed.</p>}
      {message && (
        <p role="status" className="mt-4 max-w-sm rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-[13.5px] leading-relaxed text-muted-ink">
          {message}
        </p>
      )}
    </div>
  );
}
