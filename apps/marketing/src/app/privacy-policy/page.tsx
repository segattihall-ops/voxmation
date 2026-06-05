import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/privacy-policy`;

export const metadata: Metadata = {
  title: "Privacy Policy | VOXmatiON",
  description: "VOXmatiON Privacy Policy — how we collect, use, and protect your data.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

export default function PrivacyPolicy() {
  return (
    <section className="relative pt-28 pb-20 bg-[#060A10] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-3 font-display">Privacy Policy</h1>
        <p className="text-gray-400 mb-10 font-body">Last updated: June 1, 2026</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-8 font-body">

          <p>VOXmatiON, operated by <strong className="text-white">VOXmatiON LLC</strong> ("Company," "we," "us," or "our"), respects your privacy. This Privacy Policy describes how we collect, use, disclose, and protect information about you when you use our website and AI voice automation services.</p>

          <h2 className="text-xl font-bold text-white font-display">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email address, phone number, and business information when you register or request a demo</li>
            <li>Payment and billing information processed through our payment processor (Stripe)</li>
            <li>Communications you send us (email, chat, support tickets)</li>
            <li>Voice call recordings and transcripts processed through our AI Receptionist service</li>
          </ul>
          <p>We also collect data automatically, including IP address, browser type, pages visited, and usage analytics through cookies and similar technologies.</p>

          <h2 className="text-xl font-bold text-white font-display">2. How We Use Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide, operate, and improve our AI voice automation services</li>
            <li>Process transactions and send billing confirmations</li>
            <li>Communicate with you about your account, updates, and support</li>
            <li>Send marketing communications (you may opt out at any time)</li>
            <li>Comply with applicable legal obligations</li>
            <li>Detect and prevent fraud and abuse</li>
          </ul>

          <h2 className="text-xl font-bold text-white font-display">3. Call Recording & AI Processing</h2>
          <p>Our AI Receptionist service processes inbound voice calls on behalf of our business clients. Call recordings and transcripts may be retained to deliver the service, improve AI accuracy, and for client reporting. <strong className="text-white">You (the business client) are solely responsible for obtaining legally required consent from callers in your jurisdiction</strong>, including compliance with TCPA, state wiretapping laws, and any applicable two-party consent requirements.</p>

          <h2 className="text-xl font-bold text-white font-display">4. Data Retention</h2>
          <p>We retain personal data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Call recordings are retained for up to 90 days by default unless a longer period is required by law or requested by the client. You may request earlier deletion by contacting us at <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a>.</p>

          <h2 className="text-xl font-bold text-white font-display">5. Data Sharing & Sub-Processors</h2>
          <p>We do not sell your personal data. We may share data with the following categories of service providers as necessary to deliver our services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Telephony & AI:</strong> ElevenLabs, Twilio</li>
            <li><strong className="text-white">CRM Integration:</strong> HubSpot, Salesforce, Zoho (as configured by client)</li>
            <li><strong className="text-white">Payments:</strong> Stripe</li>
            <li><strong className="text-white">Analytics:</strong> Vercel Analytics, Google Analytics</li>
            <li><strong className="text-white">Customer Support:</strong> Zoho SalesIQ</li>
          </ul>

          <h2 className="text-xl font-bold text-white font-display">6. Cookies</h2>
          <p>We use essential cookies for site functionality and optional analytics cookies to understand usage. You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.</p>

          <h2 className="text-xl font-bold text-white font-display">7. Your Rights (CCPA / GDPR)</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong className="text-white">Deletion:</strong> Request that we delete your personal data</li>
            <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
            <li><strong className="text-white">Opt-Out:</strong> Opt out of marketing communications at any time</li>
            <li><strong className="text-white">Portability:</strong> Request your data in a portable format (GDPR)</li>
          </ul>
          <p>California residents have additional rights under the CCPA, including the right to know what personal information is collected and the right to non-discrimination for exercising privacy rights.</p>
          <p>To exercise any of these rights, contact us at <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a>.</p>

          <h2 className="text-xl font-bold text-white font-display">8. Data Security</h2>
          <p>We implement industry-standard technical and organizational measures to protect your data, including encryption in transit (TLS) and at rest, access controls, and regular security reviews. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security.</p>

          <h2 className="text-xl font-bold text-white font-display">9. Children&apos;s Privacy</h2>
          <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, contact us immediately.</p>

          <h2 className="text-xl font-bold text-white font-display">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised date. Continued use of our services after changes constitutes acceptance.</p>

          <h2 className="text-xl font-bold text-white font-display">11. Contact & Legal Entity</h2>
          <p>
            <strong className="text-white">VOXmatiON LLC</strong><br />
            United States<br />
            Email: <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a><br />
            Phone: <a href="tel:+18446877999" className="text-[#FF8A1F]">1-844-687-7999</a>
          </p>
        </div>
      </div>
    </section>
  );
}
