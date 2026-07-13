import { notFound } from 'next/navigation'
import { createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import CustomerSignupForm from '@/components/laundry-management-system/CustomerSignupForm'

export const dynamic = 'force-dynamic'

export default async function BusinessCustomerSignupPage({
  params,
}: {
  params: Promise<{ businessSlug: string }>
}) {
  const { businessSlug } = await params
  const { data: business } = await createAdminSupabase()
    .from('businesses')
    .select('name, slug')
    .eq('slug', businessSlug)
    .maybeSingle()
  if (!business) notFound()

  return <CustomerSignupForm businessName={business.name} slug={business.slug} />
}
