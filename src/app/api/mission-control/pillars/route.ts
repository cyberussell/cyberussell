import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const PILLARS_DIR = path.join(process.cwd(), "src/data/pillars");
const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

function ensureDir() {
  if (!fs.existsSync(PILLARS_DIR)) fs.mkdirSync(PILLARS_DIR, { recursive: true });
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  ensureDir();

  const files = fs.readdirSync(PILLARS_DIR).filter((f) => f.endsWith(".json"));
  const pillars = files.map((f) => {
    const raw = fs.readFileSync(path.join(PILLARS_DIR, f), "utf-8");
    const data = JSON.parse(raw);
    const stat = fs.statSync(path.join(PILLARS_DIR, f));
    return {
      slug: data.slug,
      name: data.name,
      difficulty: data.difficulty,
      status: data._status ?? "draft",
      module_count: Array.isArray(data.modules) ? data.modules.length : 0,
      updated_at: stat.mtime.toISOString(),
    };
  });

  return NextResponse.json(pillars);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  ensureDir();

  const body = await req.json();
  const slug = body.slug;
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  const filePath = path.join(PILLARS_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) return NextResponse.json({ error: "Pillar already exists" }, { status: 409 });

  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true, slug });
}
