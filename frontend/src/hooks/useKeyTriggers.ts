import { pipe, propEq, tap, when } from 'ramda'
import { RefObject, useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

import { Fn } from '../shared/types/generic'

type OwnProps = {
  onCancel: Fn
  onConfirm: Fn
}

const blur = tap((ev: Event) => (ev.target as HTMLInputElement).blur())

export const useKeyTriggers = ({ onConfirm, onCancel }: OwnProps): RefObject<HTMLInputElement> => {
  const ref = useRef<HTMLInputElement>(null)

  useEventListener('keyup', when(propEq<any>('key', 'Escape'), onCancel), ref)
  useEventListener(
    'keypress',
    when<any, void>(propEq<any>('key', 'Enter'), pipe(blur, onConfirm)),
    ref
  )
  useEventListener('blur', onCancel, ref)

  return ref
}
