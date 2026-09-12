import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description: `What ${SITE.name} may and may not be used for.`,
  robots: { index: true, follow: true },
};

/**
 * L7. This is also where the product's content filter legally lives: a technical
 * filter that refuses to generate something needs a published policy behind it,
 * or the refusal has no stated basis and reads as arbitrary.
 *
 * ⚠️ Operator name and governing law carry the same caveats as the Terms.
 */
export default function AcceptableUsePage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      updated="4 September 2026"
      intro={`This policy sets out what ${SITE.name} may and may not be used for. It applies to everything you do through the Service, and to everything you ask it to generate on your behalf. It forms part of the Terms of Service.`}
    >
      <h2>1. Who this applies to</h2>
      <p>
        This policy applies to you as a customer of {SITE.name}, to anyone you give access to your
        account, and to any content you create, upload, generate or publish using the Service. Where
        the Service acts on your behalf (answering a customer, drafting a reply, generating an image),
        you remain responsible for what it does for you within these limits.
      </p>

      <h2>2. Prohibited content</h2>
      <p>You may not use the Service to create, request, store or publish:</p>
      <ul>
        <li>
          Sexually explicit or pornographic material, or any depiction that sexualises a person.
        </li>
        <li>
          Any sexual, suggestive or undressed depiction of a minor, or of anyone who appears to be a
          minor. This prohibition is absolute and admits no exception, business context or artistic
          justification.
        </li>
        <li>Content depicting or encouraging graphic violence, self-harm, or cruelty.</li>
        <li>
          Hateful content targeting people on the basis of race, ethnicity, national origin,
          religion, disability, sex, gender identity, sexual orientation, age, or veteran status.
        </li>
        <li>
          Realistic depictions of identifiable real people presented as genuine without their
          consent, including synthetic likenesses and voices.
        </li>
        <li>
          Fabricated reviews, testimonials, endorsements, credentials, awards or affiliations.
        </li>
        <li>
          Counterfeit branding, or any use of a third party&rsquo;s trademarks, logos or copyrighted
          work that you do not have the right to use.
        </li>
        <li>Content that is unlawful in the jurisdiction where your business operates.</li>
      </ul>

      <h2>3. Businesses whose ordinary work involves the body</h2>
      <p>
        Waxing and laser clinics, dermatology and aesthetics practices, lingerie and swimwear shops,
        tattoo and piercing studios, maternity and portrait photographers, gyms, physiotherapists and
        massage practices are all legitimate businesses whose ordinary marketing shows skin and
        bodies. Nothing in section 2 prohibits that work.
      </p>
      <p>
        The test we apply is intent and framing, not anatomy. A waxing clinic showing a treated leg
        under clinical lighting is ordinary trade marketing. The same subject framed erotically is
        not. If you believe a request of yours was refused wrongly, tell us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We would rather correct a false
        refusal than leave a real business unable to advertise.
      </p>

      <h2>4. Prohibited conduct</h2>
      <p>You may not use the Service to:</p>
      <ul>
        <li>
          Send unsolicited bulk messages, or message anyone who has opted out or asked not to be
          contacted.
        </li>
        <li>
          Contact people whose details you obtained without a lawful basis, or upload a customer list
          you are not entitled to use for marketing.
        </li>
        <li>
          Impersonate another business or person, or misrepresent your relationship to one.
        </li>
        <li>
          Present the AI as a named human being when a customer sincerely asks whether they are
          speaking to a person. See our{" "}
          <a href="/ai-disclosure">Call Recording and AI Disclosure</a> statement.
        </li>
        <li>
          Give regulated advice you are not qualified or licensed to give (medical, legal,
          financial or otherwise), or configure the Service to do so on your behalf.
        </li>
        <li>
          Attempt to bypass, disable or manipulate the Service&rsquo;s safety checks, guardrails or
          rate limits, including by prompt injection.
        </li>
        <li>
          Probe, scan or test the security of the Service, or access data belonging to another
          customer.
        </li>
        <li>Resell, sublicense or white-label the Service without a written agreement with us.</li>
      </ul>

      <h2>5. How this is enforced</h2>
      <p>
        Requests are screened before generation, and generated media is checked again before it
        reaches you. A refusal will tell you what was refused and why rather than returning a generic
        error.
      </p>
      <p>
        Repeated blocked attempts disable content generation on your account and are reviewed by a
        person. Serious or repeated breaches of this policy may result in suspension or termination
        under the Terms of Service. Where content is unlawful, we may be required to report it.
      </p>

      <h2>6. Reporting a problem</h2>
      <p>
        If you believe content produced or published through {SITE.name} breaches this policy, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with enough detail to identify it. We
        will investigate and respond.
      </p>
    </LegalPage>
  );
}
