"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface FaqItem {
  q: string;
  a: string;
}

export default function PricingFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-gray-800/60 last:border-0">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
            aria-expanded={openIndex === i}
          >
            <span className="font-medium text-gray-200 text-sm">{item.q}</span>
            <ChevronDown
              className={clsx(
                "w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          {openIndex === i && (
            <p className="pb-5 text-sm text-gray-500 leading-relaxed">{item.a}</p>
          )}
        </div>
      ))}
    </>
  );
}
