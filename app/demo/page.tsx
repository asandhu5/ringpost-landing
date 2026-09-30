import type { Metadata } from "next";
import { AssistantChat } from "@/components/site/assistant-chat";
import { PhoneMock } from "@/components/site/phone-mock";
import { VoiceDemo } from "@/components/site/voice-demo";
import { Container, CtaBand, Eyebrow, H2, Lede, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Demo: talk to RingPost's AI",
  description: "Chat with RingPost's own AI assistant or have a one-minute voice call with it in your browser, then see how a missed call turns into a booking.",
  openGraph: { title: "Talk to RingPost's AI", url: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title="Talk to it. Right now."
        lede="This is RingPost's own front desk, running on RingPost. Ask it anything about the product by chat, or have a one-minute voice call in your browser."
      />
      <Section className="!pt-0">
        <Container className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AssistantChat variant="full" />
          <VoiceDemo />
        </Container>
      </Section>
      <Section tone="surface">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Eyebrow>What your customers get</Eyebrow>
            <H2>A missed call, turned into a booking.</H2>
            <Lede className="mt-5">
              The assistant above talks about RingPost. For your business, the same engine answers your customers from your own services, prices and hours. Here&apos;s what happens when a call rings out while you&apos;re busy: a text from your number, a real look at your calendar, and a booking made before the customer tries someone else.
            </Lede>
          </div>
          <PhoneMock />
        </Container>
      </Section>
      <CtaBand secondary={{ href: "/pricing", label: "See pricing" }} />
    </>
  );
}
