import { MotionProps } from 'framer-motion/types/motion/types'

export const delayedBlendIn: MotionProps = {
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
