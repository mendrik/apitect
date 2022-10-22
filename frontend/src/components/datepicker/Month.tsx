import { addDays, format, getDay, isAfter, lastDayOfMonth, setDay } from 'date-fns'
import { range, reduce, take } from 'ramda'
import { useMemo } from 'react'

import { Day } from './Day'
import { MonthHead } from './styled/MonthHead'
import { Week } from './styled/Week'
import { Wrap } from './styled/Wrap'

type OwnProps = {
  month: Date
}

export const Month = ({ month }: OwnProps, monthStr = format(month, 'MM-yyyy')) =>
  useMemo(() => {
    const firstDate = setDay(month, 1)
    const $lastDate = lastDayOfMonth(month)
    const lastDate = getDay($lastDate) === 0 ? setDay($lastDate, 1) : setDay($lastDate, 8)
    const days = reduce(
      (acc, i) => {
        const d = addDays(firstDate, i)
        return isAfter(d, lastDate) ? acc : [...acc, d]
      },
      [] as Date[],
      range(0, 42)
    )
    return (
      <Wrap>
        <MonthHead>{format(month, 'LLLL')}</MonthHead>
        {take(7, days).map(d => (
          <Week key={format(d, 'e')}>{format(d, 'eeeeee')}</Week>
        ))}
        {days.map(
          d => (
            <Day key={format(d, 'd.M.yyyy')} day={d} month={month} />
          ),
          days
        )}
      </Wrap>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthStr])
