-- Adds real product/variant support to Inventory (e.g. "Soap" as one product
-- with separately-tracked variants like Bar 100g, Liquid 1L, Lemon Scent).
-- inventory_items itself is untouched — its unit/quantity/low_stock_threshold
-- columns keep meaning exactly what they always have for a "simple" item
-- with zero variants. The moment an item has one or more variants, all stock
-- tracking and low-stock evaluation moves to the variant rows instead (this
-- is enforced in app code/UI, not the DB) — no backfill needed since nothing
-- existing has variants yet.

create table public.inventory_item_variants (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references public.inventory_items(id) on delete cascade,
  label text not null,
  unit text not null default 'pcs',
  quantity numeric(10,2) not null default 0,
  low_stock_threshold numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index inventory_item_variants_item_idx on public.inventory_item_variants (inventory_item_id);

alter table public.inventory_item_variants enable row level security;

-- No business_id column here — every policy keys through the parent item via
-- is_business_owner/is_business_staff, same join-through-parent pattern
-- order_items (018) uses for orders. Matches inventory_items' own existing
-- owner+staff-both-CRUD split (003/003b), unlike the service catalog's
-- deliberately-narrower owner-only pricing.
create policy "owner manages variants" on public.inventory_item_variants
  for all using (
    exists (select 1 from public.inventory_items ii where ii.id = inventory_item_variants.inventory_item_id and public.is_business_owner(ii.business_id))
  ) with check (
    exists (select 1 from public.inventory_items ii where ii.id = inventory_item_variants.inventory_item_id and public.is_business_owner(ii.business_id))
  );
create policy "staff manages variants" on public.inventory_item_variants
  for all using (
    exists (select 1 from public.inventory_items ii where ii.id = inventory_item_variants.inventory_item_id and public.is_business_staff(ii.business_id))
  ) with check (
    exists (select 1 from public.inventory_items ii where ii.id = inventory_item_variants.inventory_item_id and public.is_business_staff(ii.business_id))
  );
