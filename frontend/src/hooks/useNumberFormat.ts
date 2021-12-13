import { useMemo } from 'react'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'

export const useNumberFormat = (settings: NumberSettings) => {
  const format = useMemo(
    () =>
      new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: settings?.display.precision ?? 2
      }),
    [settings?.display.precision]
  )
  return (number?: number): string => {
    if (number == null || isNaN(number)) {
      return ''
    }
    return format.format(number)
  }
}
