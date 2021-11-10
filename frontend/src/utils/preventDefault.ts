import type { SyntheticEvent } from 'react'

import { Fn } from '../shared/types/generic'

export const preventDefault = (fn: Fn) => (e: Event | SyntheticEvent) => {
  e.preventDefault()
  fn(e)
}
