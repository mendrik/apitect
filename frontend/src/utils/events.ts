import { SyntheticEvent } from 'react'

export const stopPropagation = <E extends SyntheticEvent | Event>(e: E): E => {
  e.stopPropagation()
  return e
}

export const stopEvent = <E extends SyntheticEvent | Event>(e: E): E => {
  e.preventDefault()
  return stopPropagation(e)
}
