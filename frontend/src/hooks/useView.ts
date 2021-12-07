import { keys, reduce } from 'ramda'
import { useMemo, useState } from 'react'
import { useMountedState } from 'react-use'
import { decapitalizeFirst } from '~shared/utils/ramda'

export type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: () => void
} & {
  [key in T as `is${key}View`]: () => boolean
}

export const useView = <T extends string, E extends number>(anEnum: {
  [K in T]: E
}) => {
  const [view, setView] = useState<E>((anEnum as any)[(anEnum as any)[0]] as any)
  const isMounted = useMountedState()
  const methods = useMemo(
    () =>
      reduce(
        (p, v) => ({
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
        keys(anEnum)
      ),
    [view]
  )

  return {
    view,
    ...methods
  }
}
