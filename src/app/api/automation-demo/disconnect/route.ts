import { NextResponse } from "next/server";
import { revokeToken } from "@/lib/automation-demo/google";
import { clearSession, getSession } from "@/lib/automation-demo/session";

export async function POST() {
  const session = await getSession();
  if (session) await revokeToken(session.accessToken);
  await clearSession();
  return NextResponse.json({ ok: true });
}
