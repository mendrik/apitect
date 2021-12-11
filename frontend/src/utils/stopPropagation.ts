import type { SyntheticEvent } from 'react'
import { Fn } from '~shared/types/generic'

export const stopPropagation =
  (fn: Fn = () => 0) =>
  <T extends Event | SyntheticEvent>(e: T) => {
    e.preventDefault()
    e.stopPropagation()
    fn(e)
  }
