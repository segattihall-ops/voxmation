import { Zap, Clock, Wrench, MapPin } from "lucide-react";

// Factual credibility strip shown directly under the hero. Intentionally states
// only true product capabilities and service areas — no customer names, logos,
// or testimonials (those require real, verifiable proof).
const ITEMS = [
  { icon: Zap, label: "Answers in under 2 seconds" },
  { icon: Clock, label: "24/7 — nights, weekends & holidays" },
  { icon: Wrench, label: "Built for HVAC, plumbing, electrical & roofing" },
  { icon: MapPin, label: "Serving Dallas–Fort Worth, Houston, Austin & San Antonio" },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#060A10] border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-[#8A99B3] font-body">
              <Icon className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
