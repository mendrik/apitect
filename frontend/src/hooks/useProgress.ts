import { useCallback, useState } from 'react'
import { usePromise as useMounted } from 'react-use'

export type Status<T> =
  | { is: 'idle' }
  | { is: 'running' }
  | { is: 'done'; result: T }
  | { is: 'error'; result: Error }

export type UseProgress = <T>() => [(promise: Promise<T>) => Promise<T>, Status<T>]

const useProgress: UseProgress = <T>() => {
  const isMounted = useMounted()
  const [status, setStatus] = useState<Status<T>>({ is: 'idle' })
  return [
    useCallback((promise: Promise<T>) => {
      setStatus({ is: 'running' })
      return isMounted(
        new Promise<T>((resolve, reject) => {
          const onValue = (result: T) => {
            setStatus({ is: 'done', result })
            resolve(result)
          }
          const onError = (result: Error) => {
            setStatus({ is: 'error', result })
            reject(result)
          }
          promise.then(onValue, onError)
        })
      )
    }, []),
    status
  ]
}

export default useProgress
