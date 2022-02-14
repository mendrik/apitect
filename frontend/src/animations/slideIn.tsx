import { TransitionComponent } from '@restart/ui/types'
import { motion } from 'framer-motion'
import { MotionProps } from 'framer-motion/types/motion/types'
import React from 'react'

export const slideIn: MotionProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transitionDelay: '500ms',
    transitionDuration: '1s'
  },
  exit: {
    opacity: 0,
    visibility: 'hidden'
  }
}

export const SlideInTransitionComponent: TransitionComponent = ({ children }) => (
  <motion.div {...slideIn}>{children}</motion.div>
)
