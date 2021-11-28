import { useCallback, useState } from 'react'
import { useMountedState } from 'react-use'

export type Status<T> =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'done'; result: T }
  | { status: 'error'; result: Error }

export type UseProgress = <T>() => [(promise: Promise<T>) => Promise<T>, Status<T>]

const useProgress: UseProgress = <T>() => {
  const isMounted = useMountedState()
  const [status, setStatus] = useState<Status<T>>({ status: 'idle' })
  return [
    useCallback((promise: Promise<T>) => {
      setStatus({ status: 'running' })
      return new Promise<T>((resolve, reject) => {
        const onValue = (result: T) => {
          if (isMounted()) {
            setStatus({ status: 'done', result })
            resolve(result)
          }
        }
        const onError = (result: Error) => {
          if (isMounted()) {
            setStatus({ status: 'error', result })
            reject(result)
          }
        }
        promise.then(onValue, onError)
      })
    }, []),
    status
  ]
}

export default useProgress
