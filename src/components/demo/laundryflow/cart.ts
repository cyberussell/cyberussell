import type { CatalogItem } from "./orderCatalog";

export type CartLine = { item: CatalogItem; qty: number };

const STORAGE_KEY = "laundryflow-cart";

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.item.effective_price * line.qty, 0);
}

export function saveCart(lines: CartLine[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — cart just won't persist across pages.
  }
}

export function loadCart(): CartLine[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearCart() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
