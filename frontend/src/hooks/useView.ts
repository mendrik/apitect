import { keys, reduce } from 'ramda'
import { useMemo, useState } from 'react'
import { useMountedState } from 'react-use'
import { decapitalizeFirst } from '~shared/utils/ramda'

export type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: () => void
} & {
  [key in T as `is${key}View`]: () => boolean
}

export const useView = <E extends Record<string, number>>(anEnum: E) => {
  const [view, setView] = useState<number>(0)
  const isMounted = useMountedState()
  const methods = useMemo(
    () =>
      reduce(
        (p, v: string) => ({
          ...p,
          [`${decapitalizeFirst(v)}View`]: (ev?: Event) => {
            ev?.preventDefault?.()
            if (isMounted()) {
              setView(anEnum[v])
            }
          },
          [`is${v}View`]: () => view === anEnum[v]
        }),
        {} as ViewMethods<keyof E & string>,
        keys(anEnum) as string[]
      ),
    [view]
  )

  return {
    view,
    ...methods
  }
}
