import { Pred, T } from 'ramda'
import { useEffect } from 'react'

import usePromise, { State } from './usePromise'

const useInstantPromise = <P>(
  name: string,
  fn: (...args: any[]) => Promise<P>,
  condition: Pred = T
): State<P> => {
  const state = usePromise<P>(name, fn)
  useEffect(() => {
    console.log(name, state.status, condition())
    if (state.status === 'idle' && condition()) {
      state.trigger()
    }
  }, [state, condition])
  return state
}

export default useInstantPromise
