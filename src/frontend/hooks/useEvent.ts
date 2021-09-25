import { MutableRefObject, useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

export const useEvent = <T extends HTMLElement>(
  eventName: keyof WindowEventMap,
  fn: (...args: any[]) => any
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null)
  useEventListener(eventName, fn, ref)
  return ref
}
