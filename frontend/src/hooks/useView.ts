import { keys, reduce } from 'ramda'
import { useMemo, useState } from 'react'
import { useMountedState } from 'react-use'
import { decapitalizeFirst } from '~shared/utils/ramda'

export type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: () => void
} & {
  [key in T as `is${key}View`]: () => boolean
}

export const useView = <T extends string>(anEnum: {
  [K in T]: number
}) => {
  const [view, setView] = useState(0)
  const isMounted = useMountedState()
  const methods = useMemo(
    () =>
      reduce(
        (p, v: T) => ({
          ...p,
          [`${decapitalizeFirst(v)}View`]: (ev?: Event) => {
            ev?.preventDefault?.()
            if (isMounted()) {
              setView(anEnum[v])
            }
          },
          [`is${v}View`]: () => view === anEnum[v]
        }),
        {} as ViewMethods<T>,
        keys(anEnum) as T[]
      ),
    [view]
  )

  return {
    view,
    ...methods
  }
}
