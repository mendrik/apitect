import { format, isValid } from 'date-fns'
import { useStore } from 'effector-react'
import { DateDisplay, DateSettings } from '~shared/types/forms/nodetypes/dateSettings'

import { $dateLocale } from '../stores/$dateLocale'

export const useDateFormat =
  (settings: DateSettings) =>
  (date?: Date): string => {
    const locale = useStore($dateLocale)
    if (date == null || !isValid(date)) {
      return ''
    }
    switch (settings?.display) {
      case DateDisplay.Localized:
        return format(date, 'P', { locale })
      case DateDisplay.Custom:
        return format(date, settings.format)
      case DateDisplay.HumanReadable:
        return 'todo'
    }
  }
