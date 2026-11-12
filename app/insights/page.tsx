import { InsightsDemo } from "@/components/site/demos/grow-demos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { InsightsHero } from "@/components/site/feature/grow-heroes";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("insights");

export default function Page() {
  const f = FEATURES.insights;
  return (
    <>
      <FeatureHero f={f} visual={<InsightsHero />} />
      <FeatureBody f={f} demo={<InsightsDemo />} />
    </>
  );
}
