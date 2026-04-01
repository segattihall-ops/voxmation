export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-a-self-hosted-crm",
    title: "What Is a Self-Hosted CRM? A Complete Guide for 2025",
    description:
      "Self-hosted CRMs give businesses full control over their customer data. Learn what self-hosted CRM means, why companies choose it over SaaS, and how to get started.",
    date: "2025-03-15",
    readTime: "8 min read",
    content: `
## What Is a Self-Hosted CRM?

A **self-hosted CRM** is customer relationship management software that you install and run on your own infrastructure — your servers, your cloud account, your data center. Unlike SaaS CRMs (HubSpot, Salesforce, Zoho), the application and its data live on hardware you control.

The CRM vendor provides the software (often open source), and you provide the compute. You're responsible for deployment, backups, and uptime — but you're also the only party with access to your data.

## Why Do Companies Choose Self-Hosted CRM?

### 1. Full data ownership

When you use a SaaS CRM, your customer data lives on the vendor's servers. You're subject to their data retention policies, their breach liability, and their decisions about data sharing with third parties. With a self-hosted CRM, your customer records never leave your infrastructure.

This matters enormously for:
- **Regulated industries** (healthcare, finance, legal) where data residency rules apply
- **B2B companies** with enterprise customers who require data sovereignty clauses
- **European companies** navigating GDPR's data transfer restrictions
- **Any business** that considers customer data a competitive asset

### 2. No per-user pricing

SaaS CRM pricing scales with your headcount. HubSpot's Sales Hub Pro runs over $90/user/month. For a 25-person team, that's $27,000/year — before add-ons. Salesforce is similar.

Self-hosted CRMs like Voxmation OS are free to deploy. Your cost is compute: a $20/month VPS is enough for most small teams. Unlimited users, unlimited records, no overage charges.

### 3. No vendor lock-in

SaaS vendors can change pricing, deprecate features, or be acquired. When your CRM is a cloud service, you're betting your business processes on the vendor's roadmap.

With a self-hosted CRM, you can freeze the version you depend on, fork the code for custom requirements, and migrate to a different system on your own timeline.

### 4. Customization without limits

Open-source self-hosted CRMs can be modified at the code level. Need a custom field type, an integration with an internal system, or a workflow that doesn't exist in the UI? Fork the repository, write the code, deploy the change.

SaaS CRMs offer configuration within guardrails. Self-hosted CRMs offer full source access.

## What Does Self-Hosting Require?

Self-hosting isn't free in time. You'll need:

- **A Linux server** (VPS, bare metal, or cloud VM) — typically $10–$50/month
- **A database** — PostgreSQL is standard; managed offerings like Amazon RDS or Supabase reduce ops overhead
- **Basic DevOps knowledge** — Docker Compose makes deployment approachable; Kubernetes for multi-node setups
- **Backup and monitoring discipline** — you're responsible for data safety

For many businesses, this tradeoff is clear: the savings from eliminating per-seat SaaS fees far exceed the ops cost, and the data control benefit is non-negotiable.

## What Should a Self-Hosted CRM Include?

At a minimum, a production-grade self-hosted CRM should include:

- **Core CRM entities**: Leads, Contacts, Accounts, Opportunities
- **Pipeline management**: Customizable stages, weighted forecasting
- **Activity tracking**: Calls, emails, notes, tasks
- **REST API**: For integrations and automation
- **Authentication and RBAC**: JWT auth, role-based permissions
- **Audit logging**: Immutable record of who changed what

Voxmation OS goes further by including **built-in telephony** (Asterisk/FreeSWITCH/Twilio), **delivery ops** (projects and tasks), **billing**, and a **webhook integration hub** — all in a single deployable stack.

## Getting Started with a Self-Hosted CRM

The fastest path to a self-hosted CRM in 2025:

1. **Choose your stack** — Voxmation OS (Node.js/TypeScript/Postgres) is a strong starting point. It's MIT licensed and actively maintained.
2. **Pick a deployment target** — A $20 DigitalOcean or Hetzner VPS is enough for most small teams.
3. **Deploy with Docker Compose** — Clone the repository, configure your environment variables, and run \`docker compose up\`.
4. **Connect your telephony** — Configure your Asterisk SIP trunk or Twilio credentials.
5. **Import your existing data** — Most CRMs export to CSV; Voxmation OS supports bulk import with field mapping.

Self-hosting your CRM isn't as complex as it once was. With modern tooling and a well-documented open-source stack, you can go from zero to a fully operational CRM in under an hour.
    `.trim(),
  },
  {
    slug: "hubspot-vs-open-source-crm-true-cost",
    title: "HubSpot vs Open-Source CRM: The True Cost Comparison (2025)",
    description:
      "HubSpot's free tier is a starting point, not a destination. We break down the real cost of HubSpot vs self-hosting an open-source CRM like Voxmation OS — including hidden fees, telephony costs, and the cost of lock-in.",
    date: "2025-03-20",
    readTime: "10 min read",
    content: `
## HubSpot vs Open-Source CRM: What Does It Actually Cost?

HubSpot markets itself as free. And it is — until it isn't. The free tier strips out most features useful for actual sales teams: no sequences, no custom reporting, no forecasting, limited integrations. Once you need those, you're looking at HubSpot Sales Hub Starter ($15/user/month) or Pro ($90/user/month).

Let's do the math honestly.

## HubSpot Cost Breakdown (25-user team)

### Sales Hub Professional: $90/user/month
- 25 users × $90 = **$2,250/month** ($27,000/year)

### Required add-ons
- HubSpot calling (basic): included, but limited to 500 minutes/user/month. For a team making 50+ calls/day, you'll hit this.
- Calling minutes overage: $0.02–$0.05/minute
- HubSpot Service Hub (for support ticketing): $90/user/month additional

### Telephony is the killer

HubSpot doesn't have native telephony. It has a basic calling feature that uses VoIP minutes. For real sales teams with high call volume — especially those with existing Asterisk/SIP infrastructure — HubSpot requires a third-party CTI integration (Aircall, JustCall, Dialpad), which runs **$70–$100/user/month** on top of HubSpot.

That's **$160–$190/user/month** for HubSpot + telephony for a power sales team.

**25 users × $175/month average = $4,375/month = $52,500/year.**

### HubSpot hidden costs
- **Onboarding fees**: HubSpot often requires paid onboarding ($3,000–$6,000)
- **API limits**: Higher tiers required for high-volume API usage
- **Data storage**: Extra fees for large contact databases
- **Lock-in migration cost**: When you eventually want to leave, exporting and migrating CRM data is a project

## Open-Source CRM (Voxmation OS) Cost Breakdown (25-user team)

### Software: $0
MIT licensed. No per-user fees. No feature gates.

### Infrastructure: ~$40–$100/month
- $20–$40: VPS or cloud VM (DigitalOcean Droplet, Hetzner Cloud) or managed PostgreSQL
- $20–$60: Optional managed database (RDS, Supabase, Neon) for zero-ops DB management

### Telephony: Own your PBX or use Twilio
- **With existing Asterisk/FreeSWITCH**: Cost of existing hardware (already paid) + SIP trunk minutes ($0.005–$0.015/minute from carriers like Twilio, Telnyx, or Vonage)
- **Twilio as PSTN gateway**: ~$0.013/minute for US calls. For 10,000 minutes/month: $130/month
- **No per-user telephony seat fees** — your Asterisk handles any number of simultaneous calls

### DevOps overhead
The honest cost: some engineering time. For a company with any technical staff, Docker Compose deployment and basic Linux administration is a few hours initially, then negligible ongoing maintenance.

If you need to hire a managed hosting service or DevOps consultant: **$200–$500/month** for fully managed self-hosted CRM is still far less than SaaS pricing at scale.

## 3-Year Total Cost of Ownership

| | HubSpot Pro + Telephony | Voxmation OS (self-hosted) |
|--|--|--|
| Software licenses | $52,500/year | $0 |
| Infrastructure | $0 | $1,200/year |
| Telephony (Twilio) | Included above | $1,560/year |
| **Year 1 total** | **$52,500** | **$2,760** |
| **3-year total** | **$157,500** | **$8,280** |

**Savings at 3 years: $149,220** — for a 25-person team.

## The Lock-In Cost

HubSpot's most underappreciated cost is lock-in. Your contacts, deal history, call logs, custom fields, and pipeline configuration live in HubSpot's database. Migrating out requires:
- Exporting records (limited by what HubSpot allows you to export)
- Rebuilding custom field mappings in the new system
- Re-importing historical data with often incomplete field coverage
- Re-creating sequences, automations, and integrations

Industry estimates put CRM migrations at **2–6 months of engineering time** for a company with mature HubSpot data. At $150/hour engineering cost, that's $50,000–$150,000 in migration cost — often not counted in TCO comparisons.

With Voxmation OS, your data is in a PostgreSQL database you control. Migration out is a SQL export. No vendor permission required.

## When HubSpot Still Makes Sense

HubSpot wins on:
- **Ease of use for non-technical teams**: No deployment, no ops, polished UX
- **Ecosystem and integrations**: 1,000+ native integrations vs. Voxmation OS's webhook-based approach
- **Marketing Hub**: Email sequences, landing pages, forms — Voxmation OS doesn't target marketing automation today

If your team is non-technical and you value the full HubSpot ecosystem, the premium may be worth it. But if you have technical staff, high call volume, existing telephony infrastructure, or simply want to own your data — the math strongly favors self-hosting.

## The Bottom Line

HubSpot is excellent software with a real cost. For a 25-person team over 3 years, self-hosting Voxmation OS saves approximately **$149,000** compared to HubSpot Sales Hub Pro with telephony.

More importantly: you own your data, you're not subject to annual price increases, and you're not a migration project away from vendor independence.
    `.trim(),
  },
  {
    slug: "integrate-telephony-with-crm",
    title: "How to Integrate Telephony with Your CRM (Asterisk, FreeSWITCH, and Twilio)",
    description:
      "A technical guide to integrating voice calling with your CRM. Covers SIP trunk setup, Asterisk AGI and AMI integration, Twilio webhooks, call logging, and recording storage.",
    date: "2025-03-25",
    readTime: "12 min read",
    content: `
## How to Integrate Telephony with Your CRM

Integrating telephony with a CRM is one of the highest-leverage things a sales or support team can do. When calls are logged automatically, recordings are linked to contact records, and inbound calls trigger screen-pops — agents spend less time on admin and more time talking.

But most CRM telephony integrations are shallow: a third-party dialer bolted on via a Chrome extension, with limited data flowing between systems. This guide covers how to build a deep, native telephony integration — using Asterisk, FreeSWITCH, or Twilio as the telephony backend.

## Architecture Overview

A CRM-telephony integration has four main components:

1. **PBX** (Asterisk, FreeSWITCH, or Twilio) — handles call signaling and audio
2. **CRM** — stores contact records, call logs, and recordings
3. **Integration layer** — the bridge between PBX events and CRM events
4. **Client UI** — the agent's interface for seeing screen-pops and initiating click-to-call

Voxmation OS implements all four natively. This guide explains the integration patterns so you can understand what's happening — or replicate it with your own CRM.

## Option 1: Asterisk Integration via AMI and AGI

### Asterisk Manager Interface (AMI)

AMI is a TCP/IP event stream from Asterisk that reports real-time events: calls placed, answered, hung up, transferred, etc.

Your integration layer connects to AMI on port 5038, authenticates, and subscribes to events:

\`\`\`
Action: Login
Username: crm-integration
Secret: your-ami-secret
Events: call
\`\`\`

On each \`Hangup\` event, you get:
- \`Channel\`: the SIP channel (e.g., SIP/1001-00000001)
- \`CallerID\`: the calling number
- \`Duration\`: call duration in seconds
- \`BillableSeconds\`: connected time

Your integration layer maps the CallerID to a CRM contact, creates a call log record, and attaches metadata.

### Asterisk Gateway Interface (AGI)

AGI lets you execute arbitrary scripts during call flow — before it rings, during the call, or after hangup. Use AGI for:
- **CRM lookup**: Before ringing an agent, look up the caller's number in the CRM and attach the contact ID to the call
- **IVR-to-CRM mapping**: If a caller selected menu option 2 (Support), tag the call log with "support" in the CRM
- **Post-call disposition**: After hangup, trigger an AGI script that marks the lead as "contacted" in the CRM

A minimal AGI script in Python:

\`\`\`python
#!/usr/bin/env python3
import sys
import requests

# Read AGI environment variables
agi_vars = {}
while True:
    line = sys.stdin.readline().strip()
    if not line:
        break
    key, _, value = line.partition(': ')
    agi_vars[key] = value

caller_id = agi_vars.get('agi_callerid', '')

# Look up caller in CRM
response = requests.get(
    f'https://your-crm.internal/v1/contacts/search?phone={caller_id}',
    headers={'Authorization': 'Bearer your-api-key'}
)

if response.ok:
    contact = response.json()
    # Set a channel variable for later use
    print(f'SET VARIABLE CRM_CONTACT_ID {contact["id"]}')
    sys.stdout.flush()

print('HANGUP')
sys.stdout.flush()
\`\`\`

## Option 2: FreeSWITCH Integration via ESL

FreeSWITCH uses the Event Socket Library (ESL) — similar to Asterisk AMI but with a different event format. Connect on port 8021:

\`\`\`
auth ClueCon
events plain CHANNEL_CREATE CHANNEL_ANSWER CHANNEL_HANGUP_COMPLETE
\`\`\`

On \`CHANNEL_HANGUP_COMPLETE\` events, you get the full call record including duration, direction, and disposition. Your integration layer processes this and writes to the CRM.

FreeSWITCH also supports Lua, JavaScript, and Python scripts in the call flow for real-time CRM lookups, similar to Asterisk AGI.

## Option 3: Twilio Webhooks

Twilio is the simplest integration path if you don't have an on-premises PBX. You configure a webhook URL in your Twilio phone number settings, and Twilio POSTs call events to your endpoint:

\`\`\`
POST /webhooks/twilio/voice
Content-Type: application/x-www-form-urlencoded

CallSid=CA...&CallStatus=completed&CallDuration=142&From=+15551234567&To=+15559876543
\`\`\`

Voxmation OS handles this with the \`/v1/voice/webhook\` endpoint. It:
1. Validates the Twilio request signature (HMAC-SHA1 with your auth token)
2. Looks up the \`From\` number against CRM contacts
3. Creates a call log with duration and disposition
4. If recording is enabled, stores the recording URL and triggers transcription

### TwiML for Call Recording

To capture recordings, return TwiML with \`<Record>\` in your webhook response:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Record maxLength="3600" recordingStatusCallback="/webhooks/twilio/recording" />
  <Dial>+15558887777</Dial>
</Response>
\`\`\`

Twilio POSTs the recording URL to your \`recordingStatusCallback\` endpoint when the recording is ready.

## Call Recording Storage

Regardless of telephony backend, recordings should be stored separately from the CRM database:

- **Self-hosted**: Store MP3/WAV files on a local filesystem or S3-compatible object store (MinIO, Backblaze B2)
- **Cloud**: S3 or Google Cloud Storage, with pre-signed URLs for playback
- **Reference in CRM**: Store only the storage URL in the call log record — not the binary

For retention policy, implement a scheduled job that deletes recordings older than your configured retention window and updates the call log to reflect deletion.

## Transcription Pipeline

Once a recording is stored, transcription is straightforward with Whisper (local, free) or Deepgram (API, $0.0043/minute):

**Whisper (local)**:
\`\`\`bash
whisper recording.mp3 --model medium --output_format txt
\`\`\`

**Deepgram (API)**:
\`\`\`bash
curl -X POST https://api.deepgram.com/v1/listen \\
  -H "Authorization: Token your-key" \\
  -H "Content-Type: audio/mp3" \\
  --data-binary @recording.mp3
\`\`\`

Write the transcript to the call log record in the CRM. Index it for full-text search so agents can search "find all calls where the customer mentioned pricing."

## Click-to-Call from CRM

The final piece: initiating calls from the CRM UI.

With Asterisk AMI:
\`\`\`
Action: Originate
Channel: SIP/1001
Exten: +15551234567
Context: from-internal
Priority: 1
CallerID: "CRM Click-to-Call" <+15558887777>
Variable: CRM_CONTACT_ID=contact-uuid
\`\`\`

With Twilio:
\`\`\`bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/$SID/Calls.json \\
  -d "From=+15558887777&To=+15551234567&Url=https://your-crm.com/twiml/outbound" \\
  -u "$SID:$AUTH_TOKEN"
\`\`\`

Voxmation OS exposes a \`POST /v1/voice/calls\` endpoint that wraps either mechanism. The CRM UI calls this endpoint when an agent clicks a phone number.

## Putting It Together

A complete telephony-CRM integration logs every call automatically, stores recordings with retention controls, surfaces transcriptions inline with contact records, and lets agents initiate calls without leaving the CRM.

Voxmation OS ships all of this natively. If you're building your own integration on top of an existing CRM, the patterns above give you the architectural building blocks.
    `.trim(),
  },
];
