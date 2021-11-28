import { F } from 'ramda'
import { useCallback, useContext, useEffect, useState } from 'react'
import { usePromise as useMounted } from 'react-use'

import { errorContext } from '../components/generic/ErrorContext'
import { Fn } from '../shared/types/generic'

type PromiseResult<T> = { result: T | undefined; trigger: Fn }

export const usePromise = <ARG, T = void>(
  fn: (...args: ARG[]) => Promise<T>,
  instant: boolean = false
): PromiseResult<T> => {
  const [result, setResult] = useState<T>()
  const [promise, setPromise] = useState<Promise<void>>()
  const { setError } = useContext(errorContext)
  const isMounted = useMounted()

  const trigger = useCallback(
    (...args: ARG[]) => {
      const promiseFn = () =>
        isMounted(fn(...args))
          .then(x => setResult(() => x))
          .catch(setError)
          .finally(() => setPromise(undefined))
      setPromise(promiseFn())
    },
    [result]
  )

  if (promise != null) {
    throw promise
  }

  useEffect(instant ? trigger : F, [])

  return { result, trigger }
}
