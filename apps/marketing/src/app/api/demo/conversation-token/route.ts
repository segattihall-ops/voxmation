import { NextRequest, NextResponse } from "next/server";
import { getSlugData, buildAgentVariables } from "@/lib/demo-data";

// Mints a signed ElevenLabs Conversational AI URL and returns the per-business
// dynamic variables so the client can inject them into the browser-mic session.
export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  const data = getSlugData(slug ?? "");

  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      { error: "ElevenLabs is not configured." },
      { status: 503 }
    );
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${encodeURIComponent(
      agentId
    )}`,
    {
      headers: { "xi-api-key": apiKey },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Token fetch failed" }, { status: 500 });
  }

  const { signed_url } = await res.json();
  return NextResponse.json({
    signed_url,
    companyName: data.companyName,
    dynamicVariables: buildAgentVariables(data),
  });
}
