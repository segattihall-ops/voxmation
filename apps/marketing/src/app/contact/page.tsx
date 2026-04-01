import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin, MessageSquare } from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, CONTACT_EMAIL, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact Us — Voxmation Voice Automation";
  const description =
    "Get in touch with the Voxmation team. Call us at 1-844-687-7999, email info@voxmation.com, or fill out our contact form. We respond within one business day.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
      title: "Contact Voxmation — Voice Automation Platform",
      description:
        "Reach the Voxmation team by phone, email, or contact form. Available Monday through Friday, 9am–6pm Eastern.",
      url: `${SITE_URL}/contact`,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Contact Voxmation" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Call Us",
    value: PHONE_NUMBER,
    href: PHONE_HREF,
    description: "Speak directly with our team. We answer Mon–Fri, 9am–6pm ET.",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    description: "We respond to all emails within one business day.",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon – Fri, 9am – 6pm ET",
    href: null,
    description: "After-hours inquiries are returned the next business day.",
  },
];

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Voxmation",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Voxmation",
      telephone: PHONE_NUMBER,
      email: CONTACT_EMAIL,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Get in touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Whether you're ready to automate your phone system or just want to understand how Voxmation works — we're here to help.
          </p>
          <div className="mt-6">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Phone className="w-6 h-6" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
            <form
              action={`mailto:${CONTACT_EMAIL}`}
              method="get"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="use-case">
                  What are you looking to automate?
                </label>
                <select
                  id="use-case"
                  name="use-case"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:border-violet-500 transition-colors text-sm"
                >
                  <option value="">Select a use case...</option>
                  <option value="appointment-reminders">Appointment Reminders</option>
                  <option value="ivr-menu">IVR / Phone Menu</option>
                  <option value="outbound-campaigns">Outbound Voice Campaigns</option>
                  <option value="after-hours">After-Hours Handling</option>
                  <option value="surveys">Survey / Feedback Collection</option>
                  <option value="other">Other / Multiple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="body"
                  rows={5}
                  required
                  placeholder="Tell us about your current phone setup, call volume, and what you're trying to automate..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-900/30"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-600 text-center">
                We respond to all inquiries within one business day.
              </p>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact information</h2>
              <div className="space-y-5">
                {CONTACT_METHODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.title} className="flex items-start gap-4 p-5 bg-gray-900/40 border border-gray-800/60 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-300 mb-0.5">{m.title}</p>
                        {m.href ? (
                          <a
                            href={m.href}
                            className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                          >
                            {m.value}
                          </a>
                        ) : (
                          <p className="text-gray-200 font-medium">{m.value}</p>
                        )}
                        <p className="text-xs text-gray-600 mt-1">{m.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 bg-gray-900/40 border border-gray-800/60 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-violet-400" />
                <p className="text-sm font-semibold text-gray-300">Office</p>
              </div>
              <div className="w-full h-40 bg-gray-800/60 rounded-lg flex items-center justify-center border border-gray-700/40">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Map embed placeholder</p>
                  <p className="text-xs text-gray-600">United States</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-violet-950/20 border border-violet-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <p className="text-sm font-semibold text-gray-200">Prefer to talk it through?</p>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Call us directly and we'll help you design the right voice automation flow for your business in 15 minutes.
              </p>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-violet-300 hover:text-violet-200 font-bold text-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
