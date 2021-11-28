import { F, tap } from 'ramda'
import { useCallback, useContext, useEffect, useState } from 'react'

import { errorContext } from '../components/generic/ErrorContext'
import { Fn } from '../shared/types/generic'
import { logger } from '../shared/utils/logger'

type PromiseResult<T> = { result: T | undefined; trigger: Fn }

export const usePromise = <ARG, T = void>(
  fn: (...args: ARG[]) => Promise<T>,
  instant: boolean = false
): PromiseResult<T> => {
  const [result, setResult] = useState<T>()
  const [promise, setPromise] = useState<Promise<T>>()
  const { setError } = useContext(errorContext)

  const trigger = useCallback(
    (...args: ARG[]) => {
      const promise = () =>
        fn(...args)
          .then(tap(r => setResult(r)))
          .catch(e => {
            logger.error('Error in usePromise', e)
            setError(e)
            return null as any as T
          })
          .finally(() => setPromise(undefined))
      setPromise(promise())
    },
    [fn]
  )

  if (promise != null) {
    throw promise
  }

  useEffect(instant ? trigger : F, [instant, trigger])

  return { result, trigger }
}
