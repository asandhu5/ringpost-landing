import data from "@/data/media-models.json";
import { PLANS } from "@/lib/plans";

/**
 * The image and video models a business can pick in the dashboard, with their credit
 * prices (the website shows only what a month of credits makes, not per-model prices). Generated from the product's billing/media-credits.ts (`pnpm website:export`
 * in the platform repo writes data/media-models.json), so this page can never quote a
 * model or a price the dashboard doesn't.
 */
export interface MediaModel {
  id: string;
  kind: "image" | "video";
  label: string;
  vendor: string;
  blurb: string;
  tag: string | null;
  /** "ringpost" for RingPost's own four picks, "named" for the models from the labs. */
  group: "ringpost" | "named";
  per: "image" | "second";
  credits: number;
  costs: { durationSec: number | null; credits: number }[];
}

export const MEDIA_MODELS = data.models as MediaModel[];
export const CREDIT_PACK = data.creditPack as { amount: number; priceUsd: number };

/** Credits for one image, or one video of the shortest length offered. */
export function startingCredits(m: MediaModel): number {
  return m.costs[0]?.credits ?? m.credits;
}

export const PLANS_WITH_CREDITS = PLANS.filter((p) => p.mediaCreditsPerMonth > 0);
export const PLANS_WITHOUT_CREDITS = PLANS.filter((p) => p.mediaCreditsPerMonth === 0);
