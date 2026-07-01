import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabaseAdmin";

const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

// Assemble a flat service object from normalized Supabase tables
async function fetchFullService(id: string) {
  const db = getAdminClient();

  const [svc, bestFor, inclusions, exclusions, stack, requirements, deliverables, addons, faqs, notes] = await Promise.all([
    db.from("services").select("*").eq("id", id).single(),
    db.from("service_best_for").select("item").eq("service_id", id).order("sort_order"),
    db.from("service_inclusions").select("item").eq("service_id", id).order("sort_order"),
    db.from("service_exclusions").select("item").eq("service_id", id).order("sort_order"),
    db.from("service_stack").select("category, technology").eq("service_id", id).order("sort_order"),
    db.from("service_requirements").select("item").eq("service_id", id).order("sort_order"),
    db.from("service_deliverables").select("item").eq("service_id", id).order("sort_order"),
    db.from("service_addons").select("addon_name, description, price").eq("service_id", id).order("sort_order"),
    db.from("service_faqs").select("question, answer").eq("service_id", id).order("sort_order"),
    db.from("service_notes").select("notes").eq("service_id", id).maybeSingle(),
  ]);

  if (svc.error || !svc.data) return null;

  const techStack: Record<string, string[]> = {};
  for (const row of stack.data ?? []) {
    if (!techStack[row.category]) techStack[row.category] = [];
    techStack[row.category].push(row.technology);
  }

  return {
    id: svc.data.id,
    name: svc.data.service_name,
    service_name: svc.data.service_name,
    slug: svc.data.slug,
    category: svc.data.category,
    short_description: svc.data.short_description,
    product_brief: svc.data.product_brief,
    starting_price: svc.data.starting_price,
    timeline: svc.data.estimated_timeline,
    status: svc.data.status,
    featured: svc.data.featured,
    icon: svc.data.icon,
    updated_at: svc.data.updated_at,
    best_for: (bestFor.data ?? []).map((r) => r.item),
    whats_included: (inclusions.data ?? []).map((r) => r.item),
    not_included: (exclusions.data ?? []).map((r) => r.item),
    tech_stack: techStack,
    client_must_provide: (requirements.data ?? []).map((r) => r.item),
    deliverables: (deliverables.data ?? []).map((r) => r.item),
    addons: (addons.data ?? []).map((r) => ({ service: r.addon_name, description: r.description, price: r.price })),
    faqs: (faqs.data ?? []).map((r) => ({ question: r.question, answer: r.answer })),
    notes: notes.data?.notes ?? "",
  };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const service = await fetchFullService(id);
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const db = getAdminClient();

  // Update main record
  await db.from("services").update({
    service_name: body.name || body.service_name,
    category: body.category ?? "",
    short_description: body.short_description ?? "",
    product_brief: body.product_brief ?? "",
    starting_price: body.starting_price ?? "",
    estimated_timeline: body.timeline ?? body.estimated_timeline ?? "",
    status: body.status ?? "draft",
    featured: body.featured ?? false,
    icon: body.icon ?? "",
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  // Replace related rows (delete + insert for simplicity)
  async function replaceList(table: string, col: string, items: string[]) {
    await db.from(table).delete().eq("service_id", id);
    if (items.length) {
      await db.from(table).insert(items.map((item, i) => ({ service_id: id, [col]: item, sort_order: i })));
    }
  }

  await replaceList("service_best_for", "item", body.best_for ?? []);
  await replaceList("service_inclusions", "item", body.whats_included ?? []);
  await replaceList("service_exclusions", "item", body.not_included ?? []);
  await replaceList("service_requirements", "item", body.client_must_provide ?? []);
  await replaceList("service_deliverables", "item", body.deliverables ?? []);

  // Stack
  await db.from("service_stack").delete().eq("service_id", id);
  const stackRows = Object.entries(body.tech_stack ?? {}).flatMap(([cat, techs]) =>
    (techs as string[]).map((technology, i) => ({ service_id: id, category: cat, technology, sort_order: i }))
  );
  if (stackRows.length) await db.from("service_stack").insert(stackRows);

  // Add-ons
  await db.from("service_addons").delete().eq("service_id", id);
  const addonRows = (body.addons ?? []).map((a: { service: string; description: string; price: string }, i: number) => ({
    service_id: id,
    addon_name: a.service,
    description: a.description,
    price: a.price,
    sort_order: i,
  }));
  if (addonRows.length) await db.from("service_addons").insert(addonRows);

  // FAQs
  await db.from("service_faqs").delete().eq("service_id", id);
  const faqRows = (body.faqs ?? []).map((f: { question: string; answer: string }, i: number) => ({
    service_id: id,
    question: f.question,
    answer: f.answer,
    sort_order: i,
  }));
  if (faqRows.length) await db.from("service_faqs").insert(faqRows);

  // Notes
  await db.from("service_notes").delete().eq("service_id", id);
  if (body.notes) {
    await db.from("service_notes").insert({ service_id: id, notes: body.notes });
  }

  const updated = await fetchFullService(id);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const db = getAdminClient();
  // Cascade deletes handle related tables
  const { error } = await db.from("services").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
