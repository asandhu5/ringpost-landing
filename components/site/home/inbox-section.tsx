import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { InboxDemo } from "@/components/site/mocks/inbox-demo";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { INBOX } from "@/lib/content/home";

/** Every way customers write in, named in words, answered and booked in one inbox. */
export function InboxSection() {
  return (
    <Section fit>
      <Container className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <div>
          <SectionHeading eyebrow={INBOX.eyebrow} area="answer" title={INBOX.title} lede={INBOX.lede} />
          <ul className="mt-6 flex flex-col gap-2">
            {INBOX.proofs.map((p) => (
              <li key={p.text}>
                <Link href={p.href} className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2.5 pr-4 text-small font-semibold text-ink shadow-rp-1 transition-colors duration-200 hover:border-primary-line hover:bg-primary-soft">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-grow-soft text-grow">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  {p.text}
                  <ArrowRight className="h-4 w-4 text-violet transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <InboxDemo threads={INBOX.threads} />
      </Container>
    </Section>
  );
}
