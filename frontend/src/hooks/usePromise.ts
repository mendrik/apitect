import { tap } from 'ramda'
import { useEffect, useState } from 'react'
import { usePromise as useMounted } from 'react-use'

import { Fn, Maybe } from '../shared/types/generic'
import { logAndThrow } from '../shared/utils/logAndThrow'

type PromiseResult<T> = { result: T; trigger: Fn }

export const usePromise = <ARG, T = void>(
  fn: (...args: ARG[]) => Promise<T>,
  instant: boolean = false
): PromiseResult<T> => {
  const [result, setResult] = useState<Maybe<T>>(undefined)
  const [promise, setPromise] = useState<Maybe<Promise<T>>>(undefined)
  const mounted = useMounted()
  const trigger = (...args: ARG[]) => {
    const promise = (): Promise<T> =>
      mounted<T>(fn(...args))
        .then(tap(r => setResult(r)))
        .catch(logAndThrow)
        .finally(() => setPromise(undefined))
    setPromise(promise())
  }
  if (promise != null) {
    throw promise
  }

  useEffect(() => {
    if (instant) {
      trigger()
    }
  }, [instant])

  return { result: result!, trigger }
}
