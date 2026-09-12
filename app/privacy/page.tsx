import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects data.`,
  robots: { index: true, follow: true },
};

/**
 * The sub-processor list in § "Who else touches your data" is the part
 * most likely to go stale: it names every third party the platform
 * actually sends data to. If an integration is added or dropped in the
 * product, this list has to change with it — an out-of-date sub-processor
 * list is a real compliance problem, not a cosmetic one.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="4 September 2026"
      intro="This explains what RingPost collects, what we do with it, and who else touches it. There are two different sets of people here: businesses who sign up, and their customers who never did. This policy treats them separately, because the second group is the one that matters most. We've named every third party involved rather than hiding behind “trusted partners”."
    >
      <h2>1. Two kinds of people, two different relationships</h2>
      <p>
        Almost everything below turns on this distinction, so it comes first.
      </p>
      <p>
        <strong>Businesses.</strong> If you sign up for RingPost, we are the controller of your
        account data. You chose to be here, and this policy is our agreement with you about it.
      </p>
      <p>
        <strong>Your customers.</strong> When someone calls, texts or messages a business that uses
        RingPost, their personal data passes through our systems. They never signed up with us and in
        most cases have never heard of us. For that data, <strong>the business is the controller and
        we are only the processor</strong>: we hold it on that business&rsquo;s instructions, and we
        do not decide what happens to it.
      </p>
      <p>
        This has a practical consequence worth stating plainly. If you are a customer of a business
        that uses RingPost and you want your data seen, corrected or deleted, ask that business. They
        can do it themselves in their dashboard, and we will help them if it needs more than that. We
        will not act on your data without their instruction, because it is not ours to act on. The
        full terms of that arrangement are in our{" "}
        <a href="/data-processing">Data Processing Addendum</a>.
      </p>
      <p>
        What we will never do with a business&rsquo;s customers&rsquo; data, on anyone&rsquo;s
        instruction: sell it, use it to advertise to those people, use it to train an AI model of our
        own, or use it to benefit any other business on the platform.
      </p>

      <h2>2. What we collect</h2>

      <h3>Information you give us</h3>
      <ul>
        <li>
          Business account details: business name, owner name, email, phone
          number, business type, and address if you provide one.
        </li>
        <li>
          Business configuration: your services, prices, hours, policies and
          knowledge-base content. This is what your AI receptionist answers
          from.
        </li>
        <li>
          Payment information: collected and processed directly by Paddle. We
          never see or store your full card details.
        </li>
      </ul>

      <h3>Information collected as you use the Service</h3>
      <ul>
        <li>Bookings and appointment records.</li>
        <li>Reviews synced from platforms you connect.</li>
        <li>
          Usage and log data: timestamps, which features are used, error logs.
        </li>
      </ul>

      <h3>Information about your customers: the part that matters most</h3>
      <p>
        This is data about people who contacted your business, not people who signed up with us. We
        hold it on your instruction, as your processor.
      </p>
      <ul>
        <li>
          <strong>Contact details</strong>: name, phone number, email address, and social media
          handle where they messaged from one.
        </li>
        <li>
          <strong>The content of their conversations</strong> with your business, on every connected
          channel: SMS, WhatsApp, Instagram and Facebook messages and comments, email and web chat.
        </li>
        <li>
          <strong>Call audio and transcripts.</strong> Calls answered by the AI may be recorded and
          transcribed. Recording is announced at the start of the call by default. See{" "}
          <a href="/ai-disclosure">Call Recording and AI Disclosure</a>.
        </li>
        <li>
          <strong>Booking history</strong>: what they booked, when, with whom, and whether they
          turned up.
        </li>
        <li>
          <strong>Anything they volunteer in a message.</strong> A customer may mention a health
          condition to a clinic or a gym without being asked. We do not solicit it and the Service is
          not designed to hold it, but where it appears in a message it is stored as ordinary message
          content. Having a lawful basis for that is yours as controller.
        </li>
        <li>
          <strong>Contact preferences</strong>: which channel they use, and whether they have opted
          out. A customer who replies STOP is opted out immediately and automatically, and that
          decision is honoured across every channel.
        </li>
      </ul>

      <h2>3. What we use it for</h2>
      <ul>
        <li>
          Running the Service: generating AI responses grounded in your real
          business data.
        </li>
        <li>Processing bookings and sending confirmations and reminders.</li>
        <li>
          Generating marketing content and publishing it to platforms you
          connect, at your direction.
        </li>
        <li>Detecting and preventing abuse, fraud or terms violations.</li>
        <li>Maintaining and improving reliability.</li>
        <li>
          Contacting you about your account, billing, and material changes.
        </li>
      </ul>
      <p>
        <strong>
          We don&rsquo;t sell your data, or your customers&rsquo; data, to
          anyone.
        </strong>
      </p>

      <h2>4. Who else touches your data</h2>
      <p>
        Running this Service means sending some data to specialist providers.
        Here is every one of them and what they do:
      </p>
      <ul>
        <li>
          <strong>Anthropic</strong>: the AI that understands and writes
          conversation replies.
        </li>
        <li>
          <strong>Twilio</strong>: phone numbers, calls and SMS.
        </li>
        <li>
          <strong>Meta</strong>: WhatsApp, Instagram and Facebook messaging.
        </li>
        <li>
          <strong>Deepgram</strong> and <strong>Cartesia</strong>: turning call
          audio into text, and replies back into speech.
        </li>
        <li>
          <strong>Postmark</strong> / <strong>Resend</strong>: sending and
          receiving email.
        </li>
        <li>
          <strong>Google</strong>: Calendar sync, and review data where you
          connect it.
        </li>
        <li>
          <strong>OpenAI</strong> and <strong>fal.ai</strong>: generating
          marketing images and video.
        </li>
        <li>
          <strong>Blotato</strong> and <strong>Upload-Post</strong>: publishing
          content to social platforms.
        </li>
        <li>
          <strong>Paddle</strong>: billing and payment processing.
        </li>
        <li>
          <strong>Render</strong>, <strong>Vercel</strong> and{" "}
          <strong>Cloudflare</strong>: hosting, storage and content delivery.
        </li>
      </ul>
      <p>
        Each provider only processes what it needs for its specific job, under
        its own data protection obligations. We don&rsquo;t permit them to use
        your data for their own independent purposes.
      </p>
      <p>
        We may also disclose information where the law requires it, to protect
        our legal rights, or in connection with a business transfer, in which
        case we&rsquo;d tell affected users.
      </p>

      <h2>5. Meta platforms: WhatsApp, Instagram and Facebook</h2>
      <h3>WhatsApp</h3>
      <p>
        When a business connects WhatsApp Business Platform, we access message content, the
        sender&rsquo;s name and handle or phone identifier, and message timestamps. We use that
        information so the business&rsquo;s AI assistant can read and reply to WhatsApp messages,
        answer questions from the business&rsquo;s own records and take bookings on the
        business&rsquo;s behalf.
      </p>
      <h3>Instagram</h3>
      <p>
        When a business connects Instagram, we access direct-message content, the sender&rsquo;s
        name and handle, message timestamps, and public comments on that business&rsquo;s Instagram
        posts. We use that information so the AI assistant can read and reply to messages and
        comments, answer questions from the business&rsquo;s own records and take bookings on the
        business&rsquo;s behalf.
      </p>
      <h3>Facebook</h3>
      <p>
        When a business connects Facebook, we access Messenger content, the sender&rsquo;s name and
        handle, message timestamps, and public comments on that business&rsquo;s Facebook posts. We
        use that information so the AI assistant can read and reply to messages and comments, answer
        questions from the business&rsquo;s own records and take bookings on the business&rsquo;s
        behalf.
      </p>
      <p>
        For all three Meta platforms, message and comment data is stored in the business&rsquo;s
        RingPost account while it is active so conversation history, bookings and human handover
        remain available. After account termination it is retained for up to 60 days for export or
        reactivation and then deleted from live systems; backup copies age out within a further 30
        days. Connected-account tokens are encrypted at rest and removed when the connection or
        account is deleted.
      </p>
      <p>
        We never use WhatsApp, Instagram or Facebook message content to train an AI model, never sell
        it, and never use it for advertising. Businesses and their end customers can request
        deletion by following our <a href="/data-deletion">Data Deletion Instructions</a>.
      </p>

      <h2>6. Google user data</h2>
      <p>
        RingPost requests the Google Calendar scope{" "}
        <strong>https://www.googleapis.com/auth/calendar.events</strong>. Full calendar access is required
        rather than read-only access because RingPost both checks availability and writes
        appointments booked through the Service into the connected calendar.
      </p>
      <p>
        We read existing calendar events only to compute busy times and determine whether a proposed
        appointment slot is free. We write appointments that customers book through RingPost.
        RingPost uses Google Calendar event information only as necessary to determine availability
        and manage appointments created through RingPost. It does not use calendar event content for
        advertising, profiling, or AI model training.
      </p>
      <p>
        Google access and refresh tokens are encrypted at rest and retained only while the calendar
        remains connected. Disconnecting Google Calendar removes the stored tokens. Availability and
        appointment information is retained with the business&rsquo;s booking records under the
        retention periods in this policy. Google user data is shared only with Google as needed to
        operate the calendar connection and with infrastructure providers that process it for
        RingPost under contract; it is never sold, used for advertising or used to train an AI
        model.
      </p>
      <p>
        RingPost&apos;s use and transfer of information received from Google APIs to any other app
        will adhere to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>7. Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your
        data: sensitive values such as stored access tokens are encrypted at
        rest, access is restricted, and the system enforces tenant-level
        isolation at the database layer so one business&rsquo;s data cannot be
        reached through another business&rsquo;s account.
      </p>
      <p>
        No system is perfectly secure and we won&rsquo;t claim otherwise. We
        commit to investigating any suspected incident promptly and telling
        affected customers where it matters.
      </p>

      <h2>8. How long we keep it</h2>
      <p>
        We keep your business&rsquo;s data while your account is active, and for
        a reasonable period afterwards in case you want to reactivate or export
        it. After that it&rsquo;s deleted or anonymised, unless we&rsquo;re
        required to keep it longer for legal or accounting reasons.
      </p>

      <h2 id="website-chat">9. The chat on this website</h2>
      <p>
        The chat assistant on ringpost.tech is an AI. When you use it, we keep what
        you type and what it replies, plus any name, email address, phone number or
        business name you choose to give us, so our team can follow up and so we
        can see which questions the website isn&rsquo;t answering well. We use it
        only to reply to you and to improve the website and product. We don&rsquo;t
        sell it or use it to advertise to you elsewhere.
      </p>
      <p>
        Chat transcripts are kept for 12 months and then deleted. If you book a demo
        call, the booking itself is kept like any other business record. The replies
        are generated by our AI provider, named in section 4, which processes the text
        only to produce the reply. To have your chat deleted sooner, email{" "}
        <a href="mailto:support@ringpost.tech">support@ringpost.tech</a>.
      </p>
      <p>
        The &ldquo;Try it live&rdquo; mode lets you chat with a sample business. It
        is a demonstration: nothing you book there creates a real appointment with a
        real business.
      </p>

      <h2>10. Your rights</h2>
      <p>
        Depending on where you are, you may have the right to access, correct,
        export or delete your personal data. Follow our{" "}
        <a href="/data-deletion">Data Deletion Instructions</a> or email{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We acknowledge
        deletion requests within 72 hours and complete verified requests within
        30 days.
      </p>
      <p>
        If one of <em>your</em> customers wants to exercise similar rights over
        data held in your account, they should contact your business directly.
        You hold the customer relationship, and we process that data on your
        behalf.
      </p>

      <h2>11. Cookies</h2>
      <p>
        This site and the dashboard use cookies for essential functions such as
        keeping you signed in, and for basic analytics. You can control cookies
        in your browser, though disabling essential ones will break parts of the
        Service.
      </p>

      <h2>12. Children</h2>
      <p>
        The Service is for business owners and isn&rsquo;t directed at children.
        We don&rsquo;t knowingly collect personal information from anyone under
        16.
      </p>

      <h2>13. International processing</h2>
      <p>
        Your data may be processed and stored outside your own country by the
        providers listed above. Using the Service means consenting to that,
        under the terms of this policy.
      </p>

      <h2>14. Changes</h2>
      <p>
        We may update this policy. Material changes will be communicated by
        email before they take effect.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about this policy or your data:{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
