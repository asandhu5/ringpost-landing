"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquareHeart, UsersRound, ChartNoAxesCombined, Bot, ArrowRight, BarChart3, BedDouble, BookOpen, Briefcase, CalendarCheck, Camera, Car, ChevronDown, Dumbbell, GraduationCap, Inbox, Menu, MessageCircleQuestion, RotateCcw, Send, ShoppingBag, Sparkles, Star, Stethoscope, UtensilsCrossed, Wand2, Wrench, X } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Wordmark } from "@/components/site/logo";
import { CHANNEL_EXTRAS, CHANNEL_MENU, COMPANY_NAV, CONTENT_MENU, GROW_MENU, INDUSTRY_MENU, LEGAL_NAV, RESOURCES_NAV, type NavLink } from "@/lib/nav";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen } from "@/components/site/phone/apps";
import { POST_PLATFORMS } from "@/lib/content/platforms";
import { START_URL } from "@/lib/site";

type PanelId = "channels" | "content" | "grow" | "industries" | "contact";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquareHeart, UsersRound, ChartNoAxesCombined, Bot, Inbox, CalendarCheck, BookOpen, Sparkles, Wand2, Camera, Send, Star, RotateCcw, BarChart3, MessageCircleQuestion,
  Stethoscope, Dumbbell, UtensilsCrossed, Wrench, Car, Briefcase, GraduationCap, ShoppingBag, BedDouble,
};

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/**
 * The site header. Product and Industries open WIDE panels (brief §9.3), not thin
 * lists; Industries is grouped the way the platform's business-types.ts groups trades.
 * Panels open on click or keyboard, and on hover for a mouse; Escape and an outside click
 * close them, and focus returns to the trigger.
 */
export function SiteNav() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  const close = useCallback((refocus = false) => {
    setOpen((current) => {
      if (refocus && current) document.getElementById(`nav-trigger-${current}`)?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, mobile, close]);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobile]);

  const hoverOpen = (id: PanelId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const trigger = (id: PanelId, label: string) => (
    <button
      id={`nav-trigger-${id}`}
      type="button"
      aria-expanded={open === id}
      aria-controls={`nav-panel-${id}`}
      onClick={() => setOpen(open === id ? null : id)}
      onMouseEnter={() => hoverOpen(id)}
      onMouseLeave={hoverClose}
      className={cx("flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[14px] transition-colors", open === id ? "text-ink" : "text-muted-ink hover:text-ink")}
    >
      {label}
      <ChevronDown aria-hidden className={cx("h-3.5 w-3.5 transition-transform", open === id && "rotate-180")} />
    </button>
  );

  const plain = (href: string, label: string) => (
    <Link href={href} className={cx("flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[14px] transition-colors", pathname === href ? "text-ink" : "text-muted-ink hover:text-ink")}>
      {label}
    </Link>
  );

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* An open menu dims the page so it reads as its own layer. */}
      {open && <div aria-hidden className="animate-panel-in fixed inset-0 top-[72px] -z-10 hidden bg-[#0b1b2b]/25 backdrop-blur-[2px] lg:block" />}
      <div className={cx("transition-all duration-300", open ? "border-b border-line bg-white" : scrolled || mobile ? "border-b border-line bg-base/85 backdrop-blur-xl" : "border-b border-line bg-white/95 backdrop-blur-xl")}>
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <Link href="/" aria-label="RingPost home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {trigger("channels", "Channels")}
            {trigger("content", "Content Studio")}
            {trigger("grow", "Grow")}
            {trigger("industries", "Industries")}
            {plain("/pricing", "Pricing")}
            {trigger("contact", "Contact")}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={START_URL} className="flex h-10 items-center whitespace-nowrap rounded-full bg-cta px-4 text-[14px] font-semibold text-[var(--rp-cta-ink)] transition-colors hover:bg-[var(--rp-cta-hover)]">
              Get started
            </a>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* ── Desktop panels ─────────────────────────────────────── */}
        {open && (
          <div
            id={`nav-panel-${open}`}
            role="region"
            aria-labelledby={`nav-trigger-${open}`}
            onMouseEnter={() => hoverOpen(open)}
            onMouseLeave={hoverClose}
            className="animate-panel-in hidden border-t border-line bg-white shadow-[0_30px_60px_-24px_rgba(11,27,43,0.35)] lg:block"
          >
            <div className="mx-auto max-w-[1240px] px-10 py-7">
              {open === "channels" && <ChannelsPanel />}
              {open === "content" && <ContentPanel />}
              {open === "grow" && <GrowPanel />}
              {open === "industries" && <IndustriesPanel />}
              {open === "contact" && <ContactPanel />}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      {mobile && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-base px-4 pb-10 pt-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <a href={START_URL} className="flex min-h-12 items-center justify-center rounded-full bg-cta text-[15px] font-semibold text-[var(--rp-cta-ink)]">
              Get started
            </a>
          </div>
          <div className="mt-6 divide-y divide-line border-y border-line">
            <MobileGroup title="Channels">
              <MobileLink href="/channels" name="All channels" />
              {[...CHANNEL_MENU, ...CHANNEL_EXTRAS].map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
            <MobileGroup title="Content Studio">
              {CONTENT_MENU.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
            <MobileGroup title="Grow">
              {GROW_MENU.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
            <MobileGroup title="Industries">
              <MobileLink href="/industries" name="All industries" />
              {INDUSTRY_MENU.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
            <MobileLink href="/pricing" name="Pricing" top />
            <MobileGroup title="Contact">
              {[...COMPANY_NAV, ...RESOURCES_NAV, ...LEGAL_NAV].map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuItem({ l }: { l: NavLink }) {
  const Icon = l.icon ? ICONS[l.icon] : null;
  return (
    <Link href={l.href} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-surface-2">
      {l.logo ? (
        <ChannelLogo id={l.logo} size={36} />
      ) : Icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#5b4ee6]/10 text-[#5b4ee6] transition-colors group-hover:bg-[#5b4ee6] group-hover:text-white">
          <Icon className="h-4.5 w-4.5" />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-[14.5px] font-semibold text-ink">{l.name}</span>
        {l.summary && <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-ink">{l.summary}</span>}
      </span>
    </Link>
  );
}

function Feature({ href, eyebrow, title, body, children }: { href: string; eyebrow: string; title: string; body: string; children?: React.ReactNode }) {
  return (
    <Link href={href} className="rp-brand-ring group flex h-full flex-col rounded-2xl p-5 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(91,78,230,0.5)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">{eyebrow}</p>
      <p className="mt-2 text-lg font-bold leading-tight tracking-tight text-ink">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-ink">{body}</p>
      {children}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-[#5b4ee6]">
        See more <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function ChannelsPanel() {
  return (
    <div className="grid grid-cols-[0.7fr_2fr_1fr] gap-6">
      <Feature href="/channels" eyebrow="Channels" title="Every customer answered" body="Calls, WhatsApp, Instagram, Messenger, texts and email, answered in one voice and booked into your calendar." />
      <div className="grid grid-cols-2 gap-1">
        {CHANNEL_MENU.map((l) => (
          <MenuItem key={l.href} l={l} />
        ))}
      </div>
      <div className="flex flex-col gap-1 border-l border-line pl-6">
        <p className="px-3 pb-1 text-[12px] font-medium text-faint">Behind every channel</p>
        {CHANNEL_EXTRAS.map((l) => (
          <MenuItem key={l.href} l={l} />
        ))}
      </div>
    </div>
  );
}

function ContentPanel() {
  const pics = INDUSTRY_SHOWCASE.filter((x) => ["beauty-and-wellness", "food-and-drink", "auto", "stays-and-venues", "fitness", "shops"].includes(x.slug));
  return (
    <div className="grid grid-cols-2 gap-6">
      <Link href="/content-studio" className="group flex overflow-hidden rounded-3xl border-2 border-[#ddd8ff] bg-[linear-gradient(160deg,#f6f4ff,#ffffff_60%)] transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(91,78,230,0.6)]">
        <span className="flex flex-1 flex-col p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b4ee6] text-white"><Sparkles className="h-5 w-5" aria-hidden /></span>
          <span className="mt-4 text-[20px] font-bold tracking-tight text-ink">Content Studio</span>
          <span className="mt-1.5 text-[13.5px] leading-relaxed text-muted-ink">Your phone photo or one line, made into images and short videos for your kind of business, with your logo and offer on them. Fresh content every morning.</span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-[#5b4ee6]">Step inside the studio <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
        </span>
        <span className="grid w-[44%] grid-cols-2 gap-1.5 p-3">
          {pics.map((x) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={x.slug} src={x.after} alt="" className="aspect-square w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          ))}
        </span>
      </Link>
      <Link href="/posting" className="group flex overflow-hidden rounded-3xl border-2 border-[#bdeffa] bg-[linear-gradient(160deg,#effcff,#ffffff_60%)] transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(8,145,178,0.6)]">
        <span className="flex flex-1 flex-col p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0891b2] text-white"><Send className="h-5 w-5" aria-hidden /></span>
          <span className="mt-4 text-[20px] font-bold tracking-tight text-ink">Posting and uploads</span>
          <span className="mt-1.5 text-[13.5px] leading-relaxed text-muted-ink">Upload from your phone or pick what Content Studio made. A caption for each platform, a preview in every app, then posted now or on schedule.</span>
          <span className="mt-4 flex flex-wrap gap-1.5">{POST_PLATFORMS.map((p) => <ChannelLogo key={p.id} id={p.id} size={24} />)}</span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-[#0e7490]">See it in every app <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
        </span>
        <span className="relative w-[40%] overflow-hidden">
          <span className="absolute left-1/2 top-4 w-[150px] -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-1.5">
            <IPhone16ProMax width={150}><AppScreen platform="instagram" post={{ media: { kind: "image", src: "/made/studio/beauty-post.webp", alt: "" }, business: { name: "Studio & Co.", handle: "studioandco", color: "#db2777" }, caption: "Soft, sunlit balayage for the new season." }} /></IPhone16ProMax>
          </span>
        </span>
      </Link>
    </div>
  );
}

/** The channels each Grow tool works with, shown under its name in the menu. */
const GROW_LOGOS: Record<string, string[]> = {
  "/product/reviews": ["google", "instagram", "facebook", "tiktok", "x", "youtube"],
  "/product/winback": ["sms", "whatsapp"],
  "/product/insights": ["phone", "whatsapp", "instagram", "messenger", "sms", "email"],
  "/product/advisor": ["phone", "whatsapp", "instagram", "google", "tiktok"],
};

const GROW_EXTRAS = [
  "A review request after every visit",
  "Low ratings sent to your phone first",
  "What customers keep asking",
  "Win-back groups made for you",
];

function GrowPanel() {
  return (
    <div className="grid grid-cols-[0.8fr_2fr_0.9fr] gap-6">
      <Feature href="/grow" eyebrow="Grow" title="Win more customers, and keep them" body="Reviews and comments answered, quiet customers brought back, and a clear view of what's working." />
      <div className="grid grid-cols-2 gap-1">
        {GROW_MENU.map((l) => (
          <div key={l.href}>
            <MenuItem l={l} />
            <span className="-mt-1 flex gap-1 pb-2 pl-[60px]" aria-hidden>
              {(GROW_LOGOS[l.href] ?? []).map((id) => (id === "google" ? <span key={id} className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-[10.5px] font-bold text-[#4285f4] ring-1 ring-line">G</span> : <ChannelLogo key={id} id={id} size={20} />))}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-l border-line pl-6">
        <p className="pb-1 text-[12px] font-medium text-faint">Also in Grow</p>
        {GROW_EXTRAS.map((t) => (
          <span key={t} className="flex items-center gap-2 text-[13.5px] text-ink"><Star className="h-3.5 w-3.5 text-amber-500" aria-hidden />{t}</span>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="grid grid-cols-[1fr_1fr_1.3fr] gap-6">
      <div className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-[12px] font-medium text-faint">Reach out</p>
        {COMPANY_NAV.map((l) => <MenuItem key={l.href} l={{ ...l, icon: l.href === "/contact" ? "MessageCircleQuestion" : "Briefcase" }} />)}
      </div>
      <div className="flex flex-col gap-1">
        <p className="px-3 pb-1 text-[12px] font-medium text-faint">Learn</p>
        {RESOURCES_NAV.map((l) => <MenuItem key={l.href} l={{ ...l, icon: l.href.includes("blog") ? "BookOpen" : "MessageCircleQuestion" }} />)}
      </div>
      <div className="border-l border-line pl-6">
        <p className="pb-2 text-[12px] font-medium text-faint">Policies</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {LEGAL_NAV.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-2 py-1.5 text-[14px] text-ink transition-colors hover:bg-surface-2">{l.name}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1">
        {INDUSTRY_MENU.map((l) => (
          <MenuItem key={l.href} l={{ ...l, summary: undefined }} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[13.5px]">
        <span className="text-muted-ink">Each industry has its own rules for what to say, what to hand to you and how to book.</span>
        <Link href="/industries" className="inline-flex items-center gap-1.5 font-semibold text-glow hover:text-ink">
          All industries <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-1 text-[17px] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden className="h-4 w-4 text-muted-ink transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function MobileLink({ href, name, top, logo }: NavLink & { top?: boolean }) {
  return (
    <Link href={href} className={cx("flex items-center gap-3 px-1", top ? "min-h-14 text-[17px] text-ink" : "min-h-11 text-[15px] text-muted-ink")}>
      {logo && <ChannelLogo id={logo} size={24} />}
      {name}
    </Link>
  );
}
