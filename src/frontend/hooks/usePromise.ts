import { useCallback, useContext, useReducer, useRef } from 'react'

import { Maybe } from '../../utils/maybe'
import { progressContext } from '../contexts/progress'

type Cache<T> = { [name: string]: T }

type Action<T> =
  | { type: 'idle' }
  | { type: 'running' }
  | { type: 'done'; payload: T }
  | { type: 'error'; payload: Error }

export interface State<T> {
  data?: T
  error?: Error
  trigger: (...args: any) => void
  status: Action<T>['type']
}
const usePromise = <T = unknown>(name: string, fn: (...args: any[]) => Promise<T>): State<T> => {
  const promiseCache = useRef<Cache<Maybe<Promise<any>>>>({})
  const progress = useContext(progressContext)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: 'idle',
    trigger: () => void 0
  }

  const promiseReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'running':
        return { ...initialState, status: action.type }
      case 'done':
        return { ...initialState, status: action.type, data: action.payload }
      case 'error':
        return { ...initialState, status: action.type, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(promiseReducer, initialState)

  const trigger = useCallback(
    (...args: any[]) => {
      switch (state.status) {
        case 'error':
        case 'idle': {
          progress.setWorking(true)
          dispatch({ type: 'running' })
          const res = fn(...args)
            .then(payload => {
              promiseCache.current[name] = undefined
              dispatch({ type: 'done', payload })
              return payload
            })
            .catch(e => {
              console.error(`Promise[${name}] failed: ${e.message}`, e.stackTrace)
              dispatch({ type: 'error', payload: e as Error })
            })
            .finally(() => progress.setWorking(false))
          promiseCache.current[name] = res
          return res
        }
        case 'running': {
          return promiseCache.current[name]
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
