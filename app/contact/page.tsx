import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { OpenChatButton } from "@/components/site/chat-widget";
import { SUGGESTIONS } from "@/lib/content/assistant";
import { ContactForm } from "@/components/site/contact-form";
import { Container, PageHero, Section } from "@/components/site/ui";
import { COMPANY, SITE } from "@/lib/site";
import { InViewGroup } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Contact RingPost",
  description: `Ask ${SITE.name}'s assistant, or reach a person at ${COMPANY.legalName}.`,
  openGraph: { title: "Contact RingPost", url: "/contact" },
};

/**
 * The assistant for instant answers, plus a form that reaches a person (it is emailed to
 * the support mailbox). No email address or postal address is shown anywhere on the
 * site (owner, 2026-11-12).
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
    </>
  );
}
