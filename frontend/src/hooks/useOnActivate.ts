import { when } from 'ramda'
import { MutableRefObject, useRef } from 'react'
import { Fn } from '~shared/types/generic'

import { spaceOrEnter } from '../utils/eventUtils'
import { stopPropagation } from '../utils/stopPropagation'
import { useEvent } from './useEvent'

export const useOnActivate = <T extends HTMLElement>(
  onActivate: Fn
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null)
  useEvent<T>('keydown', when(spaceOrEnter, stopPropagation(onActivate)), ref)
  useEvent('click', onActivate, ref)
  return ref
}
