import { Variants } from 'framer-motion'

import { detailsPanelSize } from '../constants'

export const stretchIn: Variants = {
  open: {
    width: '100%'
  },
  close: {
    width: `calc(100% + ${detailsPanelSize}px)`
  }
}
