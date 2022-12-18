import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongo'
import { investmentSchema } from '../../../lib/schemas/investment'
import * as yup from 'yup'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { key, order } = req.query
    const client = await clientPromise
    const db = client.db('testdb').collection('investments')
    let data
    if (key && order) {
      data = await db
        .find()
        .sort({ [Array.isArray(key) ? key[0] : key]: order === 'asc' ? 1 : -1 })
        .toArray()
    } else {
      data = await db.find().toArray()
    }
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    try {
      const investment = await investmentSchema.validate(req.body)
      const client = await clientPromise
      const db = client.db('testdb').collection('investments')
      const data = await db.insertOne(investment)
      res.status(201).json(data)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error })
      }
    }
  }
  res.status(405).end()
}
