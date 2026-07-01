import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const SESSION_NAME = "mc-session";

function getAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);
}

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getAdmin();
  const { data, error } = await db.from("pillars").select("slug, data, status, updated_at").order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const pillars = (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.data?.name,
    difficulty: row.data?.difficulty,
    status: row.status,
    module_count: Array.isArray(row.data?.modules) ? row.data.modules.length : 0,
    updated_at: row.updated_at,
  }));

  return NextResponse.json(pillars);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { slug } = body;
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  const db = getAdmin();
  const { data: existing } = await db.from("pillars").select("slug").eq("slug", slug).single();
  if (existing) return NextResponse.json({ error: "Pillar already exists" }, { status: 409 });

  const { error } = await db.from("pillars").insert({ slug, data: body, status: body._status ?? "draft" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, slug });
}
