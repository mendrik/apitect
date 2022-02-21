import { MotionProps } from 'framer-motion/types/motion/types'
import React from 'react'

export const slideIn: MotionProps = {
  initial: {
    translateX: '100%'
  },
  transition: {
    type: 'spring',
    stiffness: 75
  },
  animate: {
    translateX: '0%'
  },
  exit: {
    translateX: [null, '105%']
  }
}
