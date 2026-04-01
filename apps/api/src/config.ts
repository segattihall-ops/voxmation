function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const jwtSecret = requireEnv("JWT_SECRET");
if (jwtSecret === "dev-secret" || jwtSecret.length < 32) {
  throw new Error("JWT_SECRET is too weak. Set a strong random secret (>= 32 chars) in environment variables.");
}

const webhookSecret = requireEnv("WEBHOOK_SECRET");
if (webhookSecret === "dev-webhook-secret" || webhookSecret.length < 16) {
  throw new Error("WEBHOOK_SECRET is too weak. Set a strong random secret (>= 16 chars) in environment variables.");
}

requireEnv("DATABASE_URL");

export const config = {
  port: Number(process.env.PORT || 3001),
  jwtSecret,
  webhookSecret,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || ""
  }
};
