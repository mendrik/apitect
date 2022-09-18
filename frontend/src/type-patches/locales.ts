import { StringMap, TOptions } from 'i18next'
import { DefaultNamespace, Namespace, TFuncKey } from 'react-i18next'

import en from '../locales/apitect.en-GB'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof en
    }
  }

  export interface TFunction<N extends Namespace = DefaultNamespace, TKPrefix = undefined> {
    <
      TKeys extends TFuncKey<N, TKPrefix> | TemplateStringsArray extends infer A ? A : never,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> | string
    ): string
  }
}

export type LocaleKey = TFuncKey<'translation'>

export const resources = {
  'en-GB': { translation: { ...en } }
}
