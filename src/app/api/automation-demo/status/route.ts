import { NextResponse } from "next/server";
import { isConfigured } from "@/lib/automation-demo/google";
import { getSession } from "@/lib/automation-demo/session";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({
    configured: isConfigured(),
    connected: Boolean(session),
    email: session?.email,
  });
}
