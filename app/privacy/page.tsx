import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/legal-page";
import { COMPANY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects data.`,
  robots: { index: true, follow: true },
};

/**
 * Providers are described by what they do, not named (owner decision 2026-09-30), with
 * one line each for Meta and Google. If the product starts sending data somewhere new,
 * make sure section 4 still describes it.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="4 October 2026"
      intro="This explains what RingPost collects, what we do with it, and who else touches it. There are two different sets of people here: businesses who sign up, and their customers who never did. This policy treats them separately, because the second group is the one that matters most."
    >
      <p>
        <strong>Who we are.</strong> RingPost is operated by <strong>{COMPANY.legalName}</strong> ({COMPANY.city}),
        referred to here as &ldquo;RingPost&rdquo;, &ldquo;we&rdquo; or &ldquo;us&rdquo;. You can reach us about
        anything in this policy through our <a href="/contact">contact page</a>.
      </p>

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
          Payment information: collected and processed directly by our payment provider. We
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
          channel: SMS, WhatsApp, Instagram and Facebook messages and comments, Threads replies and email.
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
        Running this Service means sending some data to specialist providers: for AI replies,
        images and video, phone calls and SMS, messaging, email, calendar sync, reviews, social
        publishing, payments, and hosting.
      </p>
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

      <h2>5. Meta platforms: WhatsApp, Instagram, Facebook and Threads</h2>
      <p>
        When a business connects WhatsApp, Instagram, Facebook or Threads, we use its messages,
        comments, replies and post insights only to answer, publish and book for that business; we
        never sell them, use them for advertising or use them to train an AI model, and you can
        request deletion through our{" "}
        <a href="/data-deletion">Data Deletion Instructions</a>.
      </p>

      <h2>6. Google user data</h2>
      <p>
        RingPost uses Google Calendar data only to check availability and manage the appointments
        booked through it, and its use of information received from Google APIs adheres to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>,
        including the Limited Use requirements.
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
        Chat transcripts are kept for 12 months and then deleted. The replies are generated
        by our AI provider, which processes the text only to produce the reply. To have your chat
        deleted sooner, use our <a href="/contact">contact page</a>.
      </p>

      <h2>10. Your rights</h2>
      <p>
        Depending on where you are, you may have the right to access, correct,
        export or delete your personal data. Follow our{" "}
        <a href="/data-deletion">Data Deletion Instructions</a> or use our{" "}
        <a href="/contact">contact page</a>. We acknowledge
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
        providers described above. Using the Service means consenting to that,
        under the terms of this policy.
      </p>

      <h2>14. Government and law enforcement requests</h2>
      <p>
        We may be asked by a public authority to hand over personal data. This
        is how we handle that, and it applies to every request, wherever it
        comes from.
      </p>
      <ul>
        <li>
          <strong>We check that the request is lawful.</strong> Every request is
          reviewed before anything is disclosed: that it comes from an authority
          with jurisdiction over us, that it is served through the proper legal
          process, and that it is valid on its face. We do not disclose data on
          an informal or voluntary request.
        </li>
        <li>
          <strong>We challenge requests we believe are unlawful.</strong> Where
          a request appears to be overbroad, improperly served, or without a
          legal basis, we will push back on it and, where necessary, contest it
          through the appropriate legal channel rather than comply.
        </li>
        <li>
          <strong>We disclose the minimum.</strong> Where we must comply, we
          give only the specific data the request actually compels, for the
          people it names and the period it covers. We do not provide bulk
          exports, direct access to our systems, or anything beyond the narrow
          scope of the order.
        </li>
        <li>
          <strong>We write it down.</strong> We keep a record of each request,
          what we disclosed, the legal reasoning, and who was involved in the
          decision.
        </li>
        <li>
          <strong>We tell the people affected.</strong> Where a business&rsquo;s
          data is involved, we notify that business, unless a court order or the
          law forbids us from doing so.
        </li>
      </ul>

      <h2>15. Changes</h2>
      <p>
        We may update this policy. Material changes will be communicated by
        email before they take effect.
      </p>

      <h2>16. Contact</h2>
      <p>
        Questions about this policy or your data: use our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalPage>
  );
}
