import { NextRequest, NextResponse } from "next/server";
import { exchangeCode } from "@/lib/automation-demo/google";
import { consumeOauthState, setSession } from "@/lib/automation-demo/session";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = await consumeOauthState();

  const dest = new URL("/automation-demo", req.url);
  dest.hash = "demo";

  if (!code || !state || !expectedState || state !== expectedState) {
    dest.searchParams.set("error", "oauth_failed");
    return NextResponse.redirect(dest);
  }

  try {
    const redirectUri = new URL("/api/automation-demo/oauth/callback", req.url).toString();
    const { accessToken, email, expiresAt } = await exchangeCode(code, redirectUri);
    await setSession({ accessToken, email, expiresAt });
    dest.searchParams.set("connected", "1");
  } catch {
    dest.searchParams.set("error", "oauth_failed");
  }
  return NextResponse.redirect(dest);
}
