import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { HTMLAttributes } from 'react'

import { delayedBlendIn } from '../../animations/delayedBlendIn'
import { ReactComponent as LoadingSvg } from '../../assets/loader.svg'
import { Jsx } from '../../shared/types/generic'

type OwnProps = HTMLAttributes<HTMLDivElement>

export const Loader = ({ className, ...props }: Jsx<OwnProps>) => {
  return (
    <div
      className={clsx('d-flex w-100 justify-content-center align-items-center', className)}
      {...props}
    >
      <motion.div {...delayedBlendIn} style={{ width: 50, height: 50 }}>
        <LoadingSvg />
      </motion.div>
    </div>
  )
}
