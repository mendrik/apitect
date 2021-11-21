import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Datepicker } from '../components/datepicker/Datepicker'

export const useDatepicker = (name: string): ReactNode => {
  return <Datepicker name={name} />
}
