import { keys, reduce } from 'ramda'
import React, { createContext, FC, useCallback, useMemo, useState } from 'react'

import { Fn } from '../../shared/types/generic'

type ViewContextType<E> = {
  view: E
}

type ViewMethods<T extends string> = {
  [key in T as `${Lowercase<key>}View`]: Fn
}

export const ViewContext = createContext<ViewContextType<string | number>>({} as any)

export const useViews = <T extends string, E extends string | number>(
  initial: E,
  anEnum: { [key in T]: E }
) => {
  const [view, setView] = useState<E>(initial)

  const WithViews: FC = useCallback(
    ({ children }) => {
      return <ViewContext.Provider value={{ view }}>{children}</ViewContext.Provider>
    },
    [view]
  )

  const methods = useMemo(
    () =>
      reduce(
        (p, v) => ({
          ...p,
          [`${v.toLowerCase()}View`]: (ev: Event) => {
            ev.preventDefault()
            console.log(v)
            setView(anEnum[v])
          }
        }),
        {} as ViewMethods<T>,
        keys(anEnum)
      ),
    []
  )

  return {
    view,
    WithViews,
    ...methods
  }
}
