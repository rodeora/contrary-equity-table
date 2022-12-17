import {NextApiRequest, NextApiResponse} from "next";
import clientPromise from "../../../lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const client = await clientPromise
    const db = client.db('testdb').collection('investments')
    const data = await db.find().toArray()
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    const client = await clientPromise
    const db = client.db('testdb').collection('investments')
    const data = await db.insertOne(req.body)
    res.status(201).json(data)
  }

  res.status(405).end()
}
