'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabase, createAdminSupabase } from '@/lib/laundry-management-system/supabase-server'
import { slugify, CURRENCIES, type ActionResult } from './shared'

const dayHoursSchema = z.object({
  closed: z.boolean(),
  open: z.string(),
  close: z.string(),
})
const businessHoursSchema = z.record(z.string(), dayHoursSchema)

const createBusinessSchema = z.object({
  name: z.string().min(2).max(80),
  branchName: z.string().min(1).max(80),
  phone: z.string().min(1).max(30),
  address: z.string().min(1).max(200),
  timezone: z.string().min(1).max(60),
  currency: z.enum(CURRENCIES),
  businessHours: z.string().transform((v, ctx) => {
    try {
      return businessHoursSchema.parse(JSON.parse(v))
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Invalid business hours.' })
      return z.NEVER
    }
  }),
})

export async function createBusiness(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const parsed = createBusinessSchema.safeParse({
    name: formData.get('name'),
    branchName: formData.get('branchName'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    timezone: formData.get('timezone'),
    currency: formData.get('currency'),
    businessHours: formData.get('businessHours'),
  })
  if (!parsed.success) return { error: 'Please fill in all fields correctly.' }
  const { name, branchName, phone, address, timezone, currency, businessHours } = parsed.data

  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/lms/login')

  // Slug uniqueness must be checked with the admin client, not the caller's own
  // session — "owner manages business" RLS scopes every SELECT to
  // owner_id = auth.uid(), and a brand-new signup owns zero businesses, so the
  // session-scoped client always sees count = 0 regardless of whether the slug
  // already belongs to a *different* owner. That blind spot is exactly what let
  // a duplicate slug (e.g. two signups both named "Aling Maria Laundry Shop")
  // reach the insert and surface a raw Postgres constraint error to the user.
  const admin = createAdminSupabase()
  let slug = slugify(name)
  if (slug.length < 3) slug = `laundry-${slug}`
  const { count } = await admin.from('businesses').select('id', { count: 'exact', head: true }).eq('slug', slug)
  if (count && count > 0) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  // Belt-and-suspenders against the residual race the pre-check can't close
  // (two signups for the same name submitting within the same instant): retry
  // once more with a fresh random suffix if the insert itself still hits the
  // unique constraint, rather than ever showing the raw Postgres error text.
  let business: { id: string } | null = null
  for (let attempt = 0; attempt < 2 && !business; attempt += 1) {
    const { data, error } = await supabase
      .from('businesses')
      .insert({ owner_id: user.id, name, slug, phone, address, timezone, currency })
      .select('id')
      .single()
    if (data) {
      business = data
    } else if (error?.code === '23505') {
      slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`
    } else if (error) {
      return { error: 'Could not create your business. Please try again.' }
    }
  }
  if (!business) return { error: 'Could not create your business. Please try again.' }

  const { error: branchError } = await supabase.from('branches').insert({
    business_id: business.id,
    name: branchName,
    address,
    phone,
    business_hours: businessHours,
  })
  if (branchError) return { error: branchError.message }

  redirect('/lms/dashboard')
}
