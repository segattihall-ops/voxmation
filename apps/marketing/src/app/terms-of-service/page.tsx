import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/terms-of-service`;

export const metadata: Metadata = {
  title: "Terms of Service | VOXmatiON",
  description: "VOXmatiON Terms of Service — your rights and responsibilities when using our AI voice automation platform.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

export default function TermsOfService() {
  return (
    <section className="relative pt-28 pb-20 bg-[#060A10] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-3 font-display">Terms of Service</h1>
        <p className="text-gray-400 mb-10 font-body">Last updated: June 1, 2026</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-8 font-body">

          <p>These Terms of Service ("Terms") govern your access to and use of VOXmatiON's website and AI voice automation services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree, do not use our services.</p>

          <p><strong className="text-white">Operating Entity:</strong> XrankFlow Media Group LLC (operator of VOXmatiON), Dover, Delaware, United States</p>

          <h2 className="text-xl font-bold text-white font-display">1. Services</h2>
          <p>VOXmatiON provides AI-powered voice automation, missed-call recovery, lead qualification, and CRM integration services for service businesses. We assist with call answering and routing; however, the client is solely responsible for the accuracy of business information, customer communication compliance, and final approval of all commercial processes.</p>

          <h2 className="text-xl font-bold text-white font-display">2. Account & Eligibility</h2>
          <p>You must be at least 18 years old and a legal business entity or sole proprietor to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</p>

          <h2 className="text-xl font-bold text-white font-display">3. Client Responsibilities & Compliance</h2>
          <p>You are solely responsible for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Obtaining legally required consent from callers before recording, including compliance with the Telephone Consumer Protection Act (TCPA), state wiretapping laws, and two-party consent requirements</li>
            <li>Ensuring your use of VOXmatiON complies with all applicable local, state, federal, and international laws</li>
            <li>The accuracy and legality of the scripts, routing logic, and business information you configure</li>
            <li>Notifying callers that they may be interacting with an AI system where required by law</li>
          </ul>

          <h2 className="text-xl font-bold text-white font-display">4. Payment Terms</h2>
          <p>Services are billed monthly or annually in advance. All fees are non-refundable except as expressly stated in our refund policy. Failure to pay may result in service suspension after 7 days written notice. We reserve the right to update pricing with 30 days&apos; notice.</p>

          <h2 className="text-xl font-bold text-white font-display">5. AI Disclaimer & Limitations</h2>
          <p>VOXmatiON uses artificial intelligence to assist with call answering and lead qualification. AI responses may not always be accurate or appropriate. <strong className="text-white">We do not guarantee specific business outcomes</strong>, including call capture rates, lead quality, or revenue results. We are not liable for any business decisions made based on AI-generated information.</p>

          <h2 className="text-xl font-bold text-white font-display">6. Intellectual Property</h2>
          <p>VOXmatiON and its licensors retain all intellectual property rights in the platform, software, and content. You retain ownership of your business data and call recordings. You grant us a limited license to process your data solely to provide the services.</p>

          <h2 className="text-xl font-bold text-white font-display">7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, XrankFlow Media Group LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising from your use of our services. Our total liability shall not exceed the fees paid by you in the 3 months preceding the claim.</p>

          <h2 className="text-xl font-bold text-white font-display">8. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless XrankFlow Media Group LLC and its officers, employees, and agents from any claims, damages, or expenses (including attorneys&apos; fees) arising from your use of the services, violation of these Terms, or infringement of any third-party rights.</p>

          <h2 className="text-xl font-bold text-white font-display">9. Termination</h2>
          <p>Either party may terminate service with 30 days written notice. We may suspend or terminate your account immediately for material breach of these Terms, non-payment, or conduct that poses legal or reputational risk to VOXmatiON.</p>

          <h2 className="text-xl font-bold text-white font-display">10. Governing Law & Dispute Resolution</h2>
          <p>These Terms are governed by the laws of the <strong className="text-white">State of Delaware, United States</strong>, without regard to conflict-of-law principles. Any disputes shall be resolved by binding arbitration under the AAA Commercial Arbitration Rules, conducted in English in the State of Delaware. You waive any right to a jury trial or class action.</p>

          <h2 className="text-xl font-bold text-white font-display">11. Changes to Terms</h2>
          <p>We may update these Terms from time to time. We will provide 30 days&apos; notice of material changes via email or in-app notification. Continued use after the effective date constitutes acceptance of the revised Terms.</p>

          <h2 className="text-xl font-bold text-white font-display">12. Contact</h2>
          <p>
            <strong className="text-white">XrankFlow Media Group LLC</strong> (operator of VOXmatiON)<br />
            Dover, Delaware, United States<br />
            Email: <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a><br />
            Phone: <a href="tel:+18446877999" className="text-[#FF8A1F]">1-844-687-7999</a>
          </p>
        </div>
      </div>
    </section>
  );
}
