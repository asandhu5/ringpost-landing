"use client";

import { ArrowUpRight } from "lucide-react";
import { Parallax, Reveal } from "@/components/landing/motion/primitives";
import { BOOKING_URL, CONTACT_EMAIL, LEGAL_LINKS, LOGIN_URL, SITE } from "@/lib/site";

/* The template's "Developers" column (Docs / SDK / API / Status) has
   been removed — RingPost is a done-for-you service, not a developer
   platform. There is deliberately no Pricing link anywhere. */
const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Channels", href: "#channels" },
    { name: "Marketing", href: "#marketing" },
    { name: "FAQ", href: "#faq" },
  ],
  Company: [
    { name: "Book a call", href: BOOKING_URL },
    { name: "Contact", href: `mailto:${CONTACT_EMAIL}` },
    { name: "Sign in", href: LOGIN_URL },
  ],
  Legal: LEGAL_LINKS,
} as const;

/* Deliberately empty until the accounts actually exist. A footer full of
   links to "#" reads worse than no social links at all — it's the first
   thing that makes a small site feel like an unfinished template.
   TODO: add { name, href } entries once the real profiles are live. */
const socialLinks: { name: string; href: string }[] = [];

export function FooterSection() {
  return (
    <footer className="relative bg-[var(--surface-3)]">
      {/* Panoramic banner */}
      <div className="relative h-[340px] w-full overflow-hidden md:h-[420px]">
        <Parallax speed={0.12} className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
            alt=""
            aria-hidden="true"
            className="h-[120%] w-full object-cover object-center"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface-3)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-3)]/50 via-transparent to-[var(--surface-3)]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-6 lg:gap-8">
            {/* Brand */}
            <Reveal className="col-span-2 md:col-span-3">
              <a href="#top" className="mb-6 inline-flex items-center gap-2">
                <span className="font-display text-2xl text-white">
                  {SITE.name}
                </span>
                <span className="font-mono text-xs text-white/40">&trade;</span>
              </a>

              <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/50">
                The AI front desk for local business. Answers every call and
                message, books real appointments onto your calendar, and keeps
                your marketing running.
              </p>

              {socialLinks.length > 0 ? (
                <div className="flex gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              ) : null}
            </Reveal>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links], colIndex) => (
              <Reveal key={title} delay={colIndex * 90}>
                <div>
                  <h3 className="mb-6 text-sm font-medium text-white">{title}</h3>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="group relative inline-block text-sm text-white/40 transition-colors hover:text-white"
                        >
                          {link.name}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--brand-pink)] transition-all duration-400 group-hover:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 md:flex-row">
          <p className="text-sm text-white/30">
            &copy; {SITE.year} {SITE.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-pink)]" />
              </span>
              Front desk online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
