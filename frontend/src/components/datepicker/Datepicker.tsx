import { IconCalendar } from '@tabler/icons'
import clsx from 'clsx'
import { addYears, format, isSameYear, isValid, parse, setDate, setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { cond, pipe, range, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { HTMLAttributes, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ArgFn } from '~shared/types/generic'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { codeIn } from '../../utils/eventUtils'
import { stopEvent, stopPropagation } from '../../utils/events'
import { Scrollable } from '../generic/Scrollable'
import { SimpleIcon } from '../generic/SimpleIcon'
import { Month } from './Month'
import { CalendarButton } from './styled/CalendarButton'
import { FullYear } from './styled/FullYear'
import { GridButtonRow } from './styled/GridButtonRow'
import { Layout } from './styled/Layout'
import { Year } from './styled/Year'
import { Years } from './styled/Years'

export const FMT = 'dd-MM-yyyy'

type OwnProps = {
  onDateSelected: ArgFn<Date>
  currentDate: Date
  iconSize?: number
  stroke?: number
} & HTMLAttributes<HTMLDivElement>

const bodyCls = document.body.classList

export const Datepicker = ({
  currentDate: $current,
  onDateSelected,
  color,
  iconSize = 20,
  stroke = 1,
  ...props
}: OwnProps) => {
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
      bodyCls.add('datepicker-open')
      const view = ref.current?.getBoundingClientRect()
      const x = (view.x + view.width / 2) / window.innerWidth
      const y = (view.y + view.height / 2) / window.innerHeight
      ref.current.style.setProperty('--ox', `${(x * 100).toFixed(2)}%`)
      ref.current.style.setProperty('--oy', `${(y * 100).toFixed(2)}%`)
      setOpen(true)
    }
  }

  const closePicker = () => {
    bodyCls.remove('datepicker-open')
    setOpen(false)
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

  const onEscape = when(codeIn('Escape'), pipe(stopPropagation, closePicker))

  const click = (ev: SyntheticEvent<HTMLOListElement>): void => {
    const target = ev.target as HTMLElement
    if (target.matches('.day')) {
      const dateStr = target.dataset.date!
      setSelected(parse(dateStr, FMT, new Date()))
    }
  }

  const keyMap = cond([
    [codeIn('Space'), click],
    [codeIn('Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'), stopPropagation]
  ])

  return (
    <CalendarButton
      onMouseDown={pipe(stopEvent, openPicker)}
      onKeyDown={onEscape}
      ref={ref}
      {...props}
      className="calendar-icon"
    >
      <SimpleIcon icon={IconCalendar} size={iconSize} stroke={stroke} color={color} />
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
                <Button variant="outline-secondary" onClick={closePicker}>
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onDateSelected(selected)
                    closePicker()
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
