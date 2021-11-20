import { IconCalendar } from '@tabler/icons'
import { format, setDate, setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import i18n from 'i18next'
import { propEq, range, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import FocusLock from 'react-focus-lock'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { ButtonRow } from '../../forms/ButtonRow'
import { Scrollable } from '../generic/Scrollable'
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
  grid-template-rows: max-content 1fr max-content;
`

const CalendarHead = styled.div`
  background-color: white;
  grid-column: 1 / span 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  color: black;
  padding: 0.5rem 1rem;
  border-bottom: 1px dotted #666;
`

const Years = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  grid-column: 1;
  grid-row: 2;
  padding: 0 0 0 0.5rem;
`

const Year = styled.ol`
  margin: 0;
  grid-column: 2;
  grid-row: 2;
`

const GridButtonRow = styled(ButtonRow)`
  grid-column: 1 / span 2;
  grid-row: 3;
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

export const Datepicker: FC<OwnProps> = ({ startDate, children, ...props }) => {
  const [date, setCurrentDate] = useState<Date>(startDate)
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const months = useMemo(() => range(0, 12).map(m => setDate(setMonth(date, m), 1)), [date])
  const ref = useRef<HTMLDivElement>(null)
  const locale = i18n.language

  const openPicker = () => {
    if (ref.current != null) {
      const view = ref.current?.getBoundingClientRect()
      const x = (view.x + view.width / 2) / window.innerWidth
      const y = (view.y + view.height / 2) / window.innerHeight
      ref.current.style.setProperty('--ox', `${(x * 100).toFixed(2)}%`)
      ref.current.style.setProperty('--oy', `${(y * 100).toFixed(2)}%`)
      setOpen(true)
    }
  }

  const onEscape = when(propEq('code', 'Escape'), () => setOpen(false))

  return (
    <CalendarButton onClick={openPicker} onKeyDown={console.log.bind(console)} ref={ref}>
      <IconCalendar className="w-4 h-4" stroke={1} />
      <FocusLock>
        <AnimatePresence>
          {open && (
            <motion.div {...fullscreenScale} role="dialog">
              <Layout>
                <CalendarHead>2021</CalendarHead>
                <Scrollable>
                  <Years>
                    <li>2016</li>
                    <li>2017</li>
                    <li>2018</li>
                    <li>2019</li>
                    <li>2020</li>
                    <li>2024</li>
                  </Years>
                </Scrollable>
                <div className="vertical-fade">
                  <Scrollable>
                    <Year>
                      {mapIndexed(
                        m => (
                          <Month month={m} key={format(m, 'dd.MM.yyyy')} />
                        ),
                        months
                      )}
                    </Year>
                  </Scrollable>
                </div>
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
