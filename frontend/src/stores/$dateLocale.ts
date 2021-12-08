import enUsLocale from 'date-fns/locale/en-US'
import { createStore } from 'effector'

import { dateLocaleFx } from '../events/project'

export const $dateLocale = createStore<Locale>(enUsLocale).on(
  dateLocaleFx.doneData,
  (status, locale) => locale
)
