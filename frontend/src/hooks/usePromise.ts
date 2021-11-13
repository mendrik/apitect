import { useCallback, useContext, useReducer, useRef } from 'react'
import { Primitives } from 'ts-pattern/lib/types/helpers'

import { progressContext } from '../contexts/withProgress'

export type ExtendedError = Error & Record<string, Primitives>

type Action<T> =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'done'; payload: T }
  | { status: 'error'; payload: ExtendedError }

export interface State<T> {
  data?: T
  error?: ExtendedError
  trigger: (...args: any) => Promise<T | void>
  status: Action<T>['status']
  name: string
}
const usePromise = <T = unknown>(name: string, fn: (...args: any[]) => Promise<T>): State<T> => {
  const progress = useContext(progressContext)

  const initialState = useRef<State<T>>({
    error: undefined,
    data: undefined,
    status: 'idle',
    trigger: () => Promise.resolve<any>(null),
    name
  })

  const promiseReducer = useCallback((state: State<T>, action: Action<T>): State<T> => {
    switch (action.status) {
      case 'running':
        return { ...state, status: action.status, data: undefined }
      case 'done':
        return { ...state, status: action.status, data: action.payload }
      case 'error':
        return { ...state, status: action.status, error: action.payload }
      default:
        return state
    }
  }, [])

  const [state, dispatch] = useReducer(promiseReducer, initialState.current)

  const trigger = useCallback(
    (...args: any[]) => {
      dispatch({ status: 'running' })
      progress.setWorking(name, true)
      return fn(...args)
        .then(payload => {
          dispatch({ status: 'done', payload })
          return payload
        })
        .catch(e => {
          console.error(`Promise[${name}] failed: ${e.message}`, e.stackTrace)
          dispatch({ status: 'error', payload: e as ExtendedError })
        })
        .finally(() => {
          progress.setWorking(name, false)
        })
    },
    [fn, name, progress]
  )

  return { ...state, trigger }
}

export default usePromise
