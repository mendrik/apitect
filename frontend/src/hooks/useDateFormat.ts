import { format, formatDistanceToNow, isValid } from 'date-fns'
import { useStore } from 'effector-react'
import { tryCatch } from 'ramda'
import { DateDisplay, DateSettings } from '~shared/types/forms/nodetypes/dateSettings'
import { $dateLocale } from '~stores/$dateLocale'

export const useDateFormat = (settings: DateSettings) => {
  const locale = useStore($dateLocale)
  return (date?: Date): string => {
    if (date == null || !isValid(date)) {
      return ''
    }
    switch (settings?.display) {
      case DateDisplay.Custom:
        return tryCatch(
          date => format(date, settings.format, { locale }),
          () => 'invalid format'
        )(date)
      case DateDisplay.HumanReadable:
        return formatDistanceToNow(date, {
          includeSeconds: false,
          addSuffix: true
        })
      case DateDisplay.Localized:
      default:
        return format(date, 'P', { locale })
    }
  }
}
