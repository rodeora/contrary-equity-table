import {NextApiRequest, NextApiResponse} from "next";
import { Investment } from "../../../types";


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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Investment[]>
) {
  res.status(200).json(investments)
}
