import data from "@/data/plans.json";

/**
 * The plan catalog, as the product defines it. `data/plans.json` is generated from the
 * product's packages/core/src/billing/plans.ts (`pnpm website:export` in the platform
 * repo) — never edit it by hand, and never type a price or an allowance anywhere else on
 * this site. The website assistant is grounded on the same numbers.
 */

export type PlanId = "front_desk" | "growth" | "command_center";
export type Feature = keyof typeof data.featureLabels;

export interface Plan {
  id: PlanId;
  name: string;
  monthlyUsd: number;
  tagline: string;
  minutesPerMonth: number;
  messagesPerMonth: number;
  imagesPerDay: number;
  videos: { count: number; per: string };
  /** Active bookable staff the plan allows. */
  bookableStaff: number;
  promptExtrasPerWeek: { images: number; videos: number };
  features: Feature[];
}

export const PLANS = data.plans as Plan[];
export const TRIAL = data.trial;
export const TOP_UPS = data.topUps;
export const FEATURE_LABELS = data.featureLabels as Record<Feature, string>;
export const USAGE_WARNING_PERCENT = Math.round(data.usageWarningRatio * 100);

/**
 * AI video (Runway) is switched on with the website launch: set RUNWAY_API_KEY on the
 * api and worker before deploying the site. Set false to hide video everywhere here.
 */
export const SHOW_AI_VIDEO = true;

export function plan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id)!;
}

export function planIncludes(id: PlanId, feature: Feature): boolean {
  return plan(id).features.includes(feature);
}

/** The cheapest plan with a feature, or null when every plan has it. */
export function lowestPlanWith(feature: Feature | null): Plan | null {
  if (!feature) return null;
  return PLANS.find((p) => p.features.includes(feature)) ?? null;
}

/** "On every plan" / "Growth and Command Center" / "Command Center". */
export function plansWithLabel(feature: Feature | null): string {
  const lowest = lowestPlanWith(feature);
  if (!lowest) return "Every plan";
  const names = PLANS.filter((p) => p.features.includes(feature!)).map((p) => p.name);
  return names.length === 1 ? `${names[0]} plan` : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;
export const num = (n: number) => n.toLocaleString("en-US");
