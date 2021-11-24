import type { SyntheticEvent } from 'react'

export const stopPropagation = (fn: (...arg: any[]) => void) => (e: Event | SyntheticEvent) => {
  e.preventDefault()
  e.stopPropagation()
  fn(e)
}
