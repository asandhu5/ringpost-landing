const cx = (...p: (string | undefined)[]) => p.filter(Boolean).join(" ");

/** The ring mark (from logo.png) as SVG, so it stays crisp at every size. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cx("h-7 w-7", className)}>
      <defs>
        <linearGradient id="rp-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a594ff" />
          <stop offset="0.55" stopColor="#7c6bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M21.6 6.2A11 11 0 1 0 26.9 19.4" fill="none" stroke="url(#rp-ring)" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M24.6 22.2 26.4 16.6" stroke="#22d3ee" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24.4" cy="22.6" r="2.7" fill="#22d3ee" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cx("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[1.18rem] font-semibold tracking-[-0.02em] text-ink">RingPost</span>
    </span>
  );
}
