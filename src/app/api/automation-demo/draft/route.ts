import { NextRequest, NextResponse } from "next/server";
import { draftFollowUp } from "@/lib/automation-demo/claude";
import { getSession } from "@/lib/automation-demo/session";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not connected to Google" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const leadText = typeof body?.leadText === "string" ? body.leadText.trim() : "";
  if (leadText.length < 5) {
    return NextResponse.json({ error: "leadText is required" }, { status: 400 });
  }

  try {
    const draft = await draftFollowUp(leadText.slice(0, 4000), session.email);
    return NextResponse.json(draft);
  } catch {
    return NextResponse.json({ error: "Draft generation failed" }, { status: 500 });
  }
}
