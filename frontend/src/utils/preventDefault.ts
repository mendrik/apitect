import type { SyntheticEvent } from 'react'

export const preventDefault = (fn?: (...arg: any[]) => void) => (e: Event | SyntheticEvent) => {
  e.preventDefault()
  fn?.(e)
}
