import Card from './Card'

export default function RecentListCard<T extends { id: string }>({
  title,
  items,
  renderItem,
  emptyMessage,
  action,
}: {
  title: string
  items: T[]
  renderItem: (item: T) => React.ReactNode
  emptyMessage: string
  action?: React.ReactNode
}) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-[#0B1B33]">{title}</h2>
        {action}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id}>{renderItem(item)}</li>
          ))}
        </ul>
      )}
    </Card>
  )
}
