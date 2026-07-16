#!/usr/bin/env node
// One-off script: seeds a fake "Demo Laundry Co" business with owner/staff/
// customer test accounts (password 123456789 for all three) plus a full
// categorized service catalog, so the catalog/promo/icon feature can be
// clicked through end-to-end without hand-creating a business first.
//
// Not part of the deployed app, not wired into any migration or CI step —
// run manually against the LMS Supabase project:
//   node laundry-management-system/scripts/seed-test-accounts.mjs
//
// Business creation goes through the Admin API (auth.admin.createUser) the
// same way the app's own staff-invite flow does, rather than hand-inserting
// into auth.users — that keeps auth.identities and friends consistent, which
// raw SQL insertion could easily get wrong. handle_new_user() (migration 019)
// does the rest: creating profiles/staff_members/customers rows from the
// metadata passed here, exactly like a real signup would.
//
// Idempotent at the business level: if "demo-laundry-co" already exists,
// the script prints the credentials and exits without touching anything.

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') })

const url = process.env.NEXT_PUBLIC_LMS_SUPABASE_URL
const serviceKey = process.env.LMS_SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_LMS_SUPABASE_URL / LMS_SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })

const PASSWORD = '123456789'
const SLUG = 'demo-laundry-co'
const OWNER_EMAIL = 'owner@demolaundry.test'
const STAFF_EMAIL = 'staff@demolaundry.test'
const CUSTOMER_EMAIL = 'customer@demolaundry.test'

const OPEN_DAY = { closed: false, open: '08:00', close: '18:00' }
const BUSINESS_HOURS = {
  mon: OPEN_DAY,
  tue: OPEN_DAY,
  wed: OPEN_DAY,
  thu: OPEN_DAY,
  fri: OPEN_DAY,
  sat: OPEN_DAY,
  sun: { ...OPEN_DAY, closed: true },
}

// Mirrors CATEGORY_META in src/lib/laundry-management-system/modules/catalog/types.ts.
// Wash & Dry gets a real active promo so the "less price this week" UI has
// something genuine to display right after seeding.
const CATALOG = [
  { name: 'Washing', price: 150, category: 'wash', unit: 'load' },
  { name: 'Drying', price: 100, category: 'dry', unit: 'load' },
  {
    name: 'Wash & Dry',
    price: 220,
    category: 'wash_dry',
    unit: 'load',
    promo: {
      promo_type: 'percent',
      promo_value: 10,
      promo_starts_at: new Date().toISOString(),
      promo_ends_at: new Date(Date.now() + 7 * 86_400_000).toISOString(),
    },
  },
  { name: 'Fold', price: 50, category: 'fold', unit: 'load' },
  { name: 'Shirt', price: 80, category: 'dry_clean', unit: 'piece' },
  { name: 'Pants', price: 90, category: 'dry_clean', unit: 'piece' },
  { name: 'Dress', price: 150, category: 'dry_clean', unit: 'piece' },
  { name: 'Suit / Blazer', price: 200, category: 'dry_clean', unit: 'piece' },
  { name: 'Jacket', price: 180, category: 'dry_clean', unit: 'piece' },
  { name: 'Blanket', price: 250, category: 'dry_clean', unit: 'piece' },
  { name: 'Curtain', price: 300, category: 'dry_clean', unit: 'piece' },
  { name: 'Detergent', price: 20, category: 'addon', unit: 'piece' },
  { name: 'Fabric Softener', price: 15, category: 'addon', unit: 'piece' },
  { name: 'Plastic Bag', price: 5, category: 'addon', unit: 'piece' },
]

function printCredentials() {
  console.log('\n--- Demo Laundry Co test accounts (password for all three: 123456789) ---')
  console.log(`Business slug: ${SLUG}`)
  console.log(`Owner:    ${OWNER_EMAIL}`)
  console.log(`Staff:    ${STAFF_EMAIL}`)
  console.log(`Customer: ${CUSTOMER_EMAIL} (business slug for the customer login page: ${SLUG})`)
}

async function seedCatalog(businessId) {
  const { count } = await supabase
    .from('service_catalog_items')
    .select('id', { count: 'exact', head: true })
    .eq('business_id', businessId)
  if (count && count > 0) {
    console.log(`Service catalog already has ${count} item(s) — skipping.`)
    return
  }

  console.log('Seeding service catalog...')
  const rows = CATALOG.map(({ name, price, category, unit, promo }) => ({
    business_id: businessId,
    name,
    price,
    category,
    unit,
    promo_type: promo?.promo_type ?? null,
    promo_value: promo?.promo_value ?? null,
    promo_starts_at: promo?.promo_starts_at ?? null,
    promo_ends_at: promo?.promo_ends_at ?? null,
  }))
  const { error: catalogErr } = await supabase.from('service_catalog_items').insert(rows)
  if (catalogErr) throw new Error(`Catalog seeding failed: ${catalogErr.message}`)
}

async function main() {
  const { data: existingBusiness } = await supabase.from('businesses').select('id').eq('slug', SLUG).maybeSingle()
  if (existingBusiness) {
    console.log(`"${SLUG}" already exists (id ${existingBusiness.id}) — resuming any unfinished steps.`)
    await seedCatalog(existingBusiness.id)
    console.log('Done.')
    printCredentials()
    return
  }

  console.log('Creating owner account...')
  const { data: ownerUser, error: ownerErr } = await supabase.auth.admin.createUser({
    email: OWNER_EMAIL,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { role: 'owner', full_name: 'Demo Owner' },
  })
  if (ownerErr || !ownerUser.user) throw new Error(`Owner creation failed: ${ownerErr?.message}`)

  console.log('Creating business + branch...')
  const { data: business, error: bizErr } = await supabase
    .from('businesses')
    .insert({
      owner_id: ownerUser.user.id,
      name: 'Demo Laundry Co',
      slug: SLUG,
      phone: '09171234567',
      address: '123 Rizal St, Quezon City',
      timezone: 'Asia/Manila',
      currency: 'PHP',
    })
    .select('id')
    .single()
  if (bizErr || !business) throw new Error(`Business creation failed: ${bizErr?.message}`)

  const { data: branch, error: branchErr } = await supabase
    .from('branches')
    .insert({
      business_id: business.id,
      name: 'Main Branch',
      address: '123 Rizal St, Quezon City',
      phone: '09171234567',
      business_hours: BUSINESS_HOURS,
    })
    .select('id')
    .single()
  if (branchErr || !branch) throw new Error(`Branch creation failed: ${branchErr?.message}`)

  console.log('Creating staff account...')
  const { error: staffErr } = await supabase.auth.admin.createUser({
    email: STAFF_EMAIL,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { role: 'staff', business_id: business.id, branch_id: branch.id, title: 'Front Desk Staff' },
  })
  if (staffErr) throw new Error(`Staff creation failed: ${staffErr.message}`)

  console.log('Creating customer account...')
  const { error: customerErr } = await supabase.auth.admin.createUser({
    email: CUSTOMER_EMAIL,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { role: 'customer', business_id: business.id, full_name: 'Demo Customer', phone: '09179876543' },
  })
  if (customerErr) throw new Error(`Customer creation failed: ${customerErr.message}`)

  await seedCatalog(business.id)

  console.log('Done.')
  printCredentials()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
