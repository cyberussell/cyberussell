export type ActionResult = { error?: string }

export const CURRENCIES = ['PHP', 'USD', 'EUR', 'SGD', 'AUD'] as const

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50)
}
