import { NextRequest, NextResponse } from "next/server";

// Receives a demo-booking submission and forwards it to a Make.com webhook.
// The Make scenario ("VOXmatiON Demo Form — Emails") routes the payload to two
// Gmail sends: a confirmation to the prospect and a notification to the team.
// Email subject/HTML are built here so the templates live with the code; Make
// just delivers them. Override the webhook with DEMO_WEBHOOK_URL.

const DEFAULT_WEBHOOK_URL = "https://hook.us2.make.com/8jloh8brua2enlortzptbbjf2s6ntz3w";

type BookingPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  missedCalls?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  const webhookUrl = process.env.DEMO_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  const ownerEmail = process.env.DEMO_NOTIFICATION_EMAIL || "sales@voxmation.com";

  const fullName = `${firstName} ${lastName}`;
  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Business", company],
    ["Industry", industry || "—"],
    ["Monthly missed calls", missedCalls || "—"],
  ];

  const ownerHtml = `
    <h2 style="font-family:sans-serif;margin:0 0 16px">New demo request</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#64748b">${label}</td>` +
            `<td style="padding:6px 0;font-weight:600">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>`;

  const prospectHtml = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 12px">Thanks, ${escapeHtml(firstName)} — we got your request 🎉</h2>
      <p style="margin:0 0 12px">
        A VOXmatiON specialist will reach out shortly to schedule your free
        20-minute demo for <strong>${escapeHtml(company)}</strong>.
      </p>
      <p style="margin:0 0 12px">
        In the meantime, if anything comes up you can just reply to this email.
      </p>
      <p style="margin:0;color:#64748b">— The VOXmatiON team</p>
    </div>`;

  const payload = {
    prospect: {
      email,
      subject: "We received your demo request — VOXmatiON",
      html: prospectHtml,
    },
    owner: {
      email: ownerEmail,
      subject: `New demo request — ${company}`,
      html: ownerHtml,
    },
    // Raw fields too, for CRM/sheet steps added on the Make side later.
    lead: {
      firstName,
      lastName,
      fullName,
      email,
      phone,
      company,
      industry: industry || null,
      missedCalls: missedCalls || null,
      source: "voxmation-demo-form",
      submittedAt: new Date().toISOString(),
    },
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Make webhook failed:", res.status, detail.slice(0, 300));
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
