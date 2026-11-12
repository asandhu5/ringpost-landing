import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { CallsHero } from "@/components/site/feature/heroes";
import { MissedCall } from "@/components/site/demos/missed-call";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("calls");

export default function Page() {
  const f = FEATURES.calls;
  return (
    <>
      <FeatureHero f={f} visual={<CallsHero />} />
      <FeatureBody f={f} demo={<MissedCall />} />
    </>
  );
}
