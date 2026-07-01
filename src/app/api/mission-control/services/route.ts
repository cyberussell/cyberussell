import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const SERVICES_DIR = path.join(process.cwd(), "src/data/services");
const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

function ensureDir() {
  if (!fs.existsSync(SERVICES_DIR)) fs.mkdirSync(SERVICES_DIR, { recursive: true });
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  ensureDir();

  const files = fs.readdirSync(SERVICES_DIR).filter((f) => f.endsWith(".json"));
  const services = files.map((f) => {
    const raw = fs.readFileSync(path.join(SERVICES_DIR, f), "utf-8");
    const data = JSON.parse(raw);
    const stat = fs.statSync(path.join(SERVICES_DIR, f));
    return {
      id: data.id,
      name: data.name,
      category: data.category,
      starting_price: data.starting_price,
      status: data.status ?? "draft",
      featured: data.featured ?? false,
      updated_at: stat.mtime.toISOString(),
    };
  });

  services.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  ensureDir();

  const body = await req.json();
  const id = body.id || `service-${Date.now()}`;
  const service = { id, ...body, created_at: new Date().toISOString() };

  fs.writeFileSync(path.join(SERVICES_DIR, `${id}.json`), JSON.stringify(service, null, 2));
  return NextResponse.json(service, { status: 201 });
}
