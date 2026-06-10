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
    slug: "how-much-missed-calls-cost-service-business",
    title: "How Much Do Missed Calls Really Cost a Service Business?",
    description:
      "Service businesses miss roughly 1 in 4 inbound calls — and most callers never leave a voicemail. Here's how to calculate what those missed calls cost you, and how to win them back.",
    date: "2026-01-12",
    readTime: "7 min read",
    content: `
## The hidden leak in every service business

Most HVAC, plumbing, and electrical businesses spend heavily to make the phone ring — Google Ads, Local Services Ads, trucks wrapped in branding, Nextdoor reviews. Then, on the busiest days, that phone rings while the crew is elbow-deep in a job, and nobody picks up.

Industry data consistently shows that service businesses miss **20–30% of inbound calls**, and the busier you are, the more you miss. Worse: studies of caller behavior find that **most people who reach a voicemail simply hang up and call the next business** on the search results page.

A missed call isn't a "we'll call them back later" problem. It's a lead you already paid for, walking straight to your competitor.

## The simple math of a missed call

You can estimate the revenue you lose to missed calls with four numbers:

- **Missed calls per month** — how many inbound calls go unanswered
- **Average job value** — your average ticket for a closed job
- **Close rate** — the share of qualified callers who become customers
- **Recovery rate** — how many missed callers you could win back if you responded fast

The formula is straightforward:

> **Lost revenue = Missed calls × Average job value × Close rate**

### A worked example

Take a refrigeration and HVAC business in peak season:

- Missed calls per month: **20**
- Average job value: **$450**
- Close rate: **35%**

That's 20 × $450 × 0.35 = **$3,150 in lost revenue every month** — over **$37,000 a year** — from calls that never got answered.

## Why "call them back" doesn't work

By the time you finish the job, drive to the next one, and remember to return calls, the customer has already booked someone else. Speed-to-lead research is brutally consistent: **the business that responds first usually wins the job.** Returning a call two hours later puts you in second or third place — if you place at all.

## How to actually recover missed-call revenue

There are three levers:

1. **Answer more calls in the first place.** An AI receptionist answers every call in under two seconds, 24/7, so the call is never missed even when your team is busy or it's after hours.
2. **Text back the ones you still miss.** Missed-call textback sends an instant SMS to any unanswered caller, so the conversation continues even if no one could pick up.
3. **Qualify and book automatically.** Capturing the caller's name, service, and urgency — and booking the appointment on the spot — turns a recovered call into revenue, not just a callback.

Applying even a conservative **60% recovery rate** to that $3,150/month example brings back roughly **$1,890 every month** — far more than the cost of the system doing the recovering.

## The takeaway

Missed calls are the most expensive, least visible leak in a service business. You can't manage what you don't measure — so start by calculating your own number, then close the gap with instant answering and missed-call textback.
    `.trim(),
  },
  {
    slug: "missed-call-textback-how-it-works",
    title: "Missed Call Textback: How It Works and Why It Recovers Leads",
    description:
      "Missed call textback automatically sends an SMS to callers you couldn't answer. Here's how it works, why it converts, and how to set it up for a service business.",
    date: "2026-01-20",
    readTime: "6 min read",
    content: `
## What is missed call textback?

**Missed call textback** is exactly what it sounds like: when someone calls your business and the call isn't answered, the system automatically sends them a text message within seconds. Instead of hitting a dead-end voicemail, the caller gets something like:

> "Hi, this is Voxmation for ACME Plumbing — sorry we missed you! How can we help? Reply here and we'll get you taken care of."

The caller can reply by text, and the conversation continues — no second phone call required.

## Why it works so well

Three reasons missed-call textback consistently outperforms voicemail:

### 1. People prefer texting

Most customers would rather text than leave a voicemail or wait on hold. A text feels low-effort and immediate. Open rates for SMS are far higher than email, and most texts are read within minutes.

### 2. It's instant

Speed-to-lead is everything. An automatic text fires in seconds — long before you'd realistically call the person back. That speed is often the difference between booking the job and losing it to the next business the customer calls.

### 3. It keeps the lead warm

Even if you can't fully handle the request by text, the lead now knows you exist, you're responsive, and you'll follow up. That dramatically increases the odds they wait for you instead of moving on.

## Where textback fits in the bigger picture

Textback is a safety net, not the whole system. The ideal flow looks like this:

1. **Answer first.** An AI receptionist answers every call in under two seconds, so most calls are handled live and never need a textback at all.
2. **Textback the rest.** For the genuinely missed calls — simultaneous calls, dropped calls, edge cases — textback catches them.
3. **Qualify and route.** The text conversation captures what the customer needs and books or routes them appropriately.
4. **Sync and follow up.** Everything lands in your CRM so nothing falls through the cracks.

## Setting it up the right way

A few things separate a textback setup that converts from one that annoys customers:

- **Respond in seconds, not minutes.** The whole value is speed.
- **Personalize the message.** Use your business name and a warm, human tone.
- **Make it two-way.** Customers should be able to reply and get a real response, not a no-reply blast.
- **Connect it to booking.** The goal is a booked job, so make it easy to schedule from the text.
- **Log every conversation.** Sync to your CRM so follow-ups and reporting actually happen.

## Bottom line

Missed-call textback is one of the highest-ROI tools a service business can add. It costs far less than the revenue from a single recovered job, and it works around the clock — turning the calls you can't answer into customers instead of lost leads.
    `.trim(),
  },
  {
    slug: "ai-receptionist-vs-answering-service",
    title: "AI Receptionist vs Answering Service: Which Is Right for Your Trade?",
    description:
      "Human answering services and AI receptionists both pick up your phone — but the cost, speed, and consistency are very different. Here's how to choose for a home-service business.",
    date: "2026-01-28",
    readTime: "8 min read",
    content: `
## Two ways to stop missing calls

If your team can't always answer the phone, you have two main options: a **human answering service** or an **AI receptionist**. Both pick up calls you'd otherwise miss, but they work very differently — and the right choice depends on your call volume, budget, and how predictable you need your costs to be.

## Human answering services

Traditional answering services (and hybrid services like Smith.ai) route your calls to live agents who take messages, qualify leads, and sometimes book appointments.

**Strengths:**
- A real human voice, which some callers prefer for sensitive or complex situations
- Good judgment on unusual or emotional calls
- Established for industries like legal and medical

**Weaknesses:**
- **Cost.** Pricing is usually per call or per minute. AI calls might run a few dollars each; live-agent calls can run $8+ each. In a busy month, the bill is unpredictable and can balloon.
- **Speed.** Even good services have a ring delay before an agent picks up, and agents juggle multiple clients.
- **Consistency.** Different agents, different scripts, variable quality.

## AI receptionists

An AI receptionist answers with a natural-sounding voice, follows your script exactly, qualifies the lead, and routes or books it — all automatically.

**Strengths:**
- **Speed.** Answers in under two seconds, every time, 24/7.
- **Predictable pricing.** Plans scale with call volume instead of charging unpredictable per-minute fees.
- **Consistency.** The same high-quality greeting and qualification on every single call.
- **Missed-call textback.** Good AI systems text back anything they can't answer, recovering even more leads.
- **Integrations.** Calls, leads, and bookings sync straight to your CRM.

**Weaknesses:**
- Very unusual or highly emotional calls may still benefit from a human — though most AI systems can warm-transfer those to a person.

## Cost: the deciding factor for most trades

For high-volume home-service businesses, cost is usually what settles it. Consider a business taking 300 calls a month:

- **Human answering service** at, say, $5–$8 per handled call = **$1,500–$2,400/month**, and rising with volume.
- **AI receptionist** on a flat, volume-based plan = a predictable monthly fee that doesn't spike in your busy season.

For HVAC, plumbing, electrical, and similar trades — where call volume surges with weather and seasons — predictable pricing and instant answering usually win.

## How to choose

Pick a **human or hybrid service** if:
- Your calls are low-volume but high-stakes and emotionally complex
- A human voice is core to your brand and you'll pay a premium for it

Pick an **AI receptionist** if:
- You have meaningful call volume and want predictable costs
- Speed-to-lead matters (it does — the fastest responder usually wins)
- You want missed-call textback, automatic booking, and CRM sync built in

## The hybrid reality

The best setups aren't either/or. An AI receptionist handles the overwhelming majority of calls instantly and consistently, recovers missed calls by text, and warm-transfers the rare call that genuinely needs a human. You get speed and predictable cost without giving up the human touch where it actually matters.
    `.trim(),
  },
];
