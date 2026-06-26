import { createHmac } from "crypto";

const SECRET = process.env.PAYMONGO_SECRET_KEY || "fallback";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateToken(productId: string): string {
  const expires = Date.now() + EXPIRY_MS;
  const payload = `${productId}:${expires}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyToken(token: string): { valid: boolean; productId?: string } {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const [productId, expiresStr, sig] = decoded.split(":");
    const payload = `${productId}:${expiresStr}`;
    const expectedSig = createHmac("sha256", SECRET).update(payload).digest("hex").slice(0, 16);

    if (sig !== expectedSig) return { valid: false };
    if (Date.now() > Number(expiresStr)) return { valid: false };

    return { valid: true, productId };
  } catch {
    return { valid: false };
  }
}
