import type { Metadata } from "next";
import { AssistantChat } from "@/components/site/assistant-chat";
import { ContactForm } from "@/components/site/contact-form";
import { Container, PageHero, Section } from "@/components/site/ui";
import { COMPANY, PUBLISHED_MAILBOXES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact RingPost",
  description: `Ask ${SITE.name}'s assistant, or reach a person at ${COMPANY.legalName}.`,
  openGraph: { title: "Contact RingPost", url: "/contact" },
};

/**
 * Built around our own assistant (brief §9.14): the chat, plus a form that explicitly
 * reaches a human. Only mailboxes confirmed to receive mail are listed (lib/site.ts).
 * No address, ever: the registered address is residential.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We run our own front desk on RingPost." lede="Ask our assistant anything about RingPost and get an answer straight away. If you'd rather talk to a person, the form goes to the team." />
      <Section className="!pt-0">
        <Container className="grid items-start gap-6 lg:grid-cols-2">
          <AssistantChat variant="full" />
          <ContactForm />
        </Container>
      </Section>
      <Section tone="surface">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-glow">Email</p>
            <dl className="mt-5 flex flex-col gap-4">
              {PUBLISHED_MAILBOXES.map((m) => (
                <div key={m.address} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <dt className="w-36 shrink-0 text-[14px] text-muted-ink">{m.label}</dt>
                  <dd>
                    <a href={`mailto:${m.address}`} className="text-[15.5px] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-glow">
                      {m.address}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-glow">The company</p>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink">{COMPANY.legalName}</p>
            {COMPANY.registrationNumber && <p className="mt-1 text-[14px] text-muted-ink">Company registration number {COMPANY.registrationNumber}</p>}
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-ink">
              Already a customer? Sign in to your dashboard for billing, your plan and your data, or use the links at the foot of this page for our legal documents.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
