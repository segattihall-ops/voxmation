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
      "https://salesiq.zohopublic.com/widget?wc=siqb3e5dbe64f33ac1e79a765dcef0f51c0bb5f48dc2cdf5efa0e6c5d25fc90ddf8";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("zsiqscript");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
