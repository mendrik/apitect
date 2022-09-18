import { format, parse } from 'date-fns'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Datepicker } from '../components/datepicker/Datepicker'

export const useDatepicker = (name: string): ReactNode => {
  const { control, setValue } = useFormContext<{ [K in typeof name]: string }>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Datepicker
          currentDate={parse(field.value, 'yyyy-MM-dd', new Date())}
          onDateSelected={selected => setValue(name, format(selected, 'yyyy-MM-dd'))}
          className="position-absolute"
          style={{
            right: 10,
            top: 13,
            width: 40
          }}
          iconSize={28}
        />
      )}
    />
  )
}
