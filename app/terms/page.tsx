import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { CONTACT_EMAIL, SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing use of ${SITE.name}.`,
  robots: { index: true, follow: true },
};

/**
 * ⚠️ TWO THINGS TO CONFIRM BEFORE THIS IS RELIED ON COMMERCIALLY:
 *
 * 1. OPERATOR NAME (§ "What RingPost Is"). Written as a sole trader
 *    ("Muhammad Ahmed, trading as RingPost") because no company exists
 *    yet. The moment a real entity is registered, this must become the
 *    entity's legal name — an incorrect operator name undermines the
 *    whole document.
 *
 * 2. GOVERNING LAW (§ Governing Law). Set to Pakistan, which is the
 *    honest default while the operator is based there and unincorporated.
 *    Revisit on incorporation elsewhere.
 *
 * These are drafts written to be genuinely usable and to satisfy Paddle's
 * verification requirements — not a substitute for a lawyer's review once
 * there is real revenue to protect.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="1 September 2026"
      intro={`These terms govern your use of ${SITE.name}. They're written to be readable rather than impressive — if anything here is unclear, ask us before you agree to it.`}
    >
      <h2>1. What RingPost is</h2>
      <p>
        RingPost is an AI-powered receptionist and business-growth platform for
        local service businesses. It answers customer communications across
        phone, SMS, WhatsApp, Instagram, Facebook, email and website chat;
        schedules and manages appointments; generates and publishes marketing
        content; and helps manage customer reviews.
      </p>
      <p>
        The Service is operated by <strong>Muhammad Ahmed, trading as RingPost</strong>{" "}
        (&ldquo;RingPost&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By signing
        up for or using the Service you agree to these terms. If you don&rsquo;t
        agree, don&rsquo;t use the Service.
      </p>
      <p>
        RingPost is a tool that assists your business. You remain responsible
        for your business&rsquo;s own decisions, pricing, policies, and for how
        you choose to use what the Service produces.
      </p>

      <h2>2. Eligibility and your account</h2>
      <p>
        You must be at least 18 and have authority to bind the business you
        represent. You agree to give accurate information when registering and
        to keep your login credentials confidential. You&rsquo;re responsible
        for activity that happens under your account.
      </p>

      <h2>3. Fees and payment</h2>
      <ul>
        <li>
          RingPost is offered as a one-time setup fee plus a recurring
          subscription fee, agreed with you individually before your account is
          activated.
        </li>
        <li>
          Payments are processed by <strong>Paddle.com Market Limited</strong>,
          our payment processor and merchant of record. When you pay, you also
          accept Paddle&rsquo;s own buyer terms.
        </li>
        <li>
          Subscription fees are billed in advance on a recurring basis and
          continue until cancelled.
        </li>
        <li>
          Keep your payment details current — a failed payment may suspend the
          Service until it&rsquo;s resolved.
        </li>
        <li>
          Fees are quoted in US Dollars. If Paddle bills you in another
          currency, the converted amount is what applies.
        </li>
      </ul>

      <h2>4. Cancellation and refunds</h2>
      <p>
        Cancellations and refunds are covered by our{" "}
        <a href="/refund-policy">Refund Policy</a>, which forms part of these
        terms.
      </p>

      <h2>5. Your data</h2>
      <ul>
        <li>
          You own your business&rsquo;s data — your customer information,
          conversation history, and anything you provide to us.
        </li>
        <li>
          You grant us a limited licence to process and store that data solely
          to provide the Service to you.
        </li>
        <li>
          You&rsquo;re responsible for having the right to give us any customer
          data you enter, and for complying with the communications and data
          protection laws that apply to you — including consent rules for SMS
          and marketing messages.
        </li>
      </ul>
      <p>
        Our <a href="/privacy">Privacy Policy</a> explains in full what we
        collect and how it&rsquo;s handled.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to use the Service to:</p>
      <ul>
        <li>
          send unsolicited, illegal, deceptive or abusive communications to
          anyone;
        </li>
        <li>
          break any applicable law, including telemarketing, anti-spam or
          consumer protection law;
        </li>
        <li>
          reverse-engineer, disrupt, or gain unauthorised access to the Service
          or the systems behind it;
        </li>
        <li>harass, defraud or impersonate any person or business;</li>
        <li>resell the Service to third parties without our written consent.</li>
      </ul>
      <p>
        We may suspend or terminate an account that breaches this section, with
        notice where the situation reasonably allows it.
      </p>

      <h2>7. AI-generated content and its limits</h2>
      <p>
        The Service uses AI to generate replies, content and recommendations.
        We&rsquo;ve built real safeguards — prices, hours and availability the
        AI states are looked up from your own business data at the moment
        it&rsquo;s asked, not invented. But AI systems can still get things
        wrong.
      </p>
      <p>
        You should review outputs where it reasonably matters — particularly
        marketing content before it&rsquo;s published in your name. We
        aren&rsquo;t liable for an inaccuracy or omission in AI-generated
        communications or content, except where it results from our gross
        negligence or wilful misconduct.
      </p>

      <h2>8. Availability</h2>
      <p>
        We aim to keep the Service reliable but don&rsquo;t guarantee
        uninterrupted access. Maintenance, outages at a third-party provider we
        depend on (a telephony or email provider, for instance), or events
        outside our reasonable control may affect availability. We aren&rsquo;t
        liable for losses from such interruptions except where the law requires
        otherwise.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        The Service — its software, design and underlying technology — belongs
        to us or our licensors. These terms give you the right to use the
        Service as intended, and nothing more.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent the law allows, we aren&rsquo;t liable for
        indirect, incidental, special, consequential or punitive damages,
        including lost profits or lost business, arising from your use of the
        Service. Our total liability for any claim is limited to what you paid
        us in the twelve months before the claim.
      </p>

      <h2>11. Termination</h2>
      <p>
        We may suspend or end your access if you materially breach these terms,
        don&rsquo;t pay applicable fees, or act in a way we reasonably believe
        harms the Service, other users or third parties. You may cancel at any
        time under the <a href="/refund-policy">Refund Policy</a>.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these terms. If a change is material we&rsquo;ll tell you
        — by email — before it takes effect. Continuing to use the Service
        afterwards means you accept the updated terms.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of the Islamic Republic of
        Pakistan, where the Service is operated from, without regard to
        conflict-of-law rules.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. General
        enquiries: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
