import { ChatDemo, FlowSteps, InsightsDemo, PostingFlow, ScreenTour } from "@/components/site/explainers";
import { Container, Eyebrow, H2, Lede, Section } from "@/components/site/ui";
import type { Explainer } from "@/lib/content/explainers";

/**
 * The explainer block on a channel or feature page: the conversation, the flow, an
 * animated widget where one helps (posting, insights), then the dashboard tour.
 */
export function ExplainerSections({ ex, widget }: { ex: Explainer; widget?: "posting" | "insights" }) {
  return (
    <>
      {ex.flow.steps.length > 0 && (
        <Section tone="surface" id="flow" className="scroll-mt-32">
          <Container>
            <div className="mb-12 max-w-2xl">
              <Eyebrow>How it works</Eyebrow>
              <H2>{ex.flow.title}</H2>
              {ex.flow.lede && <Lede className="mt-4">{ex.flow.lede}</Lede>}
            </div>
            <FlowSteps steps={ex.flow.steps} />
          </Container>
        </Section>
      )}

      {widget === "posting" && (
        <Section id="posting">
          <Container>
            <div className="mb-10 max-w-2xl">
              <Eyebrow>Posting</Eyebrow>
              <H2>One post, out to every network.</H2>
              <Lede className="mt-4">Upload it or let your AI make it. A caption is written for each network, you approve it, and it goes now or at the time you pick.</Lede>
            </div>
            <PostingFlow />
          </Container>
        </Section>
      )}
      {widget === "insights" && (
        <Section id="numbers">
          <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>At a glance</Eyebrow>
              <H2>The numbers, and what they mean.</H2>
              <Lede className="mt-4">Every number comes with a short note in plain words, and the one thing worth doing next.</Lede>
            </div>
            <InsightsDemo />
          </Container>
        </Section>
      )}


    </>
  );
}
