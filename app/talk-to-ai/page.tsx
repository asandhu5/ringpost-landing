import { TalkDemo } from "@/components/site/demos/grow-demos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { TalkHero } from "@/components/site/feature/grow-heroes";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("talk");

export default function Page() {
  const f = FEATURES.talk;
  return (
    <>
      <FeatureHero f={f} visual={<TalkHero />} />
      <FeatureBody f={f} demo={<TalkDemo />} />
    </>
  );
}
