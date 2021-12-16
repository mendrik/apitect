import { Variants } from 'framer-motion'

import { arrayPanelSize } from '../constants'

export const stretchIn: Variants = {
  open: {
    width: '100%'
  },
  close: {
    width: `calc(100% + ${arrayPanelSize}px)`
  }
}
