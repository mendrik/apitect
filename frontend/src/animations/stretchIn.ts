import { MotionProps } from 'framer-motion/types/motion/types'

export const stretchIn: MotionProps = {
  initial: {
    width: 0,
    flex: 'auto 1 1'
  },
  transition: {
    type: 'tween'
  },
  animate: {
    width: 300
  },
  exit: {
    width: 0
  }
}
