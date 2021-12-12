import { format, formatDistanceToNow, isValid } from 'date-fns'
import { useStore } from 'effector-react'
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
        return format(date, settings.format)
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
