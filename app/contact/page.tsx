import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { OpenChatButton } from "@/components/site/chat-widget";
import { SUGGESTIONS } from "@/lib/content/assistant";
import { ContactForm } from "@/components/site/contact-form";
import { Container, PageHero, Section } from "@/components/site/ui";
import { COMPANY, PRIMARY_EMAIL, SITE } from "@/lib/site";
import { InViewGroup } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Contact RingPost",
  description: `Ask ${SITE.name}'s assistant, or reach a person at ${COMPANY.legalName}.`,
  openGraph: { title: "Contact RingPost", url: "/contact" },
};

/**
 * Zara (chat and call), plus a form that reaches a person. This is the only page that
 * shows an email address: one confirmed mailbox, no label (lib/site.ts PRIMARY_EMAIL).
 * No address, ever: the registered address is residential.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us." lede="Our assistant answers instantly. For a person, use the form." />
      <Section className="!pt-0">
        <Container>
          <InViewGroup className="grid items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="rp-card rp-card-hover rounded-3xl p-7 sm:p-8">
              <span className="rp-icon-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-violet/15 text-glow">
                <MessageCircle aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-3xl text-ink">Ask a question</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Instant answers about RingPost. Pick a question:</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((q) => (
                  <OpenChatButton key={q} question={q} className="min-h-10 rounded-full border border-line-strong bg-white px-3.5 text-left text-[13.5px] text-ink hover:border-glow/50 hover:bg-violet/10">
                    {q}
                  </OpenChatButton>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
          </InViewGroup>
        </Container>
      </Section>
      <Section tone="surface">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[15px] font-medium text-ink">Email</h2>
            <a href={`mailto:${PRIMARY_EMAIL}`} className="mt-3 inline-block text-[1.35rem] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-glow">
              {PRIMARY_EMAIL}
            </a>
          </div>
          <div>
            <h2 className="text-[15px] font-medium text-ink">The company</h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink">{COMPANY.legalName}</p>
            {COMPANY.registrationNumber && <p className="mt-1 text-[14px] text-muted-ink">Company registration number {COMPANY.registrationNumber}</p>}
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-ink">Already a customer? Sign in to your dashboard for billing, your plan and your data.</p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="font-display text-3xl text-ink">What can we help with?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Getting started", b: "Questions about setup, keeping your number, connecting WhatsApp, Instagram or Facebook, or which plan fits your business.", href: "/faq", l: "Read the FAQ" },
              { t: "Plans and billing", b: "Choosing, changing or cancelling a plan, invoices and receipts. Customers can manage most of this from the dashboard.", href: "/pricing", l: "See plans" },
              { t: "Your data and privacy", b: "Seeing, correcting or deleting data, and how customer information is handled.", href: "/privacy", l: "Privacy policy" },
              { t: "If you're a customer of a business", b: "If you talked to a business that uses RingPost, the business controls your data. Ask them first, and we'll help them if they need it.", href: "/data-deletion", l: "Data deletion" },
              { t: "Reporting a problem", b: "Something RingPost said or posted that shouldn't have happened, or content that breaks our rules.", href: "/acceptable-use", l: "Acceptable use" },
              { t: "Partnerships and press", b: "Working with us, integrations, or writing about RingPost. Use the form and tell us a little about yourself.", href: "/about", l: "About RingPost" },
            ].map((x) => (
              <div key={x.t} className="rp-card rp-card-hover flex flex-col rounded-[24px] p-6">
                <p className="text-[17px] font-bold tracking-tight text-ink">{x.t}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">{x.b}</p>
                <a href={x.href} className="mt-auto pt-4 text-[14.5px] font-semibold text-glow hover:text-ink">{x.l}</a>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
