import Card from './Card'

export interface DataTableColumn<T> {
  header: string
  cell: (row: T) => React.ReactNode
  className?: string
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = 'Nothing here yet.',
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  emptyMessage?: string
}) {
  if (rows.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      </Card>
    )
  }

  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-blue-100/60 bg-[#F8FBFF]">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="whitespace-nowrap px-4 py-3 font-medium text-slate-500">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-blue-50 last:border-0 hover:bg-[#F8FBFF]/60">
              {columns.map((col) => (
                <td key={col.header} className={`px-4 py-3 text-[#0B1B33] ${col.className ?? ''}`}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
