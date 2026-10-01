import Link from "next/link";
import { Wordmark } from "@/components/site/logo";
import { CHANNELS } from "@/lib/content/channels";
import { COMPANY_NAV, LEGAL_NAV, PRODUCT_NAV, RESOURCES_NAV } from "@/lib/nav";
import { COMPANY, LOGIN_URL, SIGNUP_URL, SITE } from "@/lib/site";

/**
 * The site footer: product, channels, resources, company and legal, plus one line on
 * what RingPost is. Industries live on /industries and in the nav; contact details only
 * on /contact. The entity name comes from lib/site.ts so it matches /about and /contact.
 * No address, ever.
 */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-[#07070b]">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.6fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-ink">The AI front desk for local businesses. It answers every customer, then helps you win more.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={SIGNUP_URL} className="rounded-full bg-cta px-4 py-2 text-[13.5px] font-medium text-[#1a0d08] hover:bg-[var(--rp-cta-hover)]">
                Start free trial
              </a>
              <a href={LOGIN_URL} className="rounded-full border border-line-strong px-4 py-2 text-[13.5px] text-ink hover:border-glow/50">
                Sign in
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            <FooterCol title="Product">
              <FooterLink href="/product">AI Front Desk</FooterLink>
              {PRODUCT_NAV.flatMap((p) => p.links).map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Channels">
              {CHANNELS.map((c) => (
                <FooterLink key={c.id} href={`/channels#${c.id}`}>
                  {c.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Explore">
              <FooterLink href="/industries">Industries</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/call">Talk to Zara</FooterLink>
              {RESOURCES_NAV.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Company">
              {COMPANY_NAV.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Legal">
              {LEGAL_NAV.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.name}
                </FooterLink>
              ))}
            </FooterCol>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-[12.5px] text-faint">
          <p>
            © {SITE.year} {COMPANY.legalName}. All rights reserved.
            {COMPANY.registrationNumber ? ` Company registration number ${COMPANY.registrationNumber}.` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function groupAnchor(group: string): string {
  return group.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[13px] font-semibold text-ink">{title}</p>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[13.5px] text-muted-ink transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
