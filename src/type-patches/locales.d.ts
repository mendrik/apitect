declare global {
  declare module 'react-i18next' {
    export interface Resources {
      readonly translation: typeof import('../frontend/locales/apitect.en-GB').default.translation
    }
  }
}
