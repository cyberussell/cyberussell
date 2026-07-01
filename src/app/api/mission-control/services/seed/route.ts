import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { DEFAULT_SERVICES } from "@/lib/serviceCatalogSeed";

const SESSION_NAME = "mc-session";

async function isAuth(): Promise<boolean> {
  const jar = await cookies();
  return !!jar.get(SESSION_NAME)?.value;
}

export async function POST() {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getAdminClient();

  // Idempotency check — if any services exist, do nothing
  const { count } = await db.from("services").select("id", { count: "exact", head: true });
  if ((count ?? 0) > 0) {
    return NextResponse.json({ skipped: true, message: "Services already exist. Seed skipped." });
  }

  const results: string[] = [];

  for (const s of DEFAULT_SERVICES) {
    const now = new Date().toISOString();

    // Insert main service record
    const { error: svcErr } = await db.from("services").insert({
      id: s.id,
      service_name: s.service_name,
      slug: s.slug,
      category: s.category,
      short_description: s.short_description,
      product_brief: s.product_brief,
      starting_price: s.starting_price,
      estimated_timeline: s.estimated_timeline,
      status: s.status,
      featured: s.featured,
      icon: s.icon,
      created_at: now,
      updated_at: now,
    });

    if (svcErr) { results.push(`ERROR ${s.service_name}: ${svcErr.message}`); continue; }

    // Insert related records
    if (s.best_for.length) await db.from("service_best_for").insert(s.best_for.map((item, i) => ({ service_id: s.id, item, sort_order: i })));
    if (s.inclusions.length) await db.from("service_inclusions").insert(s.inclusions.map((item, i) => ({ service_id: s.id, item, sort_order: i })));
    if (s.exclusions.length) await db.from("service_exclusions").insert(s.exclusions.map((item, i) => ({ service_id: s.id, item, sort_order: i })));
    if (s.requirements.length) await db.from("service_requirements").insert(s.requirements.map((item, i) => ({ service_id: s.id, item, sort_order: i })));
    if (s.deliverables.length) await db.from("service_deliverables").insert(s.deliverables.map((item, i) => ({ service_id: s.id, item, sort_order: i })));

    const stackRows = s.stack.map((r, i) => ({ service_id: s.id, category: r.category, technology: r.technology, sort_order: i }));
    if (stackRows.length) await db.from("service_stack").insert(stackRows);

    const addonRows = s.addons.map((a, i) => ({ service_id: s.id, addon_name: a.addon_name, description: a.description, price: a.price, sort_order: i }));
    if (addonRows.length) await db.from("service_addons").insert(addonRows);

    const faqRows = s.faqs.map((f, i) => ({ service_id: s.id, question: f.question, answer: f.answer, sort_order: i }));
    if (faqRows.length) await db.from("service_faqs").insert(faqRows);

    if (s.notes) await db.from("service_notes").insert({ service_id: s.id, notes: s.notes });

    results.push(`OK: ${s.service_name}`);
  }

  return NextResponse.json({ seeded: true, results });
}
