import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/download-token";
import { PRODUCTS } from "@/data/products";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 400 });
    }

    const result = verifyToken(token);
    if (!result.valid || !result.productId) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
    }

    const product = PRODUCTS.find((p) => p.id === result.productId);
    if (!product || !product.paidFile) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ title: product.title, file: product.paidFile }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
