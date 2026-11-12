import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { InboxHero } from "@/components/site/feature/heroes";
import { TakeOverDemo } from "@/components/site/demos/takeover-demo";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("inbox");

export default function Page() {
  const f = FEATURES.inbox;
  return (
    <>
      <FeatureHero f={f} visual={<InboxHero />} />
      <FeatureBody f={f} demo={<TakeOverDemo />} />
    </>
  );
}
