import { IconCalendar } from '@tabler/icons'
import clsx from 'clsx'
import { addYears, format, isSameYear, isValid, setDate, setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { propEq, range, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Jsx } from '~shared/types/generic'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { ButtonRow } from '../forms/ButtonRow'
import { Scrollable } from '../generic/Scrollable'
import { Month } from './Month'

type OwnProps = {
  name: string
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(12, 1fr);
  margin: 0 auto;

  @media only screen and (min-width: 560px) {
    align-items: flex-start;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
  }

  @media only screen and (min-width: 769px) {
    max-width: 1024px;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media only screen and (min-width: 1380px) {
    max-width: 1400px;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
  }
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

export const Datepicker = ({ name, children, ...props }: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<{ [K in typeof name]: Date }>()
  const $current = watch(name)
  const currentDate: Date = isValid($current) ? $current : new Date()
  const [selected, setSelected] = useState<Date>(currentDate)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.classList.add('datepicker-open')
      setSelected(currentDate)
    } else {
      document.body.classList.remove('datepicker-open')
    }
  }, [open])

  const months = useMemo(
    () => range(0, 12).map(m => setDate(setMonth(selected, m), 1)),
    [open, selected]
  )
  const years = useMemo(() => range(-60, 20).map(y => addYears(selected, y)), [open, selected])
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

  const scrollYear = () =>
    ref.current
      ?.querySelector<HTMLDivElement>('.currentYear')
      ?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })

  useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        scrollYear()
        const m = ref.current?.querySelector<HTMLDivElement>('.selected')
        m?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
        m?.focus()
      }, 0)
    }
  }, [open])

  const onEscape = when(propEq('code', 'Escape'), () => setOpen(false))

  return (
    <CalendarButton onClick={openPicker} onKeyDown={onEscape} ref={ref} {...props}>
      <IconCalendar className="w-4 h-4" stroke={1} />
      <AnimatePresence>
        {open && (
          <motion.div {...fullscreenScale} role="dialog">
            <Layout>
              <Scrollable fade>
                <Years>
                  {mapIndexed(
                    year => (
                      <Year
                        key={format(year, 'yyyy')}
                        className={clsx({ currentYear: isSameYear(year, selected) })}
                        onClick={() => {
                          setSelected(year)
                          scrollYear()
                        }}
                      >
                        {format(year, 'yyyy')}
                      </Year>
                    ),
                    years
                  )}
                </Years>
              </Scrollable>
              <Scrollable fade>
                <FullYear>
                  {mapIndexed(
                    m => (
                      <Month
                        month={m}
                        key={format(m, 'dd.MM.yyyy')}
                        selected={[selected, setSelected]}
                      />
                    ),
                    months
                  )}
                </FullYear>
              </Scrollable>
              <GridButtonRow className="p-2">
                <Button variant="outline-secondary" onClick={() => setOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setValue(name, format(selected, 'yyyy-MM-dd') as any)
                    setOpen(false)
                  }}
                >
                  Select
                </Button>
              </GridButtonRow>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </CalendarButton>
  )
}
