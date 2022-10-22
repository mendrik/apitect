import 'i18next'

import en from '../locales/apitect.en-GB'

export const resources = {
  'en-GB': en
} as const

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en-GB'
    resources: typeof resources
  }
}
