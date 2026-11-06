"use client";

import { useEffect, useRef, useState } from "react";

/** iPhone 16 Pro Max: a 440 × 956 point screen. Apps are drawn at those exact points and
 * the whole screen is scaled to the width it is shown at, so every preview keeps the
 * proportions of the real device. */
export const SCREEN_W = 440;
export const SCREEN_H = 956;

export function IPhone16ProMax({ children, width = 320, dark = true, label, className }: { children: React.ReactNode; width?: number; dark?: boolean; label?: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(width / SCREEN_W);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const resize = () => setScale(el.clientWidth / SCREEN_W);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const bezel = Math.max(6, Math.round(width * 0.032));
  return (
    <figure className={className} style={{ width: "100%", maxWidth: width }} aria-label={label}>
      <div className="relative rounded-[18%/8.4%] bg-[#2a2a2e] p-[2px] shadow-[0_40px_80px_-30px_rgba(16,24,40,0.55),0_0_0_1px_rgba(0,0,0,0.25)]" style={{ padding: bezel }}>
        {/* titanium edge and side buttons */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1.5px_#8e8e93,inset_0_0_0_3px_#1c1c1e]" />
        <span aria-hidden className="absolute -left-[3px] top-[18%] h-[5%] w-[3px] rounded-l bg-[#6e6e73]" />
        <span aria-hidden className="absolute -left-[3px] top-[26%] h-[8%] w-[3px] rounded-l bg-[#6e6e73]" />
        <span aria-hidden className="absolute -left-[3px] top-[36%] h-[8%] w-[3px] rounded-l bg-[#6e6e73]" />
        <span aria-hidden className="absolute -right-[3px] top-[30%] h-[12%] w-[3px] rounded-r bg-[#6e6e73]" />
        <div ref={box} className="relative w-full overflow-hidden rounded-[16%/7.4%]" style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}`, background: dark ? "#000" : "#fff" }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}>
            {children}
            {/* Dynamic Island */}
            <span aria-hidden className="absolute left-1/2 top-[11px] z-50 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </figure>
  );
}

/** The status bar every app draws under the Dynamic Island. */
export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div className="relative z-40 flex h-[54px] items-center justify-between px-[34px] pt-[6px]" style={{ color: c }} aria-hidden>
      <span className="text-[17px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="19" height="12" viewBox="0 0 19 12" fill={c}><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={c}><path d="M8.5 2.3c2.4 0 4.6.9 6.2 2.5l1.2-1.2A10.4 10.4 0 0 0 8.5.6 10.4 10.4 0 0 0 1.1 3.6l1.2 1.2a8.7 8.7 0 0 1 6.2-2.5Zm0 3.5c1.4 0 2.8.5 3.8 1.5l1.2-1.2a7 7 0 0 0-10 0l1.2 1.2c1-1 2.4-1.5 3.8-1.5Zm0 3.5c.5 0 1 .2 1.4.6L8.5 11.3 7.1 9.9c.4-.4.9-.6 1.4-.6Z" /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} opacity="0.4" /><rect x="2" y="2" width="20" height="9" rx="2" fill={c} /><rect x="24.5" y="4.5" width="2" height="4" rx="1" fill={c} opacity="0.4" /></svg>
      </span>
    </div>
  );
}

/** The home indicator at the bottom of the screen. */
export function HomeIndicator({ dark = false }: { dark?: boolean }) {
  return <span aria-hidden className="absolute bottom-[8px] left-1/2 z-40 h-[5px] w-[144px] -translate-x-1/2 rounded-full" style={{ background: dark ? "#fff" : "#000" }} />;
}
