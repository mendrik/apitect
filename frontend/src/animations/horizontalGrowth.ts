import { AnimationProps } from 'framer-motion'

export const horizontalGrowth: AnimationProps = {
  exit: {
    width: 0
  },
  animate: {
    width: '100%'
  },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 50
  }
}
