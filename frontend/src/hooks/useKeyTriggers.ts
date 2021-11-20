import { pipe, propEq, tap, when } from 'ramda'
import { RefObject, useRef } from 'react'

import { Fn } from '../shared/types/generic'
import { useEvent } from './useEvent'

type OwnProps = {
  onCancel: Fn
  onConfirm: Fn
}

const blur = tap((ev: Event) => (ev.target as HTMLElement).blur())

export const useKeyTriggers = ({ onConfirm, onCancel }: OwnProps): RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement>(null)
  useEvent('keyup', when(propEq<any>('key', 'Escape'), onCancel), ref)
  useEvent('keypress', when<any, void>(propEq<any>('key', 'Enter'), pipe(blur, onConfirm)), ref)
  useEvent('blur', onCancel, ref)
  return ref
}
