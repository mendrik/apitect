import { MotionProps } from 'framer-motion/types/motion/types'

export const fullscreenScale: MotionProps = {
  initial: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1100,
    backgroundColor: 'white',
    scale: 0,
    originX: 'var(--ox)',
    originY: 'var(--oy)'
  },
  transition: {
    type: 'spring',
    stiffness: 200,
    bounce: 50
  },
  animate: {
    scale: 1,
    border: 'none'
  },
  exit: {
    opacity: 0
  }
}
