import { NextRequest, NextResponse } from "next/server";

// Receives a demo-booking submission and forwards it to a Zapier "Catch Hook"
// webhook. Zapier then handles delivery (e.g. email confirmation, CRM, sheet),
// which avoids domain-level email verification. Configure the webhook URL via
// the DEMO_ZAPIER_WEBHOOK_URL environment variable.

type BookingPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  missedCalls?: string;
};

export async function POST(req: NextRequest) {
  let body: BookingPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const company = (body.company ?? "").trim();
  const industry = (body.industry ?? "").trim();
  const missedCalls = (body.missedCalls ?? "").trim();

  if (!firstName || !lastName || !email || !phone || !company) {
    return NextResponse.json(
      { error: "Please fill in your name, email, phone, and business name." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.DEMO_ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Demo booking is not configured: DEMO_ZAPIER_WEBHOOK_URL is missing.");
    return NextResponse.json(
      { error: "Demo booking is not configured." },
      { status: 503 }
    );
  }

  const payload = {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email,
    phone,
    company,
    industry: industry || null,
    missedCalls: missedCalls || null,
    source: "voxmation-demo-form",
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Zapier webhook failed:", res.status, detail.slice(0, 300));
      return NextResponse.json(
        { error: "We couldn't submit your request. Please try again or call us." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Demo booking webhook error:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please try again or call us." },
      { status: 502 }
    );
  }
}
