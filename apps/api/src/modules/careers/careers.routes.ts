import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import crypto from "crypto";
import { config } from "../../config";
import { sendEmail, confirmationEmailHtml, applicationDetailsHtml } from "../../lib/email";

const MAX_RESUME_BASE64 = 7_000_000; // ~5MB raw after base64 inflation

const applicationSchema = z.object({
  position: z.string().min(1).default("assistente-remoto-xrmg"),
  fullName: z.string().min(2, "Informe seu nome completo."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  resume: z
    .object({
      filename: z.string().min(1),
      mimeType: z.string().min(1),
      base64: z.string().min(1)
    })
    .optional(),
  // Free-form screening answers — keyed by question id.
  answers: z.record(z.union([z.string(), z.array(z.string()), z.boolean()])),
  consentLgpd: z.boolean(),
  // Origin the candidate is browsing from, used to build the confirmation link.
  confirmBaseUrl: z.string().url().optional()
});

export const careersRoutes: FastifyPluginAsync = async (app) => {
  /**
   * POST /v1/careers/applications
   * Public. Stores the application as PENDING_CONFIRMATION and emails a
   * double opt-in confirmation link to the candidate.
   */
  app.post(
    "/careers/applications",
    {
      bodyLimit: 8 * 1024 * 1024, // allow the base64 resume payload
      schema: {
        tags: ["Careers"],
        summary: "Submit a job application (public)"
      }
    },
    async (req, reply) => {
      const body = applicationSchema.parse(req.body);

      if (!body.consentLgpd) {
        return reply.code(400).send({ error: "É necessário aceitar o uso dos dados (LGPD)." });
      }

      if (body.resume && body.resume.base64.length > MAX_RESUME_BASE64) {
        return reply.code(413).send({ error: "Currículo muito grande. Envie um arquivo de até 5MB." });
      }

      const confirmToken = crypto.randomBytes(24).toString("hex");

      const application = await app.prisma.jobApplication.create({
        data: {
          position: body.position,
          fullName: body.fullName.trim(),
          email: body.email.trim().toLowerCase(),
          phone: body.phone?.trim() || null,
          city: body.city?.trim() || null,
          state: body.state?.trim() || null,
          linkedin: body.linkedin?.trim() || null,
          portfolio: body.portfolio?.trim() || null,
          resumeFilename: body.resume?.filename || null,
          resumeMimeType: body.resume?.mimeType || null,
          resumeBase64: body.resume?.base64 || null,
          answers: body.answers,
          consentLgpd: body.consentLgpd,
          confirmToken
        }
      });

      const base = (body.confirmBaseUrl || config.careers.publicUrl || "").replace(/\/+$/, "");
      const confirmUrl = `${base}/carreiras/confirmar?token=${confirmToken}`;

      const emailRes = await sendEmail(
        {
          to: application.email,
          subject: "Confirme sua candidatura — Assistente Remoto (xrmg)",
          html: confirmationEmailHtml(application.fullName, confirmUrl),
          text: `Olá ${application.fullName},\n\nRecebemos sua candidatura para Assistente Remoto (PJ). Confirme seu e-mail acessando:\n${confirmUrl}\n\nSe você não fez esta inscrição, ignore este e-mail.`
        },
        app.log
      );

      // Copy of every application to the hiring inbox (the "cópia para mim").
      if (config.careers.notifyEmail) {
        await sendEmail(
          {
            to: config.careers.notifyEmail,
            replyTo: application.email,
            subject: `Nova candidatura: ${application.fullName} — ${application.position}`,
            html: applicationDetailsHtml({ ...application, confirmed: false })
          },
          app.log
        );
      }

      return reply.code(201).send({
        ok: true,
        applicationId: application.id,
        emailDelivered: emailRes.delivered,
        // When no provider is configured (dev), surface the link so the flow is testable.
        confirmUrl: emailRes.provider === "none" ? confirmUrl : undefined
      });
    }
  );

  /**
   * GET /v1/careers/applications/confirm?token=...
   * Public. Marks the application e-mail as confirmed (double opt-in).
   */
  app.get(
    "/careers/applications/confirm",
    {
      schema: {
        tags: ["Careers"],
        summary: "Confirm a job application e-mail (public)"
      }
    },
    async (req, reply) => {
      const { token } = z.object({ token: z.string().min(10) }).parse(req.query);

      const application = await app.prisma.jobApplication.findUnique({ where: { confirmToken: token } });
      if (!application) {
        return reply.code(404).send({ error: "Link de confirmação inválido ou expirado." });
      }

      if (application.confirmedAt) {
        return { ok: true, alreadyConfirmed: true, fullName: application.fullName };
      }

      const updated = await app.prisma.jobApplication.update({
        where: { id: application.id },
        data: { confirmedAt: new Date(), status: "CONFIRMED" }
      });

      // Send the hiring inbox a full copy now that the lead is validated.
      if (config.careers.notifyEmail) {
        await sendEmail(
          {
            to: config.careers.notifyEmail,
            replyTo: updated.email,
            subject: `✅ Candidatura confirmada: ${updated.fullName} — ${updated.position}`,
            html: applicationDetailsHtml({ ...updated, confirmed: true })
          },
          app.log
        );
      }

      return { ok: true, alreadyConfirmed: false, fullName: updated.fullName };
    }
  );

  /**
   * GET /v1/careers/applications
   * Admin only. Lists applications without the heavy resume blob.
   */
  app.get(
    "/careers/applications",
    { preHandler: app.requireRole(["ADMIN"]) },
    async () => {
      return app.prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
        select: {
          id: true,
          position: true,
          fullName: true,
          email: true,
          phone: true,
          city: true,
          state: true,
          linkedin: true,
          portfolio: true,
          answers: true,
          status: true,
          confirmedAt: true,
          createdAt: true,
          resumeFilename: true
        }
      });
    }
  );

  /**
   * GET /v1/careers/applications/:id/resume
   * Admin only. Streams the stored resume back as a download.
   */
  app.get(
    "/careers/applications/:id/resume",
    { preHandler: app.requireRole(["ADMIN"]) },
    async (req: any, reply) => {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      const application = await app.prisma.jobApplication.findUnique({ where: { id } });
      if (!application?.resumeBase64) {
        return reply.code(404).send({ error: "Currículo não encontrado." });
      }
      const buffer = Buffer.from(application.resumeBase64, "base64");
      reply.header("Content-Type", application.resumeMimeType || "application/octet-stream");
      reply.header(
        "Content-Disposition",
        `attachment; filename="${application.resumeFilename || "curriculo"}"`
      );
      return reply.send(buffer);
    }
  );
};
