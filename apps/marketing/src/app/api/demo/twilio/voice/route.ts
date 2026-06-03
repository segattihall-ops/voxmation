import { NextResponse } from "next/server";

// TwiML bridge: connects the Twilio call media stream to the ElevenLabs agent.
// Falls back to a spoken message if the stream URL isn't configured yet.
export async function POST() {
  const streamUrl = process.env.ELEVENLABS_TWILIO_STREAM_URL;

  if (!streamUrl) {
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">Hi, this is the VOXmatiON AI demo. The voice agent is being connected. Please hold.</Say>
  <Pause length="2"/>
  <Say voice="Polly.Joanna">Stream not configured. Please set the ElevenLabs stream URL.</Say>
</Response>`;
    return new NextResponse(fallback, {
      headers: { "Content-Type": "text/xml" },
    });
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${streamUrl}" />
  </Connect>
</Response>`;
  return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } });
}

export async function GET() {
  return POST();
}
