import { NextRequest, NextResponse } from "next/server";

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyf1UclH7xhnliCpniNr39qJafCOYekZVHJbirXWPm-QnRtRxHReygMwa_ZNT5W6Emc/exec";

export async function POST(req: NextRequest) {
  try {
    const { name, email, honeypot } = await req.json();

    if (honeypot) return NextResponse.json({ success: true });

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const res = await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ name: name || "", email }),
      redirect: "follow",
    });

    if (!res.ok && res.status !== 302) throw new Error("Sheets error");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
