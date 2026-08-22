import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent, createDriveLog, sendGmail } from "@/lib/automation-demo/google";
import { getSession } from "@/lib/automation-demo/session";

interface RunStageResult {
  ok: boolean;
  error?: string;
  messageId?: string;
  eventLink?: string;
  fileLink?: string;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not connected to Google" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const {
    contactName,
    subject,
    emailBody,
    proposedSlotLabel,
    proposedStartISO,
    proposedEndISO,
    proposedTimezone,
    logSummary,
  } = body ?? {};
  if (!subject || !emailBody || !proposedStartISO || !proposedEndISO || !logSummary) {
    return NextResponse.json({ error: "Missing draft fields" }, { status: 400 });
  }

  const result: { send: RunStageResult; schedule: RunStageResult; log: RunStageResult } = {
    send: { ok: false },
    schedule: { ok: false },
    log: { ok: false },
  };

  // Every action lands on the visitor's own account — the email is sent to
  // themselves, the event and file are created on their own Calendar/Drive.
  // This is a public demo; nothing here should ever reach a third party.

  try {
    const messageId = await sendGmail(session.accessToken, {
      to: session.email,
      subject,
      body: emailBody,
    });
    result.send = { ok: true, messageId };
  } catch (e) {
    console.error("automation-demo: send failed", e);
    result.send = { ok: false, error: e instanceof Error ? e.message : "Send failed" };
  }

  try {
    const eventLink = await createCalendarEvent(session.accessToken, {
      summary: `Follow-up: ${contactName || "Lead"}`,
      description: `${logSummary}\n\nProposed slot: ${proposedSlotLabel ?? ""}`,
      startISO: proposedStartISO,
      endISO: proposedEndISO,
      timeZone: proposedTimezone,
    });
    result.schedule = { ok: true, eventLink };
  } catch (e) {
    console.error("automation-demo: schedule failed", e);
    result.schedule = { ok: false, error: e instanceof Error ? e.message : "Schedule failed" };
  }

  try {
    const fileLink = await createDriveLog(session.accessToken, {
      title: `Lead Follow-Up — ${contactName || "Lead"} — ${new Date().toISOString().slice(0, 10)}`,
      content: `Lead: ${contactName || "Unknown"}\n\n${logSummary}\n\nEmail sent:\nSubject: ${subject}\n\n${emailBody}`,
    });
    result.log = { ok: true, fileLink };
  } catch (e) {
    console.error("automation-demo: log failed", e);
    result.log = { ok: false, error: e instanceof Error ? e.message : "Log failed" };
  }

  return NextResponse.json(result);
}
