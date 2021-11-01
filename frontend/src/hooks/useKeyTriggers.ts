import { propEq, when } from 'ramda'
import { RefObject, useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

import { Fn } from '../shared/types/generic'

type OwnProps = {
  onCancel: Fn
  onConfirm: Fn
}

export const useKeyTriggers = ({ onConfirm, onCancel }: OwnProps): RefObject<HTMLInputElement> => {
  const ref = useRef<HTMLInputElement>(null)

  useEventListener('keyup', when(propEq<any>('key', 'Escape'), onCancel), ref)
  useEventListener('keypress', when(propEq<any>('key', 'Enter'), onConfirm), ref)
  useEventListener('blur', onCancel, ref)

  return ref
}
