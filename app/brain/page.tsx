import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { BrainHero } from "@/components/site/feature/heroes";
import { LearnDemo } from "@/components/site/demos/learn-demo";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("brain");

export default function Page() {
  const f = FEATURES.brain;
  return (
    <>
      <FeatureHero f={f} visual={<BrainHero />} />
      <FeatureBody f={f} demo={<LearnDemo />} />
    </>
  );
}
