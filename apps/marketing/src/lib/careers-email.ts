/**
 * Dependency-free HTML builders for the careers e-mails.
 *
 * The marketing site does not persist applications: the API route fans the
 * payload out to the Make.com scenario, which sends the candidate a
 * "recebemos sua candidatura" e-mail and the hiring owner a full copy.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "We received your application" e-mail sent to the candidate. */
export function applicationReceivedEmailHtml(fullName: string): string {
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
        <h1 style="margin:0 0 16px;font-size:22px;color:#fff;">Recebemos sua candidatura, ${escapeHtml(firstName)}! 🎉</h1>
        <p style="margin:0 0 20px;line-height:1.6;color:#c2c5d6;">
          Sua inscrição para a vaga de <strong style="color:#fff;">Assistente Remoto (PJ)</strong>
          chegou certinho. Vamos analisar com calma e, se fizer sentido, entramos em contato por
          este mesmo e-mail para os próximos passos.
        </p>
        <p style="margin:0 0 20px;line-height:1.6;color:#c2c5d6;">
          Não precisa fazer mais nada agora. 🙌
        </p>
        <p style="margin:24px 0 0;font-size:12px;color:#5b5e75;">
          Se você não fez esta inscrição, pode ignorar este e-mail.
        </p>
      </div>
    </div>
  </body>
</html>`;
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

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;padding:32px 16px;">
    <div style="max-width:640px;margin:0 auto;background:#11121a;border:1px solid #26283a;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #26283a;">
        <span style="font-weight:700;font-size:16px;color:#fff;">Nova candidatura — ${escapeHtml(app.fullName)}</span>
      </div>
      <div style="padding:24px 28px;">
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
