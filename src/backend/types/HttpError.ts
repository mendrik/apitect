import { TFuncKey } from 'react-i18next'

import { ServerError } from '../../utils/types'

export class HttpError extends Error implements ServerError {
  constructor(public status: number, message = 'http-error', public field?: TFuncKey) {
    super(message)
  }
}

export const httpError = (status: number, message: TFuncKey, field?: string) =>
  new HttpError(status, message, field)
