import { TFuncKey } from 'react-i18next'

export class HttpError extends Error {
  constructor(public status: number, message: TFuncKey = 'common.error', public field?: string) {
    super(message)
  }
}

export const httpError = (status: number, message: TFuncKey, field?: string) =>
  new HttpError(status, message, field)
