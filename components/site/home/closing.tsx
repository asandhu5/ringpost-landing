import Link from "next/link";
import { Globe2, MessageSquareText, ShieldCheck, UserRound } from "lucide-react";
import { Faq } from "@/components/site/ui/faq";
import { Card, Container, IconTile, Section, SectionHeading } from "@/components/site/ui/primitives";
import { HOME_FAQ, TRUST } from "@/lib/content/home";
import { ROUTES } from "@/lib/routes";

const TRUST_ICON = { honest: UserRound, charge: MessageSquareText, data: ShieldCheck, where: Globe2 };
const link = "font-semibold text-violet underline-offset-4 hover:underline";

/** The straight answers: four facts a careful owner checks before handing over the phone. */
export function TrustSection() {
  return (
    <Section fit tone="white">
      <Container>
        <SectionHeading eyebrow={TRUST.eyebrow} title={TRUST.title} />
        <ul className="mt-[clamp(1.25rem,4svh,2.25rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.items.map((x) => (
            <Card as="li" key={x.id} className="p-5">
              <IconTile icon={TRUST_ICON[x.id]} />
              <h3 className="mt-4 text-h3 font-semibold text-ink">{x.t}</h3>
              <p className="mt-2 text-small text-muted-ink">{x.d}</p>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function QuestionsSection() {
  return (
    <Section fit>
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <SectionHeading eyebrow="Questions" title="What owners ask first." lede={<>More questions? <Link href={ROUTES.faq} className={link}>Read every answer</Link>.</>} />
        <Faq items={HOME_FAQ} structuredData />
      </Container>
    </Section>
  );
}

