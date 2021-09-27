import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { TFuncKey, useTranslation } from 'react-i18next'

import { Milliseconds } from '../../utils/types'
import { progressContext } from '../contexts/progress'
import { formWrappingContext } from './Form'

type OwnProps = {
  localeKey: TFuncKey
  spinnerDelay?: Milliseconds
}

export const SubmitButton: FC<OwnProps> = ({ localeKey, spinnerDelay = 0.3 }) => {
  const { t } = useTranslation()
  const { promise } = useContext(formWrappingContext)
  const { isWorking } = useContext(progressContext)
  return (
    <Button
      type="submit"
      disabled={isWorking(promise)}
      variant="primary"
      className="d-flex flex-row ps-2"
    >
      <AnimatePresence>
        {isWorking(promise) && (
          <motion.span
            className="d-inline-block"
            initial={{
              width: 0,
              overflow: 'hidden'
            }}
            animate={{ width: 24 }}
            transition={{ transitionProperty: 'width', delay: spinnerDelay }}
            exit={{ width: 0, visibility: 'hidden' }}
          >
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span className="visually-hidden">Loading...</span>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="ms-1">{t(localeKey)}</span>
    </Button>
  )
}
