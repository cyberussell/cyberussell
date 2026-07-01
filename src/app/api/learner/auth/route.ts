import { NextRequest, NextResponse } from "next/server";
import { createLearner, createSessionToken, verifySessionToken, getLearner } from "@/lib/learnerAuth";

const SESSION_COOKIE = "learner-session";
const COOKIE_OPTS = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 30 };

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  if (action === "register") {
    const { name, email } = body;
    if (!name?.trim() || !email?.trim()) return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    const learner = await createLearner(name.trim(), email.trim().toLowerCase(), "", "email");
    const token = createSessionToken(learner.id);
    const res = NextResponse.json({ ok: true, learner });
    res.cookies.set(SESSION_COOKIE, token, COOKIE_OPTS);
    return res;
  }

  if (action === "google_token") {
    const { name, email, avatar } = body;
    if (!email) return NextResponse.json({ error: "No email provided" }, { status: 400 });
    const learner = await createLearner(name || email, email, avatar || "", "google");
    const token = createSessionToken(learner.id);
    const res = NextResponse.json({ ok: true, learner });
    res.cookies.set(SESSION_COOKIE, token, COOKIE_OPTS);
    return res;
  }

  if (action === "google") {
    const { credential } = body;
    if (!credential) return NextResponse.json({ error: "No credential" }, { status: 400 });
    try {
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
      if (!verifyRes.ok) return NextResponse.json({ error: "Invalid Google credential" }, { status: 401 });
      const googleUser = await verifyRes.json();
      if (!googleUser.email) return NextResponse.json({ error: "No email from Google" }, { status: 400 });
      const learner = await createLearner(googleUser.name || googleUser.email, googleUser.email, googleUser.picture || "", "google");
      const token = createSessionToken(learner.id);
      const res = NextResponse.json({ ok: true, learner });
      res.cookies.set(SESSION_COOKIE, token, COOKIE_OPTS);
      return res;
    } catch {
      return NextResponse.json({ error: "Google auth failed" }, { status: 500 });
    }
  }

  if (action === "facebook") {
    const { accessToken, userID } = body;
    if (!accessToken || !userID) return NextResponse.json({ error: "No access token" }, { status: 400 });
    try {
      const fbRes = await fetch(`https://graph.facebook.com/${userID}?fields=name,email,picture&access_token=${accessToken}`);
      if (!fbRes.ok) return NextResponse.json({ error: "Invalid Facebook token" }, { status: 401 });
      const fbUser = await fbRes.json();
      if (!fbUser.email) return NextResponse.json({ error: "No email from Facebook. Enable email permission." }, { status: 400 });
      const learner = await createLearner(fbUser.name || fbUser.email, fbUser.email, fbUser.picture?.data?.url || "", "facebook");
      const token = createSessionToken(learner.id);
      const res = NextResponse.json({ ok: true, learner });
      res.cookies.set(SESSION_COOKIE, token, COOKIE_OPTS);
      return res;
    } catch {
      return NextResponse.json({ error: "Facebook auth failed" }, { status: 500 });
    }
  }

  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ learner: null });
  const id = verifySessionToken(token);
  if (!id) return NextResponse.json({ learner: null });
  const learner = await getLearner(id);
  return NextResponse.json({ learner });
}
