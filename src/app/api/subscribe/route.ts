import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, source, honeypot } = await req.json();

    if (honeypot) return NextResponse.json({ success: true });

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const db = getAdminClient();
    const { error } = await db
      .from("subscribers")
      .upsert(
        {
          id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: name || "",
          email: email.trim().toLowerCase(),
          source: source || "website",
        },
        { onConflict: "email", ignoreDuplicates: true }
      );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
