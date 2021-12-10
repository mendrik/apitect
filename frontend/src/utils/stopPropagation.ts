import type { SyntheticEvent } from 'react'

export const stopPropagation =
  (fn: (...arg: any[]) => void = () => 0) =>
  <T extends Event | SyntheticEvent>(e: T) => {
    e.preventDefault()
    e.stopPropagation()
    fn(e)
  }
