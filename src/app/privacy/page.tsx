import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy — CareerMaxxer",
  description:
    "How CareerMaxxer collects, uses, discloses, and protects your information when you use careermaxxer.com.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="February 2026">
      <p>
        CareerMaxxer (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
        or &ldquo;our&rdquo;) respects your privacy. This Privacy Policy
        explains how we collect, use, disclose, and protect your information
        when you use careermaxxer.com (the &ldquo;Platform&rdquo;). By using the
        Platform, you agree to this Privacy Policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect information in the following categories:</p>

      <h3>A. Information You Provide</h3>
      <p>
        When you create an account or use the Platform, you may provide: name
        or username; email address; school affiliation; profile information;
        content submitted to the Platform (e.g., Arena responses, AI prompts,
        performance data); communications sent to us.
      </p>

      <h3>B. Payment Information</h3>
      <p>
        If you subscribe to paid features: payments are processed by Stripe or
        other third-party payment processors. We do not store full credit card
        information. Stripe stores payment data according to its own privacy
        policy.
      </p>

      <h3>C. Automatically Collected Information</h3>
      <p>
        When you use the Platform, we may automatically collect: IP address;
        browser type; device information; usage activity (pages visited,
        interactions, timestamps); performance metrics related to Arena or
        competitive features. This information helps us improve functionality,
        security, and user experience.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain the Platform</li>
        <li>Create and manage your account</li>
        <li>Power AI features and generate outputs</li>
        <li>Calculate rankings and Arena metrics</li>
        <li>Process payments and subscriptions</li>
        <li>Improve performance and product features</li>
        <li>Detect fraud, abuse, or misuse</li>
        <li>
          Communicate updates, security notices, or service-related messages
        </li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>3. AI Processing</h2>
      <p>Certain features of the Platform use artificial intelligence.</p>
      <p>When you submit prompts or inputs:</p>
      <ul>
        <li>Your content may be processed by third-party AI providers.</li>
        <li>
          We may store prompts and outputs to improve product performance and
          user experience.
        </li>
        <li>
          AI outputs are generated algorithmically and may be logged for system
          improvement and abuse prevention.
        </li>
      </ul>
      <p>Do not submit sensitive personal data through AI tools.</p>

      <h2>4. Arena &amp; Ranking Data</h2>
      <p>If you participate in competitive features:</p>
      <ul>
        <li>
          Your username, school affiliation, ranking position, and performance
          metrics may be visible to other users.
        </li>
        <li>Rankings are public within the Platform.</li>
        <li>
          You are responsible for choosing a username that does not reveal
          private personal information.
        </li>
      </ul>

      <h2>5. Cookies &amp; Tracking Technologies</h2>
      <p>We may use cookies and similar technologies to:</p>
      <ul>
        <li>Maintain login sessions</li>
        <li>Improve security</li>
        <li>Analyze traffic and usage patterns</li>
        <li>Personalize user experience</li>
      </ul>
      <p>
        You may disable cookies in your browser settings, though some features
        may not function properly.
      </p>

      <h2>6. Data Sharing</h2>
      <p>We may share information in the following limited circumstances:</p>

      <h3>Service Providers</h3>
      <p>
        With trusted third-party vendors who help operate the Platform,
        including: payment processors (e.g., Stripe); hosting providers;
        analytics providers; AI infrastructure providers. These providers
        process data under contractual confidentiality obligations.
      </p>

      <h3>Legal Compliance</h3>
      <p>
        If required to: comply with law or legal process; enforce our Terms;
        protect rights, safety, or property.
      </p>

      <h3>Business Transfers</h3>
      <p>
        In the event of a merger, acquisition, or sale of assets, your
        information may be transferred. We do not sell personal data to
        advertisers.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable technical and organizational safeguards to
        protect your information. However: no system is 100% secure; we cannot
        guarantee absolute security. You are responsible for maintaining the
        confidentiality of your login credentials.
      </p>

      <h2>8. Data Retention</h2>
      <p>We retain personal information for as long as:</p>
      <ul>
        <li>Your account is active</li>
        <li>Needed to provide services</li>
        <li>Required for legal, tax, or compliance obligations</li>
        <li>Necessary to resolve disputes or enforce agreements</li>
      </ul>
      <p>We may retain anonymized or aggregated data indefinitely.</p>

      <h2>9. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the right to: access
        personal data we hold about you; request correction of inaccurate
        information; request deletion of your personal data; object to certain
        processing; request data portability.
      </p>
      <p>
        To exercise these rights, contact:{" "}
        <a href="mailto:support@careermaxxer.com">support@careermaxxer.com</a>.
        We may need to verify your identity before fulfilling requests.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        The Platform is not intended for individuals under 18. We do not
        knowingly collect personal data from minors. If we become aware that we
        have collected such information, we will delete it.
      </p>

      <h2>11. International Users</h2>
      <p>
        If you access the Platform from outside the United States: your
        information may be transferred to and processed in the United States;
        you consent to such transfer by using the Platform.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do: we
        will update the &ldquo;Last Updated&rdquo; date; continued use of the
        Platform constitutes acceptance of changes.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        For questions about this Privacy Policy:{" "}
        <a href="mailto:support@careermaxxer.com">support@careermaxxer.com</a>
      </p>
    </LegalPage>
  );
}
