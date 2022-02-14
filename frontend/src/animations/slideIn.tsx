import { TransitionComponent } from '@restart/ui/types'
import { motion } from 'framer-motion'
import { MotionProps } from 'framer-motion/types/motion/types'
import React from 'react'

export const slideIn: MotionProps = {
  initial: {
    transform: 'all',
    translateX: '100%'
  },
  animate: {
    translateX: 0,
    transitionDuration: '0.3s'
  },
  exit: {
    opacity: 0
  }
}

export const SlideInTransitionComponent: TransitionComponent = ({ children }) => (
  <motion.div {...slideIn}>{children}</motion.div>
)
