-- Fourth instance of the same gap pattern as 004/006/007: `profiles` only
-- ever had "own profile" (id = auth.uid()). Every query that joins
-- staff_members -> profiles(full_name) to display a staff member's name to
-- someone else in the same business (the owner's staff list, the new
-- Assigned Staff order picker, the "Assigned" column on order tables) has
-- been silently getting `profile: null` back from RLS this whole time,
-- falling back to generic placeholder text instead of the real name. Found
-- live while verifying phase 5's staff-assignment picker.

create policy "business members read staff profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.staff_members sm
      where sm.profile_id = profiles.id
        and (public.is_business_owner(sm.business_id) or public.is_business_staff(sm.business_id))
    )
  );
