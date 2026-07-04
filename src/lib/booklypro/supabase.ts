import { createBrowserClient } from '@supabase/ssr'

// BooklyPro runs on its OWN Supabase project, separate from the main site's,
// so it can be extracted into a standalone product later.
export function getBooklyProEnv() {
  const url = process.env.NEXT_PUBLIC_BOOKLYPRO_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_BOOKLYPRO_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    throw new Error(
      'BooklyPro Supabase env vars missing. Set NEXT_PUBLIC_BOOKLYPRO_SUPABASE_URL and NEXT_PUBLIC_BOOKLYPRO_SUPABASE_ANON_KEY (see booklypro/SETUP.md).'
    )
  }
  return { url, anonKey }
}

export function createBrowserSupabase() {
  const { url, anonKey } = getBooklyProEnv()
  return createBrowserClient(url, anonKey)
}
