import React from 'react'

interface PropertyTableProps {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}

export function PropertyTable({ headers, rows }: PropertyTableProps) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
              {row.map((cell, ci) => (
                <td key={ci} className="py-2 px-3 text-gray-700 dark:text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
