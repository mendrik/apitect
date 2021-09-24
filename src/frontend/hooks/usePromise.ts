import { useEffect, useReducer, useRef, useState } from 'react'
import { useIsMounted } from 'usehooks-ts'

interface State<T> {
  data?: T
  error?: Error
  trigger: (...args: any) => void
}

type Cache<T> = { [name: string]: T }

type Action<T> =
  | { type: 'running' }
  | { type: 'done'; payload: T }
  | { type: 'error'; payload: Error }

const usePromise = <T = unknown>(name: string, fn: (...args: any[]) => Promise<T>): State<T> => {
  const results = useRef<Cache<T>>({})
  const promiseCache = useRef<Cache<Promise<T>>>({})
  const [started, go] = useState(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    trigger: (...args: any[]) => {
      promiseCache.current[name] = fn(...args)
      go(true)
    }
  }

  // Keep state logic separated
  const promiseReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'running':
        return { ...initialState }
      case 'done':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(promiseReducer, initialState)
  const mounted = useIsMounted()

  useEffect(() => {
    if (mounted() && started) {
      dispatch({ type: 'running' })
      if (results.current[name] != null) {
        dispatch({ type: 'done', payload: results.current[name] })
      }
      try {
        promiseCache.current[name].then((payload: T) => dispatch({ type: 'done', payload }))
      } catch (e) {
        dispatch({ type: 'error', payload: e as Error })
      }
    }
  }, [started, promiseCache, mounted, name])

  return state
}

export default usePromise
