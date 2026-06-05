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
        text: input.text
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
