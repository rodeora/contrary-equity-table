import { useQuery } from '@tanstack/react-query'
import { Investment, SortOrder } from '../../types'

async function getInvestments(sortOrder?: SortOrder): Promise<Investment[]> {
  const params = new URLSearchParams(sortOrder)
  return fetch('api/investments?' + params).then((res) => res.json())
}
export const useInvestments = (sortOrder?: SortOrder) => {
  return useQuery(['investments', sortOrder], () => getInvestments(sortOrder))
}
