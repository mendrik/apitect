declare global {
  declare module 'react-i18next' {
    export interface Resources {
      readonly translation: typeof import('./locales/apitect.en-GB').default.translation
    }
  }
}
