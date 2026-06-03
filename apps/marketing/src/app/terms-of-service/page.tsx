import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service", description: "VOXmatiON Terms of Service" };
export default function TermsOfService() {
  return (
    <section className="relative pt-28 pb-20 bg-[#0B1F3A] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-3">Terms of Service</h1>
        <p className="text-gray-400 mb-10">Last updated: January 1, 2025</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-6">
          <p>By accessing VOXmatiON services, you agree to these Terms of Service. Please read them carefully.</p>
          <h2 className="text-xl font-bold text-white">Service Description</h2>
          <p>VOXmatiON provides AI-powered voice automation, lead qualification, and CRM integration services. We assist with call answering, automation, and routing, but the client is responsible for information accuracy, compliance, and final approval of all commercial processes.</p>
          <h2 className="text-xl font-bold text-white">Client Responsibilities</h2>
          <p>You are responsible for: obtaining caller consent for recording, complying with TCPA and other applicable regulations, the accuracy of information entered into our system, and ensuring your use of VOXmatiON complies with all laws in your jurisdiction.</p>
          <h2 className="text-xl font-bold text-white">Payment Terms</h2>
          <p>Services are billed monthly. Failure to pay may result in service suspension. We reserve the right to update pricing with 30 days notice.</p>
          <h2 className="text-xl font-bold text-white">AI Disclaimer</h2>
          <p>VOXmatiON uses artificial intelligence to assist with call answering and lead qualification. AI responses may not always be perfectly accurate. We do not guarantee specific business outcomes from using our services.</p>
          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p>For legal questions: <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a></p>
        </div>
      </div>
    </section>
  );
}
