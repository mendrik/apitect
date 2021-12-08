import { format } from 'date-fns'
import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Datepicker } from '../components/datepicker/Datepicker'

export const useDatepicker = (name: string): ReactNode => {
  const { watch, setValue } = useFormContext<{ [K in typeof name]: Date }>()
  const $current = watch(name)
  return (
    <Datepicker
      name={name}
      currentDate={$current}
      onDateSelected={selected => {
        setValue(name, format(selected, 'yyyy-MM-dd') as any)
      }}
    />
  )
}
