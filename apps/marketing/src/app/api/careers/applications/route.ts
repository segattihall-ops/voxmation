import { NextRequest, NextResponse } from "next/server";
import { applicationDetailsHtml, applicationReceivedEmailHtml } from "@/lib/careers-email";

// Public endpoint for the "Assistente Remoto (xrmg)" job application.
//
// The marketing site is stateless: instead of persisting to a database, it
// fans the application out to the Make.com scenario, which e-mails the
// candidate a "recebemos sua candidatura" note and the hiring owner a full
// copy. Configure these in Vercel env vars to override the defaults:
//   MAKE_CAREERS_WEBHOOK_URL  — Make webhook that sends the e-mails
//   CAREERS_NOTIFY_EMAIL      — inbox that receives every application
export const runtime = "nodejs";

const MAKE_WEBHOOK_URL =
  process.env.MAKE_CAREERS_WEBHOOK_URL ||
  "https://hook.us2.make.com/kcf4i9kqzs7sqhfq4floxii1pwedlb6h";

const NOTIFY_EMAIL = process.env.CAREERS_NOTIFY_EMAIL || "segatti.hall@gmail.com";

// ~3MB raw resume → ~4MB base64, staying under Vercel's request body limit.
const MAX_RESUME_BASE64 = 4_200_000;

interface ResumePayload {
  filename: string;
  mimeType: string;
  base64: string;
}

interface MailPayload {
  email: string;
  subject: string;
  html: string;
}

function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (fullName.length < 2) {
    return NextResponse.json({ error: "Informe seu nome completo." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }
  if (!body.consentLgpd) {
    return NextResponse.json(
      { error: "É necessário aceitar o uso dos dados (LGPD)." },
      { status: 400 }
    );
  }

  const resume: ResumePayload | undefined =
    body.resume && typeof body.resume === "object" && body.resume.base64
      ? {
          filename: String(body.resume.filename || "curriculo"),
          mimeType: String(body.resume.mimeType || "application/octet-stream"),
          base64: String(body.resume.base64)
        }
      : undefined;

  if (resume && resume.base64.length > MAX_RESUME_BASE64) {
    return NextResponse.json(
      { error: "Currículo muito grande. Envie um arquivo de até 3MB." },
      { status: 413 }
    );
  }

  const application = {
    position: typeof body.position === "string" ? body.position : "assistente-remoto-xrmg",
    fullName,
    email,
    phone: typeof body.phone === "string" ? body.phone.trim() || null : null,
    city: typeof body.city === "string" ? body.city.trim() || null : null,
    state: typeof body.state === "string" ? body.state.trim() || null : null,
    linkedin: typeof body.linkedin === "string" ? body.linkedin.trim() || null : null,
    portfolio: typeof body.portfolio === "string" ? body.portfolio.trim() || null : null,
    resumeFilename: resume?.filename || null,
    answers: body.answers && typeof body.answers === "object" ? body.answers : {}
  };

  const candidate: MailPayload = {
    email: application.email,
    subject: "Recebemos sua candidatura — Assistente Remoto (xrmg)",
    html: applicationReceivedEmailHtml(application.fullName)
  };

  const owner: MailPayload = {
    email: NOTIFY_EMAIL,
    subject: `Nova candidatura: ${application.fullName} — ${application.position}`,
    html: applicationDetailsHtml(application)
  };

  // The Make scenario routes by recipient: it sends the candidate note and the
  // owner copy. `attachment` is optional — wire it in Make to attach the resume.
  const makePayload: Record<string, unknown> = { candidate, owner };
  if (resume) makePayload.attachment = resume;

  let emailDelivered = false;
  try {
    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(makePayload)
    });
    emailDelivered = res.ok;
    if (!res.ok) {
      console.error("Make careers webhook returned non-2xx:", res.status);
    }
  } catch (err) {
    console.error("Make careers webhook request failed:", err);
  }

  if (!emailDelivered) {
    return NextResponse.json(
      { error: "Não foi possível enviar sua candidatura agora. Tente novamente em instantes." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, emailDelivered: true }, { status: 201 });
}
