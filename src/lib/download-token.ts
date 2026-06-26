import { createHmac } from "crypto";

const SECRET = process.env.PAYMONGO_SECRET_KEY;
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateToken(productId: string): string {
  if (!SECRET) throw new Error("PAYMONGO_SECRET_KEY is not set");
  const expires = Date.now() + EXPIRY_MS;
  const payload = `${productId}:${expires}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyToken(token: string): { valid: boolean; productId?: string } {
  if (!SECRET) return { valid: false };
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon === -1) return { valid: false };
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expectedSig = createHmac("sha256", SECRET).update(payload).digest("hex");

    if (sig !== expectedSig) return { valid: false };

    const [productId, expiresStr] = payload.split(":");
    if (Date.now() > Number(expiresStr)) return { valid: false };

    return { valid: true, productId };
  } catch {
    return { valid: false };
  }
}
