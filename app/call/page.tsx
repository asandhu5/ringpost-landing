import type { Metadata } from "next";
import { Clock, Mic, ShieldCheck } from "lucide-react";
import { OpenChatButton } from "@/components/site/chat-widget";
import { ZaraCall } from "@/components/site/zara";
import { Container, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Talk to Zara, RingPost's AI assistant",
  description: "Call Zara, RingPost's own AI assistant, from your browser. One minute, no phone number. Ask her anything about RingPost.",
  openGraph: { title: "Talk to Zara, RingPost's AI assistant", url: "/call" },
};

const TRY = ["What does RingPost do for a hair salon?", "How does the free trial work?", "What happens if it doesn't know an answer?"];

export default function CallPage() {
  return (
    <>
      <PageHero
        eyebrow="Talk to Zara"
        title="Hear it for yourself."
        lede="Zara is RingPost's own AI assistant. Press the orb and ask her anything about RingPost. The call ends by itself after a minute."
        aside={
          <div className="flex flex-col items-center">
            <ZaraCall size="lg" />
          </div>
        }
      >
        <div>
          <p className="text-[15px] font-medium text-ink">Try asking</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {TRY.map((t) => (
              <li key={t} className="text-[16px] text-muted-ink">
                &ldquo;{t}&rdquo;
              </li>
            ))}
          </ul>
          <OpenChatButton className="mt-6 text-[14.5px] text-glow underline decoration-glow/40 underline-offset-4 hover:text-white">Rather type? Chat with Zara</OpenChatButton>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-10 md:grid-cols-3">
          {[
            { icon: Mic, title: "Allow your microphone", body: "Your voice is used only to run the call. We don't record it." },
            { icon: Clock, title: "One minute", body: "Our server ends the call at 60 seconds." },
            { icon: ShieldCheck, title: "Just about RingPost", body: "Zara won't pretend to be a business or take a booking. Try that in your free trial." },
          ].map((c) => (
            <div key={c.title}>
              <c.icon aria-hidden className="h-5 w-5 text-glow" />
              <h2 className="mt-4 text-[1.05rem] font-semibold text-ink">{c.title}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">{c.body}</p>
            </div>
          ))}
        </Container>
      </Section>

    </>
  );
}
