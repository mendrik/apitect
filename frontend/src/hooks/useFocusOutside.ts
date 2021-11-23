import { RefObject, useEffect } from 'react'

import { Fn } from '../shared/types/generic'

export const useFocusOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: Fn): void => {
  useEffect(() => {
    const $handler = (ev: Event) => {
      if (!ref.current?.contains(document.activeElement)) {
        handler(ev)
      }
    }
    document.addEventListener('focusin', $handler)
    document.addEventListener('click', $handler)
    return () => {
      document.removeEventListener('focusin', $handler)
      document.removeEventListener('click', $handler)
    }
  }, [ref])
}
