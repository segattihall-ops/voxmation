export const config = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  webhookSecret: process.env.WEBHOOK_SECRET || "dev-webhook-secret",
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || ""
  }
};
