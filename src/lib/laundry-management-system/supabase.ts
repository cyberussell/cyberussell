import { createBrowserClient } from '@supabase/ssr'

// The Laundry Management System runs on its OWN Supabase project, separate from the main
// site's and the Appointment System's, so it can be deployed as a standalone product.
export function getLmsEnv() {
  const url = process.env.NEXT_PUBLIC_LMS_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'LMS Supabase env vars missing. Set NEXT_PUBLIC_LMS_SUPABASE_URL and NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY (see laundry-management-system/SETUP.md).'
    )
  }
  return { url, anonKey }
}

export function createBrowserSupabase() {
  const { url, anonKey } = getLmsEnv()
  return createBrowserClient(url, anonKey)
}
