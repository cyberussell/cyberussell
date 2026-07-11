-- Phase 6: Essential plan's "Inventory Management" line item (Consumables:
-- Detergent, Fabric Conditioner, Packaging). inventory_items had no way to
-- categorize items — add one column with a fixed set of laundry-relevant
-- categories rather than a separate categories table, since the set is small
-- and fixed for this product.

alter table public.inventory_items add column category text not null default 'other'
  check (category in ('detergent', 'fabric_conditioner', 'packaging', 'other'));
