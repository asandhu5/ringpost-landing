import type { Metadata } from "next";
import { MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { OpenChatButton } from "@/components/site/chat-widget";
import { SUGGESTIONS } from "@/lib/content/assistant";
import { ContactForm } from "@/components/site/contact-form";
import { Container, PageHero, Section } from "@/components/site/ui";
import { COMPANY, PRIMARY_EMAIL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact RingPost",
  description: `Ask Zara, ${SITE.name}'s AI assistant, or reach a person at ${COMPANY.legalName}.`,
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
      <PageHero eyebrow="Contact" title="Talk to us." lede="Zara answers instantly. For a person, use the form." />
      <Section className="!pt-0">
        <Container className="grid items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="rp-card rounded-3xl p-7 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet/15 text-glow">
                <MessageCircle aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-3xl text-ink">Ask Zara</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Instant answers about RingPost. Pick a question:</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((q) => (
                  <OpenChatButton key={q} question={q} className="min-h-10 rounded-full border border-line-strong bg-white/[0.03] px-3.5 text-left text-[13.5px] text-ink hover:border-glow/50 hover:bg-violet/10">
                    {q}
                  </OpenChatButton>
                ))}
              </div>
            </div>
            <Link href="/call" className="rp-card rp-card-hover flex items-center gap-4 rounded-3xl p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-success/15 text-success">
                <PhoneCall aria-hidden className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[16px] font-medium text-ink">Or call Zara</span>
                <span className="mt-0.5 block text-[14px] text-muted-ink">One minute, in your browser.</span>
              </span>
            </Link>
          </div>
          <ContactForm />
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
    </>
  );
}
