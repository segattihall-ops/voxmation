import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "VOXmatiON Privacy Policy" };
export default function PrivacyPolicy() {
  return (
    <section className="relative pt-28 pb-20 bg-[#0B1F3A] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
        <p className="text-gray-400 mb-10">Last updated: January 1, 2025</p>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300 space-y-6">
          <p>VOXmatiON ("Company," "we," "us," or "our") respects your privacy. This Privacy Policy describes how we collect, use, and share information about you when you use our services.</p>
          <h2 className="text-xl font-bold text-white">Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, phone number, and business details. We also collect usage data through analytics tools to improve our services.</p>
          <h2 className="text-xl font-bold text-white">How We Use Information</h2>
          <p>We use collected information to provide and improve our AI voice automation services, communicate with you about your account, send relevant marketing communications (with your consent), and comply with legal obligations.</p>
          <h2 className="text-xl font-bold text-white">Call Recording & AI Processing</h2>
          <p>Our AI Receptionist service processes voice calls. Call recordings and transcripts may be stored to improve service quality. You are responsible for obtaining appropriate consent from callers in your jurisdiction.</p>
          <h2 className="text-xl font-bold text-white">Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with service providers (CRM platforms, telephony providers) as necessary to deliver our services.</p>
          <h2 className="text-xl font-bold text-white">Contact</h2>
          <p>For privacy questions: <a href="mailto:legal@voxmation.com" className="text-[#FF8A1F]">legal@voxmation.com</a></p>
        </div>
      </div>
    </section>
  );
}
