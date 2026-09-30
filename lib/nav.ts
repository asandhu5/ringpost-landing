import { PILLARS, PRODUCTS, type Pillar } from "@/lib/content/products";
import { GROUPS, SOMETHING_ELSE, shortLabel, slugFor, typesInGroup } from "@/lib/content/industries";
import { LEGAL_LINKS } from "@/lib/site";

export interface NavLink {
  name: string;
  href: string;
  summary?: string;
}

export const PRODUCT_NAV: { pillar: Pillar; name: string; line: string; links: NavLink[] }[] = (Object.keys(PILLARS) as Pillar[]).map((pillar) => ({
  pillar,
  name: PILLARS[pillar].name,
  line: PILLARS[pillar].line,
  links: PRODUCTS.filter((p) => p.pillar === pillar).map((p) => ({ name: p.name, href: `/product/${p.slug}`, summary: p.summary })),
}));

export const INDUSTRY_NAV: { group: string; links: NavLink[] }[] = GROUPS.map((group) => ({
  group,
  links: typesInGroup(group).map((t) => ({ name: shortLabel(t), href: `/industries/${slugFor(t)}` })),
}));

export const SOMETHING_ELSE_LINK: NavLink = { name: "Something else", href: `/industries/${SOMETHING_ELSE.slug}` };

export const RESOURCES_NAV: NavLink[] = [
  { name: "Blog", href: "/resources/blog", summary: "On missed calls, messaging and what an AI front desk should never say." },
  { name: "Case studies", href: "/resources/case-studies", summary: "Published once real customers agree to be named." },
  { name: "FAQ", href: "/faq", summary: "Pricing, the trial, channels, your data." },
];

export const COMPANY_NAV: NavLink[] = [
  { name: "About", href: "/about", summary: "What we're building, for whom, and who we are." },
  { name: "Contact", href: "/contact", summary: "Ask our assistant, or reach a person." },
];

export const LEGAL_NAV: NavLink[] = LEGAL_LINKS.map((l) => ({ name: l.name, href: l.href }));
