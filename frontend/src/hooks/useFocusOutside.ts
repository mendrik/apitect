import { RefObject, useEffect } from 'react'

import { Fn } from '../shared/types/generic'
import { preventDefault } from '../utils/preventDefault'

export const useFocusOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: Fn): void => {
  useEffect(() => {
    const $handler = preventDefault((ev: Event) => {
      const ae = document.activeElement
      if (!ref.current?.contains(ev.target as Element) && !ref.current?.contains(ae)) {
        handler(ev)
      }
    })
    document.addEventListener('focusin', $handler)
    document.addEventListener('click', $handler)
    return () => {
      document.removeEventListener('focusin', $handler)
      document.removeEventListener('click', $handler)
    }
  }, [ref])
}
