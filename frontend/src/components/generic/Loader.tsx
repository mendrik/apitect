import clsx from 'clsx'
import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'

import { delayedBlendIn } from '../../animations/delayedBlendIn'
import { ReactComponent as LoadingSvg } from '../../assets/loader.svg'

type OwnProps = { delay?: boolean } & HTMLAttributes<HTMLDivElement>

export const Loader = ({ className, delay = false, ...props }: OwnProps) => (
  <div
    className={clsx('d-flex w-100 justify-content-center align-items-center', className)}
    {...props}
  >
    <motion.div {...(delay ? delayedBlendIn : {})} style={{ width: 50, height: 50 }}>
      <LoadingSvg />
    </motion.div>
  </div>
)
