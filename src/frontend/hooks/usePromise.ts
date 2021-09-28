import { useCallback, useContext, useReducer, useRef } from 'react'

import { Maybe } from '../../utils/maybe'
import { progressContext } from '../contexts/progress'

type Cache<T> = { [name: string]: T }

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
  const promiseCache = useRef<Cache<Maybe<Promise<any>>>>({})
  const progress = useContext(progressContext)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: 'idle',
    trigger: () => Promise.resolve<any>(null),
    name
  }

  const promiseReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.status) {
      case 'running':
        return { ...initialState, status: action.status, data: undefined }
      case 'done':
        return { ...initialState, status: action.status, data: action.payload }
      case 'error':
        return { ...initialState, status: action.status, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(promiseReducer, initialState)

  const trigger = useCallback<() => Promise<T>>(
    (...args: any[]) => {
      switch (state.status) {
        case 'error':
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
                promiseCache.current[name] = undefined
                progress.setWorking(name, false)
              })
          return (promiseCache.current[name] = res())
        }
        case 'running': {
          return promiseCache.current[name]!
        }
        case 'done': {
          return Promise.resolve(state.data)
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
