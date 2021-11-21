import { either, propEq, when } from 'ramda'
import { RefObject, useRef } from 'react'

import { Fn } from '../shared/types/generic'
import { useEvent } from './useEvent'

export const useOnActivate = <T extends HTMLElement>(onActivate: Fn): RefObject<T> => {
  const ref = useRef<T>(null)
  useEvent(
    'keydown',
    when<any, void>(either(propEq<any>('key', 'Enter'), propEq<any>('code', 'Space')), onActivate),
    ref
  )
  useEvent('click', onActivate, ref)
  return ref
}
