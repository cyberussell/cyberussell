const PALETTE: [string, string][] = [
  ['#0D9488', '#22D3EE'],
  ['#0EA5E9', '#38BDF8'],
  ['#059669', '#34D399'],
  ['#0891B2', '#67E8F9'],
  ['#0F766E', '#2DD4BF'],
]

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Deterministic gradient per name so the same person always gets the same
// color, without needing a photo-upload feature LMS doesn't have.
function paletteFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[hash % PALETTE.length]
}

export default function Avatar({ name, size = 'md' }: { name: string; size?: keyof typeof SIZE_CLASSES }) {
  const [from, to] = paletteFor(name || '?')
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${SIZE_CLASSES[size]}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials(name)}
    </div>
  )
}
