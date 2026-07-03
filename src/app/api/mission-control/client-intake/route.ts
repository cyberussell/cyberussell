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
    .from("client_intakes")
    .select("id, client_name, business_name, service_ids, status, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = getAdminClient();
  const id = body.id || `intake-${Date.now()}`;
  const now = new Date().toISOString();

  const { data, error } = await db
    .from("client_intakes")
    .insert({
      id,
      client_name: body.client_name || "Untitled Client",
      client_email: body.client_email || "",
      client_phone: body.client_phone || "",
      business_name: body.business_name || "",
      service_ids: body.service_ids || [],
      checklist: body.checklist || [],
      notes: body.notes || "",
      status: body.status || "draft",
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
