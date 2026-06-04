"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    $zoho?: { salesiq?: { ready?: () => void } };
  }
}

export default function ZohoSalesIQWidget() {
  useEffect(() => {
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src =
      "https://salesiq.zohopublic.com/widget?wc=siq1713844660d5d8f0aa23fe45b5492bc8c9f31e4445e51522218544f108fdcf6a";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("zsiqscript");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
