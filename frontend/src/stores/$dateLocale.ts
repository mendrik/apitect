import enUsLocale from 'date-fns/locale/en-US'
import { createStore } from 'effector'
import { logger } from '~shared/utils/logger'

import { dateLocaleFx } from '../events/dateLocale'

dateLocaleFx.done.watch(({ params }) => logger.info(`Loaded ${params} locale.`))

export const $dateLocale = createStore<Locale>(enUsLocale).on(
  dateLocaleFx.doneData,
  (status, locale) => locale
)
