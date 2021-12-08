import { F } from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { usePromise as useMounted } from 'react-use'
import { Fn } from '~shared/types/generic'

import { errorContext } from '../components/generic/ErrorContext'

type Trigger = Fn

export const usePromise = <ARG, T = void>(
  fn: (...args: ARG[]) => Promise<T>,
  instant: boolean = false,
  throwSuspense: boolean = false
): Trigger => {
  const [promise, setPromise] = useState<Promise<any>>()
  const { setError } = useContext(errorContext)
  const isMounted = useMounted()

  const trigger = (...args: ARG[]) => {
    const promiseFn = () =>
      isMounted(fn(...args))
        .catch(setError)
        .finally(() => setPromise(undefined))
    setPromise(promiseFn())
  }

  if (throwSuspense && promise != null) {
    throw promise
  }

  useEffect(instant ? trigger : F, [])

  return trigger
}
