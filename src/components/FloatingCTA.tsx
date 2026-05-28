"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { openDiagnosticChat } from "@/components/ZohoSalesIQWidget";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed && window.scrollY > 400) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" role="complementary" aria-label="Chat with VOXmatiON">
      <div className="rounded-full bg-gray-900 border border-gray-800 px-4 py-2 text-xs font-semibold text-violet-300 shadow-lg whitespace-nowrap">
        Check your missed calls
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="h-8 w-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-300 transition-colors shadow"
          aria-label="Dismiss floating diagnostic button"
        >
          <X className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={openDiagnosticChat}
          className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-orange-950/20 hover:scale-105 active:scale-95 transition-all"
          aria-label="Start missed call diagnostic"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Start diagnostic</span>
          <span className="sm:hidden">Chat</span>
        </button>
      </div>
    </div>
  );
}
