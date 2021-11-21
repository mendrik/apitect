import clsx from 'clsx'
import {
  addDays,
  format,
  getDay,
  isAfter,
  isSameDay,
  isToday,
  lastDayOfMonth,
  setDay
} from 'date-fns'
import { range, reduce, take } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import styled from 'styled-components'

import { Jsx } from '../../shared/types/generic'

type OwnProps = {
  selected: [Date, Dispatch<SetStateAction<Date>>]
  month: Date
}

const Wrap = styled.li`
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
    pointer-events: none;
    cursor: default;
  }
  &.today {
    color: #aa0000;
    font-weight: 600;
  }
  &.selected:not(.off) {
    background-color: #0d6efd;
    color: white;
    font-weight: 600;
    border-radius: 4px;
  }
`

export const Month = ({ month, selected }: Jsx<OwnProps>) => {
  const [sel, setSelected] = selected

  const days = useMemo(() => {
    const firstDate = setDay(month, 1)
    const $lastDate = lastDayOfMonth(month)
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
              selected: isSameDay(sel, d),
              off: d.getMonth() !== month.getMonth()
            })}
            onClick={() => setSelected(d)}
          >
            {format(d, 'd')}
          </Day>
        ),
        days
      )}
    </Wrap>
  )
}
