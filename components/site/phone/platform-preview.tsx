"use client";

import { useState } from "react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen, type PreviewPlatform } from "@/components/site/phone/apps";
import { DEMO_ITEMS, POST_TARGETS } from "@/lib/content/posting-demo";

/**
 * The approval screen's preview, drawn in code: one post, a tab per platform starting with
 * Instagram, the phone showing that app, and the caption written for it.
 */
export function PlatformPreviewPanel() {
  const [platform, setPlatform] = useState<PreviewPlatform>("instagram");
  const target = POST_TARGETS.find((t) => t.id === platform)!;
  const item = target.videoOnly ? DEMO_ITEMS.find((i) => i.id === "salon")! : DEMO_ITEMS.find((i) => i.id === "florist")!;
  const post = { media: item.media, business: item.business, caption: item.captions[target.style] };
  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(11,27,43,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-line px-4 py-2.5" role="tablist" aria-label="Preview on">
        {POST_TARGETS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={t.id === platform} onClick={() => setPlatform(t.id)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold transition-colors ${t.id === platform ? "bg-ink text-white" : "text-muted-ink hover:bg-surface-2 hover:text-ink"}`}>
            <ChannelLogo id={t.id} size={18} />{t.name}
          </button>
        ))}
      </div>
      <div className="grid items-start gap-5 p-5 sm:grid-cols-[220px_1fr]">
        <div className="mx-auto w-[220px]"><IPhone16ProMax width={220}><AppScreen platform={platform} post={post} /></IPhone16ProMax></div>
        <div>
          <p className="text-[12.5px] font-semibold text-muted-ink">Caption for {target.name}</p>
          <p className="mt-2 rounded-xl border border-line bg-surface-2 p-3.5 text-[14px] leading-relaxed text-ink">{post.caption}</p>
          <p className="mt-3 text-[13px] text-muted-ink">{target.note}</p>
        </div>
      </div>
    </div>
  );
}
