import 'i18next'
import { Namespace, TFuncKey, TOptions } from 'i18next'

import en from '../locales/apitect.en-GB'

export const resources = {
  'en-GB': en
} as const

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en-GB'
    resources: typeof resources
  }

  export interface TFunction<N extends Namespace = CustomTypeOptions['defaultNS']> {
    <TInterpolationMap extends object>(
      key: TFuncKey<N, undefined>,
      options?: TOptions<TInterpolationMap>
    ): string
  }
}

export type LocaleKey = TFuncKey<'en-GB'>
