import { keys, reduce } from 'ramda'
import { useMemo, useState } from 'react'

import { Fn } from '../shared/types/generic'

type ViewMethods<T extends string> = {
  [key in T as `${Lowercase<key>}View`]: Fn
}

export const useViews = <T extends string, TEnumValue extends string | number>(
  initial: TEnumValue,
  anEnum: { [key in T]: TEnumValue }
): { view: TEnumValue } & ViewMethods<T> => {
  const [view, setView] = useState<TEnumValue>(initial)
  // prettier-ignore
  const methods = useMemo(() => reduce((p, v) => ({
    ...p,
    [`${v.toLowerCase()}View`]: () => setView(anEnum[v])
  }), {} as ViewMethods<T>, keys(anEnum)), [anEnum])

  return {
    view,
    ...methods
  }
}
