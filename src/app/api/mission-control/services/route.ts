import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabaseAdmin";

const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

export async function GET() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getAdminClient();
  const { data, error } = await db
    .from("services")
    .select("id, service_name, category, starting_price, status, featured, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = getAdminClient();
  const id = body.id || `service-${Date.now()}`;
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("services")
    .insert({
      id,
      service_name: body.name || body.service_name || "Untitled Service",
      slug: body.slug || id,
      category: body.category || "",
      short_description: body.short_description || "",
      product_brief: body.product_brief || "",
      starting_price: body.starting_price || "",
      estimated_timeline: body.timeline || body.estimated_timeline || "",
      status: body.status || "draft",
      featured: body.featured ?? false,
      icon: body.icon || "",
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
