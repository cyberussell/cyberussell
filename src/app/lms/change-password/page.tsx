import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/laundry-management-system/supabase-server'
import ChangePasswordForm from '@/components/laundry-management-system/ChangePasswordForm'

export const dynamic = 'force-dynamic'

// Deliberately doesn't use requireOwnerBusiness()/requireStaffAccess() — those redirect here
// whenever must_change_password is set, which would loop. Just confirms a real session exists.
export default async function ChangePasswordPage() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/lms/login')

  return <ChangePasswordForm />
}
