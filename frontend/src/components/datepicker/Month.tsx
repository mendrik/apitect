import clsx from 'clsx'
import { addDays, format, getDay, isAfter, isToday, lastDayOfMonth, setDay } from 'date-fns'
import { range, reduce, take } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  month: Date
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: black;
  padding: 0 1rem 1.5rem 1rem;
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
`
const Day = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  &.off {
    color: #b3b3b3;
  }
  &.today {
    font-weight: 600;
  }
`

export const Month = ({ month, children }: Jsx<OwnProps>) => {
  const days = useMemo(() => {
    const firstDate = setDay(month, 1)
    const $lastDate = lastDayOfMonth(month)
    console.log($lastDate, getDay($lastDate))
    const lastDate = getDay($lastDate) === 0 ? setDay($lastDate, 1) : setDay($lastDate, 8)
    return reduce(
      (acc, i) => {
        const d = addDays(firstDate, i)
        return isAfter(d, lastDate) ? acc : [...acc, d]
      },
      [] as Date[],
      range(0, 42)
    )
  }, [month])

  return (
    <Wrap>
      <MonthHead>{format(month, 'LLLL')}</MonthHead>
      {mapIndexed(
        d => (
          <Week key={format(d, 'e')}>{format(d, 'eeeeee')}</Week>
        ),
        take(7, days)
      )}
      {mapIndexed(
        d => (
          <Day
            key={format(d, 'd.M')}
            tabIndex={0}
            className={clsx({
              today: isToday(d),
              off: d.getMonth() !== month.getMonth()
            })}
          >
            {format(d, 'd')}
          </Day>
        ),
        days
      )}
    </Wrap>
  )
}
