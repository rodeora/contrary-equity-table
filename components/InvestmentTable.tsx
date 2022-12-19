import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { currencyFormatter, dateFormatter, percentFormatter } from '../lib'
import { TableCell } from './TableCell'
import { useInvestments } from '../lib/investments/useInvestments'
import { TableHeader } from './TableHeader'

export default function InvestmentTable() {
  const [sortOrder, setSortOrder] = useState({ key: 'portfolioCompanyId', order: 'asc' })

  const { data: investments } = useInvestments(sortOrder)

  const updateSort = (key: string) => {
    if (sortOrder.key === key) {
      setSortOrder({ key, order: sortOrder.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSortOrder({ key, order: 'desc' })
    }
  }

  const getSortIcon = (key: string) => {
    if (sortOrder.key === key) {
      return (
        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
          {sortOrder.order === 'asc' ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </span>
      )
    }
    return (
      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible">
        <ChevronDownIcon className="h-5 w-5" />
      </span>
    )
  }

  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-8 overflow-x-auto">
          <div className="inline-block min-w-full py-2 px-8 align-middle">
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHeader
                      onClick={() => updateSort('portfolioCompanyId')}
                    >
                      Portfolio Company ID {getSortIcon('portfolioCompanyId')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('company')}>
                      Portfolio Company Name {getSortIcon('company')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('round')}>
                      Round Invested {getSortIcon('round')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('amount')}>
                      Amount {getSortIcon('amount')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('valuation')}>
                      Valuation at time of raise {getSortIcon('valuation')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('date')}>
                      Date of raise {getSortIcon('date')}
                    </TableHeader>
                    <TableHeader onClick={() => updateSort('equity')}>
                      Equity Percentage {getSortIcon('equity')}
                    </TableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {investments?.map((investment) => (
                    <tr key={investment._id}>
                      <TableCell>{investment.portfolioCompanyId}</TableCell>
                      <TableCell>{investment.company}</TableCell>
                      <TableCell>{investment.round}</TableCell>
                      <TableCell>
                        {currencyFormatter.format(investment.amount)}
                      </TableCell>
                      <TableCell>
                        {currencyFormatter.format(investment.valuation)}
                      </TableCell>
                      <TableCell>
                        {dateFormatter.format(new Date(investment.date))}
                      </TableCell>
                      <TableCell>
                        {percentFormatter.format(investment.equity)}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
