import { TFuncKey } from 'react-i18next'

export class HttpError extends Error {
  constructor(public status: number, public field?: TFuncKey, message = 'http-error') {
    super(message)
  }
}

export const httpError =
  (status: number, field: TFuncKey, message = 'http-error') =>
  (...args: any[]) =>
    new HttpError(status, field, message)
