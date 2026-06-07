import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/demo-terms`;

export const metadata: Metadata = {
  title: "Demo Offer Sign Up Terms & Conditions | VOXmatiON",
  description:
    "Terms and conditions governing VOXmatiON demo requests, including consent to be contacted by phone, email, and SMS, opt-out rights, and privacy.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

export default function DemoTerms() {
  return (
    <section className="relative pt-28 pb-20 bg-[#060A10] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-3 font-display">
          Demo Offer Sign Up Terms &amp; Conditions
        </h1>
        <p className="text-gray-400 mb-2 font-body">Effective Date: June 1, 2026</p>
        <p className="text-gray-400 mb-10 font-body">
          Company: VOXmatiON, operated by VOXmatiON LLC · Website:{" "}
          <a href="https://voxmation.com" className="text-[#FF8A1F]">https://voxmation.com</a>
        </p>

        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-6 font-body">
          <h2 className="text-xl font-bold text-white font-display">1. Acceptance of These Terms</h2>
          <p>By submitting your information through any VOXmatiON website form, landing page, advertisement, demo request page, lead form, calendar page, or related online sign up flow, you agree to these Demo Offer Sign Up Terms and Conditions.</p>
          <p>These Terms apply only to your request to receive information, offers, consultations, demos, follow up communications, or related materials from VOXmatiON. If you purchase or subscribe to any VOXmatiON product or service, separate service terms, subscription terms, order forms, agreements, or payment terms may also apply.</p>
          <p>If you do not agree to these Terms, do not submit the form.</p>

          <h2 className="text-xl font-bold text-white font-display">2. Demo Offer</h2>
          <p>VOXmatiON may offer a product demo, consultation, call review, missed call recovery assessment, AI voice automation walkthrough, CRM automation review, or similar promotional offer.</p>
          <p>Submitting a form does not guarantee that you will receive a demo, qualify for an offer, receive a discount, or be approved for any service.</p>
          <p>VOXmatiON may accept, reject, reschedule, modify, or discontinue any demo offer at any time.</p>
          <p>The demo is provided for informational and promotional purposes only. It does not create a client relationship, partnership, agency relationship, employment relationship, or binding service agreement.</p>

          <h2 className="text-xl font-bold text-white font-display">3. Eligibility</h2>
          <p>By signing up, you represent that:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>You are at least 18 years old.</li>
            <li>You are submitting accurate and truthful information.</li>
            <li>You are authorized to submit information on behalf of yourself or the business you represent.</li>
            <li>You are not submitting information for unlawful, fraudulent, abusive, misleading, or unauthorized purposes.</li>
            <li>You understand that VOXmatiON primarily provides business automation, voice AI, lead intake, and related technology services.</li>
          </ol>
          <p>VOXmatiON may refuse demo access or service if we believe the request is inaccurate, abusive, fraudulent, unlawful, outside our service scope, or commercially unsuitable.</p>

          <h2 className="text-xl font-bold text-white font-display">4. Information You Submit</h2>
          <p>When you sign up, you may provide information such as your name, business name, email address, phone number, website, industry, business location, CRM or software tools used, call volume, missed call concerns, automation needs, and other information voluntarily submitted.</p>
          <p>You agree not to submit sensitive personal information unless specifically requested by VOXmatiON. Do not submit medical records, legal case details, payment card numbers, passwords, government identification numbers, protected health information, confidential client records, or other sensitive data through a public form.</p>

          <h2 className="text-xl font-bold text-white font-display">5. Consent to Be Contacted</h2>
          <p>By submitting your information, you authorize VOXmatiON and its representatives, service providers, contractors, and technology partners to contact you regarding your demo request, offer, consultation, account inquiry, service interest, and related business communications.</p>
          <p>You agree that VOXmatiON may contact you by email, phone call, SMS or text message, voicemail, calendar invitation, online meeting link, CRM based follow up, and other reasonable business communication methods.</p>
          <p>You understand that communications may include information about VOXmatiON services, demo scheduling, promotional offers, automation assessments, missed call recovery solutions, pricing, onboarding, support, and related business opportunities.</p>

          <h2 className="text-xl font-bold text-white font-display">6. Consent to Automated Calls and Text Messages</h2>
          <p>By providing your phone number and submitting the form, you provide your prior express written consent to receive calls and text messages from VOXmatiON, including communications that may be made using automated technology, artificial or prerecorded voice, autodialing systems, or similar tools, where permitted by law.</p>
          <p><strong className="text-white">Consent is not required as a condition of purchasing any product or service.</strong></p>
          <p>Message and data rates may apply. Message frequency may vary.</p>
          <p>You may opt out of SMS messages at any time by replying STOP. You may request help by replying HELP or contacting <a href="mailto:support@voxmation.com" className="text-[#FF8A1F]">support@voxmation.com</a>.</p>
          <p>Opting out of marketing SMS messages does not prevent VOXmatiON from sending non marketing administrative messages when legally permitted, such as messages related to scheduled demos, active services, billing, support, security, or account related matters.</p>

          <h2 className="text-xl font-bold text-white font-display">7. Email Communications</h2>
          <p>By submitting your email address, you agree that VOXmatiON may send you emails related to your demo request, service interest, offers, product education, case studies, pricing, onboarding, follow up, and related business communications.</p>
          <p>You may unsubscribe from promotional emails using the unsubscribe link provided in the email or by contacting <a href="mailto:support@voxmation.com" className="text-[#FF8A1F]">support@voxmation.com</a>. Even if you unsubscribe from promotional emails, VOXmatiON may still send transactional or administrative emails where permitted by law.</p>

          <h2 className="text-xl font-bold text-white font-display">8. No Guarantee of Results</h2>
          <p>VOXmatiON may discuss potential benefits such as missed call recovery, lead qualification, appointment intake, CRM automation, faster response times, improved follow up, or operational efficiency. However, VOXmatiON does not guarantee revenue increases, specific lead volume, specific appointment volume, specific conversion rates, search ranking results, customer acquisition results, business growth, profitability, cost savings, or any specific commercial outcome.</p>
          <p>Any examples, estimates, projections, demo results, case studies, or performance discussions are illustrative only and may not reflect your actual results. Your results depend on many factors, including your market, offer, pricing, call volume, team, scripts, customer demand, response speed, CRM setup, advertising quality, operational capacity, and follow through.</p>

          <h2 className="text-xl font-bold text-white font-display">9. Demo Content and Accuracy</h2>
          <p>VOXmatiON attempts to provide accurate and useful information during demos and consultations. However, demo materials may be simplified, illustrative, incomplete, or based on assumptions. You should not rely on demo content as legal, financial, tax, medical, compliance, or professional advice.</p>
          <p>You are responsible for reviewing whether any VOXmatiON solution is appropriate for your business, industry, jurisdiction, compliance obligations, customer communication rules, data handling needs, and internal operations.</p>

          <h2 className="text-xl font-bold text-white font-display">10. AI Voice and Automation Disclaimer</h2>
          <p>VOXmatiON may demonstrate or discuss AI voice agents, automated call answering, missed call recovery, lead qualification, SMS follow up, CRM routing, workflow automation, call summaries, and related systems. AI and automation systems may produce errors, delays, incomplete information, incorrect classifications, failed transfers, misunderstood intent, transcription inaccuracies, or unexpected outputs.</p>
          <p>You are responsible for determining the level of human oversight required for your business. For regulated industries, including healthcare, legal, financial, insurance, real estate, and other compliance sensitive sectors, additional review, disclaimers, controls, consent flows, escalation logic, and human review may be required before deployment.</p>

          <h2 className="text-xl font-bold text-white font-display">11. No Professional Advice</h2>
          <p>VOXmatiON provides business automation and technology related services. VOXmatiON does not provide legal, medical, tax, financial, insurance, or professional compliance advice. Any information provided by VOXmatiON is for general business and technology purposes only.</p>
          <p>You should consult qualified professionals before making decisions involving legal compliance, customer consent, regulated communications, data privacy, employment, billing, licensing, or industry specific obligations.</p>

          <h2 className="text-xl font-bold text-white font-display">12. Use of Third Party Tools</h2>
          <p>VOXmatiON may use third party tools, platforms, software, APIs, hosting providers, communication providers, CRM systems, analytics tools, scheduling tools, voice technology providers, and automation platforms to process demo requests and provide services. These may include systems for email, SMS, phone calls, calendar scheduling, CRM tracking, analytics, call processing, AI voice, transcription, workflow automation, and customer support.</p>
          <p>Your use of VOXmatiON may also be subject to third party terms and privacy policies. VOXmatiON is not responsible for failures, outages, policy changes, pricing changes, account restrictions, service interruptions, or errors caused by third party platforms.</p>

          <h2 className="text-xl font-bold text-white font-display">13. Privacy</h2>
          <p>Your submission and related communications are subject to the VOXmatiON <Link href="/privacy-policy" className="text-[#FF8A1F]">Privacy Policy</Link>.</p>
          <p>By submitting your information, you acknowledge that VOXmatiON may collect, use, store, process, and share information as reasonably necessary to respond to your request, schedule a demo, provide information about services, send follow up communications, manage CRM records, improve marketing and sales operations, analyze website and campaign performance, prevent fraud or abuse, comply with legal obligations, and operate and improve VOXmatiON services.</p>
          <p>Do not submit information if you do not want it processed according to the VOXmatiON Privacy Policy.</p>

          <h2 className="text-xl font-bold text-white font-display">14. Recording and Monitoring</h2>
          <p>Demo calls, consultation calls, AI voice interactions, support calls, or sales calls may be recorded, transcribed, monitored, summarized, or analyzed for quality assurance, training, documentation, compliance, service improvement, and follow up purposes, where permitted by law. By participating in a call or demo, you consent to such recording and processing where legally permitted. If you do not consent to recording, notify VOXmatiON before the call begins.</p>

          <h2 className="text-xl font-bold text-white font-display">15. User Responsibilities</h2>
          <p>You agree that you will not:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Submit false, misleading, or unauthorized information.</li>
            <li>Submit another person&apos;s contact information without permission.</li>
            <li>Use VOXmatiON forms to spam, harass, abuse, test, scrape, or attack systems.</li>
            <li>Attempt to reverse engineer, copy, resell, or misuse demo materials.</li>
            <li>Use VOXmatiON services for unlawful, deceptive, abusive, discriminatory, or harmful purposes.</li>
            <li>Submit confidential, regulated, or sensitive information through public forms unless authorized and requested.</li>
            <li>Interfere with the security, availability, or operation of VOXmatiON systems.</li>
          </ol>
          <p>VOXmatiON may block, reject, delete, or report submissions that appear abusive, unlawful, fraudulent, or harmful.</p>

          <h2 className="text-xl font-bold text-white font-display">16. Intellectual Property</h2>
          <p>All VOXmatiON materials, demos, scripts, workflows, call flows, AI prompts, automation designs, website content, sales materials, software concepts, graphics, branding, documentation, and related materials are owned by VOXmatiON or its licensors. You may not copy, reproduce, distribute, modify, sell, license, reverse engineer, or create derivative works from VOXmatiON materials without written permission. Receiving a demo does not grant you ownership of any VOXmatiON intellectual property.</p>

          <h2 className="text-xl font-bold text-white font-display">17. Promotional Materials</h2>
          <p>VOXmatiON may send educational or promotional materials related to AI voice automation, missed call recovery, lead qualification, CRM automation, appointment intake, business process automation, customer follow up, industry use cases, pricing, service updates, and related offers. You may opt out of promotional communications as described in these Terms.</p>

          <h2 className="text-xl font-bold text-white font-display">18. Availability and Changes</h2>
          <p>VOXmatiON may modify, suspend, or discontinue any demo offer, landing page, sign up form, promotion, consultation, pricing discussion, feature preview, or service description at any time without notice. VOXmatiON may update these Terms at any time. The updated version will be effective when posted or otherwise made available. Your continued interaction with VOXmatiON after updated Terms are posted means you accept the updated Terms.</p>

          <h2 className="text-xl font-bold text-white font-display">19. No Obligation to Purchase</h2>
          <p>Submitting a demo request does not obligate you to purchase any VOXmatiON product or service. VOXmatiON is not obligated to provide services unless a separate agreement, order form, subscription, invoice, or written confirmation is accepted by VOXmatiON.</p>

          <h2 className="text-xl font-bold text-white font-display">20. Payments and Subscriptions</h2>
          <p>The demo offer itself may be free unless otherwise stated. If you choose to purchase a VOXmatiON product or service, payment terms, billing frequency, renewal terms, cancellation terms, refunds, taxes, and service scope will be governed by the applicable order form, invoice, subscription checkout, service agreement, or separate terms provided at the time of purchase. Do not provide payment information through a demo request form unless the form is specifically designed for secure payment processing.</p>

          <h2 className="text-xl font-bold text-white font-display">21. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, VOXmatiON will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, including lost profits, lost revenue, lost leads, lost business opportunities, lost data, business interruption, reputational harm, or loss of goodwill arising from or related to your demo request, communications with VOXmatiON, or use of demo materials.</p>
          <p>To the maximum extent permitted by law, VOXmatiON&apos;s total liability related to your demo request or these Terms will not exceed one hundred dollars or the amount you paid directly to VOXmatiON for the specific demo related service, whichever is greater. Some jurisdictions do not allow certain limitations of liability, so some limitations may not apply to you.</p>

          <h2 className="text-xl font-bold text-white font-display">22. Disclaimer of Warranties</h2>
          <p>The demo offer, website forms, communications, demo materials, and related information are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. VOXmatiON disclaims all warranties to the maximum extent permitted by law, including implied warranties of merchantability, fitness for a particular purpose, non infringement, accuracy, availability, and reliability.</p>
          <p>VOXmatiON does not warrant that any demo, communication, website form, automation, recommendation, or information will be uninterrupted, error free, secure, complete, or suitable for your business.</p>

          <h2 className="text-xl font-bold text-white font-display">23. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless VOXmatiON, its owners, officers, employees, contractors, service providers, affiliates, and partners from and against any claims, damages, liabilities, losses, costs, and expenses arising from your submission of inaccurate, unauthorized, or unlawful information; your misuse of VOXmatiON forms, demos, materials, or communications; your violation of these Terms; your violation of applicable laws or third party rights; and your use of VOXmatiON information or demo materials in your business.</p>

          <h2 className="text-xl font-bold text-white font-display">24. Compliance With Laws</h2>
          <p>You are responsible for complying with all laws and regulations that apply to your business, industry, customer communications, data collection, marketing, advertising, privacy, call recording, SMS messaging, AI use, and automation workflows. VOXmatiON may refuse to provide or demonstrate services that appear unlawful, deceptive, abusive, harmful, or outside our acceptable use standards.</p>

          <h2 className="text-xl font-bold text-white font-display">25. Governing Law</h2>
          <p>These Terms will be governed by the laws of the State of Florida, United States, without regard to conflict of law principles. Any dispute arising from or related to these Terms, your demo request, or related communications will be handled in the courts located in the State of Florida, unless otherwise required by applicable law.</p>

          <h2 className="text-xl font-bold text-white font-display">26. Severability</h2>
          <p>If any provision of these Terms is found invalid, unlawful, or unenforceable, the remaining provisions will remain in full force and effect.</p>

          <h2 className="text-xl font-bold text-white font-display">27. Entire Agreement</h2>
          <p>These Terms, together with the VOXmatiON <Link href="/privacy-policy" className="text-[#FF8A1F]">Privacy Policy</Link> and any applicable written agreement, represent the entire agreement between you and VOXmatiON regarding your demo request and related sign up communications.</p>

          <h2 className="text-xl font-bold text-white font-display">28. Contact</h2>
          <p>
            <strong className="text-white">VOXmatiON LLC</strong><br />
            General questions: <a href="mailto:support@voxmation.com" className="text-[#FF8A1F]">support@voxmation.com</a><br />
            Billing questions: <a href="mailto:billing@voxmation.com" className="text-[#FF8A1F]">billing@voxmation.com</a><br />
            Legal notices: <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a><br />
            Phone: <a href="tel:+18446877999" className="text-[#FF8A1F]">844-687-7999</a>
          </p>
        </div>
      </div>
    </section>
  );
}
