import React, { ReactNode } from 'react'

export const TableCell = ({ children }: { children: ReactNode }) => {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm capitalize text-gray-500">
      {children}
    </td>
  )
}
