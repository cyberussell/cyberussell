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

function filePath(id: string) {
  return path.join(SERVICES_DIR, `${id}.json`);
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const fp = filePath(id);
  if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(fs.readFileSync(fp, "utf-8")));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const fp = filePath(id);
  const existing = fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, "utf-8")) : {};
  const body = await req.json();
  const updated = { ...existing, ...body, id, updated_at: new Date().toISOString() };
  fs.writeFileSync(fp, JSON.stringify(updated, null, 2));
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const fp = filePath(id);
  if (!fs.existsSync(fp)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  fs.unlinkSync(fp);
  return NextResponse.json({ success: true });
}
