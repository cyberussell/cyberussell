import Image from 'next/image'
import { WashingMachine, Wind, Waves, Shirt, Package, Flame, Combine, Tag, type LucideIcon } from 'lucide-react'
import { CATEGORY_META, type ServiceCatalogItem } from '@/lib/laundry-management-system/modules/catalog/types'

// Every default icon referenced by CATEGORY_META must be registered here —
// falls back to Tag for anything unrecognized (defensive, not expected).
const ICONS: Record<string, LucideIcon> = { WashingMachine, Wind, Waves, Shirt, Package, Flame, Combine, Tag }

const SIZE_CLASSES = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' }
const ICON_PX = { sm: 16, md: 20, lg: 28 }

// Renders a custom-uploaded icon (icon_url) if the owner set one, otherwise
// the item's icon_key override, otherwise the category's seeded default —
// so a brand-new item always shows something reasonable, never blank.
export default function CatalogItemIcon({
  item,
  size = 'md',
}: {
  item: Pick<ServiceCatalogItem, 'category' | 'icon_key' | 'icon_url' | 'name'>
  size?: keyof typeof SIZE_CLASSES
}) {
  const wrapperClass = `flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-teal-100 bg-[#F0FDFA] ${SIZE_CLASSES[size]}`

  if (item.icon_url) {
    return (
      <div className={wrapperClass}>
        <Image src={item.icon_url} alt={item.name} width={56} height={56} className="h-full w-full object-cover" />
      </div>
    )
  }

  const iconName = item.icon_key || CATEGORY_META[item.category].defaultIcon
  const Icon = ICONS[iconName] ?? Tag
  return (
    <div className={wrapperClass}>
      <Icon className="text-[#0D9488]" size={ICON_PX[size]} />
    </div>
  )
}
