"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { AppChat, PhoneFrame, type ChatApp, type ChatLine } from "@/components/site/mocks/app-chat";
import { cx } from "@/components/site/ui/cx";
import { useLive } from "./use-in-view";

export interface MessageChannel {
  id: Exclude<ChatApp, "phone">;
  hash: string;
  name: string;
  business: string;
  subject?: string;
  lines: ChatLine[];
  outcome: string;
  facts: string[];
}

/**
 * The Messages page's centrepiece: a tab for each app, and in the phone the same kind of
 * conversation in that app's own look, ending in a booking. Each tab has its own address
 * (/messages#whatsapp), so it can be linked to directly.
 */
export function MessagesDemo({ channels }: { channels: MessageChannel[] }) {
  const { ref, live } = useLive<HTMLDivElement>(0.3);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState<number | undefined>(undefined);
  const c = channels[active];

  // Open the tab named in the address, now and whenever it changes.
  useEffect(() => {
    const fromHash = () => {
      const i = channels.findIndex((x) => x.hash === window.location.hash.slice(1));
      if (i >= 0) {
        setActive(i);
        document.getElementById("demo")?.scrollIntoView({ block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [channels]);

  // Play the conversation one line at a time; the whole thing shows if motion isn't welcome.
  useEffect(() => {
    if (!live) return;
    setShown(1);
    let n = 1;
    const t = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= c.lines.length) clearInterval(t);
    }, 1500);
    return () => clearInterval(t);
  }, [active, live, c.lines.length]);

  const pick = (i: number) => {
    setActive(i);
    window.history.replaceState(null, "", `#${channels[i].hash}`);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + channels.length) % channels.length;
    pick(n);
    tabs.current[n]?.focus();
  };

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
      <div role="tablist" aria-label="Apps" aria-orientation="vertical" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {channels.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`msg-tab-${x.id}`}
            aria-selected={i === active}
            aria-controls="msg-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cx("flex min-h-14 items-center gap-3 rounded-rp-md border px-3.5 py-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200", i === active ? "border-violet bg-primary-soft shadow-rp-2" : "border-line bg-white hover:border-primary-line")}
          >
            <ChannelLogo id={x.id} size={34} />
            <span className="text-body font-semibold text-ink">{x.name}</span>
          </button>
        ))}
      </div>

      <div id="msg-panel" role="tabpanel" aria-labelledby={`msg-tab-${c.id}`} className="mx-auto w-full max-w-[310px]">
        <PhoneFrame className="mx-auto w-full max-w-[min(290px,calc((100svh-90px)*0.46))]" app={c.id}>
          <AppChat key={c.id} app={c.id} business={c.business} subject={c.subject} lines={c.lines} outcome={c.outcome} shown={shown} className="h-full" />
        </PhoneFrame>
      </div>

      <div>
        <p className="text-h3 font-semibold text-ink">{c.name}: good to know</p>
        <ul className="mt-4 space-y-3">
          {c.facts.map((f) => (
            <li key={f} className="flex gap-3 text-body text-ink">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grow-soft text-grow"><Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden /></span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
