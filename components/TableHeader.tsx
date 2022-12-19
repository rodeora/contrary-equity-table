import React, { ReactNode } from 'react'

export const TableHeader = ({
  children,
  onClick,
}: {
  children?: ReactNode
  onClick?: () => void
}) => {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    >
      <a href="#" className="group inline-flex" onClick={onClick}>
        {children}
      </a>
    </th>
  )
}
