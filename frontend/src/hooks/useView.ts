import { keys, reduce } from 'ramda'
import { useMemo, useState } from 'react'
import { decapitalizeFirst } from '~shared/utils/ramda'

export type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: () => Promise<void>
} & {
  [key in T as `is${key}View`]: () => boolean
}

export const useView = <T extends string, E extends number>(anEnum: {
  [K in T]: E
}) => {
  const [view, setView] = useState<E>((anEnum as any)[(anEnum as any)[0]] as any)

  const methods = useMemo(
    () =>
      reduce(
        (p, v) => ({
          ...p,
          [`${decapitalizeFirst(v)}View`]: (ev: Event) => {
            ev?.preventDefault()
            setView(anEnum[v])
            return new Promise<void>((resolve, reject) => {
              resolve()
            })
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
