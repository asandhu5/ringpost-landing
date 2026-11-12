"use client";

import { PromptBox, ReplayButton, ResultCard, useCreatePlay } from "@/components/site/studio/prompt-create";
import { Button } from "@/components/site/ui/button";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { TEASER } from "@/lib/content/home";
import { ROUTES } from "@/lib/routes";

/** One line in, a post out: one example, played once when it scrolls into view. */
export function ContentTeaser() {
  const play = useCreatePlay(TEASER.prompt);
  return (
    <Section fit tone="white">
      <Container className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <SectionHeading eyebrow={TEASER.eyebrow} area="create" title={TEASER.title} lede={TEASER.lede} />
          <PromptBox prompt={TEASER.prompt} typed={play.typed} stage={play.stage} className="mt-6 max-w-[32rem]" />
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Button href={ROUTES.studio} variant="text">
              See Content Studio
            </Button>
            <ReplayButton onClick={play.replay} hidden={!(play.canPlay && (play.stage === "video" || play.stage === "done"))} />
          </div>
        </div>
        <div ref={(el) => { play.target.current = el; }} className="mx-auto w-[min(100%,calc(clamp(240px,50svh,440px)*0.8))]">
          <ResultCard image={TEASER.image} videoSrc={TEASER.video} alt={TEASER.alt} caption={TEASER.caption} stage={play.stage} canPlay={play.canPlay} videoRef={play.video} />
        </div>
      </Container>
    </Section>
  );
}
