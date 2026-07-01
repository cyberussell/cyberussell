import { cookies } from "next/headers";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const SESSION_COOKIE = "learner-session";
const SECRET = process.env.LEARNER_SESSION_SECRET ?? "cyberussell-learner-secret-2025";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SECRET_KEY!;
  return createClient(url, key);
}

export type Learner = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: string;
  created_at: string;
  last_login: string;
  completed_pillars: string[];
  assessment_scores: Record<string, number>;
  badges: { id: string; name: string; earned_at: string }[];
  certificates: { id: string; name: string; earned_at: string }[];
};

function emailToSlug(email: string): string {
  return email.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
}

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

export function createSessionToken(learnerId: string): string {
  const payload = Buffer.from(learnerId).toString("base64url");
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  if (sign(payload) !== sig) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}

export async function getSession(): Promise<Learner | null> {
  try {
    const jar = await cookies();
    const token = jar.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const learnerId = verifySessionToken(token);
    if (!learnerId) return null;
    return getLearner(learnerId);
  } catch {
    return null;
  }
}

export async function getLearner(idOrEmail: string): Promise<Learner | null> {
  const db = getAdmin();
  const field = idOrEmail.includes("@") ? "email" : "id";
  const { data } = await db.from("learners").select("*").eq(field, idOrEmail).single();
  return data ?? null;
}

export async function saveLearner(learner: Learner): Promise<void> {
  const db = getAdmin();
  learner.id = emailToSlug(learner.email);
  await db.from("learners").upsert(learner, { onConflict: "id" });
}

export async function createLearner(name: string, email: string, avatar = "", provider = "email"): Promise<Learner> {
  const existing = await getLearner(email);
  if (existing) {
    existing.last_login = new Date().toISOString();
    existing.name = name || existing.name;
    if (avatar) existing.avatar = avatar;
    await saveLearner(existing);
    return existing;
  }
  const learner: Learner = {
    id: emailToSlug(email),
    name,
    email,
    avatar,
    provider,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    completed_pillars: [],
    assessment_scores: {},
    badges: [],
    certificates: [],
  };
  await saveLearner(learner);
  return learner;
}
