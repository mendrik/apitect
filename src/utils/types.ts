import { TFuncKey } from 'react-i18next'

export type ServerError = {
  status: number
  message: TFuncKey
  field?: string
}
