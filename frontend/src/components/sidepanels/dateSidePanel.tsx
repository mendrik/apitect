import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight
} from '@tabler/icons'
import { add, format, parse, setDate, setMonth, sub } from 'date-fns'
import { useStore } from 'effector-react'
import { propOr, range } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { SyntheticEvent, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDefinedEffect } from '~hooks/useDefinedEffect'
import { NodeType } from '~shared/types/domain/nodeType'
import { DateValue } from '~shared/types/domain/values/dateValue'
import { Value } from '~shared/types/domain/values/value'
import { $selectedValue } from '~stores/$valuesStore'

import { Palette } from '../../css/colors'
import { valueUpdateFx } from '../../events/values'
import { FMT } from '../datepicker/Datepicker'
import { Month } from '../datepicker/Month'
import { Scrollable } from '../generic/Scrollable'
import { SimpleIcon } from '../generic/SimpleIcon'

const HeaderSx = styled.div`
  display: grid;
  grid-template-rows: 32px;
  grid-template-columns: 24px 24px 1fr 24px 24px;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid ${Palette.border};
  position: sticky;
  top: 0;
  background: white;
`

const FullYear = styled.ol`
  margin: 0;
  padding: 0;
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(12, 1fr);
  margin: 0 auto;

  .day[data-date='${propOr('', 'data-selected')}'] {
    background-color: ${Palette.selected};
    font-weight: 600;
    border-radius: 4px;
  }

  .day[data-date='${propOr('', 'data-today')}'] {
    color: #aa0000;
    font-weight: 600;
  }

  > li {
    padding: 0 0.5rem 0.5rem 0.5rem;
  }
`

export const DateSidePanel = () => {
  const selectedValue = useStore($selectedValue)
  const dateValue = selectedValue?.value as DateValue | null
  const [selected, setSelected] = useState<Date>(dateValue?.value ?? new Date())
  const ref = useRef<HTMLOListElement>(null)
  const months = useMemo(() => range(0, 12).map(m => setDate(setMonth(selected, m), 1)), [selected])
  useDefinedEffect(date => {
    setSelected(date)
    setTimeout(() => {
      const m = ref.current?.querySelector<HTMLDivElement>(`.day[data-date='${format(date, FMT)}']`)
      m?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
    }, 100)
  }, dateValue?.value)

  const click = (ev: SyntheticEvent<HTMLOListElement>): void => {
    const target = ev.target as HTMLElement
    if (target.matches('.day')) {
      const dateStr = target.dataset.date!
      const date = parse(dateStr, FMT, new Date())
      setSelected(date)
      const params = {
        tag: selectedValue?.tag,
        nodeId: selectedValue?.nodeId,
        nodeType: NodeType.Date
      }
      void valueUpdateFx({ ...params, value: date } as Value)
    }
  }

  return (
    <Scrollable fade>
      <HeaderSx>
        <SimpleIcon
          icon={IconChevronsLeft}
          onClick={() => setSelected(sub(selected, { years: 10 }))}
        />
        <SimpleIcon
          icon={IconChevronLeft}
          onClick={() => setSelected(sub(selected, { years: 1 }))}
        />
        <span>{format(selected, 'yyyy')}</span>
        <SimpleIcon
          icon={IconChevronRight}
          onClick={() => setSelected(add(selected, { years: 1 }))}
        />
        <SimpleIcon
          icon={IconChevronsRight}
          onClick={() => setSelected(add(selected, { years: 10 }))}
        />
      </HeaderSx>
      <FullYear
        onClick={click}
        data-selected={format(selected, FMT)}
        data-today={format(Date.now(), FMT)}
        ref={ref}
      >
        {mapIndexed(
          m => (
            <Month month={m} key={format(m, 'MM-yyyy')} />
          ),
          months
        )}
      </FullYear>
    </Scrollable>
  )
}
