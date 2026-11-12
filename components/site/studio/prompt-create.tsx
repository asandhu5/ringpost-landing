"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Sparkles } from "lucide-react";

export type CreateStage = "done" | "typing" | "making" | "image" | "video";

/**
 * "Type an idea, get a post", as one played sequence: the idea types itself, Create is
 * pressed, the image resolves in, it becomes a short video and the caption appears.
 * Plays once when `target` scrolls into view; `replay` plays it again. Until scripts
 * run, and under reduced motion, it rests on the finished picture ("done").
 */
export function useCreatePlay(prompt: string, threshold = 0.6) {
  const target = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<CreateStage>("done");
  const [typed, setTyped] = useState(prompt.length);
  const [run, setRun] = useState(0);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCanPlay(true);
    // Wait until the page has finished loading and painted its picture once, so the
    // sequence never hides the image a slow connection is still fetching.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => setRun(1), 900);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (document.readyState === "complete") start();
        else window.addEventListener("load", start, { once: true });
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("load", start);
      if (timer) clearTimeout(timer);
    };
  }, [threshold]);

  useEffect(() => {
    if (!run) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setStage("typing");
    setTyped(0);
    let n = 0;
    const speed = Math.max(24, Math.min(45, 1900 / prompt.length));
    const type = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= prompt.length) clearInterval(type);
    }, speed);
    const typeMs = prompt.length * speed;
    timers.push(setTimeout(() => setStage("making"), typeMs + 500));
    timers.push(setTimeout(() => setStage("image"), typeMs + 1400));
    timers.push(
      setTimeout(() => {
        setStage("video");
        video.current?.play().catch(() => {});
      }, typeMs + 4200),
    );
    return () => {
      clearInterval(type);
      timers.forEach(clearTimeout);
    };
  }, [run, prompt]);

  return { target, video, stage, typed, canPlay, replay: () => setRun((r) => r + 1) };
}

export function PromptBox({ prompt, typed, stage, className }: { prompt: string; typed: number; stage: CreateStage; className?: string }) {
  return (
    <div className={`rounded-rp-md border border-line bg-white p-2 shadow-rp-2 ${className ?? ""}`}>
      <div className="flex items-center gap-3 rounded-rp-sm bg-base px-4 py-3">
        <Sparkles className="h-5 w-5 shrink-0 text-create" strokeWidth={1.75} aria-hidden />
        {/* The whole idea holds the box's size; the typed part shows on top, so nothing shifts. */}
        <p className="relative flex-1 text-body text-ink" aria-label={`Idea: ${prompt}`}>
          <span className="invisible">{prompt}</span>
          <span className="absolute inset-0">
            {prompt.slice(0, typed)}
            {stage === "typing" && <span className="rp-caret" />}
          </span>
        </p>
        <span className={`inline-flex h-10 shrink-0 items-center rounded-full px-4 text-small font-semibold transition-all duration-200 ${stage === "making" ? "scale-95 bg-ink text-white" : "bg-cta text-cta-ink"}`}>{stage === "making" ? "Creating…" : "Create"}</span>
      </div>
    </div>
  );
}

export function ResultCard({ image, videoSrc, alt, caption, stage, canPlay, videoRef, className }: { image: string; videoSrc: string; alt: string; caption: string; stage: CreateStage; canPlay: boolean; videoRef: React.RefObject<HTMLVideoElement | null>; className?: string }) {
  const showImage = stage === "done" || stage === "image" || stage === "video";
  const showVideo = stage === "video";
  const showCaption = stage === "done" || stage === "video";
  return (
    <figure className={className}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-rp-md border border-line bg-surface-2 shadow-rp-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} srcSet={`${image.replace(/\.webp$/, "-sm.webp")} 560w, ${image} 1080w`} sizes="(min-width: 1024px) 380px, (min-width: 640px) 300px, 210px" alt={alt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover transition-[opacity,filter,transform] duration-[1400ms] ease-rp" style={{ opacity: showImage ? 1 : 0, filter: showImage ? "none" : "blur(24px)", transform: showImage ? "none" : "scale(1.08)" }} />
        <video ref={videoRef} src={canPlay ? videoSrc : undefined} muted loop playsInline preload="none" className="absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-[19px] object-cover transition-opacity duration-700" style={{ opacity: showVideo ? 1 : 0 }} aria-hidden />
        {stage === "making" && <div aria-hidden className="rp-making absolute inset-0" />}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur">
          {showVideo ? <Play className="h-3 w-3 fill-current" aria-hidden /> : <Sparkles className="h-3 w-3" aria-hidden />}
          {showVideo ? "Short video" : "Image"}
        </span>
      </div>
      <figcaption className="mt-3 text-small text-ink transition-opacity duration-500" style={{ opacity: showCaption ? 1 : 0 }}>
        <b className="font-semibold">Caption:</b> {caption}
      </figcaption>
    </figure>
  );
}

/** Always takes its space, so showing it never moves the page. */
export function ReplayButton({ onClick, hidden }: { onClick: () => void; hidden?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-hidden={hidden} tabIndex={hidden ? -1 : undefined} className={`${hidden ? "invisible " : ""}inline-flex min-h-11 items-center gap-1.5 text-small font-semibold text-muted-ink hover:text-ink`}>
      <RotateCcw className="h-4 w-4" aria-hidden /> Play again
    </button>
  );
}
