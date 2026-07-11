-- Phase 5: full laundry workflow. Replaces the simple 5-status model
-- (pending/in_progress/ready/completed/cancelled) with the real 9-step
-- workflow, and adds the fields every order needs (order number, assigned
-- staff, expected completion, weight, payment status, timeline). No real
-- production orders exist yet (only throwaway test data, always cleaned up
-- after verification), so this is a safe in-place rework rather than an
-- additive migration.

-- Order number: a bigserial + a generated column, so every order gets a
-- guaranteed-unique, human-readable number with zero app-side coordination.
alter table public.orders add column order_seq bigserial;
alter table public.orders add column order_number text
  generated always as ('ORD-' || lpad(order_seq::text, 6, '0')) stored;

alter table public.orders add column assigned_staff_id uuid references public.staff_members(id) on delete set null;
alter table public.orders add column date_received timestamptz not null default now();
alter table public.orders add column expected_completion_at timestamptz;
alter table public.orders add column weight_kg numeric(6,2);
alter table public.orders add column payment_status text not null default 'unpaid'
  check (payment_status in ('unpaid', 'paid'));

-- Timeline: auto-maintained by a trigger (below) rather than app-level
-- read-modify-write, so every status change is captured atomically and
-- correctly regardless of which code path touches the row.
alter table public.orders add column status_history jsonb not null default '[]'::jsonb;

-- Backfill existing (test) rows to the closest new-status equivalent before
-- swapping the check constraint.
update public.orders set status = case status
  when 'pending' then 'received'
  when 'in_progress' then 'washing'
  when 'ready' then 'ready_for_pickup'
  else status
end;

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check check (status in (
  'received', 'sorting', 'washing', 'drying', 'folding',
  'ready_for_pickup', 'out_for_delivery', 'completed', 'cancelled'
));
alter table public.orders alter column status set default 'received';

create index orders_assigned_staff_idx on public.orders (assigned_staff_id);

-- Auto-append to status_history on insert and on every status change —
-- guarantees the Timeline is accurate no matter which action/code path
-- updates an order, rather than relying on every call site to remember to
-- append it themselves.
create or replace function public.append_order_status_history()
returns trigger
language plpgsql
as $$
begin
  -- `old` doesn't exist on INSERT, so the two cases can't share one branch.
  if tg_op = 'INSERT' then
    new.status_history := jsonb_build_array(jsonb_build_object('status', new.status, 'changed_at', now()));
  elsif new.status is distinct from old.status then
    new.status_history := coalesce(old.status_history, '[]'::jsonb) || jsonb_build_object(
      'status', new.status,
      'changed_at', now()
    );
  end if;
  return new;
end;
$$;

drop trigger if exists orders_status_history_trigger on public.orders;
create trigger orders_status_history_trigger
  before insert or update on public.orders
  for each row execute function public.append_order_status_history();
