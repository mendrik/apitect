import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { FC, HTMLAttributes } from 'react'

import { ReactComponent as LoadingSvg } from '../../assets/loader.svg'

type OwnProps = HTMLAttributes<HTMLDivElement>

export const Loader: FC<OwnProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx('d-flex w-100 justify-content-center align-items-center', className)}
      {...props}
    >
      <motion.div
        className="icon"
        initial={{
          opacity: 0
        }}
        animate={{ opacity: 1 }}
        transition={{ transitionProperty: 'opacity', delay: 200 }}
        exit={{ opacity: 0, visibility: 'hidden' }}
      >
        <LoadingSvg />
      </motion.div>
    </div>
  )
}
