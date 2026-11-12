import { CampaignDemo } from "@/components/site/demos/grow-demos";
import { FeatureBody, FeatureHero } from "@/components/site/feature/feature-page";
import { CampaignsHero } from "@/components/site/feature/grow-heroes";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";

export const metadata = featureMetadata("campaigns");

export default function Page() {
  const f = FEATURES.campaigns;
  return (
    <>
      <FeatureHero f={f} visual={<CampaignsHero />} />
      <FeatureBody f={f} demo={<CampaignDemo />} />
    </>
  );
}
