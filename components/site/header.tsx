"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, BedDouble, Bot, BrainCircuit, Briefcase, CalendarCheck, Car, ChartNoAxesCombined, ChevronDown, Dumbbell, GraduationCap, Inbox,
  Megaphone, Menu, MessagesSquare, Phone, RotateCcw, Send, ShoppingBag, Sparkles, Star, Stethoscope, UtensilsCrossed, Wrench, X,
} from "lucide-react";
import { Wordmark } from "@/components/site/logo";
import { Button } from "@/components/site/ui/button";
import { cx } from "@/components/site/ui/cx";
import { AREA_TONE, IconTile } from "@/components/site/ui/primitives";
import { INDUSTRY_TILES, PRODUCT_COLUMNS, type NavLink, type ProductArea } from "@/lib/nav";
import { ROUTES } from "@/lib/routes";
import { LOGIN_URL, START_URL } from "@/lib/site";

type PanelId = "product" | "industries";
type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const ICONS: Record<string, Icon> = {
  Phone, MessagesSquare, Inbox, CalendarCheck, BrainCircuit, Sparkles, Send, Star, RotateCcw, Megaphone, ChartNoAxesCombined, Bot,
  Stethoscope, Dumbbell, UtensilsCrossed, Wrench, Car, Briefcase, GraduationCap, ShoppingBag, BedDouble,
};

const PRODUCT_PATHS = [...PRODUCT_COLUMNS.flatMap((c) => c.links.map((l) => l.href))];

/**
 * The site header: Product ▾ · Industries ▾ · Pricing · Contact … Log in · Get started.
 * The two panels open on click, on hover with a mouse, and with the keyboard (Enter or
 * the down arrow moves into the panel, Escape closes it and returns to the button).
 */
export function SiteHeader() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusPanel = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setSheet(false);
  }, [pathname]);

  const close = useCallback((refocus = false) => {
    setOpen((current) => {
      if (refocus && current) document.getElementById(`menu-button-${current}`)?.focus();
      return null;
    });
  }, []);

  useEffect(() => {
    if (!open && !sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close(true);
      setSheet(false);
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, sheet, close]);

  // A panel opened from the keyboard takes focus, so the next Tab is inside it.
  useEffect(() => {
    if (open && focusPanel.current) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    focusPanel.current = false;
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheet]);

  const hoverOpen = (id: PanelId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  const isActive = (id: PanelId | "pricing" | "contact") =>
    id === "product" ? PRODUCT_PATHS.includes(pathname as (typeof PRODUCT_PATHS)[number]) : id === "industries" ? pathname.startsWith("/industries") : pathname === `/${id}`;

  const itemCls = (active: boolean, expanded = false) =>
    cx("relative flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3.5 text-[15px] font-medium transition-colors duration-200", expanded ? "bg-surface-2 text-ink" : active ? "text-ink" : "text-muted-ink hover:text-ink");
  const activeDot = <span aria-hidden className="absolute inset-x-3.5 -bottom-[3px] h-[2px] rounded-full bg-violet" />;

  const trigger = (id: PanelId, label: string) => (
    <button
      id={`menu-button-${id}`}
      type="button"
      aria-expanded={open === id}
      aria-controls={`menu-panel-${id}`}
      onClick={(e) => {
        focusPanel.current = e.detail === 0 && open !== id;
        setOpen(open === id ? null : id);
      }}
      onKeyDown={(e) => {
        if (e.key !== "ArrowDown") return;
        e.preventDefault();
        focusPanel.current = true;
        if (open === id) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
        else setOpen(id);
      }}
      onMouseEnter={() => hoverOpen(id)}
      onMouseLeave={hoverClose}
      className={itemCls(isActive(id), open === id)}
    >
      {label}
      <ChevronDown aria-hidden className={cx("h-4 w-4 transition-transform duration-200", open === id && "rotate-180")} />
      {isActive(id) && open !== id && activeDot}
    </button>
  );

  const plain = (id: "pricing" | "contact", href: string, label: string) => (
    <Link href={href} aria-current={isActive(id) ? "page" : undefined} className={itemCls(isActive(id))} onMouseEnter={() => open && hoverClose()}>
      {label}
      {isActive(id) && activeDot}
    </Link>
  );

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {open && <div aria-hidden className="animate-panel-in fixed inset-0 top-[var(--header-h)] -z-10 hidden bg-ink/20 backdrop-blur-[2px] lg:block" />}
      <div className={cx("border-b transition-[background-color,border-color,box-shadow] duration-300", open || sheet ? "border-line bg-white" : scrolled ? "border-line bg-white/80 shadow-rp-1 backdrop-blur-xl" : "border-transparent bg-white/0")}>
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1240px] items-center gap-6 px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label="RingPost home" className="shrink-0 rounded-rp-sm">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="ml-4 hidden items-center gap-0.5 lg:flex">
            {trigger("product", "Product")}
            {trigger("industries", "Industries")}
            {plain("pricing", ROUTES.pricing, "Pricing")}
            {plain("contact", ROUTES.contact, "Contact")}
          </nav>

          <div className="ml-auto hidden items-center gap-1.5 lg:flex">
            <a href={LOGIN_URL} className={itemCls(false)}>
              Log in
            </a>
            <Button href={START_URL} size="sm">
              Get started
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink lg:hidden"
            aria-expanded={sheet}
            aria-controls="menu-sheet"
            aria-label={sheet ? "Close menu" : "Open menu"}
            onClick={() => setSheet((v) => !v)}
          >
            {sheet ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>

        {open && (
          <div
            ref={panelRef}
            id={`menu-panel-${open}`}
            role="region"
            aria-labelledby={`menu-button-${open}`}
            onMouseEnter={() => hoverOpen(open)}
            onMouseLeave={hoverClose}
            className="animate-panel-in hidden max-h-[calc(100svh-var(--header-h))] overflow-y-auto border-t border-line bg-white shadow-rp-3 lg:block"
          >
            <div className="mx-auto max-w-[1240px] px-10 py-6">{open === "product" ? <ProductPanel pathname={pathname} /> : <IndustriesPanel pathname={pathname} />}</div>
          </div>
        )}
      </div>

      {sheet && <Sheet pathname={pathname} />}
    </header>
  );
}

function PanelLink({ l, area, current }: { l: NavLink; area: ProductArea; current: boolean }) {
  return (
    <Link href={l.href} aria-current={current ? "page" : undefined} className={cx("group flex items-center gap-3 rounded-rp-sm p-2.5 transition-colors duration-200 hover:bg-surface-2", current && "bg-surface-2")}>
      <IconTile icon={ICONS[l.icon ?? "Sparkles"]} area={area} />
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-tight text-ink">{l.name}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted-ink">{l.summary}</span>
      </span>
    </Link>
  );
}

function ProductPanel({ pathname }: { pathname: string }) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {PRODUCT_COLUMNS.map((col) => (
        <div key={col.area} className="flex flex-col">
          <p className="flex items-baseline gap-2 px-2.5 pb-2">
            <span className={cx("text-small font-semibold", AREA_TONE[col.area].text)}>{col.title}</span>
            <span className="text-[13px] text-muted-ink">{col.blurb}</span>
          </p>
          <div className="flex flex-col gap-0.5">
            {col.links.map((l) => (
              <PanelLink key={l.name} l={l} area={col.area} current={pathname === l.href} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function IndustriesPanel({ pathname }: { pathname: string }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {INDUSTRY_TILES.map((l) => {
          const Icon = ICONS[l.icon ?? "Sparkles"];
          return (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={cx("flex h-[92px] flex-col justify-between rounded-rp-sm border border-line p-3.5 transition-colors duration-200 hover:border-primary-line hover:bg-primary-soft", pathname === l.href && "border-primary-line bg-primary-soft")}>
              <Icon className="h-5 w-5 text-violet" strokeWidth={1.75} aria-hidden />
              <span className="text-[15px] font-semibold leading-tight text-ink">{l.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between gap-6 border-t border-line pt-3">
        <p className="text-small text-muted-ink">Every kind of local business has its own way of answering and booking. RingPost is set up for yours.</p>
        <Button href={ROUTES.industries} variant="text">
          All industries
        </Button>
      </div>
    </div>
  );
}

/** The phone and tablet menu: a full-screen sheet with big rows, and Get started pinned
 * to the bottom. */
function Sheet({ pathname }: { pathname: string }) {
  return (
    <div id="menu-sheet" className="fixed inset-x-0 bottom-0 top-[var(--header-h)] flex flex-col bg-white lg:hidden">
      <nav aria-label="Main" className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-4">
        <SheetGroup title="Product" defaultOpen>
          {PRODUCT_COLUMNS.map((col) => (
            <div key={col.area} className="pb-2">
              <p className={cx("px-1 pb-1 pt-2 text-[13px] font-semibold", AREA_TONE[col.area].text)}>{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.name} href={l.href} aria-current={pathname === l.href ? "page" : undefined} className="flex min-h-12 items-center gap-3 rounded-rp-sm px-1 text-[16px] font-medium text-ink active:bg-surface-2">
                  <IconTile icon={ICONS[l.icon ?? "Sparkles"]} area={col.area} size={32} />
                  {l.name}
                </Link>
              ))}
            </div>
          ))}
        </SheetGroup>
        <SheetGroup title="Industries">
          <div className="grid grid-cols-2 gap-x-3 pb-3">
            {INDUSTRY_TILES.map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-12 items-center rounded-rp-sm px-1 text-[15.5px] font-medium text-ink active:bg-surface-2">
                {l.name}
              </Link>
            ))}
            <Link href={ROUTES.industries} className="col-span-2 flex min-h-12 items-center gap-1.5 px-1 text-[15.5px] font-semibold text-violet">
              All industries <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </SheetGroup>
        <Link href={ROUTES.pricing} className="flex min-h-[60px] items-center px-1 text-[19px] font-semibold text-ink">
          Pricing
        </Link>
        <Link href={ROUTES.contact} className="flex min-h-[60px] items-center px-1 text-[19px] font-semibold text-ink">
          Contact
        </Link>
      </nav>
      <div className="flex gap-3 border-t border-line bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <Button href={LOGIN_URL} variant="secondary" className="flex-1">
          Log in
        </Button>
        <Button href={START_URL} className="flex-1">
          Get started
        </Button>
      </div>
    </div>
  );
}

function SheetGroup({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between px-1 text-[19px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden className="h-5 w-5 text-muted-ink transition-transform duration-200 group-open:rotate-180" />
      </summary>
      {children}
    </details>
  );
}
