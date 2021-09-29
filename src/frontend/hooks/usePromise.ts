import { useCallback, useContext, useReducer, useRef } from 'react'

import { progressContext } from '../contexts/progress'

type Action<T> =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'done'; payload: T }
  | { status: 'error'; payload: Error }

export interface State<T> {
  data?: T
  error?: Error
  trigger: (...args: any) => Promise<T>
  status: Action<T>['status']
  name: string
}
const usePromise = <T = unknown>(name: string, fn: (...args: any[]) => Promise<T>): State<T> => {
  const promiseCache = useRef<Map<string, Promise<any>>>(new Map())
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

  const trigger = useCallback<() => Promise<T>>(
    (...args: any[]) => {
      console.log(state.name, state.status)
      switch (state.status) {
        case 'error':
        case 'done':
        case 'idle': {
          dispatch({ status: 'running' })
          progress.setWorking(name, true)
          const res = () =>
            fn(...args)
              .then(payload => {
                dispatch({ status: 'done', payload })
                return payload
              })
              .catch(e => {
                console.error(`Promise[${name}] failed: ${e.message}`, e.stackTrace)
                dispatch({ status: 'error', payload: e as Error })
              })
              .finally(() => {
                promiseCache.current.delete(name)
                progress.setWorking(name, false)
              })
          return promiseCache.current.set(name, res()).get(name) as any
        }
        case 'running': {
          return promiseCache.current.get(name)
        }
        default:
          throw Error('unknown state')
      }
    },
    [state, promiseCache, fn, name, progress]
  )

  return { ...state, trigger }
}

export default usePromise
