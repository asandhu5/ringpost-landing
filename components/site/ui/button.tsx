import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "./cx";

/**
 * The site's one button. Primary (cyan, ink text) is the single main action on a
 * screen; secondary is the quieter choice beside it; text is a link with an arrow.
 */
type Variant = "primary" | "secondary" | "text" | "inverse";
type Size = "md" | "sm";

const BASE = "rp-btn group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold";
const SIZES: Record<Size, string> = { md: "h-12 px-6 text-[15.5px]", sm: "h-10 px-4 text-small" };
const VARIANTS: Record<Variant, string> = {
  primary: "bg-cta text-cta-ink shadow-[0_14px_36px_-14px_rgba(34,211,238,0.9)] hover:bg-cta-hover",
  secondary: "border border-line-strong bg-white text-ink hover:border-ink/40 hover:bg-surface-2",
  inverse: "border border-white/30 text-white hover:bg-white/10",
  text: "!h-auto !px-0 text-violet hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  const cls = cx(BASE, SIZES[size], VARIANTS[variant], variant === "text" && "min-h-11", className);
  const inner = (
    <>
      {children}
      {(arrow ?? variant === "text") && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  // The dashboard and in-page anchors are plain links; pages on this site use the router.
  if (/^(https?:|mailto:|#)/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
