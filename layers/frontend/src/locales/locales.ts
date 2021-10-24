import i18n from 'i18next'
import { initReactI18next, TFunction } from 'react-i18next'

import en from './apitect.en-GB'
import { capitalize } from '@shared/utils/ramda'

const resources = {
  'en-GB': en
}

export const initLocales = (): Promise<TFunction> =>
  i18n.use(initReactI18next).init({
    load: 'currentOnly',
    fallbackLng: 'en-GB',
    lng: 'en-GB',
    resources,
    react: {
      nsMode: 'fallback'
    },
    interpolation: {
      format: (value, format) => {
        if (format == null) {
          return value
        }
        if (format === 'capitalize') return capitalize(value)
        return value
      }
    }
  })
