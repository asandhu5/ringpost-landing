"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/site/logo";
import { COMPANY_NAV, INDUSTRY_NAV, LEGAL_NAV, PRODUCT_NAV, RESOURCES_NAV, SOMETHING_ELSE_LINK, type NavLink } from "@/lib/nav";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/site";

type PanelId = "product" | "industries" | "resources" | "company";

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
      <div className={cx("hidden overflow-hidden bg-[#07070b] transition-[max-height,opacity] duration-300 lg:block", scrolled || open ? "max-h-0 opacity-0" : "max-h-10 border-b border-line opacity-100")}>
        <div className="mx-auto flex h-9 max-w-[1240px] items-center justify-between px-10 text-[12.5px]">
          <Link href="/call" className="flex items-center gap-2 text-muted-ink hover:text-ink">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-success" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Call Zara, our AI assistant, from your browser
          </Link>
          <nav aria-label="Utility" className="flex items-center gap-5 text-faint">
            <Link href="/faq" className="hover:text-ink">
              Help &amp; FAQ
            </Link>
            <Link href="/contact" className="hover:text-ink">
              Contact
            </Link>
            <Link href="/about" className="hover:text-ink">
              About
            </Link>
          </nav>
        </div>
      </div>
      <div className={cx("transition-all duration-300", scrolled || open || mobile ? "border-b border-line bg-base/85 backdrop-blur-xl" : "border-b border-transparent")}>
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <Link href="/" aria-label="RingPost home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center lg:flex">
            {trigger("product", "Product")}
            {trigger("industries", "Industries")}
            {plain("/channels", "Channels")}
            {plain("/call", "Talk to Zara")}
            {plain("/pricing", "Pricing")}
            {trigger("resources", "Resources")}
            {trigger("company", "Company")}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={LOGIN_URL} className="flex h-10 items-center whitespace-nowrap px-3 text-[14px] text-muted-ink hover:text-ink">
              Sign in
            </a>
            <a href={SIGNUP_URL} className="flex h-10 items-center whitespace-nowrap rounded-full bg-cta px-4 text-[14px] font-medium text-[#1a0d08] transition-colors hover:bg-[var(--rp-cta-hover)]">
              Start free trial
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
            className="animate-panel-in hidden border-t border-line lg:block"
          >
            <div className="mx-auto max-w-[1240px] px-10 py-8">
              {open === "product" && <ProductPanel />}
              {open === "industries" && <IndustriesPanel />}
              {open === "resources" && <SimplePanel links={RESOURCES_NAV} title="Resources" />}
              {open === "company" && <CompanyPanel />}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────── */}
      {mobile && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-base px-4 pb-10 pt-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <a href={SIGNUP_URL} className="flex min-h-12 items-center justify-center rounded-full bg-cta text-[15px] font-medium text-[#1a0d08]">
              Start free trial
            </a>
            <a href={LOGIN_URL} className="flex min-h-12 items-center justify-center rounded-full border border-line-strong text-[15px] text-ink">
              Sign in
            </a>
          </div>
          <div className="mt-6 divide-y divide-line border-y border-line">
            <MobileGroup title="Product">
              <MobileLink href="/product" name="AI Front Desk overview" />
              {PRODUCT_NAV.map((p) => (
                <div key={p.pillar} className="pt-2">
                  <p className="px-1 pb-1 text-[12px] font-medium text-faint">{p.name}</p>
                  {p.links.map((l) => (
                    <MobileLink key={l.href} {...l} />
                  ))}
                </div>
              ))}
            </MobileGroup>
            <MobileGroup title="Industries">
              <MobileLink href="/industries" name="All industries" />
              {INDUSTRY_NAV.map((g) => (
                <div key={g.group} className="pt-2">
                  <p className="px-1 pb-1 text-[12px] font-medium text-faint">{g.group}</p>
                  {g.links.map((l) => (
                    <MobileLink key={l.href} {...l} />
                  ))}
                </div>
              ))}
              <MobileLink {...SOMETHING_ELSE_LINK} />
            </MobileGroup>
            <MobileLink href="/channels" name="Channels" top />
            <MobileLink href="/call" name="Talk to Zara" top />
            <MobileLink href="/pricing" name="Pricing" top />
            <MobileGroup title="Resources">
              {RESOURCES_NAV.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
            <MobileGroup title="Company">
              {COMPANY_NAV.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
              <p className="px-1 pb-1 pt-3 text-[12px] font-medium text-faint">Legal</p>
              {LEGAL_NAV.map((l) => (
                <MobileLink key={l.href} {...l} />
              ))}
            </MobileGroup>
          </div>
        </div>
      )}
    </header>
  );
}

function ProductPanel() {
  return (
    <div className="grid grid-cols-[0.8fr_2.2fr] gap-10">
      <Link href="/product" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-strong bg-surface p-6">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/30 blur-3xl" />
        <div className="relative">
          <p className="text-[12px] font-medium text-glow">Overview</p>
          <p className="mt-3 font-display text-3xl leading-tight text-ink">The AI Front Desk</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-ink">What an AI front desk is, what this one does, and the rules it never breaks.</p>
        </div>
        <span className="relative mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-glow">
          Read the overview <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
      <div className="grid grid-cols-3 gap-8">
        {PRODUCT_NAV.map((p) => (
          <div key={p.pillar}>
            <p className="text-[12px] font-medium text-faint">{p.name}</p>
            <p className="mb-3 mt-1 text-[13px] text-muted-ink">{p.line}</p>
            <ul className="flex flex-col gap-1">
              {p.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
                    <span className="block text-[14.5px] font-medium text-ink">{l.name}</span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-ink">{l.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-x-8 gap-y-6">
        {INDUSTRY_NAV.map((g) => (
          <div key={g.group}>
            <p className="mb-2 text-[12px] font-medium text-faint">{g.group}</p>
            <ul className="flex flex-col">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block py-1 text-[13.5px] text-muted-ink transition-colors hover:text-ink">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-line pt-5 text-[13.5px]">
        <span className="text-muted-ink">
          Not listed?{" "}
          <Link href={SOMETHING_ELSE_LINK.href} className="text-glow hover:text-white">
            It works for other businesses too
          </Link>
        </span>
        <Link href="/industries" className="inline-flex items-center gap-1.5 font-medium text-glow hover:text-white">
          All industries <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function SimplePanel({ links, title }: { links: NavLink[]; title: string }) {
  return (
    <div className="grid grid-cols-[0.6fr_2fr] gap-10">
      <p className="font-display text-3xl text-ink">{title}</p>
      <ul className="grid grid-cols-3 gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block h-full rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-glow/40">
              <span className="block text-[15px] font-medium text-ink">{l.name}</span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{l.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyPanel() {
  return (
    <div className="grid grid-cols-[0.6fr_1.3fr_0.7fr] gap-10">
      <p className="font-display text-3xl text-ink">Company</p>
      <ul className="grid grid-cols-2 gap-3">
        {COMPANY_NAV.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="block h-full rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-glow/40">
              <span className="block text-[15px] font-medium text-ink">{l.name}</span>
              <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{l.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-2 text-[12px] font-medium text-faint">Legal</p>
        <ul className="grid grid-cols-1 gap-0.5">
          {LEGAL_NAV.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block py-1 text-[13.5px] text-muted-ink hover:text-ink">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
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

function MobileLink({ href, name, top }: NavLink & { top?: boolean }) {
  return (
    <Link href={href} className={cx("flex items-center px-1", top ? "min-h-14 text-[17px] text-ink" : "min-h-11 text-[15px] text-muted-ink")}>
      {name}
    </Link>
  );
}
