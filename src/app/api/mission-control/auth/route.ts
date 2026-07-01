import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { getAdminClient } from "@/lib/supabaseAdmin";

const LEGACY_PASSWORD = process.env.MISSION_CONTROL_PASSWORD ?? "";
const SESSION_NAME = "mc-session";

function hashPassword(p: string) {
  return crypto.createHash("sha256").update(p).digest("hex");
}

function createToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();

  if (action === "logout") {
    const jar = await cookies();
    const token = jar.get(SESSION_NAME)?.value;
    jar.delete(SESSION_NAME);
    if (token) {
      const db = getAdminClient();
      await db.from("mc_sessions").delete().eq("token", token);
    }
    return NextResponse.json({ ok: true });
  }

  if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 });

  const db = getAdminClient();

  // Try Supabase users first
  const { data: user } = await db
    .from("mc_users")
    .select("id, username, password_hash")
    .eq("password_hash", hashPassword(password))
    .single();

  // Fall back to legacy env-var password (treated as "russell" admin)
  const isLegacy = !user && password === LEGACY_PASSWORD && LEGACY_PASSWORD !== "";

  if (!user && !isLegacy) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createToken();
  const username = user?.username ?? "russell";

  await db.from("mc_sessions").insert({ token, username });

  const jar = await cookies();
  jar.set(SESSION_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const session = jar.get(SESSION_NAME);
  return NextResponse.json({ authenticated: !!session?.value });
}
