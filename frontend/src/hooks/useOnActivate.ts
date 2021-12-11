import { either, propEq, when } from 'ramda'
import { MutableRefObject, useRef } from 'react'
import { Fn } from '~shared/types/generic'

import { stopPropagation } from '../utils/stopPropagation'
import { useEvent } from './useEvent'

export const useOnActivate = <T extends HTMLElement>(
  onActivate: Fn
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null)
  useEvent<T>(
    'keydown',
    when<Event, void>(
      either(propEq('key', 'Enter'), propEq('code', 'Space')),
      stopPropagation(onActivate)
    ),
    ref
  )
  useEvent('click', onActivate, ref)
  return ref
}
