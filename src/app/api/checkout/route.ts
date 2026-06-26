import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";
import { generateToken } from "@/lib/download-token";

const RATE_LIMIT = 10;
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

  try {
    const { productId } = await req.json();

    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (!product.active || product.price === 0) {
      return NextResponse.json({ error: "Product not available for purchase" }, { status: 400 });
    }

    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    const origin = req.headers.get("origin") || "https://www.cyberussell.com";

    const response = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            line_items: [
              {
                name: product.title,
                description: product.description,
                amount: product.price,
                currency: "PHP",
                quantity: 1,
              },
            ],
            payment_method_types: [
              "gcash",
              "grab_pay",
              "paymaya",
              "card",
            ],
            success_url: `${origin}/shop/download?token=${generateToken(product.id)}`,
            cancel_url: `${origin}/shop?status=cancelled`,
            description: `Cyberussell — ${product.title}`,
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.errors?.[0]?.detail || "Payment session failed" },
        { status: response.status }
      );
    }

    const checkoutUrl = data.data?.attributes?.checkout_url;
    if (!checkoutUrl) {
      return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
