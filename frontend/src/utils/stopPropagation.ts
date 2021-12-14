import type { SyntheticEvent } from 'react'
import { Fn } from '~shared/types/generic'

import { target } from './eventUtils'

export const stopPropagation =
  (fn?: Fn) =>
  <T extends Event | SyntheticEvent>(e: T) => {
    e.stopPropagation()
    fn?.(e)
  }

export const stopEvent =
  (fn?: Fn) =>
  <T extends Event | SyntheticEvent>(e: T) => {
    e.preventDefault()
    e.stopPropagation()
    fn?.(e)
  }
