import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const RATE_LIMIT = 5;
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    entry.count++;
  } else {
    rateLimiter.set(ip, { count: 1, resetAt: now + 3600000 });
  }

  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const safeName = escapeHtml(String(name).slice(0, 200));
  const safeEmail = escapeHtml(String(email).slice(0, 200));
  const safeSubject = escapeHtml(String(subject || "").slice(0, 300));
  const safeMessage = escapeHtml(String(message).slice(0, 5000));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Cyberussell Contact" <${process.env.GMAIL_USER}>`,
      to: "cyberussellofficial@gmail.com",
      replyTo: safeEmail,
      subject: `[Cyberussell] ${safeSubject || "New message from " + safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E8373A;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; width: 100px;">Name</td><td style="padding: 8px;">${safeName}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Subject</td><td style="padding: 8px;">${safeSubject || "—"}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-left: 4px solid #E8373A;">
            <strong>Message:</strong>
            <p style="white-space: pre-wrap; margin-top: 8px;">${safeMessage}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent from cyberussell.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
