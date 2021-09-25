import { T, Pred } from 'ramda'
import { useEffect } from 'react'

import usePromise, { State } from './usePromise'

const useInstantPromise = <P = unknown>(
  name: string,
  fn: (...args: any[]) => Promise<P>,
  condition: Pred = T
): State<P> => {
  const state = usePromise<P>(name, fn)
  useEffect(() => {
    if (state.status === 'idle' && condition()) {
      state.trigger()
    }
  }, [state, condition])
  return state
}

export default useInstantPromise
