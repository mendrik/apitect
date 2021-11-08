import type { SyntheticEvent as Event } from 'react'

import { Fn } from '../shared/types/generic'

export const preventDefault = (fn: Fn) => (e: Event) => {
  e.preventDefault()
  fn(e)
}
