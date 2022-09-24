import type { MotionProps } from 'framer-motion'

export const fullscreenScale: MotionProps = {
  initial: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: '0',
    bottom: '0',
    zIndex: 1100,
    backgroundColor: 'white',
    scale: 0,
    originX: 'var(--ox)',
    originY: 'var(--oy)'
  },
  transition: {
    type: 'spring',
    stiffness: 100,
    duration: 200
  },
  animate: {
    scale: 1
  },
  exit: {
    transition: {
      type: 'tween'
    },
    scale: 0
  }
}
