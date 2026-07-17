-- Public (no-login) customer order tracking. The receipt's QR code
-- ("Scan to track your order") currently links to /lms/orders/lookup/[orderNumber],
-- which requires an owner/staff login and redirects into the internal
-- dashboard — so a customer scanning their own receipt hits a login wall.
-- order_number (ORD-000001, a plain global bigserial since migration 008) is
-- sequential and guessable, so the fix isn't to make it public as-is; instead
-- every order gets an opaque, unguessable token for the public tracking URL,
-- same 128-bit-opaque-token approach already used by Territory Management
-- System's public assignment/partnership routes.
--
-- Volatile default means Postgres evaluates it per-row when this column is
-- added (not a fast metadata-only ADD COLUMN), backfilling every existing
-- order automatically; the explicit UPDATE below is a defensive no-op.
alter table public.orders
  add column public_token text unique default encode(gen_random_bytes(16), 'hex');

update public.orders set public_token = encode(gen_random_bytes(16), 'hex') where public_token is null;

alter table public.orders alter column public_token set not null;
