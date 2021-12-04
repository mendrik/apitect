import { either, propEq, when } from 'ramda'
import { RefObject, useRef } from 'react'
import { Fn } from '~shared/types/generic'

import { stopPropagation } from '../utils/stopPropagation'
import { useEvent } from './useEvent'

export const useOnActivate = <T extends HTMLElement>(
  onActivate: Fn,
  ref = useRef<T>(null)
): RefObject<T> => {
  useEvent(
    'keydown',
    when<any, void>(
      either(propEq<any>('key', 'Enter'), propEq<any>('code', 'Space')),
      stopPropagation(onActivate)
    ),
    ref
  )
  useEvent('click', onActivate, ref)
  return ref
}
