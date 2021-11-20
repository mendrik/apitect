import { MutableRefObject, RefObject, useEffect, useRef } from 'react'

export const useEvent = <T extends HTMLElement>(
  event: string,
  handler: EventListener,
  ref?: RefObject<T>,
  options?: boolean | AddEventListenerOptions
): MutableRefObject<T | null> => {
  const r = ref ?? useRef<T>(null)
  useEffect(() => {
    const element = r.current
    element?.addEventListener(event, handler, options)
    return () => element?.removeEventListener(event, handler, options)
  }, [r, event, handler, options])
  return r
}
