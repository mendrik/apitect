import clsx from 'clsx'
import { format } from 'date-fns'
import styled from 'styled-components'

type OwnProps = {
  day: Date
  month: Date
}

const DaySx = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  max-width: 40px;
  cursor: pointer;

  &.off {
    color: transparent;
    pointer-events: none;
    cursor: default;
  }
`

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
