import { IconCalendar } from '@tabler/icons'
import { setMonth } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import i18n from 'i18next'
import { map, propEq, range, when } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import React, { FC, useMemo, useRef, useState } from 'react'
import FocusLock from 'react-focus-lock'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { fullscreenScale } from '../../animations/fullscreenScale'
import { Scrollable } from '../generic/Scrollable'

type OwnProps = {
  startDate: Date
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const bodyClasses = document.body.classList

const CalendarHead = styled.div`
  background-color: white;
  grid-column: 1 / span 2;
`

const Year = styled.ol`
  padding: 0;
  margin: 0;
`

const Months = styled.ol`
  padding: 0;
  margin: 0;
`

const Layout = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 30px 1fr;
`

const Button = styled.button`
  position: absolute;
  width: 58px;
  height: 100%;
  top: 0;
  right: 0;
  padding: 1px;
  box-shadow: none !important;
  color: #999;
  &:active {
    background-color: #efefef;
  }
`

export const Datepicker: FC<OwnProps> = ({ startDate, children, ...props }) => {
  const [date, setDate] = useState<Date>(startDate)
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const months = useMemo(() => range(0, 12).map(m => setMonth(date, m)), [date])
  const ref = useRef<HTMLButtonElement>(null)
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
    <Button
      type="button"
      className="btn appearance-none"
      onClick={openPicker}
      onKeyDown={console.log.bind(console)}
      ref={ref}
    >
      <IconCalendar className="w-4 h-4" stroke={1} />
      <FocusLock>
        <AnimatePresence>
          {open && (
            <motion.div {...fullscreenScale} role="dialog">
              <Layout>
                <CalendarHead>2021</CalendarHead>
                <Months>{map(m => m.getMonth(), months)}</Months>
                <Scrollable>
                  <Year>
                    {mapIndexed(
                      (m, idx) => (
                        <div key={idx}>{m.getMonth()}</div>
                      ),
                      months
                    )}
                  </Year>
                </Scrollable>
              </Layout>
            </motion.div>
          )}
        </AnimatePresence>
      </FocusLock>
    </Button>
  )
}
