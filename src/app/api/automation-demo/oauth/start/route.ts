import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAuthUrl, isConfigured } from "@/lib/automation-demo/google";
import { setOauthState } from "@/lib/automation-demo/session";

export async function GET(req: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.redirect(new URL("/automation-demo?error=not_configured#demo", req.url));
  }
  const state = crypto.randomBytes(16).toString("hex");
  await setOauthState(state);
  const redirectUri = new URL("/api/automation-demo/oauth/callback", req.url).toString();
  return NextResponse.redirect(getAuthUrl(redirectUri, state));
}
