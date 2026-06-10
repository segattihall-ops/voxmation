// Next.js constraint: "use client" and `export const metadata` cannot coexist
// in the same file. This server-component wrapper owns the metadata; all
// interactive logic lives in the colocated ActivateClient.tsx.

import type { Metadata } from "next";
import { Suspense } from "react";
import ActivateClient from "./ActivateClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  // useSearchParams() in ActivateClient requires a Suspense boundary (Next.js 14+).
  return (
    <Suspense
      fallback={
        <div
          style={{ minHeight: "100vh", background: "#0B1F3A" }}
          aria-hidden="true"
        />
      }
    >
      <ActivateClient />
    </Suspense>
  );
}
