import * as yup from 'yup'

export const investmentSchema = yup.object().shape({
  company: yup.string().required('Company name is required'),
  round: yup.string().required('Round is required'),
  equity: yup.number().required('Equity is required'),
  amount: yup
    .number()
    .typeError('Investment amount is required and must be a number')
    .min(1, 'Amount must be greater than 0')
    .max(1000000000, 'Amount must be less than 1 billion')
    .required('Please enter the investment amount'),
  valuation: yup
    .number()
    .typeError('Valuation is required and must be a number')
    .required('Please enter the valuation')
    .min(1, 'Valuation must be greater than 0')
    .max(100000000000, 'Valuation must be less than 100 billion')
    .moreThan(yup.ref('amount'), 'Valuation must be greater than the amount'),
  date: yup.date().required('Date is required'),
});

export const outputSchema = investmentSchema.shape({
  _id: yup.string().required(),
  portfolioCompanyId: yup.number().positive().required()
})
