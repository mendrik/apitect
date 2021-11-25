import { useCallback, useState } from 'react'

export type SetAccess<T> = {
  add: (item: T) => void
  remove: (item: T) => void
  has: (item: T) => boolean
}

export const useSet = <T>(initial?: Set<T>): SetAccess<T> => {
  const [set, setSet] = useState(initial ?? new Set())

  const has = useCallback((item: T) => set.has(item), [set])
  const add = (item: T) => setSet(s => new Set(s).add(item))
  const remove = (item: T) =>
    setSet(s => {
      s.delete(item)
      return new Set(s)
    })

  return {
    add,
    remove,
    has
  }
}
