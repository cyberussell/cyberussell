import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "automation-demo-session";
const STATE_COOKIE = "automation-demo-oauth-state";
const ALGORITHM = "aes-256-gcm";

export interface DemoSession {
  accessToken: string;
  email: string;
  expiresAt: number;
}

function encryptionKey(): Buffer {
  const secret = process.env.AUTOMATION_DEMO_SESSION_SECRET;
  if (!secret) throw new Error("AUTOMATION_DEMO_SESSION_SECRET is not set");
  return crypto.createHash("sha256").update(secret).digest();
}

function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

function decrypt(payload: string): string | null {
  try {
    const buf = Buffer.from(payload, "base64url");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const encrypted = buf.subarray(28);
    const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}

export async function setSession(session: DemoSession): Promise<void> {
  const jar = await cookies();
  const maxAge = Math.max(60, Math.floor((session.expiresAt - Date.now()) / 1000));
  jar.set(SESSION_COOKIE, encrypt(JSON.stringify(session)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function getSession(): Promise<DemoSession | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const decrypted = decrypt(raw);
  if (!decrypted) return null;
  try {
    const session = JSON.parse(decrypted) as DemoSession;
    if (!session.accessToken || session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function setOauthState(state: string): Promise<void> {
  const jar = await cookies();
  jar.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
}

export async function consumeOauthState(): Promise<string | null> {
  const jar = await cookies();
  const value = jar.get(STATE_COOKIE)?.value ?? null;
  jar.delete(STATE_COOKIE);
  return value;
}
