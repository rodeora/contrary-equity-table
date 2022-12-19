import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCreateInvestment } from '../lib/investments/useCreateInvestment'
import { useRouter } from 'next/router'
import { NumericFormat } from 'react-number-format'
import { Investment } from '../types'
import { investmentSchema } from '../lib/schemas/investment'

type formInputs = {
  company: string
  round: Investment['round']
  amount: number
  valuation: number
  equity: number
  date: Date
}

export default function InvestmentForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    setValue,
    watch,
  } = useForm<formInputs>({ resolver: yupResolver(investmentSchema) })

  const [valuation, amount] = watch(['valuation', 'amount'])

  const { mutate: createInvestment } = useCreateInvestment()

  useEffect(() => {
    if (dirtyFields.valuation && dirtyFields.amount) {
      setValue('equity', (amount / valuation) * 100)
    } else {
      setValue('equity', 0)
    }
  }, [dirtyFields, amount, valuation, setValue])

  const onSubmit = (data: formInputs) => {
    createInvestment(
      { ...data, date: data.date.toISOString(), equity: data.equity / 100 },
      {
        onSettled: async () => await router.push('/'),
      },
    )
  }

  const onCancel = async () => {
    await router.push('/')
  }

  const dropdownOptions = [
    { value: 'seed', label: 'Seed' },
    { value: 'series a', label: 'Series A' },
    { value: 'series b', label: 'Series B' },
    { value: 'series c', label: 'Series C' },
    { value: 'series d', label: 'Series D' },
    { value: 'series e', label: 'Series E' },
    { value: 'series f', label: 'Series F' },
  ]

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 pb-5 sm:space-y-5">
        <div className="border-b border-gray-200 pb-2">
          <h3 className="text-xl font-medium text-gray-900">New Investment</h3>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="company"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Portfolio Company Name
            </label>
            <div className="col-span-2">
              <input
                type="text"
                {...register('company')}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <ErrorMessage
                errors={errors}
                name="company"
                as="p"
                className="mt-1 text-sm text-pink-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="round"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Round Invested
            </label>
            <div className="col-span-2">
              <select
                {...register('round')}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="amount"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Investment Amount
            </label>
            <div className="col-span-2">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    thousandSeparator={true}
                    allowNegative={false}
                    prefix={'$ '}
                    onValueChange={(v) => field.onChange(v.floatValue)}
                    value={field.value}
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="amount"
                as="p"
                className="mt-1 text-sm text-pink-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="valuation"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Valuation at time of raise
            </label>
            <div className="col-span-2">
              <Controller
                name="valuation"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    thousandSeparator={true}
                    allowNegative={false}
                    prefix={'$ '}
                    onValueChange={(v) => field.onChange(v.floatValue)}
                    value={field.value}
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="valuation"
                as="p"
                className="mt-1 text-sm text-pink-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="valuation"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Equity Percentage
            </label>
            <div className="relative col-span-2 flex items-center">
              <input
                disabled
                type="number"
                {...register('equity')}
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 bg-gray-50 text-sm text-gray-500"
              ></input>
              <span className="pointer-events-none absolute right-2 flex-shrink-0 pl-1 text-gray-500">
                %
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-4 pt-5">
            <label
              htmlFor="date"
              className="mt-px block pt-2 text-sm font-medium text-gray-700"
            >
              Date of raise
            </label>
            <div className="col-span-2">
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="block w-full min-w-0 flex-1 rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholderText={'Select a date'}
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    maxDate={new Date()}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="date"
                as="p"
                className="mt-1 text-sm text-pink-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end ">
        <button
          onClick={() => onCancel()}
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
        >
          Add New Investment
        </button>
      </div>
    </form>
  )
}
