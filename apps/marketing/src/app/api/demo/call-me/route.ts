import { NextRequest, NextResponse } from "next/server";
import { getSlugData, buildAgentVariables } from "@/lib/demo-data";

// Places an outbound demo call via ElevenLabs' native Twilio integration.
// ElevenLabs owns the Twilio number (imported under Conversational AI → Phone
// Numbers) and runs the agent on the call. The per-slug persona is passed as
// dynamic-variable overrides so the prospect hears their own company's script.
export async function POST(req: NextRequest) {
  const { phone, slug } = await req.json();
  const data = getSlugData(slug ?? "");

  if (!phone || typeof phone !== "string") {
    return NextResponse.json(
      { error: "A phone number is required." },
      { status: 400 }
    );
  }

  const { ELEVENLABS_API_KEY, ELEVENLABS_AGENT_ID, ELEVENLABS_AGENT_PHONE_NUMBER_ID } =
    process.env;

  if (!ELEVENLABS_API_KEY || !ELEVENLABS_AGENT_ID || !ELEVENLABS_AGENT_PHONE_NUMBER_ID) {
    return NextResponse.json(
      { error: "Outbound calling is not configured." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      "https://api.elevenlabs.io/v1/convai/twilio/outbound-call",
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: ELEVENLABS_AGENT_ID,
          agent_phone_number_id: ELEVENLABS_AGENT_PHONE_NUMBER_ID,
          to_number: phone,
          conversation_initiation_client_data: {
            dynamic_variables: buildAgentVariables(data),
          },
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("ElevenLabs outbound call failed:", res.status, detail);
      // Surface the upstream reason so the cause is visible while configuring
      // the ElevenLabs/Twilio integration (these are private sales pages).
      return NextResponse.json(
        {
          error: `Call could not be placed (ElevenLabs ${res.status}).`,
          reason: detail.slice(0, 400) || null,
        },
        { status: 502 }
      );
    }

    const result = await res.json();
    return NextResponse.json({
      callSid: result.callSid ?? result.call_sid ?? null,
      conversationId: result.conversation_id ?? null,
      companyName: data.companyName,
    });
  } catch (err) {
    console.error("Outbound call error:", err);
    return NextResponse.json({ error: "Call could not be placed." }, { status: 502 });
  }
}
