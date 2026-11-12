import { WinbackDemo } from "@/components/site/demos/grow-demos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { WinbackHero } from "@/components/site/feature/grow-heroes";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("winback");

export default function Page() {
  const f = FEATURES.winback;
  return (
    <>
      <FeatureHero f={f} visual={<WinbackHero />} />
      <FeatureBody f={f} demo={<WinbackDemo />} />
    </>
  );
}
