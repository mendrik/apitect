import { Locale, isValid } from 'date-fns'
import { DateDisplay, DateSettings } from '~shared/types/forms/nodetypes/dateSettings'

export const formatDate = (settings: DateSettings): string => {
  if (date == null || !isValid(date)) {
    return ''
  }
  switch (settings?.display) {
    case DateDisplay.Localized:
      return new Locale().format()
  }
}
