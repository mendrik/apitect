import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext } from 'react'
import { Jsx, Milliseconds } from 'shared/types/generic'

import { progressContext } from '../../contexts/withProgress'

type OwnProps = {
  spinnerDelay?: Milliseconds
  promise: string
}

export const Spinner = ({ promise, spinnerDelay = 0.4 }: Jsx<OwnProps>) => {
  const { isWorking } = useContext(progressContext)

  return (
    <AnimatePresence>
      {isWorking(promise) && (
        <motion.div
          initial={{
            width: 0,
            height: 24,
            overflow: 'hidden'
          }}
          animate={{ width: 24 }}
          transition={{ transitionProperty: 'width', delay: spinnerDelay }}
          exit={{ width: 0, visibility: 'hidden' }}
        >
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="visually-hidden">Loading...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
