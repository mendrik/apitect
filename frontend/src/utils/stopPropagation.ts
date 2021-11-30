import type { SyntheticEvent } from 'react'

export const stopPropagation =
  (fn: (...arg: any[]) => void = () => 0) =>
  (e: Event | SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fn(e)
  }
