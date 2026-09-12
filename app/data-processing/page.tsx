import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Processing Addendum",
  description: `How ${SITE.name} processes personal data on behalf of its customers.`,
  robots: { index: true, follow: true },
};

const SUBPROCESSORS = [
  ["Anthropic", "Conversation understanding and reply drafting", "United States"],
  ["OpenAI", "Image generation and knowledge search indexing", "United States"],
  ["fal.ai", "Short video generation", "United States"],
  ["Twilio", "Phone numbers, calls, SMS and call recording", "United States"],
  ["Meta Platforms", "WhatsApp, Instagram and Facebook messaging", "United States / Ireland"],
  ["Blotato", "Instagram and Facebook posting, DMs and comments", "United States"],
  ["Upload-Post", "Posting and analytics on other social platforms", "United States"],
  ["Google", "Calendar synchronisation and Business Profile reviews", "United States"],
  ["Resend", "Transactional email delivery", "United States"],
  ["Paddle", "Payment processing and invoicing", "United Kingdom"],
];

/**
 * L8. We process our clients' CUSTOMERS' personal data on their instructions —
 * names, phone numbers, conversations, bookings. That makes us a processor, with
 * obligations that appeared nowhere in the original three legal pages.
 *
 * ⚠️ This and the AI-disclosure statement are the two documents that should be read
 * by a lawyer before a real client pays a real invoice. The rest is well-trodden B2B
 * boilerplate; these two are not.
 */
export default function DataProcessingPage() {
  return (
    <LegalPage
      title="Data Processing Addendum"
      updated="4 September 2026"
      intro={`When you use ${SITE.name}, your customers' personal data passes through our systems. You decide what happens to it; we carry out your instructions. This addendum sets out that relationship and forms part of the Terms of Service.`}
    >
      <h2>1. Roles</h2>
      <p>
        You are the <strong>controller</strong> of your customers&rsquo; personal data: it is your
        business relationship, your lawful basis, and your decision what to collect and why.
      </p>
      <p>
        {SITE.name} is the <strong>processor</strong>. We process that data only to provide the
        Service and only on your documented instructions, which, in practice, are the settings,
        knowledge and configuration in your account, plus this addendum and the Terms.
      </p>
      <p>
        We never sell your customers&rsquo; data, never use it to advertise to them, and never use it
        to train an AI model of our own.
      </p>

      <h2>2. What we process, and about whom</h2>
      <p>
        <strong>Data subjects:</strong> your customers and prospective customers, and any staff you
        add to your account.
      </p>
      <p>
        <strong>Categories of data:</strong> names; phone numbers; email addresses; social media
        handles; the full content of calls, texts and messages exchanged with your business,
        including recordings and transcripts of calls; appointment history; notes and preferences
        recorded during a conversation; and reviews left about your business.
      </p>
      <p>
        <strong>Special category data:</strong> we do not ask for it, and the Service is not designed
        to hold it. A customer may nevertheless volunteer health information in a message to a clinic
        or a gym. Where that happens it is stored as ordinary message content, and it is your
        responsibility as controller to ensure you have a lawful basis for holding it.
      </p>

      <h2>3. Purpose and duration</h2>
      <p>
        We process this data to answer your customers, take and manage bookings, send confirmations
        and reminders, maintain your customer records, draft review replies, and produce the
        analytics you see in your dashboard. Processing continues for as long as your account is
        active, plus the retention period in section 7.
      </p>

      <h2>4. Sub-processors</h2>
      <p>
        We use the providers below to deliver the Service. Each is bound by terms no less protective
        than this addendum, and each receives only the data needed for its function.
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>What it does</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {SUBPROCESSORS.map(([name, purpose, location]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{purpose}</td>
              <td>{location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        We will give you at least 30 days&rsquo; notice before adding or replacing a sub-processor. If
        you object on reasonable data-protection grounds and we cannot offer an alternative, you may
        terminate without penalty and receive a pro-rata refund of any prepaid monthly fee.
      </p>

      <h2>5. International transfers</h2>
      <p>
        Most of the providers above are in the United States. Where personal data originating in the
        UK, EEA or another jurisdiction with transfer restrictions is sent to them, that transfer
        relies on the Standard Contractual Clauses or an equivalent approved mechanism in the
        provider&rsquo;s own terms.
      </p>

      <h2>6. Security</h2>
      <ul>
        <li>Data is encrypted in transit, and at rest by our hosting and database providers.</li>
        <li>
          Every record belonging to a business is tagged with that business and isolated at the
          database level, so one customer&rsquo;s data is not reachable from another&rsquo;s account
          even in the event of an application bug.
        </li>
        <li>Access credentials for connected accounts are stored encrypted, never in plain text.</li>
        <li>
          Access to production data is limited to the people who need it to operate the Service, and
          is logged.
        </li>
      </ul>

      <h2>7. Retention and deletion</h2>
      <p>
        While your account is active we keep your data for as long as you need it. On termination we
        will, at your choice, export your data to you in a machine-readable format or delete it.
      </p>
      <p>
        Unless you ask us to delete sooner, data is retained for <strong>60 days</strong> after
        termination (long enough to change your mind or complete an export) and is then deleted
        from live systems. Backups age out within a further 30 days. We may retain records we are
        legally required to keep, such as invoices, for the period the law requires.
      </p>

      <h2>8. Helping you answer your customers</h2>
      <p>
        If one of your customers asks you for a copy of their data, asks you to correct it, or asks
        you to delete it, we will help you do so within a reasonable time and at no charge. Your
        dashboard already lets you find a customer and see everything held about them; where a
        request needs more than that, email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2>9. Personal data breaches</h2>
      <p>
        If we become aware of a breach affecting your customers&rsquo; personal data we will notify
        you <strong>without undue delay and in any event within 72 hours</strong> of becoming aware,
        with what we know: what happened, which data and roughly how many people are affected, what
        we are doing about it, and what we suggest you do. As controller, any notification to a
        regulator or to affected individuals is yours to make; we will give you what you need to make
        it.
      </p>

      <h2>10. Audit</h2>
      <p>
        On reasonable written notice, and no more than once a year unless a regulator requires
        otherwise, we will provide the information reasonably necessary to demonstrate our compliance
        with this addendum.
      </p>

      <h2>11. Calls, recordings and AI disclosure</h2>
      <p>
        Calls handled by the Service may be recorded and transcribed. Consent to record and the
        disclosure that a caller is speaking to an AI are covered separately in our{" "}
        <a href="/ai-disclosure">Call Recording and AI Disclosure</a> statement, which you should
        read alongside this document.
      </p>

      <h2>12. Priority</h2>
      <p>
        Where this addendum conflicts with the Terms of Service on the processing of personal data,
        this addendum governs.
      </p>
    </LegalPage>
  );
}
