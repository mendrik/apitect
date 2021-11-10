import { useEffect } from 'react'

import { Fn } from '../shared/types/generic'

export const useDefinedEffect = <T>(fn: (dep: NonNullable<T>) => void | Fn, dep: T): void => {
  useEffect(() => {
    if (dep != null) {
      return fn(dep!)
    }
  }, [dep])
}
