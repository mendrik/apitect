import { IconCalendar } from '@tabler/icons'
import clsx from 'clsx'
import { addYears, format, isSameYear, isValid, parse, setDate, setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { cond, propEq, propOr, propSatisfies, range, when } from 'ramda'
import { included, mapIndexed } from 'ramda-adjunct'
import React, {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ButtonRow } from '~forms/ButtonRow'
import { ArgFn, Jsx } from '~shared/types/generic'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { Palette } from '../../css/colors'
import { stopPropagation } from '../../utils/stopPropagation'
import { Scrollable } from '../generic/Scrollable'
import { Month } from './Month'

const FMT = 'dd-MM-yyyy'

type OwnProps = {
  onDateSelected: ArgFn<Date>
  currentDate: Date
  iconSize?: number
  stroke?: number
} & HTMLAttributes<HTMLDivElement>

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

  .day[data-date='${propOr('', 'data-selected')}'] {
    background-color: ${Palette.selected};
    font-weight: 600;
    border-radius: 4px;
  }

  .day[data-date='${propOr('', 'data-today')}'] {
    color: #aa0000;
    font-weight: 600;
  }
`

const GridButtonRow = styled(ButtonRow)`
  grid-column: 1 / span 2;
  grid-row: 2;
`

const CalendarButton = styled.div`
  padding: 1px;
  box-shadow: none !important;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const Datepicker = ({
  currentDate: $current,
  children,
  onDateSelected,
  iconSize = 20,
  stroke = 1,
  ...props
}: Jsx<OwnProps>) => {
  const { t } = useTranslation()
  const currentDate: Date = useMemo(() => (isValid($current) ? $current : new Date()), [$current])
  const [selected, setSelected] = useState<Date>(currentDate)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const doc = document.documentElement
    if (open) {
      if (doc.scrollHeight > doc.clientHeight) {
        doc.classList.add('datepicker-open')
      }
      setSelected(currentDate)
    } else {
      doc.classList.remove('datepicker-open')
    }
  }, [open, currentDate])

  const months = useMemo(() => range(0, 12).map(m => setDate(setMonth(selected, m), 1)), [selected])
  const years = useMemo(() => range(-60, 20).map(y => addYears(selected, y)), [selected])
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

  const afterOpen = () =>
    setTimeout(() => {
      scrollYear()
      const m = ref.current?.querySelector<HTMLDivElement>(
        `.day[data-date='${format(selected, FMT)}']`
      )
      m?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
      m?.focus()
    }, 1)

  const onEscape = when<KeyboardEvent<HTMLDivElement>, void>(
    propEq('code', 'Escape'),
    stopPropagation(() => setOpen(false))
  )

  const click = (ev: MouseEvent<HTMLOListElement>): void => {
    const target = ev.target as HTMLElement
    if (target.matches('.day')) {
      const dateStr = target.dataset.date!
      setSelected(parse(dateStr, FMT, new Date()))
    }
  }

  const keyMap = cond([
    [propEq('code', 'Space'), click],
    [
      propSatisfies(
        included(['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']),
        'code'
      ),
      e => e.stopPropagation()
    ]
  ])

  return (
    <CalendarButton
      onClick={openPicker}
      onKeyDown={onEscape}
      ref={ref}
      {...props}
      className="calendar-icon"
    >
      <IconCalendar className="w-4 h-4" size={iconSize} stroke={stroke} />
      <AnimatePresence>
        {open && (
          <motion.div {...fullscreenScale} role="dialog" onAnimationStart={afterOpen}>
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
                <FullYear
                  onClick={click}
                  onKeyDown={keyMap}
                  data-selected={format(selected, FMT)}
                  data-today={format(Date.now(), FMT)}
                >
                  {mapIndexed(
                    m => (
                      <Month month={m} key={format(m, 'MM-yyyy')} />
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
                    onDateSelected(selected)
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
