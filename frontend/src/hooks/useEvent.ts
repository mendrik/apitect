import { MutableRefObject, useEffect } from 'react'

export const useEvent = (
  event: string,
  handler: EventListener,
  ref: MutableRefObject<EventTarget | null>,
  options?: boolean | AddEventListenerOptions
): void => {
  useEffect(() => {
    const element = ref.current
    console.log(`Registering event ${event}`)
    element?.addEventListener(event, handler, options)
    return () => element?.removeEventListener(event, handler, options)
  }, [ref, event, handler, options])
}
