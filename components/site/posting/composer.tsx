"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Lock, Sparkles, Upload } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen, type PreviewPlatform } from "@/components/site/phone/apps";
import { DEMO_ITEMS, POST_TARGETS, type DemoItem } from "@/lib/content/posting-demo";

const PHOTO_LIMIT = 20 * 1024 * 1024;
const VIDEO_LIMIT = 100 * 1024 * 1024;

/**
 * The publishing screen, as a working demo: choose something from the Media Library or
 * your own photo or video and the platforms, and see the caption written for each. The
 * phone shows the post in each app at the iPhone 16 Pro Max's real screen size. A
 * visitor's own file is only read by their browser to show the preview; nothing leaves
 * the page.
 */
export function PostComposer() {
  const [items, setItems] = useState<DemoItem[]>(DEMO_ITEMS);
  const [itemId, setItemId] = useState(DEMO_ITEMS[0].id);
  const item = items.find((i) => i.id === itemId) ?? items[0];
  const isVideo = item.media.kind === "video";
  const [chosen, setChosen] = useState<PreviewPlatform[]>(["instagram", "facebook", "x", "linkedin"]);
  const allowed = (p: (typeof POST_TARGETS)[number]) => !p.videoOnly || isVideo;
  const live = chosen.filter((id) => allowed(POST_TARGETS.find((t) => t.id === id)!));
  const [view, setView] = useState<PreviewPlatform>("instagram");
  const shown: PreviewPlatform = live.includes(view) ? view : live[0] ?? "instagram";
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => () => items.forEach((i) => i.source === "upload" && URL.revokeObjectURL(i.media.src)), [items]);

  const target = POST_TARGETS.find((t) => t.id === shown)!;
  const key = `${item.id}:${shown}`;
  const caption = item.captions[target.style];
  const post = useMemo(() => ({ media: item.media, caption, business: item.business }), [item, caption]);

  function toggle(id: PreviewPlatform) {
    setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
    setView(id);
  }

  function onFile(file: File | undefined) {
    setUploadError(null);
    if (!file) return;
    const video = file.type.startsWith("video/");
    if (!video && !file.type.startsWith("image/")) return setUploadError("Choose a photo or a video.");
    if (!video && file.size > PHOTO_LIMIT) return setUploadError("Photos can be up to 20 MB.");
    if (video && file.size > VIDEO_LIMIT) return setUploadError("Videos can be up to 100 MB.");
    const own: DemoItem = {
      id: `upload-${Date.now()}`,
      label: "Your upload",
      source: "upload",
      media: { kind: video ? "video" : "image", src: URL.createObjectURL(file), alt: "Your own photo or video" },
      business: { name: "Your business", handle: "yourbusiness", color: "#0b1b2b" },
      captions: {
        social: "Your note becomes a caption written in your voice for each platform, with the hashtags your customers search for.",
        short: "Your note, written short for this platform.",
        professional: "Your note, written for a professional audience.",
        shorts: "Your note, written for Shorts. #Shorts",
      },
    };
    setItems((list) => [own, ...list.filter((i) => i.source !== "upload")]);
    setItemId(own.id);
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_90px_-50px_rgba(11,27,43,0.45)]">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5 sm:px-7">
        <span className="flex gap-1.5" aria-hidden><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
        <span className="text-[14px] font-semibold text-ink">New post</span>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
        <div className="border-b border-line p-5 sm:p-7 lg:border-b-0 lg:border-r">
          {/* 1. Content */}
          <p className="text-[13.5px] font-semibold text-ink">What to post</p>
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            <button type="button" onClick={() => fileInput.current?.click()} className="group flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line-strong text-[11.5px] font-medium text-muted-ink transition-colors hover:border-glow hover:text-glow">
              <Upload className="h-5 w-5" aria-hidden />Your own
            </button>
            {items.map((i) => (
              <button key={i.id} type="button" onClick={() => setItemId(i.id)} aria-pressed={i.id === item.id} aria-label={`${i.source === "upload" ? "Yours" : i.media.kind === "video" ? "Video" : "Photo"}: ${i.label}`} className={`relative aspect-square overflow-hidden rounded-xl ring-offset-2 transition-shadow ${i.id === item.id ? "ring-2 ring-glow" : "ring-1 ring-line hover:ring-line-strong"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {i.media.kind === "video" ? <video src={i.media.src} poster={i.media.poster} muted playsInline preload="metadata" className="h-full w-full object-cover" /> : <img src={i.media.src} alt="" className="h-full w-full object-cover" />}
                <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">{i.source === "upload" ? "Yours" : i.media.kind === "video" ? "Video" : "Photo"}</span>
              </button>
            ))}
          </div>
          <input ref={fileInput} type="file" accept="image/*,video/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} aria-label="Try it with your own photo or video" />
          <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-faint">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            {uploadError ?? "Try your own photo or video. It stays in your browser; nothing is uploaded."}
          </p>

          {/* 2. Platforms */}
          <p className="mt-7 text-[13.5px] font-semibold text-ink">Where it goes</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {POST_TARGETS.map((p) => {
              const ok = allowed(p);
              const on = ok && chosen.includes(p.id);
              return (
                <button key={p.id} type="button" disabled={!ok} onClick={() => toggle(p.id)} aria-pressed={on} title={ok ? p.note : `${p.name} takes videos only`} className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium transition-colors ${on ? "border-glow bg-[#f3f1ff] text-ink" : "border-line text-muted-ink hover:border-line-strong"} disabled:cursor-not-allowed disabled:opacity-40`}>
                  <ChannelLogo id={p.id} size={22} />
                  {p.name}
                  {on && <Check className="h-3.5 w-3.5 text-glow" aria-hidden />}
                </button>
              );
            })}
          </div>
          {!isVideo && <p className="mt-2.5 text-[12.5px] text-faint">TikTok and YouTube Shorts take videos, so a photo can&apos;t be sent there.</p>}

          {/* 3. Caption */}
          <div className="mt-7 flex items-center justify-between">
            <p className="text-[13.5px] font-semibold text-ink">Caption for {target.name}</p>
            <span className="flex items-center gap-1 text-[12.5px] text-muted-ink"><Sparkles className="h-3.5 w-3.5 text-glow" aria-hidden />Written for each platform</span>
          </div>
          <p key={key} className="rp-fade-in mt-2.5 rounded-xl border border-line bg-surface-2 p-3.5 text-[14.5px] leading-relaxed text-ink">{caption}</p>
          <p className="mt-2 text-[13px] text-muted-ink">Switch platforms to see how the caption changes for each one.</p>
        </div>
        {/* Phone preview */}
        <div className="flex flex-col items-center bg-[linear-gradient(180deg,#f7f8fa,#eef1f6)] px-5 py-7">
          <div className="mb-5 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Preview on">
            {(live.length ? live : (["instagram"] as PreviewPlatform[])).map((id) => (
              <button key={id} type="button" role="tab" aria-selected={shown === id} onClick={() => setView(id)} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold transition-colors ${shown === id ? "bg-white text-ink shadow-sm" : "text-muted-ink hover:text-ink"}`}>
                <ChannelLogo id={id} size={18} />{POST_TARGETS.find((t) => t.id === id)!.name}
              </button>
            ))}
          </div>
          <IPhone16ProMax width={300} label={`Preview of the post on ${target.name}, on an iPhone 16 Pro Max screen`}>
            <AppScreen platform={shown} post={post} />
          </IPhone16ProMax>
        </div>
      </div>
    </div>
  );
}
