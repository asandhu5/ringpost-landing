import type { Metadata } from "next";
import { FEATURES, FEATURE_PATH, type FeatureKey } from "@/lib/content/features";

/** The title, description and sharing card for a feature page, from its content. */
export function featureMetadata(key: FeatureKey): Metadata {
  const f = FEATURES[key];
  return { title: f.seoTitle, description: f.description, alternates: { canonical: FEATURE_PATH[key] }, openGraph: { title: f.seoTitle, description: f.description, url: FEATURE_PATH[key] } };
}
