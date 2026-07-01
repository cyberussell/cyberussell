import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabaseAdmin";
import crypto from "crypto";

const SESSION_NAME = "mc-session";
const LEGACY_PASSWORD = process.env.MISSION_CONTROL_PASSWORD ?? "";

async function getSessionUsername(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_NAME)?.value;
  if (!token) return null;

  const db = getAdminClient();
  const { data } = await db.from("mc_sessions").select("username").eq("token", token).single();
  return data?.username ?? null;
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  const username = await getSessionUsername();
  if (!username) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword) return NextResponse.json({ error: "Both fields required" }, { status: 400 });
  if (newPassword.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

  const db = getAdminClient();
  const { data: user } = await db.from("mc_users").select("id, password_hash").eq("username", username).single();

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const currentHash = hashPassword(currentPassword);
  if (user.password_hash !== currentHash) return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });

  const { error } = await db.from("mc_users").update({ password_hash: hashPassword(newPassword) }).eq("id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
