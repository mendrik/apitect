import { keys, reduce } from 'ramda'
import React, { createContext, FC, useCallback, useRef, useState } from 'react'

import { Fn } from '../../shared/types/generic'

type ViewContextType<E> = {
  view: E
}

type ViewMethods<T extends string> = {
  [key in T as `${Lowercase<key>}View`]: Fn
}

export const ViewContext = createContext<ViewContextType<string | number>>({} as any)

export const useViews = <T extends string, E extends string | number>(
  anEnum: {
    [key in T]: E
  },
  initial?: E
) => {
  const [view, setView] = useState<E>(initial ?? (0 as any))

  const WithViews: FC = useCallback(
    ({ children }) => {
      return <ViewContext.Provider value={{ view }}>{children}</ViewContext.Provider>
    },
    [view]
  )

  const methods = useRef(
    reduce(
      (p, v) => ({
        ...p,
        [`${v.toLowerCase()}View`]: (ev: Event) => {
          ev.preventDefault()
          setView(anEnum[v])
        }
      }),
      {} as ViewMethods<T>,
      keys(anEnum)
    )
  )

  return {
    view,
    WithViews,
    ...methods.current
  }
}
