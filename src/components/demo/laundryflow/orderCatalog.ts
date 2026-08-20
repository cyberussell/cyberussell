import { WashingMachine, Wind, Flame, Shirt, Waves, Combine, Package, type LucideIcon } from "lucide-react";

// The business slug in the real Laundry Management System whose live
// service catalog this page renders — same tenant the track-order page's
// ORD-000041 example belongs to. Keep in sync if that business is ever
// renamed/re-slugged in the LMS.
export const LMS_BUSINESS_SLUG = "aling-maria-laundry-shop";

export type CatalogCategory = "wash" | "dry" | "iron" | "fold" | "wash_dry" | "wash_dry_fold" | "dry_clean" | "addon";
export type CatalogUnit = "load" | "piece";

export type CatalogItem = {
  id: string;
  name: string;
  category: CatalogCategory;
  unit: CatalogUnit;
  price: number;
  effective_price: number;
  on_promo: boolean;
};

export type CatalogResponse = {
  business: { name: string; slug: string; currency: string };
  items: CatalogItem[];
};

// Mirrors CATEGORY_META in the real LMS's catalog module — same labels,
// same category order — so this page reads as a faithful window into the
// real product rather than a separate invented taxonomy.
export const CATEGORY_META: Record<CatalogCategory, { label: string; icon: LucideIcon }> = {
  wash: { label: "Washing", icon: WashingMachine },
  dry: { label: "Drying", icon: Wind },
  iron: { label: "Ironing", icon: Flame },
  fold: { label: "Fold", icon: Shirt },
  wash_dry: { label: "Wash & Dry", icon: Waves },
  wash_dry_fold: { label: "Wash, Dry & Fold", icon: Combine },
  dry_clean: { label: "Dry Cleaning", icon: Shirt },
  addon: { label: "Add-ons", icon: Package },
};

export const CATEGORY_ORDER: CatalogCategory[] = ["wash", "dry", "iron", "fold", "wash_dry", "wash_dry_fold", "dry_clean", "addon"];

export function unitLabel(unit: CatalogUnit): string {
  return unit === "load" ? "/ load" : "/ piece";
}
