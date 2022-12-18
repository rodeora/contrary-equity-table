import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Investment } from '../../types'

async function createInvestment(
  investment: Omit<Investment, '_id' | 'portfolioCompanyId'>,
) {
  const body = JSON.stringify(investment)
  return fetch('api/investments', { method: 'POST', body }).then((res) =>
    res.json(),
  )
}

export const useCreateInvestment = () => {
  const client = useQueryClient()
  return useMutation(createInvestment, {
    onSettled: async () => await client.invalidateQueries(['investments']),
  })
}
