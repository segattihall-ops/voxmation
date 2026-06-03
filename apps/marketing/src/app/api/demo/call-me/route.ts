import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { getSlugData } from "@/lib/demo-data";

// Triggers an outbound Twilio call to the prospect so the AI receptionist
// rings *them* — the "call-me-back" demo mode.
export async function POST(req: NextRequest) {
  const { phone, slug } = await req.json();
  const data = getSlugData(slug ?? "");

  if (!phone || typeof phone !== "string") {
    return NextResponse.json(
      { error: "A phone number is required." },
      { status: 400 }
    );
  }

  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, PUBLIC_BASE_URL } =
    process.env;

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !PUBLIC_BASE_URL) {
    return NextResponse.json(
      { error: "Outbound calling is not configured." },
      { status: 503 }
    );
  }

  try {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const call = await client.calls.create({
      to: phone,
      from: TWILIO_FROM_NUMBER,
      url: `${PUBLIC_BASE_URL}/api/demo/twilio/voice?slug=${encodeURIComponent(
        data.slug
      )}`,
    });

    return NextResponse.json({ callSid: call.sid, companyName: data.companyName });
  } catch (err) {
    console.error("Twilio call failed:", err);
    return NextResponse.json({ error: "Call could not be placed." }, { status: 502 });
  }
}
