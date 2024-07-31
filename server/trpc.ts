import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import clientPromise from '../lib/mongo';

export const createContext = async (opts: CreateNextContextOptions) => {
    const client = await clientPromise
    const db = client.db('testdb').collection('investments')
    return { db }
  };

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const procedure = t.procedure;