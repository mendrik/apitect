import { RefObject, useCallback, useRef, useState } from 'react'

import { useEvent } from './useEvent'

export const useFocusMonitor = <T extends HTMLElement>(): [RefObject<T>, boolean] => {
  const [focus, setFocus] = useState(false)
  const ref = useRef<T>(null)

  const onFocus = useCallback(() => setFocus(true), [])
  const onBlur = useCallback(() => setFocus(false), [])

  useEvent('focus', onFocus, ref, { passive: true })
  useEvent('blur', onBlur, ref, { passive: true })

  return [ref, focus]
}
