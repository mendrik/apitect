import { keys, reduce } from 'ramda'
import { useRef, useState } from 'react'
import { Fn } from '~shared/types/generic'
import { decapitalizeFirst } from '~shared/utils/ramda'

export type ViewMethods<T extends string> = {
  [key in T as `${Uncapitalize<key>}View`]: Fn
} & {
  [key in T as `is${key}View`]: () => boolean
}

export const useView = <T extends string, E extends number>(anEnum: {
  [K in T]: E
}) => {
  const [view, setView] = useState<E>((anEnum as any)[(anEnum as any)[0]] as any)

  const methods = useRef(
    reduce(
      (p, v) => ({
        ...p,
        [`${decapitalizeFirst(v)}View`]: (ev: Event) => {
          ev?.preventDefault()
          setView(anEnum[v])
        },
        [`is${v}View`]: (ev: Event) => view === anEnum[v]
      }),
      {} as ViewMethods<T>,
      keys(anEnum)
    )
  )

  return {
    view,
    ...methods.current
  }
}
