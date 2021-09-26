import { TFuncKey } from 'react-i18next'

import { ServerError } from '../../utils/types'

export class HttpError extends Error implements ServerError {
  constructor(public status: number, public field?: TFuncKey, message = 'http-error') {
    super(message)
  }
}

export const httpError = (status: number, field: string, message: TFuncKey) => () =>
  new HttpError(status, field, message)
