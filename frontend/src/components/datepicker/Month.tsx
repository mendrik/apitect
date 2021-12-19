import { addDays, format, getDay, isAfter, lastDayOfMonth, setDay } from 'date-fns'
import { range, reduce, take } from 'ramda'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { Day } from './Day'

type OwnProps = {
  month: Date
}

const Wrap = styled.li`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: black;
  user-select: none;
  &:last-child {
    padding-bottom: 0;
  }
`

const MonthHead = styled.div`
  grid-column: 1 / span 7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 30px;
`

const Week = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-weight: 300;
  color: #b3b3b3;
  border-bottom: 0.5pt solid #cecece;
  margin-bottom: 1px;
}
`

export const Month = ({ month }: Jsx<OwnProps>, monthStr = format(month, 'MM-yyyy')) =>
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
