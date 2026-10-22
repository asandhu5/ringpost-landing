import type { Metadata } from "next";
import { Clock, Mic, ShieldCheck } from "lucide-react";
import { OpenChatButton } from "@/components/site/chat-widget";
import { ZaraCall } from "@/components/site/zara";
import { Container, PageHero, Section } from "@/components/site/ui";
import { InViewGroup } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Talk to Zara, RingPost's AI assistant",
  description: "Call Zara, RingPost's own AI assistant, from your browser. One minute, no phone number. Ask her anything about RingPost.",
  openGraph: { title: "Talk to Zara, RingPost's AI assistant", url: "/call" },
};

const TRY = ["What does RingPost do for a hair salon?", "Can I keep my own phone number?", "What happens if it doesn't know an answer?"];

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
          <ul className="mt-3 flex flex-col gap-2">
            {TRY.map((t) => (
              <li key={t}>
                <OpenChatButton question={t} className="rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-left text-[15px] text-muted-ink transition-colors hover:border-glow/50 hover:text-ink">
                  &ldquo;{t}&rdquo;
                </OpenChatButton>
              </li>
            ))}
          </ul>
          <OpenChatButton className="mt-6 text-[14.5px] text-glow underline decoration-glow/40 underline-offset-4 hover:text-white">Rather type? Chat with Zara</OpenChatButton>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container>
          <InViewGroup className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Mic, title: "Allow your microphone", body: "Your voice is used only to run the call. We don't record it." },
            { icon: Clock, title: "One minute", body: "Our server ends the call at 60 seconds." },
            { icon: ShieldCheck, title: "Just about RingPost", body: "Zara won't pretend to be a business or take a booking. Try that with your own AI once you sign up." },
          ].map((c) => (
            <div key={c.title} className="rp-card rp-card-hover rounded-3xl p-7">
              <span className="rp-icon-ring inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet/15">
                <c.icon aria-hidden className="h-5 w-5 text-glow" />
              </span>
              <h2 className="mt-4 text-[1.05rem] font-semibold text-ink">{c.title}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">{c.body}</p>
            </div>
          ))}
          </InViewGroup>
        </Container>
      </Section>

    </>
  );
}
