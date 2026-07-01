import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { getAdminClient } from "@/lib/supabaseAdmin";

const SESSION_NAME = "mc-session";
const CAREERS_DIR = path.join(process.cwd(), "src/data/careers");

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getAdminClient();

  // Blueprints from filesystem
  const blueprintFiles = fs.existsSync(CAREERS_DIR)
    ? fs.readdirSync(CAREERS_DIR).filter((f) => f.endsWith(".json"))
    : [];
  const blueprints = blueprintFiles.map((f) => {
    try {
      const raw = fs.readFileSync(path.join(CAREERS_DIR, f), "utf-8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }).filter(Boolean);

  const blueprintPublished = blueprints.filter((b) => (b._status ?? "published") === "published").length;
  const blueprintDraft = blueprints.filter((b) => b._status === "draft").length;

  // Pillars / Learning from Supabase
  const { data: pillars } = await db.from("pillars").select("slug, status");
  const pillarPublished = (pillars ?? []).filter((p) => p.status === "published").length;
  const pillarDraft = (pillars ?? []).filter((p) => p.status !== "published").length;

  // Services from Supabase
  const { data: services } = await db.from("services").select("id, status, updated_at").order("updated_at", { ascending: false });
  const servicePublished = (services ?? []).filter((s) => s.status === "published").length;
  const serviceDraft = (services ?? []).filter((s) => s.status === "draft").length;

  return NextResponse.json({
    blueprints: {
      total: blueprints.length,
      published: blueprintPublished,
      draft: blueprintDraft,
    },
    learning: {
      total: (pillars ?? []).length,
      published: pillarPublished,
      draft: pillarDraft,
    },
    services: {
      total: (services ?? []).length,
      published: servicePublished,
      draft: serviceDraft,
    },
  });
}
