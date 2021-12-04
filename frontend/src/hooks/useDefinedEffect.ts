import { useEffect } from 'react'
import { Fn } from '~shared/types/generic'

export const useDefinedEffect = <T>(
  fn: (dep: NonNullable<T>) => void | Fn,
  dep: T,
  method = useEffect
): void => {
  method(() => {
    if (dep != null) {
      return fn(dep!)
    }
  }, [dep])
}
