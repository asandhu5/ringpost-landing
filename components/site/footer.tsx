import Link from "next/link";
import { Wordmark } from "@/components/site/logo";
import { CHANNELS } from "@/lib/content/channels";
import { COMPANY_NAV, INDUSTRY_NAV, LEGAL_NAV, PRODUCT_NAV, RESOURCES_NAV, SOMETHING_ELSE_LINK } from "@/lib/nav";
import { COMPANY, LOGIN_URL, PUBLISHED_MAILBOXES, SIGNUP_URL, SITE } from "@/lib/site";

/**
 * A substantial footer (brief §9.3): product, industries by group, channels, resources,
 * company and legal, plus one line on what RingPost is. The entity name comes from
 * lib/site.ts so it is byte-identical to /about and /contact. No address, ever.
 */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-[#07070b]">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2.9fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-ink">
              RingPost is an AI front desk for local businesses. It answers every call and message and books the appointment, then posts to your socials, asks for reviews and brings customers back.
            </p>
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
              <FooterLink href="/demo">Live demo</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </FooterCol>
            <FooterCol title="Resources">
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

        <div className="mt-14 border-t border-line pt-10">
          <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Industries</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRY_NAV.map((g) => (
              <div key={g.group}>
                <Link href={`/industries#${groupAnchor(g.group)}`} className="text-[13px] font-medium text-ink hover:text-glow">
                  {g.group}
                </Link>
                <ul className="mt-2 flex flex-col gap-1">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[12.5px] text-faint transition-colors hover:text-muted-ink">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <Link href={SOMETHING_ELSE_LINK.href} className="text-[13px] font-medium text-ink hover:text-glow">
                Something else
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-[12.5px] text-faint lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {SITE.year} {COMPANY.legalName}. All rights reserved.
            {COMPANY.registrationNumber ? ` Company registration number ${COMPANY.registrationNumber}.` : ""}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {PUBLISHED_MAILBOXES.map((m) => (
              <a key={m.address} href={`mailto:${m.address}`} className="hover:text-muted-ink">
                {m.address}
              </a>
            ))}
          </p>
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed text-faint/80">
          Instagram, Facebook, Messenger and WhatsApp are trademarks of Meta Platforms, Inc. Google and Google Calendar are trademarks of Google LLC. RingPost works with these services and is not affiliated with or endorsed by them.
        </p>
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
      <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">{title}</p>
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
