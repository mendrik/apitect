import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useContext } from 'react'
import { TFuncKey, useTranslation } from 'react-i18next'

import { Milliseconds } from '../../utils/types'
import { progressContext } from '../contexts/progress'

type OwnProps = {
  localeKey: TFuncKey
  spinnerDelay?: Milliseconds
}

export const SubmitButton: FC<OwnProps> = ({ localeKey, spinnerDelay = 0.3 }) => {
  const { t } = useTranslation()
  const { working } = useContext(progressContext)

  return (
    <motion.button
      type="submit"
      disabled={working}
      className="d-flex flex-row btn btn-primary ps-2"
    >
      <AnimatePresence>
        {working && (
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
    </motion.button>
  )
}
