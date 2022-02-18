import { MotionProps } from 'framer-motion/types/motion/types'
import React from 'react'

export const slideIn: MotionProps = {
  initial: {
    translateX: '100%'
  },
  transition: {
    type: 'spring',
    stiffness: 75,
    duration: 100
  },
  animate: {
    translateX: 0
  },
  exit: {
    translateX: '105%'
  }
}
