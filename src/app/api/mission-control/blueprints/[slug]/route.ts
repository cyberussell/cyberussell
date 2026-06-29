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

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;
  const filePath = path.join(CAREERS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const raw = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;
  const filePath = path.join(CAREERS_DIR, `${slug}.json`);
  const body = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await ctx.params;
  const filePath = path.join(CAREERS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  fs.unlinkSync(filePath);
  return NextResponse.json({ ok: true });
}
