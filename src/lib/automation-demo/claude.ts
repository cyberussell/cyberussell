import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface DraftResult {
  contactName: string;
  intent: string;
  urgency: "low" | "medium" | "high";
  subject: string;
  emailBody: string;
  proposedSlotLabel: string;
  proposedStartISO: string;
  proposedEndISO: string;
  logSummary: string;
}

export async function draftFollowUp(leadText: string, replyToEmail: string): Promise<DraftResult> {
  const now = new Date();
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1200,
    messages: [
      {
        role: "user",
        content: `You are an AI assistant that reads a raw inbound lead message and drafts a same-day follow-up. The current date/time is ${now.toISOString()}.

LEAD MESSAGE:
"""
${leadText}
"""

This is a live public demo, so the follow-up email will be sent back to the sender's own address (${replyToEmail}) rather than a third party, and a calendar invite will be proposed for the next reasonable business slot (a weekday, between 9am and 5pm, at least 2 hours from now, timezone Asia/Manila unless the message implies otherwise).

Return ONLY valid JSON, no markdown fencing, matching exactly this shape:
{
  "contactName": "best-guess name from the message, or \\"there\\" if none given",
  "intent": "one short phrase describing what they want",
  "urgency": "low" | "medium" | "high",
  "subject": "short email subject line",
  "emailBody": "the full follow-up email body, warm and specific to their message, 80-140 words, signed 'Russell'",
  "proposedSlotLabel": "human readable, e.g. 'Thursday, 2:00 PM'",
  "proposedStartISO": "ISO 8601 datetime for the proposed meeting start",
  "proposedEndISO": "ISO 8601 datetime exactly 30 minutes after start",
  "logSummary": "2-3 sentence internal note for a CRM record: who they are, what they want, urgency, and the next step"
}`,
      },
    ],
  });
  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") throw new Error("No text response from Claude");
  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Could not parse Claude's response");
  return JSON.parse(jsonMatch[0]) as DraftResult;
}
