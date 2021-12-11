import clsx from 'clsx'
import { format, isSameDay, isToday } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import { useOnActivate } from '~hooks/useOnActivate'
import { Jsx, UseState } from '~shared/types/generic'

import { Palette } from '../../css/colors'

type OwnProps = {
  day: Date
  month: Date
  selected: UseState<Date>
}

const DaySx = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  max-width: 40px;

  &.off {
    color: transparent;
    pointer-events: none;
    cursor: default;
  }
  &.today {
    color: #aa0000;
    font-weight: 600;
  }
  &.selected:not(.off) {
    background-color: ${Palette.selected};
    font-weight: 600;
    border-radius: 4px;
  }
`

export const Day = ({ day, month, selected }: Jsx<OwnProps>) => {
  const [sel, setSelected] = selected

  const onActivateRef = useOnActivate<HTMLDivElement>(() => setSelected(day))

  return (
    <DaySx
      key={format(day, 'd.M')}
      tabIndex={day.getMonth() === month.getMonth() ? 0 : -1}
      className={clsx({
        today: isToday(day),
        selected: isSameDay(sel, day),
        off: day.getMonth() !== month.getMonth()
      })}
      ref={onActivateRef}
    >
      {format(day, 'd')}
    </DaySx>
  )
}
