import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const CAREERS_DIR = path.join(process.cwd(), "src/data/careers");
const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const files = fs.readdirSync(CAREERS_DIR).filter((f) => f.endsWith(".json"));
  const blueprints = files.map((f) => {
    const raw = fs.readFileSync(path.join(CAREERS_DIR, f), "utf-8");
    const data = JSON.parse(raw);
    const stat = fs.statSync(path.join(CAREERS_DIR, f));
    return {
      slug: data.slug,
      skill: data.skill,
      category: data.category,
      difficulty: data.difficulty,
      status: data._status ?? "published",
      updated_at: stat.mtime.toISOString(),
    };
  });

  return NextResponse.json(blueprints);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug;
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  const filePath = path.join(CAREERS_DIR, `${slug}.json`);
  if (fs.existsSync(filePath)) return NextResponse.json({ error: "Blueprint already exists" }, { status: 409 });

  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true, slug });
}
