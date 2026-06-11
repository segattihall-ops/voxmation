"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "sent" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm";

export default function DemoBookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      industry: String(data.get("industry") ?? ""),
      missedCalls: String(data.get("missedCalls") ?? ""),
    };

    try {
      const res = await fetch("/api/demo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const { error: message } = await res
          .json()
          .catch(() => ({ error: "" }));
        throw new Error(message || "We couldn't submit your request.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-dark rounded-4xl p-8 border border-white/5 text-center">
        <div className="w-14 h-14 rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Request received</h2>
        <p className="text-gray-300">
          Thanks! A VOXmatiON specialist will reach out shortly to schedule your
          demo. We&apos;ve sent a confirmation to your email.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-4xl p-8 border border-white/5">
      <h2 className="text-2xl font-bold text-white mb-6">Book Your Free Demo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
            <input name="firstName" type="text" required placeholder="John" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
            <input name="lastName" type="text" required placeholder="Smith" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Business Email</label>
          <input name="email" type="email" required placeholder="john@yourcompany.com" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
          <input name="phone" type="tel" required placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Business Name</label>
          <input name="company" type="text" required placeholder="Your Company LLC" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Industry</label>
          <select name="industry" className="w-full px-4 py-3 rounded-xl bg-[#0B1F3A] border border-white/10 text-gray-300 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm appearance-none">
            <option value="">Select your industry</option>
            <option>HVAC</option><option>Plumbing</option><option>Roofing</option>
            <option>Electrical</option><option>Garage Door</option><option>Landscaping</option>
            <option>Cleaning</option><option>Med Spa</option><option>Legal</option>
            <option>Real Estate</option><option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Monthly Missed Calls (approx.)</label>
          <select name="missedCalls" className="w-full px-4 py-3 rounded-xl bg-[#0B1F3A] border border-white/10 text-gray-300 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm appearance-none">
            <option value="">Select range</option>
            <option>1–10</option><option>10–30</option><option>30–60</option><option>60+</option>
          </select>
        </div>

        <div className="pt-1 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 flex-shrink-0 rounded border-white/20 bg-white/5 text-[#FF8A1F] accent-[#FF8A1F] focus:outline-none focus:ring-2 focus:ring-[#FF8A1F]"
            />
            <span className="text-xs text-gray-400 leading-relaxed">
              I agree to the{" "}
              <Link href="/demo-terms" className="text-[#FF8A1F] hover:underline">Demo Terms</Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-[#FF8A1F] hover:underline">Privacy Policy</Link>, and
              authorize VOXmatiON to contact me by phone, email, and SMS about my demo request.
            </span>
          </label>
          <details className="pl-7 text-[11px] text-gray-500">
            <summary className="cursor-pointer hover:text-gray-300 select-none">Full consent &amp; messaging terms</summary>
            <p className="mt-2 leading-relaxed">
              Calls or texts may use automated technology or an artificial or prerecorded voice
              where permitted by law. Consent is not required to purchase. Message and data rates
              may apply. Reply STOP to opt out of SMS or HELP for help.
            </p>
          </details>
        </div>

        {status === "error" && error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-4 rounded-xl bg-orange-gradient text-white font-bold text-base glow-orange hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:hover:scale-100"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" /> Request My Demo
            </>
          )}
        </button>
        <p className="text-xs text-gray-300 text-center">No commitment. 20-minute session. 100% free.</p>
      </form>
    </div>
  );
}
