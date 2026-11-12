"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { RingStill } from "./ring-still";

const RingCanvas = dynamic(() => import("./ring-canvas"), { ssr: false });

/** 3D only where it is cheap: a laptop or desktop with a mouse. Phones and tablets keep
 * the still ring, which costs nothing and looks the same at a glance (measured: the 3D
 * ring blocked a mid-range phone's main thread for several seconds). */
function canRender3D(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The 3D ring, loaded after the page has painted. The still picture is in the page from
 * the start and stays until the 3D is ready; the 3D only draws while it is on screen.
 * `ringBox` is the ring's box inside the stage as a CSS inset, used by the still.
 */
export function RingStage({ scale = 0.62, stillInset = "27%", className }: { scale?: number; stillInset?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [threeD, setThreeD] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setSmall(window.innerWidth < 768);
    if (!canRender3D()) return;
    // After first paint, when the browser has a quiet moment.
    const start = () => setThreeD(true);
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1200 }) : window.setTimeout(start, 300);
    const el = ref.current;
    const io = el ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "80px" }) : null;
    if (el && io) io.observe(el);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      <div className="absolute transition-opacity duration-500" style={{ inset: stillInset, opacity: ready ? 0 : 1 }}>
        <RingStill className="h-full w-full" />
      </div>
      {threeD && (
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: ready ? 1 : 0 }}>
          <RingCanvas small={small} scale={scale} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
