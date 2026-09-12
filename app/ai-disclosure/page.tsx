import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Call Recording and AI Disclosure",
  description: `How ${SITE.name} records calls and tells callers they are speaking to an AI.`,
  robots: { index: true, follow: true },
};

/**
 * L10 — the item with real legal teeth. We record and transcribe phone calls, and the
 * AI speaks as though it were the business. Several US states require all-party
 * consent to record; California's bot-disclosure law and the EU AI Act's transparency
 * rules both bear on whether a caller is told they are talking to a machine.
 *
 * Written as a feature rather than a liability: a business that says plainly its
 * receptionist is an AI reads far better than one caught not saying it.
 *
 * ⚠️ This is one of the two documents that should be read by a lawyer before a real
 * client pays a real invoice.
 */
export default function AiDisclosurePage() {
  return (
    <LegalPage
      title="Call Recording and AI Disclosure"
      updated="4 September 2026"
      intro={`${SITE.name} answers calls with an AI, and those calls may be recorded and transcribed. We think both facts should be said plainly rather than buried. This page explains what happens, what your business must do, and what a caller can ask for.`}
    >
      <h2>1. We say it is an AI</h2>
      <p>
        The assistant identifies itself as a virtual assistant for your business. It is instructed
        never to claim to be a human being, and if a caller asks whether they are speaking to a
        person it says that it is not.
      </p>
      <p>
        This is not a limitation we tolerate. It is the position we take. A business that says
        openly that its front desk is an AI reads as confident and modern. One that is caught
        pretending otherwise loses the customer and the argument at the same time.
      </p>

      <h2>2. Why this matters legally</h2>
      <ul>
        <li>
          <strong>California&rsquo;s bot-disclosure law (B&amp;P Code &sect; 17940 et seq.)</strong>{" "}
          makes it unlawful to use a bot to communicate with a person in California in order to
          incentivise a sale or transaction without disclosing that it is a bot.
        </li>
        <li>
          <strong>The EU AI Act&rsquo;s transparency obligations</strong> require that a person
          interacting with an AI system is informed of that fact, unless it is obvious from the
          circumstances.
        </li>
        <li>
          Several other jurisdictions have introduced or are introducing comparable rules. Disclosing
          by default is the only approach that works in all of them at once.
        </li>
      </ul>

      <h2>3. Call recording and consent</h2>
      <p>
        Where your business uses the phone channel, calls may be recorded and transcribed so the AI
        can understand the caller and so you can review what was said.
      </p>
      <p>
        Consent law for recording varies, and the variation is not academic:
      </p>
      <ul>
        <li>
          <strong>One-party consent</strong> jurisdictions (most US states, and federal law under 18
          U.S.C. &sect; 2511) require only that one participant consents.
        </li>
        <li>
          <strong>All-party consent</strong> jurisdictions require every participant to consent.
          These include California, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana,
          Nevada, New Hampshire, Pennsylvania and Washington, and vary in detail.
        </li>
        <li>
          <strong>The UK and EEA</strong> require a lawful basis under UK GDPR / GDPR and, in
          practice, a clear notice at the start of the call.
        </li>
      </ul>
      <p>
        Because of that variation, the Service is configured to announce recording at the start of
        the call by default, wherever your business is. It is the only setting that is safe
        everywhere, and it costs a caller three seconds.
      </p>

      <h2>4. What your business is responsible for</h2>
      <p>As the business the caller is trying to reach, you are the controller of the call. You must:</p>
      <ul>
        <li>
          Keep the recording announcement enabled unless you have taken your own legal advice for
          every jurisdiction you receive calls from.
        </li>
        <li>
          Not configure the assistant to deny being an AI, or to adopt a persona intended to make a
          caller believe they are speaking to a named human employee.
        </li>
        <li>
          Honour a caller&rsquo;s request not to be recorded. The assistant will pass such a request
          to you, and you should take that call yourself.
        </li>
        <li>
          Make your own privacy notice available to your customers, covering the fact that calls to
          your business may be recorded.
        </li>
      </ul>
      <p>
        Turning the announcement off is possible where your own legal advice supports it. Doing so is
        your decision and your risk, and we log the change.
      </p>

      <h2>5. What a caller can ask for</h2>
      <ul>
        <li>To be told whether they are speaking to a person. The answer will be honest.</li>
        <li>To speak to a human being. The assistant will escalate rather than argue.</li>
        <li>
          A copy of the recording and transcript of their call, or its deletion. Requests go to the
          business they called; we will help that business fulfil them (see the{" "}
          <a href="/data-processing">Data Processing Addendum</a>).
        </li>
        <li>
          To stop being contacted. A customer who replies STOP on any messaging channel is opted out
          immediately and automatically.
        </li>
      </ul>

      <h2>6. How long recordings are kept</h2>
      <p>
        Recordings and transcripts are retained for as long as your account is active and you need
        them, and are deleted on the schedule in section 7 of the{" "}
        <a href="/data-processing">Data Processing Addendum</a> when your account ends. You can ask
        us to delete an individual call at any time.
      </p>

      <h2>7. Where the AI does not decide anything on its own</h2>
      <p>
        The assistant does not set prices, grant refunds, make exceptions or give regulated advice.
        Prices, availability and policies come from your own records, not from the AI&rsquo;s
        judgement, and anything requiring authority is escalated to you.
      </p>

      <h2>8. Questions</h2>
      <p>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. If you are a caller rather
        than a {SITE.name} customer, contact the business you called. They hold the recording and we
        process it on their instructions.
      </p>
    </LegalPage>
  );
}
