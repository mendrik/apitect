import clsx from 'clsx'
import { format } from 'date-fns'

import { DaySx } from './styled/DaySx'

type OwnProps = {
  day: Date
  month: Date
}

export const Day = ({ day, month }: OwnProps) => {
  const key = format(day, 'dd-MM-yyyy')
  const dayNumber = day.getDate()
  const off = day.getMonth() !== month.getMonth()
  return (
    <DaySx
      tabIndex={off ? -1 : 0}
      className={clsx('day', { off })}
      data-date={off ? undefined : key}
    >
      {dayNumber}
    </DaySx>
  )
}
