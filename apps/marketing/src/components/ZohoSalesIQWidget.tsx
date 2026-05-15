"use client";

import { useEffect } from "react";

const SALESIQ_WIDGET_CODE = "siq1713844660d5d8f0aa23fe45b5492bc8c9f31e4445e51522218544f108fdcf6a";

type ZohoSalesIQ = {
  widgetcode?: string;
  values?: Record<string, unknown>;
  ready?: () => void;
  visitor?: {
    question?: (question: string) => void;
    info?: (info: Record<string, string>) => void;
  };
  chat?: {
    start?: () => void;
  };
};

declare global {
  interface Window {
    $zoho?: {
      salesiq?: ZohoSalesIQ;
    };
  }
}

function startSalesIQChat(message: string) {
  try {
    const salesiq = window.$zoho?.salesiq;

    if (!salesiq) return;

    salesiq.visitor?.question?.(message);
    salesiq.chat?.start?.();
  } catch (error) {
    console.warn("SalesIQ not ready", error);
  }
}

export function openDiagnosticChat() {
  startSalesIQChat("Hi, I'd like a free missed call recovery diagnostic for my business.");
}

export function openSpecialistChat() {
  startSalesIQChat("Hi, I'd like to chat with a VOXmatiON specialist.");
}

export default function ZohoSalesIQWidget() {
  useEffect(() => {
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode: SALESIQ_WIDGET_CODE,
      values: {},
      ready: function () {},
    };

    if (document.getElementById("zsiqscript")) return;

    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.type = "text/javascript";
    script.defer = true;
    script.src = "https://salesiq.zoho.com/widget";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }, []);

  return null;
}
