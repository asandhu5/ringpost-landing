"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Check, Coins, ImageIcon, Play, RefreshCcw, Type, Upload } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useLive } from "@/components/site/demos/use-in-view";
import { LogoMark } from "@/components/site/logo";
import { Button } from "@/components/site/ui/button";
import { cx } from "@/components/site/ui/cx";
import { STUDIO } from "@/lib/content/studio";
import { START_URL } from "@/lib/site";
import { PromptBox, ReplayButton, ResultCard, useCreatePlay } from "./prompt-create";

/* ── 1. Hero: prompt to creation, shown once ───────────────────────────────────── */
export function StudioHero({ crumbs }: { crumbs: React.ReactNode }) {
  const h = STUDIO.hero;
  const play = useCreatePlay(h.prompt, 0.5);
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="rp-hero-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1240px] flex-col gap-6 px-4 pb-[84px] pt-[calc(var(--header-h)+clamp(0.75rem,2.5svh,1.5rem))] sm:px-6 lg:h-[100svh] lg:max-h-[900px] lg:min-h-[560px] lg:flex-row lg:items-center lg:gap-14 lg:px-10 lg:pb-[76px]">
        <div className="relative z-10 lg:w-[54%] lg:shrink-0">
          {crumbs}
          <p className="mt-[clamp(0.8rem,3svh,2rem)] text-small font-semibold text-create">Content Studio</p>
          <h1 className="mt-2 font-display text-h1 text-ink">Type an idea. Get a post.</h1>
          <p className="mt-[clamp(0.6rem,2svh,1rem)] max-w-[32rem] text-body text-muted-ink">Images and short videos made for your business, with your logo and your offer, in seconds.</p>
          <PromptBox prompt={h.prompt} typed={play.typed} stage={play.stage} className="mt-[clamp(0.9rem,2.8svh,1.5rem)] max-w-[36rem]" />
          <div className="mt-[clamp(0.9rem,2.8svh,1.5rem)] flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button href={START_URL}>Get started</Button>
            <ReplayButton onClick={play.replay} hidden={!(play.canPlay && (play.stage === "video" || play.stage === "done"))} />
          </div>
          <ul className="mt-[clamp(0.9rem,2.8svh,1.75rem)] hidden items-center gap-2 sm:flex" aria-label="Finished examples for other kinds of business">
            {h.examples.map((e) => (
              <li key={e.label} className="w-[clamp(40px,7svh,60px)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.src} alt={`An example post for a ${e.label.toLowerCase()}`} loading="lazy" className="aspect-square w-full rounded-rp-sm object-cover shadow-rp-1" />
              </li>
            ))}
            <li className="ml-2 text-small text-muted-ink">Works for any kind of business.</li>
          </ul>
        </div>
        <div ref={(el) => { play.target.current = el; }} className="mx-auto flex w-full flex-1 items-center justify-center lg:h-full lg:min-h-0">
          <ResultCard image={h.image} videoSrc={h.video} alt={h.alt} caption={h.caption} stage={play.stage} canPlay={play.canPlay} videoRef={play.video} className="w-[min(100%,210px)] sm:w-[min(100%,300px)] lg:w-[min(100%,calc((100svh-var(--header-h)-170px)*0.8))] lg:max-w-[380px]" />
        </div>
      </div>
    </section>
  );
}

/* ── 2. Your brand on everything: a 3D stack you can tilt ──────────────────────── */
export function BrandStack() {
  const b = STUDIO.brand;
  const box = useRef<HTMLDivElement>(null);
  const { ref, live } = useLive<HTMLDivElement>(0.4);
  const [layer, setLayer] = useState<number>(b.layers.length);
  const [touched, setTouched] = useState(false);

  // The logo, then the colors, then the offer land on the front frame, in turn.
  useEffect(() => {
    if (!live || touched) return;
    setLayer(0);
    const t = setInterval(() => setLayer((l) => (l >= b.layers.length ? 0 : l + 1)), 1700);
    return () => clearInterval(t);
  }, [live, touched, b.layers.length]);

  const tilt = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 14).toFixed(1)}deg`);
    el.style.setProperty("--ry", `${(x * 20).toFixed(1)}deg`);
  };
  const rest = () => {
    box.current?.style.setProperty("--rx", "0deg");
    box.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div>
        <p className="text-small font-semibold text-create">Your brand</p>
        <h2 className="mt-2.5 font-display text-h2 text-ink">{b.title}</h2>
        <p className="mt-4 max-w-[30rem] text-body text-muted-ink">{b.lede}</p>
        <ul className="mt-6 grid grid-cols-1 gap-2">
          {b.layers.map((l, i) => (
            <li key={l.id}>
              <button type="button" aria-pressed={layer > i} onClick={() => { setTouched(true); setLayer(layer === i + 1 ? i : i + 1); }} className={cx("flex min-h-14 w-full items-center gap-3.5 rounded-rp-md border px-4 py-2.5 text-left transition-[border-color,background-color] duration-300", layer > i ? "border-create/40 bg-create-soft/60" : "border-line bg-white")}>
                <span className={cx("flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300", layer > i ? "bg-create text-white" : "bg-surface-2 text-muted-ink")}><Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /></span>
                <span className="leading-tight"><b className="block text-body font-semibold text-ink">{l.name}</b><span className="text-small text-muted-ink">{l.line}</span></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div ref={box} onPointerMove={tilt} onPointerLeave={rest} className="relative mx-auto h-[clamp(300px,58svh,460px)] w-full max-w-[520px]" style={{ perspective: "1400px" }} role="img" aria-label="A stack of images and video frames. The logo, colors and offer land on each one.">
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transformStyle: "preserve-3d", transform: "rotateX(calc(8deg + var(--rx, 0deg))) rotateY(calc(-16deg + var(--ry, 0deg)))" }}>
          {b.frames.map((src, i) => {
            const depth = b.frames.length - 1 - i;
            const front = depth === 0;
            return (
              <div key={src} className="absolute left-1/2 top-1/2 aspect-[4/5] h-[78%] overflow-hidden rounded-rp-md border border-white/70 bg-surface-2 shadow-rp-3" style={{ transform: `translate(-50%, -50%) translate3d(${depth * -46}px, ${depth * -14}px, ${depth * -70}px)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                {depth === 1 && <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-white"><Play className="h-3 w-3 fill-current" aria-hidden /></span>}
                {/* The three brand layers. On the frames behind they are always on; on the front one they land in turn. */}
                <span aria-hidden className={cx("absolute inset-x-0 bottom-0 h-[5%] bg-[linear-gradient(90deg,#be185d,#f59e0b)] transition-transform duration-500 ease-rp", !front || layer > 1 ? "translate-y-0" : "translate-y-full")} />
                <span aria-hidden className={cx("absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 py-1 pl-1 pr-2.5 text-[11.5px] font-semibold text-ink shadow-rp-2 transition-transform duration-500 ease-rp", !front || layer > 0 ? "translate-y-0" : "-translate-y-[220%]")}><LogoMark className="!h-5 !w-5" /> Your logo</span>
                <span aria-hidden className={cx("absolute bottom-[9%] left-3 rounded-rp-sm bg-[#be185d] px-3 py-1.5 text-[12.5px] font-semibold text-white shadow-rp-2 transition-transform duration-500 ease-rp", !front || layer > 2 ? "translate-x-0" : "-translate-x-[160%]")}>20% off this Saturday</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── 3. Or use your own photos and videos ─────────────────────────────────────── */
export function UploadScene() {
  const o = STUDIO.own;
  const { ref, live, motion } = useLive<HTMLDivElement>(0.45);
  /** 0 camera roll · 1 photo picked · 2 uploading · 3 caption written. Rests on 3. */
  const [step, setStep] = useState(3);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (!live || played) return;
    setPlayed(true);
    setStep(0);
    const t = [setTimeout(() => setStep(1), 900), setTimeout(() => setStep(2), 1900), setTimeout(() => setStep(3), 3900)];
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);
  const pct = step < 2 ? 0 : 100;
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:gap-6" role="img" aria-label="A photo is picked from a phone's camera roll, uploaded, and a caption is written from a short note.">
        <div className="w-[clamp(120px,24vw,170px)] rounded-[26px] border border-line-strong bg-ink p-1.5 shadow-rp-3">
          <div className="rounded-[20px] bg-white p-2">
            <p className="pb-1.5 text-center text-[11px] font-semibold text-ink">Camera roll</p>
            <div className="grid grid-cols-2 gap-1">
              {o.roll.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" loading="lazy" className={cx("aspect-square w-full rounded-md object-cover transition-all duration-500", i === 0 && step >= 1 && "ring-[3px] ring-create", i !== 0 && step >= 1 && "opacity-50")} />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-rp-md border border-line bg-white p-4 shadow-rp-2">
          <div className={cx("flex items-center gap-3.5 rounded-rp-sm border-2 border-dashed p-3 transition-colors duration-500", step >= 2 ? "border-create/40 bg-create-soft/40" : "border-line-strong bg-base")}>
            <div className="relative h-16 w-16 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.photo} alt="" className={cx("h-full w-full rounded-rp-sm object-cover transition-[opacity,transform] duration-700 ease-rp", step >= 1 ? "opacity-100" : "opacity-25", step === 1 && motion && "-translate-x-3 scale-110")} />
              <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} strokeLinecap="round" style={{ transition: step === 2 ? "stroke-dashoffset 1.8s ease-in-out" : "none", opacity: step === 2 ? 1 : 0 }} />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-small font-semibold text-ink"><Upload className="h-4 w-4 text-create" aria-hidden /> {step < 1 ? "Drop a photo or video here" : step < 3 ? "Uploading…" : "Uploaded"}</p>
              <p className="mt-1 text-[13px] text-muted-ink">Your note: &ldquo;{o.note}&rdquo;</p>
            </div>
            {step >= 3 && <BadgeCheck className="h-6 w-6 shrink-0 text-grow" aria-hidden />}
          </div>
          <div className={cx("mt-3 rounded-rp-sm bg-primary-soft p-3 transition-opacity duration-700", step >= 3 ? "opacity-100" : "opacity-30")}>
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-violet"><Type className="h-3.5 w-3.5" aria-hidden /> Caption, in your voice</p>
            <p className="mt-1 text-[14.5px] leading-snug text-ink">{o.caption}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-small font-semibold text-create">Your own content</p>
        <h2 className="mt-2.5 font-display text-h2 text-ink">{o.title}</h2>
        <p className="mt-4 max-w-[30rem] text-body text-muted-ink">{o.lede}</p>
        <ul className="mt-5 grid grid-cols-1 gap-2.5">
          {o.limits.map((l) => (
            <li key={l} className="flex items-center gap-3 text-body text-ink"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-grow-soft text-grow"><Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden /></span>{l}</li>
          ))}
        </ul>
        {motion && played && step === 3 && <div className="mt-3"><ReplayButton onClick={() => setPlayed(false)} /></div>}
      </div>
    </div>
  );
}

/* ── 4. Fresh posts every morning ──────────────────────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export function Cadence() {
  const d = STUDIO.daily;
  const [pick, setPick] = useState(2);
  const c = d.cadences[pick];
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div>
          <p className="text-small font-semibold text-create">Daily content</p>
          <h2 className="mt-2.5 font-display text-h2 text-ink">{d.title}</h2>
        </div>
        <p className="max-w-[32rem] text-body text-muted-ink lg:text-right">{d.lede}</p>
      </div>
      <div role="radiogroup" aria-label="How often" className="mt-6 flex flex-wrap gap-2">
        {d.cadences.map((x, i) => (
          <button key={x.id} type="button" role="radio" aria-checked={i === pick} onClick={() => setPick(i)} className={cx("min-h-11 rounded-full border px-5 text-small font-semibold transition-colors duration-200", i === pick ? "border-create bg-create text-white" : "border-line bg-white text-ink hover:border-create/50")}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-rp-md border border-line bg-white p-3 shadow-rp-2 sm:p-4">
        <p className="px-1 pb-3 text-small font-semibold text-ink">Media Library <span className="font-normal text-muted-ink">· waiting for you each morning</span></p>
        <ol className="grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
          {DAYS.map((day, i) => {
            const kind = c.week[i];
            return (
              <li key={day}>
                <p className="pb-1.5 text-center text-[12.5px] font-semibold text-muted-ink">{day}</p>
                <div className={cx("relative aspect-[4/5] overflow-hidden rounded-rp-sm transition-all duration-500 ease-rp", kind ? "shadow-rp-1" : "border border-dashed border-line-strong bg-base")}>
                  {kind && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img key={`${c.id}-${i}`} src={d.shots[i]} alt="" loading="lazy" className="rp-drop h-full w-full object-cover" style={{ "--i": i * 0.4 } as React.CSSProperties} />
                      <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-ink/75 px-1.5 py-0.5 text-[10.5px] font-semibold text-white">{kind === "v" ? <Play className="h-2.5 w-2.5 fill-current" aria-hidden /> : <ImageIcon className="h-2.5 w-2.5" aria-hidden />}{kind === "v" ? "Video" : "Image"}</span>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-3 text-small text-muted-ink">{d.note}</p>
    </div>
  );
}

/* ── 5. Checked before you see it ──────────────────────────────────────────────── */
const CHECK_ICON = { words: Type, cost: Coins, back: RefreshCcw };
export function Checked() {
  const c = STUDIO.checked;
  return (
    <div>
      <p className="text-small font-semibold text-create">Quality</p>
      <h2 className="mt-2.5 font-display text-h2 text-ink">{c.title}</h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {c.items.map((x) => {
          const Icon = CHECK_ICON[x.id];
          return (
            <li key={x.id} className="rounded-rp-md border border-line bg-white p-5 shadow-rp-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-rp-sm bg-create-soft text-create"><Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden /></span>
              <h3 className="mt-4 text-h3 font-semibold text-ink">{x.t}</h3>
              <p className="mt-2 text-small text-muted-ink">{x.d}</p>
              {x.id === "cost" && <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[13px] font-semibold text-ink">Cost shown here first <span className="rounded-full bg-cta px-2 py-0.5 text-[11.5px] text-cta-ink">Create</span></p>}
              {x.id === "words" && <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-grow-soft px-3 py-1.5 text-[13px] font-semibold text-grow"><Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden /> &ldquo;20% off this Saturday&rdquo;</p>}
              {x.id === "back" && <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1.5 text-[13px] font-semibold text-ink"><RefreshCcw className="h-3.5 w-3.5 text-grow" aria-hidden /> Credits returned</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── 6. The right shape for every app ──────────────────────────────────────────── */
export function Shapes() {
  const s = STUDIO.shapes;
  const { ref, live } = useLive<HTMLDivElement>(0.5);
  const [pick, setPick] = useState(0);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!live || touched) return;
    const t = setInterval(() => setPick((p) => (p + 1) % s.list.length), 2600);
    return () => clearInterval(t);
  }, [live, touched, s.list.length]);
  const cur = s.list[pick];
  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div>
        <p className="text-small font-semibold text-create">Every shape</p>
        <h2 className="mt-2.5 font-display text-h2 text-ink">{s.title}</h2>
        <p className="mt-4 max-w-[30rem] text-body text-muted-ink">{s.lede}</p>
        <div role="radiogroup" aria-label="Shape" className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {s.list.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={i === pick} onClick={() => { setTouched(true); setPick(i); }} className={cx("flex min-h-[60px] items-center gap-3 rounded-rp-md border px-4 py-2 text-left transition-[border-color,background-color] duration-300", i === pick ? "border-create bg-create-soft/60" : "border-line bg-white hover:border-create/40")}>
              <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center"><span className={cx("block rounded-[3px] border-2", i === pick ? "border-create" : "border-line-strong")} style={{ width: `${(x.w / Math.max(x.w, x.h)) * 28}px`, height: `${(x.h / Math.max(x.w, x.h)) * 28}px` }} /></span>
              <span className="leading-tight"><b className="block text-body font-semibold text-ink">{x.name} <span className="font-normal text-muted-ink">{x.ratio}</span></b><span className="text-[13px] text-muted-ink">{x.where}</span></span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex h-[clamp(300px,60svh,480px)] flex-col items-center justify-center gap-4 rounded-rp-lg bg-[linear-gradient(150deg,#fce7f1_0%,#f7f8fa_50%,#efedff_100%)] p-5" aria-live="polite">
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div className="overflow-hidden rounded-rp-md shadow-rp-3 transition-[width,aspect-ratio] duration-[900ms] ease-rp" style={{ aspectRatio: `${cur.w} / ${cur.h}`, width: `min(100%, calc((clamp(300px, 60svh, 480px) - 110px) * ${(cur.w / cur.h).toFixed(4)}))` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={`${s.alt}, cropped ${cur.name.toLowerCase()} ${cur.ratio}`} className="h-full w-full object-cover" />
          </div>
        </div>
        <p className="flex min-h-9 flex-wrap items-center justify-center gap-2 text-small font-semibold text-ink">
          {cur.apps.map((a) => <span key={`${cur.id}-${a}`} className="rp-drop"><ChannelLogo id={a} size={30} /></span>)}
          <span className="ml-1">{cur.where}</span>
        </p>
      </div>
    </div>
  );
}
