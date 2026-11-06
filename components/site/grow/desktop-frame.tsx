/** A browser-style window around a recreated dashboard screen. */
export function DesktopFrame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[22px] border border-line-strong bg-white shadow-[0_60px_120px_-60px_rgba(11,27,43,0.6)] ${className ?? ""}`}>
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-4 w-4" />{title}
        </span>
      </div>
      {children}
    </div>
  );
}
