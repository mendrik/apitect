import { MutableRefObject, RefObject, useEffect } from 'react'

export const useEvent = <T extends HTMLElement>(
  event: string,
  handler: EventListener,
  ref: MutableRefObject<T | null>,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    const element = ref.current
    element?.addEventListener(event, handler, options)
    return () => element?.removeEventListener(event, handler, options)
  }, [ref, event, handler, options])
}
