export type Investment = {
  _id: string
  company: string
  round: 'seed' | 'series a' | 'series b' | 'series c' | 'series d' | 'series e'
  amount: number
  valuation: number
  date: string
  equity: number
  portfolioCompanyId:number
}
