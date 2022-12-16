import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/20/solid'
import {Investment} from "../types";
import React, {ReactNode, useState} from "react";
import {currencyFormatter, dateFormatter, percentFormatter} from "../lib";
import {TableCell} from "./TableCell";

const investments: Investment[] = [
  {id: '1', company: 'company a', amount: 500000, valuation: 10000000, round: 'seed', date: '2021-11-01', equity: 0.05},
  {
    id: '2',
    company: 'company b',
    amount: 1000000,
    valuation: 120000000,
    round: 'series b',
    date: '2022-09-20',
    equity: 0.008
  },
]

export default function Table() {
  const [sortOrder, setSortOrder] = useState({key: 'id', direction: 'desc'})

  const updateSort = (key: string) => {
    if (sortOrder.key === key) {
      setSortOrder({key, direction: sortOrder.direction === 'asc' ? 'desc' : 'asc'})
    } else {
      setSortOrder({key, direction: 'desc'})
    }
  }

  const getSortIcon = (key: string) => {
    if (sortOrder.key === key) {
      return (
        <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
          {sortOrder.direction === 'asc' ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>}
        </span>
      )
    }
    return (
      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible">
        <ChevronDownIcon className="h-5 w-5"/>
      </span>
    )
  }

  return (
    <div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-8 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                <tr>
                  <TableHeader onClick={() => updateSort('id')}>
                    Portfolio Company ID {getSortIcon('id')}
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
                  <TableHeader />
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {investments.map((investment) => (
                  <tr key={investment.id}>
                    <TableCell>
                      {investment.id}
                    </TableCell>
                    <TableCell>
                      {investment.company}
                    </TableCell>
                    <TableCell>
                      {investment.round}
                    </TableCell>
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
                    <TableCell>
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </TableCell>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const TableHeader = ({children, onClick}: { children?: ReactNode, onClick?: () => void }) => {
  return (
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      <a href="#" className="group inline-flex" onClick={onClick}>
        {children}
      </a>
    </th>
  )
}
