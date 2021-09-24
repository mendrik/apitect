import i18n from 'i18next'
import { initReactI18next, TFunction } from 'react-i18next'

import en from './apitect.en-GB'

declare module 'react-i18next' {
  export interface Resources {
    readonly translation: typeof import('./apitect.en-GB').default.translation
  }
}

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
    }
  })
