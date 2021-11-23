import { ReactNode } from 'react'

import { Datepicker } from '../components/datepicker/Datepicker'

export const useDatepicker = (name: string): ReactNode => {
  return <Datepicker name={name} />
}
