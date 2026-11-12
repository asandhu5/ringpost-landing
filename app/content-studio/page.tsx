import Link from "next/link";
import { Crumbs } from "@/components/site/feature/feature-page";
import { BrandStack, Cadence, Checked, Shapes, StudioHero, UploadScene } from "@/components/site/studio/scenes";
import { Faq } from "@/components/site/ui/faq";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { FEATURES } from "@/lib/content/features";
import { featureMetadata } from "@/lib/feature-meta";
import { ROUTES } from "@/lib/routes";

export const metadata = featureMetadata("studio");

/**
 * Content Studio, in the owner's seven parts (2026-11-12):
 * 1 prompt to creation, shown once · 2 your brand on everything (3D) · 3 your own photos
 * and videos · 4 fresh posts every morning · 5 checked before you see it · 6 the right
 * shape for every app · 7 questions and the call to action.
 */
export default function ContentStudioPage() {
  const f = FEATURES.studio;
  return (
    <>
      <StudioHero crumbs={<Crumbs area="Create" name={f.name} path={ROUTES.studio} />} />
      <Section fit tone="white">
        <Container>
          <BrandStack />
        </Container>
      </Section>
      <Section fit>
        <Container>
          <UploadScene />
        </Container>
      </Section>
      <Section fit tone="white">
        <Container>
          <Cadence />
        </Container>
      </Section>
      <Section fit>
        <Container>
          <Checked />
        </Container>
      </Section>
      <Section fit tone="white">
        <Container>
          <Shapes />
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <SectionHeading eyebrow="Questions" area="create" title="About Content Studio." lede={<>See how posts go out on the <Link href={ROUTES.posting} className="font-semibold text-violet underline-offset-4 hover:underline">Posting page</Link>.</>} />
          <Faq items={f.faq} structuredData />
        </Container>
      </Section>
    </>
  );
}
