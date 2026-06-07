import { NextRequest, NextResponse } from "next/server";

// Receives a demo-booking submission, emails the lead to the sales inbox, and
// sends the prospect a confirmation. Email is delivered through Resend's HTTP
// API (https://resend.com) so no SMTP/SDK dependency is required.

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

async function sendEmail(payload: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${payload.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
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

  const { RESEND_API_KEY } = process.env;
  const fromEmail = process.env.DEMO_FROM_EMAIL || "VOXmatiON <onboarding@resend.dev>";
  // Where leads are delivered. Falls back to a default inbox so the only
  // required secret is RESEND_API_KEY; override with DEMO_NOTIFICATION_EMAIL.
  const salesInbox = process.env.DEMO_NOTIFICATION_EMAIL || "sales@voxmation.com";

  if (!RESEND_API_KEY) {
    console.error("Demo booking email is not configured: RESEND_API_KEY is missing.");
    return NextResponse.json(
      { error: "Demo booking is not configured." },
      { status: 503 }
    );
  }

  const fullName = `${firstName} ${lastName}`;
  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Business", company],
    ["Industry", industry || "—"],
    ["Monthly missed calls", missedCalls || "—"],
  ];
  const leadHtml = `
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

  const confirmationHtml = `
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

  try {
    // Lead notification to the sales inbox (reply goes straight to the prospect).
    await sendEmail({
      apiKey: RESEND_API_KEY,
      from: fromEmail,
      to: salesInbox,
      replyTo: email,
      subject: `New demo request — ${company}`,
      html: leadHtml,
    });

    // Confirmation to the prospect. Don't fail the request if only this errors.
    try {
      await sendEmail({
        apiKey: RESEND_API_KEY,
        from: fromEmail,
        to: email,
        replyTo: salesInbox,
        subject: "We received your demo request — VOXmatiON",
        html: confirmationHtml,
      });
    } catch (err) {
      console.error("Demo confirmation email failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Demo booking email failed:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please try again or call us." },
      { status: 502 }
    );
  }
}
