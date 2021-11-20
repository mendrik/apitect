import { IconCalendar } from '@tabler/icons'
import clsx from 'clsx'
import { addYears, format, isThisYear, setDate, setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { propEq, range, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import FocusLock from 'react-focus-lock'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { ButtonRow } from '../../forms/ButtonRow'
import { Jsx } from '../../shared/types/generic'
import { Scrollable } from '../generic/Scrollable'
import { VerticalFade } from '../generic/VerticalFade'
import { Month } from './Month'

type OwnProps = {
  startDate: Date
}

const Layout = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  max-height: 100vh;
  width: 100vw;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr max-content;
`

const Years = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  grid-column: 1;
  grid-row: 1;
  padding: 0 0.5rem;
`

const Year = styled.li`
  font-weight: 300;
  padding: 0.25rem 0;

  &.currentYear {
    color: black;
    font-weight: 600;
  }
`

const FullYear = styled.ol`
  margin: 0;
  padding: 0;
  grid-column: 2;
  grid-row: 1;
`

const GridButtonRow = styled(ButtonRow)`
  grid-column: 1 / span 2;
  grid-row: 2;
`

const CalendarButton = styled.div`
  position: absolute;
  width: 58px;
  height: 100%;
  top: 0;
  right: 0;
  padding: 1px;
  box-shadow: none !important;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const Datepicker = ({ startDate, children, ...props }: Jsx<OwnProps>) => {
  const [currentDate, setCurrentDate] = useState<Date>(startDate)
  const [selectedDate, setSelectedDate] = useState<Date>(startDate)
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const months = useMemo(
    () => range(0, 12).map(m => setDate(setMonth(currentDate, m), 1)),
    [currentDate]
  )
  const years = useMemo(() => range(-60, 20).map(y => addYears(currentDate, y)), [currentDate])
  const ref = useRef<HTMLDivElement>(null)

  const openPicker = () => {
    if (ref.current != null && !open) {
      const view = ref.current?.getBoundingClientRect()
      const x = (view.x + view.width / 2) / window.innerWidth
      const y = (view.y + view.height / 2) / window.innerHeight
      ref.current.style.setProperty('--ox', `${(x * 100).toFixed(2)}%`)
      ref.current.style.setProperty('--oy', `${(y * 100).toFixed(2)}%`)
      setOpen(true)
    }
  }

  useLayoutEffect(() => {
    if (ref.current != null && open) {
      const year = ref.current.querySelector<HTMLDivElement>('.currentYear')
      if (year) {
        setTimeout(
          () => year.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' }),
          0
        )
      }
    }
  }, [currentDate, open])

  const onEscape = when(propEq('code', 'Escape'), () => setOpen(false))

  return (
    <CalendarButton onClick={openPicker} onKeyDown={onEscape} ref={ref} {...props}>
      <IconCalendar className="w-4 h-4" stroke={1} />
      <FocusLock>
        <AnimatePresence>
          {open && (
            <motion.div {...fullscreenScale} role="dialog">
              <Layout>
                <VerticalFade>
                  <Scrollable>
                    <Years>
                      {mapIndexed(
                        y => (
                          <Year
                            key={format(y, 'yyyy')}
                            className={clsx({ currentYear: isThisYear(y) })}
                            onClick={() => setCurrentDate(y)}
                          >
                            {format(y, 'yyyy')}
                          </Year>
                        ),
                        years
                      )}
                    </Years>
                  </Scrollable>
                </VerticalFade>
                <VerticalFade>
                  <Scrollable>
                    <FullYear>
                      {mapIndexed(
                        m => (
                          <Month month={m} key={format(m, 'dd.MM.yyyy')} />
                        ),
                        months
                      )}
                    </FullYear>
                  </Scrollable>
                </VerticalFade>
                <GridButtonRow className="p-2">
                  <Button variant="outline-secondary" onClick={() => setOpen(false)}>
                    {t('common.cancel')}
                  </Button>
                  <Button variant="primary">Select</Button>
                </GridButtonRow>
              </Layout>
            </motion.div>
          )}
        </AnimatePresence>
      </FocusLock>
    </CalendarButton>
  )
}
