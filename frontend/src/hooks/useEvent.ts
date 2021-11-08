import { MutableRefObject, useCallback, useEffect } from 'react'

export const useEvent = <U extends Event>(
  event: string,
  handler: (ev: U) => void,
  ref: MutableRefObject<EventTarget | null>,
  options?: boolean | AddEventListenerOptions
): void => {
  const eventListener = useCallback((ev: U) => handler(ev), [handler])

  useEffect(() => {
    const element = ref.current
    if (element != null) {
      element.addEventListener(event, eventListener as EventListener, options)
      return () =>
        element != null
          ? element.removeEventListener(event, eventListener as EventListener, options)
          : void 0
    }
  }, [ref, handler, event, options])
}
