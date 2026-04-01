exports.id=538,exports.ids=[538],exports.modules={1647:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,6568,23))},6968:(e,t,o)=>{"use strict";o.d(t,{E:()=>i});let i=[{slug:"what-is-voice-prompt-automation",title:"What Is Voice Prompt Automation? A Complete Guide for 2025",description:"Voice prompt automation lets businesses replace repetitive phone interactions with intelligent, pre-built call flows. Learn how it works, who needs it, and how to get started.",date:"2025-03-10",readTime:"8 min read",author:"Voxmation Team",content:`
## What Is Voice Prompt Automation?

**Voice prompt automation** is the practice of using software to handle inbound and outbound phone calls through pre-recorded or dynamically generated voice prompts — without requiring a live agent on every call.

Think of it as scripting your phone system the way you'd script a chatbot, but for voice calls. Instead of a customer pressing 1 for sales and waiting on hold, a well-built voice automation flow can qualify leads, book appointments, collect information, and route calls — all without human intervention.

## How Voice Prompt Automation Works

At its core, a voice automation system has four components:

1. **Telephony backend** — Asterisk, FreeSWITCH, or a cloud provider like Twilio handles SIP signaling and audio
2. **Prompt library** — pre-recorded WAV/MP3 files or text-to-speech (TTS) output for each message in the call flow
3. **Call flow logic** — a decision tree that determines which prompt plays based on caller input (DTMF keypress or speech recognition)
4. **Integration layer** — webhooks and APIs that connect the call flow to your CRM, calendar, or ticketing system

When a caller dials in, the system plays a greeting prompt. Depending on what the caller presses or says, the system branches to the next node in the flow — playing a different prompt, collecting data, transferring to an agent, or ending the call.

## Who Needs Voice Prompt Automation?

Voice prompt automation is valuable for any organization that:

- **Receives high call volume** with repetitive inquiry types (hours, directions, account status)
- **Makes outbound calls at scale** — appointment reminders, payment notices, survey collection
- **Needs 24/7 phone coverage** without staffing a round-the-clock call center
- **Wants to qualify inbound leads** before routing to a sales rep
- **Has compliance requirements** around recorded consent or specific disclosures

Common industries include healthcare (appointment reminders), financial services (payment reminders), real estate (property inquiries), and e-commerce (order status).

## Voice Prompt Automation vs. IVR vs. Conversational AI

These terms are often used interchangeably, but they're distinct:

- **IVR (Interactive Voice Response)**: The classic "press 1 for sales" menu. Rigid, DTMF-driven, no natural language understanding.
- **Voice Prompt Automation**: A broader term covering IVR plus dynamic prompts, TTS, outbound dialing, and multi-step call flows with integrations.
- **Conversational AI**: Uses NLP and speech recognition for natural conversation, allowing callers to speak freely. More complex and expensive, but more flexible.

Voxmation focuses on voice prompt automation — structured, reliable call flows that handle the 80% of interactions that don't require full conversational AI.

## What Makes a Good Voice Prompt Automation Platform?

Key capabilities to look for:

- **Visual call flow builder** — drag-and-drop nodes for prompts, branches, and integrations
- **TTS with natural voices** — on-demand prompt generation without pre-recording everything
- **DTMF and speech input** — flexibility to accept keypad or voice responses
- **Outbound dialer** — for campaigns, reminders, and proactive outreach
- **Real-time analytics** — call completion rates, drop-off points, conversion tracking
- **CRM integration** — connect call outcomes to contact records automatically
- **Self-hosted option** — for data sovereignty and compliance

## Getting Started with Voice Prompt Automation

1. **Define your call flows** — Start with your highest-volume call types. Map out every branch: what does the caller hear, what can they do, where does each path go?
2. **Build prompts** — Write scripts for each node. Aim for short, clear messages (under 10 seconds). Avoid jargon.
3. **Configure your telephony** — Asterisk and FreeSWITCH give you full control for on-premises deployments. Twilio is easier to start with for cloud.
4. **Connect your integrations** — Link appointment bookings to your calendar, lead captures to your CRM, and escalations to your helpdesk.
5. **Test before going live** — Walk every branch of the call flow yourself. Test error handling (what happens when the caller doesn't press anything?).
6. **Monitor and optimize** — Track where callers drop off and why. A/B test different prompt scripts. Measure containment rate (calls handled without a live agent).

Voice prompt automation isn't set-and-forget, but once your call flows are dialed in, they run 24/7 at a fraction of the cost of live agents.
    `.trim()},{slug:"asterisk-vs-twilio-outbound-campaigns",title:"Asterisk vs Twilio for Outbound Voice Campaigns: Which Should You Choose?",description:"Comparing Asterisk and Twilio for running outbound voice campaigns at scale. We break down cost, control, latency, compliance, and which platform fits different use cases.",date:"2025-03-18",readTime:"10 min read",author:"Voxmation Team",content:`
## Asterisk vs Twilio for Outbound Voice Campaigns

If you're running outbound voice campaigns — appointment reminders, collections, surveys, lead qualification — you'll face a fundamental choice early on: self-hosted PBX (Asterisk or FreeSWITCH) or cloud telephony (Twilio).

Both can handle outbound at scale. The decision comes down to cost, control, latency, and your team's technical capabilities.

## What Is an Outbound Voice Campaign?

An outbound voice campaign is a batch of automated calls made from your system to a list of phone numbers. Each call plays a voice prompt, collects DTMF input or speech, and takes an action based on the response — scheduling a callback, logging a payment commitment, or escalating to a live agent.

At scale, you might be dialing thousands of numbers per hour. The difference in cost and infrastructure requirements between Asterisk and Twilio becomes significant at that volume.

## Asterisk: On-Premises PBX for Full Control

**Asterisk** is an open-source PBX that runs on Linux. For outbound campaigns, you connect Asterisk to a SIP trunk provider (Twilio, Telnyx, Vonage, Bandwidth) for PSTN access.

### Cost

With Asterisk + a SIP trunk:
- **Asterisk**: Free (open source). Server cost: $20–$100/month for a VPS capable of 100+ simultaneous calls.
- **SIP trunk minutes**: $0.003–$0.008/minute for US outbound (Telnyx, Bandwidth, Skyetel). At 100,000 minutes/month, that's **$300–$800/month**.
- **Total**: $320–$900/month for 100k minutes

### Advantages

- **Lowest per-minute cost** — SIP trunk rates are significantly cheaper than Twilio's API pricing
- **Full control** — customize dialplan, codec negotiation, jitter buffer, and recording storage
- **No per-call API overhead** — calls go directly through your dialplan with no HTTP round-trips
- **Compliance-friendly** — HIPAA BAAs available from SIP trunk providers; recordings stay on your infrastructure
- **Unlimited channels** — scale concurrent calls by adding server capacity, not by paying per-channel fees

### Disadvantages

- **Operational overhead** — you own the server, updates, monitoring, and failover
- **Harder to integrate** — connecting Asterisk events to your application requires AMI/AGI or an abstraction layer
- **SIP expertise required** — misconfigured codecs, NAT traversal, and firewall rules are common pain points

## Twilio: Cloud Telephony for Fast Start

**Twilio** is a cloud telephony API. You make HTTP calls to Twilio's API to initiate outbound calls. Twilio handles the SIP infrastructure; you handle the call logic via TwiML (XML) or Twilio Studio.

### Cost

- **Outbound calls**: $0.013/minute (US)
- **No infrastructure cost** — Twilio handles servers, redundancy, and scaling
- **At 100,000 minutes/month**: **$1,300/month**

That's 1.6–4x more expensive than Asterisk + SIP trunk at this volume.

### Advantages

- **No infrastructure to manage** — zero ops overhead; Twilio handles availability and scaling
- **Fast to implement** — REST API, extensive docs, no SIP expertise needed
- **Global PSTN coverage** — 100+ countries, number provisioning via API
- **Built-in recording and transcription** — no separate storage setup required
- **Easy compliance features** — HIPAA, GDPR, PCI tooling built in

### Disadvantages

- **Higher per-minute cost** — material cost difference at scale
- **Vendor dependency** — pricing changes, outages, and API rate limits are outside your control
- **Less control over audio path** — codec selection and call routing are abstracted away
- **Data residency limitations** — recordings and call data on Twilio's infrastructure

## Cost Comparison at Scale

| Volume | Asterisk + SIP trunk | Twilio |
|--------|---------------------|--------|
| 10,000 min/month | $70–$180 | $130 |
| 100,000 min/month | $320–$900 | $1,300 |
| 1,000,000 min/month | $3,200–$9,000 | $13,000 |

At low volume (<10k minutes/month), Twilio's simplicity wins — the cost difference is small and the time savings are real. At high volume (>100k minutes/month), Asterisk's cost advantage becomes hard to ignore.

## When to Choose Asterisk

- You have existing Asterisk or FreeSWITCH infrastructure
- Your call volume exceeds 50,000 minutes/month
- You have compliance requirements that require on-premises call recording
- You need maximum call quality control (codec selection, jitter buffer tuning)
- Your team has Linux/SIP expertise

## When to Choose Twilio

- You're starting a new project and need to ship fast
- Your call volume is under 50,000 minutes/month
- You have no SIP or Linux expertise on the team
- You need rapid international expansion (Twilio handles number provisioning globally)
- You want managed compliance features

## The Voxmation Approach

Voxmation supports both. You can run campaigns through Asterisk when you have on-premises infrastructure and switch to Twilio as a fallback for overflow or international calls. The call flow builder and analytics are identical — only the telephony backend differs.

This means you're not locked into either choice. Start with Twilio, validate your campaign economics, then migrate the high-volume flows to Asterisk when the cost savings justify the operational investment.
    `.trim()},{slug:"how-to-build-an-ivr-menu",title:"How to Build an IVR Menu in 2025 (Asterisk, FreeSWITCH, and Twilio)",description:"A practical guide to building IVR menus from scratch — covering dialplan design, prompt recording, DTMF handling, speech recognition, and integration with your CRM or help desk.",date:"2025-03-25",readTime:"12 min read",author:"Voxmation Team",content:`
## How to Build an IVR Menu in 2025

An IVR (Interactive Voice Response) menu is the front door of your phone system. Done well, it routes callers to the right place quickly. Done poorly, it drives customers to hang up.

This guide covers how to build a production-grade IVR from scratch using Asterisk, FreeSWITCH, or Twilio — including the common mistakes that make IVRs frustrating.

## IVR Design Principles Before You Write a Line of Code

Before touching configuration, get your call flow on paper:

1. **Map the customer intent, not your org chart** — Don't build the menu around your departments. Build it around why customers call. "Track my order" is better than "Operations department."
2. **Keep menus shallow** — Maximum 4–5 options per level. Maximum 2 levels deep. Callers don't remember option 6.
3. **Always offer escape routes** — "Press 0 for an agent" should be available at every level.
4. **Read options before the key** — Say "For billing, press 2" not "Press 2 for billing." Callers listen for their intent, then remember the key.
5. **Time out gracefully** — If the caller doesn't press anything, don't just replay the menu. Offer to connect them with an agent.

## Building an IVR with Asterisk Dialplan

Asterisk uses a dialplan in \`/etc/asterisk/extensions.conf\`. Here's a basic IVR:

\`\`\`ini
[ivr-main]
; Answer the call
exten => s,1,Answer()
same => n,Wait(1)

; Play the main menu greeting
same => n,Background(ivr/main-menu)
same => n,WaitExten(5)

; Timeout — offer agent
exten => t,1,Goto(agent-queue,s,1)

; Invalid input
exten => i,1,Playback(ivr/invalid-option)
same => n,Goto(ivr-main,s,3)

; Option 1: Sales
exten => 1,1,Playback(ivr/connecting-sales)
same => n,Goto(sales-queue,s,1)

; Option 2: Support
exten => 2,1,Playback(ivr/connecting-support)
same => n,Goto(support-queue,s,1)

; Option 3: Billing
exten => 3,1,Playback(ivr/connecting-billing)
same => n,Goto(billing-queue,s,1)

; Option 0: Agent
exten => 0,1,Goto(agent-queue,s,1)
\`\`\`

The \`Background()\` application plays a sound file while listening for DTMF input. \`WaitExten(5)\` gives the caller 5 seconds to press a key before triggering the timeout extension.

### Recording Prompts

Record prompts at 8kHz, 16-bit mono (the native format for PSTN calls):

\`\`\`bash
# Using SoX to convert a studio recording to Asterisk format
sox input.wav -r 8000 -c 1 -e signed-integer -b 16 output.wav
\`\`\`

Place recordings in \`/var/lib/asterisk/sounds/ivr/\`. Reference them without the extension in the dialplan: \`Background(ivr/main-menu)\` plays \`/var/lib/asterisk/sounds/ivr/main-menu.wav\`.

## Building an IVR with FreeSWITCH

FreeSWITCH uses Lua, JavaScript, or XML macros for IVR logic. Here's a Lua IVR script:

\`\`\`lua
-- /usr/share/freeswitch/scripts/ivr_main.lua

session:answer()
session:sleep(1000)

local choice = session:playAndGetDigits(
  1,           -- min digits
  1,           -- max digits
  3,           -- max tries
  5000,        -- timeout (ms)
  "#",         -- terminator
  "ivr/main-menu",  -- prompt file
  "ivr/invalid-option",  -- bad input file
  "1-3|0"      -- valid digits regex
)

if choice == "1" then
  session:transfer("sales_queue", "XML", "default")
elseif choice == "2" then
  session:transfer("support_queue", "XML", "default")
elseif choice == "3" then
  session:transfer("billing_queue", "XML", "default")
elseif choice == "0" then
  session:transfer("agent_queue", "XML", "default")
else
  session:transfer("agent_queue", "XML", "default")
end
\`\`\`

\`playAndGetDigits\` handles the prompt playback, retry logic, and input collection in one call — simpler than the equivalent Asterisk dialplan.

## Building an IVR with Twilio

Twilio uses TwiML (XML) served from your web endpoint. When a call arrives, Twilio makes an HTTP request to your URL and executes the TwiML response:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="1" action="/ivr/handle-input" timeout="5">
    <Say voice="Polly.Joanna">
      Thank you for calling Voxmation. 
      For sales, press 1. 
      For support, press 2. 
      For billing, press 3. 
      To speak with an agent, press 0.
    </Say>
  </Gather>
  <!-- No input fallback -->
  <Redirect>/ivr/agent</Redirect>
</Response>
\`\`\`

Your \`/ivr/handle-input\` endpoint receives the \`Digits\` POST parameter and returns the appropriate TwiML:

\`\`\`javascript
// Express.js handler
app.post('/ivr/handle-input', (req, res) => {
  const digit = req.body.Digits;
  const queueMap = {
    '1': 'sales',
    '2': 'support',
    '3': 'billing',
    '0': 'agent',
  };
  
  const queue = queueMap[digit] || 'agent';
  
  res.type('text/xml');
  res.send(\`
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Enqueue>\${queue}</Enqueue>
    </Response>
  \`);
});
\`\`\`

## Adding Speech Recognition to Your IVR

DTMF-only IVRs frustrate mobile callers who are driving or have accessibility needs. Adding speech recognition lets callers say their intent instead of pressing keys.

With Twilio, add the \`input\` attribute to \`<Gather>\`:

\`\`\`xml
<Gather input="speech dtmf" numDigits="1" action="/ivr/handle-input" timeout="5" speechTimeout="auto">
  <Say>How can I help you today? You can say Sales, Support, or Billing — or press 1, 2, or 3.</Say>
</Gather>
\`\`\`

The \`SpeechResult\` POST parameter will contain the transcribed input alongside \`Digits\`.

## Connecting Your IVR to a CRM

The most valuable IVR integration is CRM screen-pop: when an inbound call arrives, look up the caller's number, retrieve their account, and surface it to the agent before they pick up.

With Asterisk AGI:
\`\`\`python
#!/usr/bin/env python3
import sys, requests

agi_vars = {}
for line in sys.stdin:
    line = line.strip()
    if not line:
        break
    key, _, value = line.partition(': ')
    agi_vars[key] = value

caller_id = agi_vars.get('agi_callerid', '')
resp = requests.get(
    f'https://your-crm/v1/contacts/search?phone={caller_id}',
    headers={'Authorization': 'Bearer API_KEY'},
    timeout=2
)

if resp.ok:
    contact = resp.json()
    print(f'SET VARIABLE CONTACT_NAME {contact["name"]}')
    print(f'SET VARIABLE CONTACT_ID {contact["id"]}')
    sys.stdout.flush()
\`\`\`

With Twilio, make a server-side API call in your TwiML webhook handler before returning the response.

## Common IVR Mistakes to Avoid

1. **No timeout handling** — Always handle the case where the caller doesn't press anything.
2. **Too many options** — More than 5 options per level, and callers start hanging up.
3. **Long intros** — "Thank you for calling Voxmation, a leader in voice prompt automation solutions" wastes 8 seconds. Say "Thank you for calling Voxmation" and get to the menu.
4. **Dead ends** — Every path should either complete the customer's goal or route to an agent. No dead ends.
5. **No error recovery** — After invalid input, play "I didn't catch that" and try again — up to 3 times. Then route to an agent.
6. **Using TTS for all prompts** — TTS has improved dramatically but still sounds robotic for key messages. Record a human voice for your greeting. Use TTS for dynamic content (account numbers, appointment times).

A well-built IVR handles the majority of inbound calls without a live agent, reduces hold times, and improves caller satisfaction. The technology is proven — the results depend entirely on the call flow design and prompt quality.
    `.trim()}]},4118:(e,t,o)=>{"use strict";o.d(t,{Z:()=>i});let i=(0,o(7755).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},4653:(e,t,o)=>{"use strict";o.d(t,{Z:()=>i});let i=(0,o(7755).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])}};