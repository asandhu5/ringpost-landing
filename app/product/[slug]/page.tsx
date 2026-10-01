import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PRODUCT_ICONS } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";
import { Container, FaqList, OnThisPage, PageHero, ScreenshotFrame, Section, TrialButtons, screenshotExists } from "@/components/site/ui";
import { ProductVisual } from "@/components/site/visuals";
import { GUARDRAILS } from "@/lib/content/platform";
import { PILLARS, PRODUCTS, productBySlug, productsIn } from "@/lib/content/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.description, openGraph: { title: p.title, description: p.description, url: `/product/${p.slug}` } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const pillar = PILLARS[product.pillar];
  const related = [...productsIn(product.pillar), ...PRODUCTS.filter((p) => p.pillar !== product.pillar)].filter((p) => p.slug !== product.slug).slice(0, 4);
  const hasShot = Boolean(product.screen && screenshotExists(product.screen.src));
  const visual = hasShot ? <ScreenshotFrame src={product.screen!.src} alt={product.screen!.alt} /> : <ProductVisual slug={product.slug} />;

  return (
    <>
      <PageHero
        eyebrow={pillar.name}
        title={product.hero.headline}
        lede={product.hero.lede}
        crumbs={[
          { name: "Product", href: "/product" },
          { name: product.name, href: `/product/${product.slug}` },
        ]}
        aside={visual}
      >
        <TrialButtons />
      </PageHero>

      <OnThisPage
        name={product.name}
        links={[
          { href: "#how-it-works", label: "How it works" },
          ...(product.pillar === "answer" ? [{ href: "#guardrails", label: "Guardrails" }] : []),
          ...(product.faq ? [{ href: "#questions", label: "Questions" }] : []),
        ]}
      />

      <Section id="how-it-works" className="scroll-mt-32">
        <Container>
          <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
            {product.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 60} className="border-t border-line pt-6">
                <h2 className="text-[1.35rem] font-semibold leading-snug text-ink">{s.heading}</h2>
                <p className="mt-2 text-[16px] leading-relaxed text-muted-ink">{s.body}</p>
                {s.points && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[15px] text-ink">
                        <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-success" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {product.pillar === "answer" && (
        <Section id="guardrails" tone="surface" className="scroll-mt-32">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink">{GUARDRAILS.headline}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-ink">{GUARDRAILS.lede}</p>
            </div>
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {GUARDRAILS.rules.map((r) => (
                <li key={r.title}>
                  <p className="text-[16px] font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {product.faq && (
        <Section id="questions" className="scroll-mt-32">
          <Container narrow>
            <h2 className="mb-8 font-display text-4xl text-ink">Questions</h2>
            <FaqList items={product.faq} structuredData />
          </Container>
        </Section>
      )}

      <Section className="border-t border-line">
        <Container>
          <h2 className="mb-6 text-[15px] font-medium text-muted-ink">Keep exploring</h2>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => {
              const I = PRODUCT_ICONS[p.slug];
              return (
                <li key={p.slug}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <span className="flex items-center gap-2 text-[15.5px] font-medium text-ink group-hover:text-glow">
                      <I aria-hidden className="h-4 w-4 text-glow" />
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-muted-ink">{p.summary}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

    </>
  );
}
