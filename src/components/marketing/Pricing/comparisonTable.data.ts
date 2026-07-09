// Each cell is derived from the plans' own "Everything in X, plus:" cascade —
// Growth inherits Starter's features, Business Platform inherits Growth's.
export type CellValue = true | false | string;

export interface ComparisonRow {
  label: string;
  starter: CellValue;
  growth: CellValue;
  businessPlatform: CellValue;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { label: "Responsive Website", starter: true, growth: true, businessPlatform: true },
  { label: "Admin Dashboard", starter: true, growth: true, businessPlatform: "Custom" },
  { label: "Contact CRM", starter: true, growth: true, businessPlatform: true },
  { label: "Image Manager", starter: true, growth: true, businessPlatform: true },
  { label: "Blog CMS", starter: false, growth: true, businessPlatform: true },
  { label: "Portfolio Management", starter: false, growth: true, businessPlatform: true },
  { label: "SEO", starter: "Basic", growth: "Advanced", businessPlatform: "Advanced" },
  { label: "Analytics", starter: true, growth: "Enhanced", businessPlatform: "Advanced" },
  { label: "Booking System", starter: false, growth: false, businessPlatform: true },
  { label: "Payment Integration", starter: false, growth: false, businessPlatform: true },
  { label: "Staff Accounts", starter: false, growth: false, businessPlatform: true },
  { label: "Customer Portal", starter: false, growth: false, businessPlatform: true },
  { label: "API Integrations", starter: false, growth: false, businessPlatform: true },
  { label: "AI Features", starter: false, growth: false, businessPlatform: true },
  { label: "Business Automation", starter: false, growth: false, businessPlatform: true },
  { label: "Monthly Content Updates", starter: "2", growth: "5", businessPlatform: "5" },
  { label: "Priority Support", starter: "Email", growth: "Priority", businessPlatform: "Dedicated" },
  { label: "Domain & Hosting (1 Year)", starter: true, growth: true, businessPlatform: true },
  { label: "Facebook Page Integration", starter: true, growth: true, businessPlatform: true },
  { label: "Messenger Bot Integration", starter: false, growth: false, businessPlatform: true },
  { label: "Technical Documentation", starter: false, growth: false, businessPlatform: true },
];
