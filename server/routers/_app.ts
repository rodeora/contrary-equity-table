import * as yup from 'yup'

import { procedure, router } from '../trpc';
import clientPromise from '../../lib/mongo';
import { investmentSchema, outputSchema } from '../../lib/schemas/investment';

export const appRouter = router({
  getInvestments: procedure
    .input(
      yup.object({
        key: yup.string().optional(),
        order: yup.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { key, order } = input
      let data;
      if (key && order) {
        data = await ctx.db.find().sort(key, order === 'asc' ? 1 : -1).toArray()
        console.log(data)
      } else {
        data = await ctx.db.find().toArray()
        console.log(data)
      }
      const arraySchema = yup.array().of(outputSchema)
      return await arraySchema.validate(data)
    }),
  addInvestment: procedure
    .input(investmentSchema)
    .mutation(async ({input, ctx}) => {
      return await ctx.db.insertOne(input)
    })
});

export type AppRouter = typeof appRouter;