import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const LEARNERS_DIR = path.join(process.cwd(), "src/data/learners");
const SESSION_COOKIE = "learner-session";
const SECRET = process.env.LEARNER_SESSION_SECRET ?? "cyberussell-learner-secret-2025";

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

export function ensureLearnersDir() {
  if (!fs.existsSync(LEARNERS_DIR)) fs.mkdirSync(LEARNERS_DIR, { recursive: true });
}

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

export function getLearner(idOrEmail: string): Learner | null {
  ensureLearnersDir();
  const slug = idOrEmail.includes("@") ? emailToSlug(idOrEmail) : idOrEmail;
  const filePath = path.join(LEARNERS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Learner;
}

export function saveLearner(learner: Learner): void {
  ensureLearnersDir();
  const slug = emailToSlug(learner.email);
  learner.id = slug;
  const filePath = path.join(LEARNERS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(learner, null, 2), "utf-8");
}

export function createLearner(name: string, email: string, avatar = "", provider = "email"): Learner {
  const existing = getLearner(email);
  if (existing) {
    existing.last_login = new Date().toISOString();
    existing.name = name || existing.name;
    if (avatar) existing.avatar = avatar;
    saveLearner(existing);
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
  saveLearner(learner);
  return learner;
}
