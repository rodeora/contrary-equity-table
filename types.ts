import * as yup from 'yup';
import { outputSchema } from './lib/schemas/investment';

export type Investment = yup.InferType<typeof outputSchema>

export type SortOrder = {
  key: string
  order: string
}
