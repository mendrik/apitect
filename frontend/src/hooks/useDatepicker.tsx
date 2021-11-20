import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Datepicker } from '../components/datepicker/Datepicker'

export const useDatepicker = (name: string): ReactNode => {
  const { watch } = useFormContext<{ [K in typeof name]: Date | undefined }>()
  const date = watch(name) ?? new Date()
  return <Datepicker startDate={date} />
}
