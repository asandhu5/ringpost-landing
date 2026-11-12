import Link from "next/link";
import { Wordmark } from "./logo";
import { ChannelLogo } from "./channel-logos";
import { COMPANY, LOGIN_URL, SITE } from "@/lib/site";
import { FOOTER_COMPANY, INDUSTRY_TILES, LEGAL_NAV, PRODUCT_COLUMNS } from "@/lib/nav";
import { ROUTES } from "@/lib/routes";
import { SOCIAL_PROFILES } from "@/lib/social-profiles";

const linkCls = "inline-flex min-h-8 items-center text-small text-muted-ink transition-colors duration-200 hover:text-ink";

function Column({ title, links, className }: { title: string; links: { name: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <p className="text-small font-semibold text-ink">{title}</p>
      <ul className="mt-3">
        {links.map((l) => (
          <li key={l.name}>
            <Link href={l.href} className={linkCls}>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Four link columns (Product, Industries, Company, Legal), the dashboard log-in, the
 * social profiles and a small still ring. */
export function SiteFooter() {
  const product = [...PRODUCT_COLUMNS.flatMap((c) => c.links.map((l) => ({ name: l.name, href: l.href })))];
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_3fr]">
          <div>
            <Link href="/" aria-label="RingPost home" className="inline-flex">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-[17rem] text-small text-muted-ink">Your AI business partner. It answers, books, posts and helps your business grow.</p>
            <a href={LOGIN_URL} className="mt-4 inline-flex min-h-11 items-center text-small font-semibold text-violet hover:text-ink">
              Log in to your dashboard
            </a>
            <div className="mt-3 flex flex-wrap gap-2.5" aria-label="RingPost on social media">
              {SOCIAL_PROFILES.map((p) => (
                <a key={p.id} href={p.href} aria-label={`RingPost on ${p.name}`} title={p.name} target="_blank" rel="noopener noreferrer" className="rounded-lg transition-transform duration-200 hover:-translate-y-0.5">
                  <ChannelLogo id={p.id} size={28} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <Column title="Product" links={product} />
            <Column title="Industries" links={[...INDUSTRY_TILES, { name: "All industries", href: ROUTES.industries }]} />
            <Column title="Company" links={FOOTER_COMPANY} />
            <Column title="Legal" links={LEGAL_NAV} />
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6 text-center">
          <p className="text-small text-muted-ink">
            © {SITE.year} {COMPANY.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
