import { CustomValueType } from 'framer-motion'
import { MotionProps } from 'framer-motion/types/motion/types'

export const fullscreenScale: MotionProps = {
  initial: {
    transitionProperty: 'all',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1100,
    backgroundColor: 'white',
    scale: 0,
    border: '1px solid black',
    originX: 'var(--ox)',
    originY: 'var(--oy)'
  },
  transition: {
    type: 'spring',
    stiffness: 200
  },
  animate: {
    border: '1px solid transparent',
    scale: 1
  },
  exit: {
    opacity: 0
  }
}
