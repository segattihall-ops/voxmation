/**
 * Minimal, dependency-free email sender.
 *
 * Uses the Resend HTTP API when RESEND_API_KEY is configured (Node 20+ has a
 * global fetch, so no extra package is required). When no provider is
 * configured it logs a warning and reports `delivered: false` so the caller can
 * fall back gracefully (e.g. surface the confirmation link in development).
 */

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
  /** Optional reply-to (e.g. the candidate's address on owner copies). */
  replyTo?: string;
}

interface Logger {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export interface SendEmailResult {
  delivered: boolean;
  provider: "resend" | "none";
}

export async function sendEmail(input: SendEmailInput, log?: Logger): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CAREERS_FROM_EMAIL || "Voxmation Careers <onboarding@resend.dev>";

  if (!apiKey) {
    log?.warn?.(
      { to: input.to, subject: input.subject },
      "No email provider configured (set RESEND_API_KEY + CAREERS_FROM_EMAIL). Email not sent."
    );
    return { delivered: false, provider: "none" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {})
      })
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      log?.error?.({ status: res.status, body }, "Resend email request failed");
      return { delivered: false, provider: "resend" };
    }

    return { delivered: true, provider: "resend" };
  } catch (err) {
    log?.error?.({ err }, "Resend email request threw");
    return { delivered: false, provider: "resend" };
  }
}

/** Confirmation email sent to the candidate (double opt-in). */
export function confirmationEmailHtml(fullName: string, confirmUrl: string): string {
  const firstName = fullName.split(/\s+/)[0] || fullName;
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;padding:32px 16px;">
    <div style="max-width:520px;margin:0 auto;background:#11121a;border:1px solid #26283a;border-radius:16px;overflow:hidden;">
      <div style="padding:28px 32px;border-bottom:1px solid #26283a;">
        <span style="font-weight:700;font-size:18px;color:#fff;">xrmg</span>
        <span style="color:#7c7f97;font-size:13px;"> &nbsp;•&nbsp; via Voxmation</span>
      </div>
      <div style="padding:32px;">
        <h1 style="margin:0 0 16px;font-size:22px;color:#fff;">Falta só confirmar, ${firstName}! 👋</h1>
        <p style="margin:0 0 20px;line-height:1.6;color:#c2c5d6;">
          Recebemos sua candidatura para a vaga de <strong style="color:#fff;">Assistente Remoto (PJ)</strong>.
          Para validar seu e-mail e enviar de vez sua inscrição, clique no botão abaixo:
        </p>
        <p style="margin:0 0 28px;">
          <a href="${confirmUrl}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;font-weight:600;padding:14px 28px;border-radius:10px;">
            Confirmar minha candidatura
          </a>
        </p>
        <p style="margin:0 0 8px;font-size:13px;color:#7c7f97;line-height:1.6;">
          Se o botão não funcionar, copie e cole este link no navegador:<br/>
          <a href="${confirmUrl}" style="color:#a78bfa;word-break:break-all;">${confirmUrl}</a>
        </p>
        <p style="margin:24px 0 0;font-size:12px;color:#5b5e75;">
          Se você não fez esta inscrição, pode ignorar este e-mail.
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface ApplicationLike {
  fullName: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  linkedin?: string | null;
  portfolio?: string | null;
  position: string;
  resumeFilename?: string | null;
  answers?: unknown;
  confirmed?: boolean;
}

/**
 * Full copy of an application sent to the hiring inbox (the "cópia para mim").
 * Renders contact info, salary expectation, test score and every answer.
 */
export function applicationDetailsHtml(app: ApplicationLike): string {
  const answers = (app.answers && typeof app.answers === "object" ? app.answers : {}) as Record<
    string,
    unknown
  >;

  const asText = (v: unknown): string =>
    Array.isArray(v) ? v.map((x) => String(x)).join(", ") : v == null ? "—" : String(v);

  const pretensao = asText(answers.pretensao);
  const notaTeste = asText(answers._nota_teste);

  // Per-area scores (keys like "_nota_Raciocínio lógico").
  const areaScores = Object.entries(answers)
    .filter(([k]) => k.startsWith("_nota_") && k !== "_nota_teste")
    .map(([k, v]) => `${escapeHtml(k.replace(/^_nota_/, ""))}: ${escapeHtml(asText(v))}`);

  // Remaining answers (skip salary + score meta, already shown above).
  const answerRows = Object.entries(answers)
    .filter(([k]) => k !== "pretensao" && !k.startsWith("_nota_"))
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #26283a;color:#a78bfa;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #26283a;color:#e5e7eb;white-space:pre-wrap;">${escapeHtml(asText(v))}</td>
        </tr>`
    )
    .join("");

  const contato = [
    ["Nome", app.fullName],
    ["E-mail", app.email],
    ["Telefone", app.phone || "—"],
    ["Cidade/UF", [app.city, app.state].filter(Boolean).join(" / ") || "—"],
    ["LinkedIn", app.linkedin || "—"],
    ["Portfólio", app.portfolio || "—"],
    ["Currículo", app.resumeFilename || "Não anexado"],
    ["Vaga", app.position]
  ]
    .map(
      ([k, v]) =>
        `<tr>
          <td style="padding:6px 12px;color:#7c7f97;white-space:nowrap;">${escapeHtml(k)}</td>
          <td style="padding:6px 12px;color:#fff;">${escapeHtml(String(v))}</td>
        </tr>`
    )
    .join("");

  const statusBadge = app.confirmed
    ? `<span style="background:#16331f;color:#4ade80;border:1px solid #1f5130;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">E-mail confirmado ✓</span>`
    : `<span style="background:#33270f;color:#fbbf24;border:1px solid #51421f;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">Aguardando confirmação</span>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#11121a;border:1px solid #26283a;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #26283a;display:flex;justify-content:space-between;">
        <span style="font-weight:700;font-size:16px;color:#fff;">Nova candidatura — ${escapeHtml(app.fullName)}</span>
      </div>
      <div style="padding:24px 28px;">
        <p style="margin:0 0 16px;">${statusBadge}</p>

        <div style="display:flex;gap:12px;flex-wrap:wrap;margin:0 0 20px;">
          <div style="flex:1;min-width:180px;background:#171826;border:1px solid #26283a;border-radius:10px;padding:14px;">
            <div style="font-size:12px;color:#7c7f97;">Pretensão salarial</div>
            <div style="font-size:18px;color:#fff;font-weight:700;">${escapeHtml(pretensao)}</div>
          </div>
          <div style="flex:1;min-width:180px;background:#171826;border:1px solid #26283a;border-radius:10px;padding:14px;">
            <div style="font-size:12px;color:#7c7f97;">Nota do teste (múltipla escolha)</div>
            <div style="font-size:18px;color:#fff;font-weight:700;">${escapeHtml(notaTeste)}</div>
            ${areaScores.length ? `<div style="font-size:12px;color:#a1a4ba;margin-top:4px;">${areaScores.join(" &nbsp;•&nbsp; ")}</div>` : ""}
          </div>
        </div>

        <h2 style="font-size:14px;color:#fff;margin:0 0 8px;">Contato</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin:0 0 24px;">${contato}</table>

        <h2 style="font-size:14px;color:#fff;margin:0 0 8px;">Respostas do teste</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">${answerRows || '<tr><td style="padding:8px 12px;color:#7c7f97;">Sem respostas.</td></tr>'}</table>
      </div>
    </div>
  </body>
</html>`;
}
