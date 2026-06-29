import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const PASSWORD = process.env.MISSION_CONTROL_PASSWORD ?? "";
const SESSION_NAME = "mc-session";

function createToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req: NextRequest) {
  const { password, action } = await req.json();

  if (action === "logout") {
    const jar = await cookies();
    jar.delete(SESSION_NAME);
    return NextResponse.json({ ok: true });
  }

  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createToken();
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
