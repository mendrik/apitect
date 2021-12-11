import { useEffect } from 'react'
import { Fn } from '~shared/types/generic'

export const useUndefinedEffect = <T>(fn: Fn, dep: T): void => {
  useEffect(() => {
    if (dep == null) {
      return fn()
    }
  }, [dep, fn])
}
