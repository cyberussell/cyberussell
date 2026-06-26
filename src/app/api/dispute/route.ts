import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";
import { generateToken } from "@/lib/download-token";

export async function POST(req: NextRequest) {
  try {
    const { referenceId } = await req.json();

    if (!referenceId || referenceId.trim().length === 0) {
      return NextResponse.json({ error: "Please enter your reference number." }, { status: 400 });
    }

    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Service not configured" }, { status: 500 });
    }

    // Look up the checkout session by reference
    const listRes = await fetch(
      `https://api.paymongo.com/v1/checkout_sessions?reference_number=${encodeURIComponent(referenceId.trim())}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
        },
      }
    );

    if (!listRes.ok) {
      // Fallback: try fetching as a checkout session ID
      const sessionRes = await fetch(
        `https://api.paymongo.com/v1/checkout_sessions/${encodeURIComponent(referenceId.trim())}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
          },
        }
      );

      if (!sessionRes.ok) {
        return NextResponse.json(
          { error: "Reference not found. Please double-check your reference number or contact us." },
          { status: 404 }
        );
      }

      const sessionData = await sessionRes.json();
      return handleSession(sessionData.data);
    }

    const listData = await listRes.json();
    const sessions = listData.data;

    if (!sessions || sessions.length === 0) {
      return NextResponse.json(
        { error: "Reference not found. Please double-check your reference number or contact us." },
        { status: 404 }
      );
    }

    return handleSession(sessions[0]);
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

function handleSession(session: { attributes: { status: string; line_items: { name: string }[]; payment_intent?: { attributes?: { status: string } } } }) {
  const attrs = session.attributes;
  const status = attrs.payment_intent?.attributes?.status || attrs.status;

  if (status !== "succeeded" && status !== "paid") {
    return NextResponse.json(
      { error: "This payment has not been completed. If you believe this is an error, please contact us." },
      { status: 400 }
    );
  }

  const itemName = attrs.line_items?.[0]?.name;
  if (!itemName) {
    return NextResponse.json({ error: "Could not identify the product. Please contact us." }, { status: 400 });
  }

  const product = PRODUCTS.find((p) => p.title === itemName);
  if (!product || !product.paidFile) {
    return NextResponse.json({ error: "Product not found. Please contact us." }, { status: 404 });
  }

  const token = generateToken(product.id);
  return NextResponse.json({
    downloadUrl: `/shop/download?token=${token}`,
    productTitle: product.title,
  });
}
