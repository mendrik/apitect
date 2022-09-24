import { RefObject, useLayoutEffect } from 'react'

export const useFocus = (ref: RefObject<HTMLElement>) => {
  useLayoutEffect(() => {
    ref.current?.focus()
  }, [ref])
}
