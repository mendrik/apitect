import { createStore, sample } from 'effector'
import { v4 as uuid } from 'uuid'
import { ApiSchema } from '~shared/api'
import { ApiError, ApiResponse } from '~shared/apiResponse'
import { Api, ApiMethod } from '~shared/types/api'
import { ZApiRequest } from '~shared/types/apiRequest'
import { logger } from '~shared/utils/logger'

import { apiResponse, socketEstablished } from '../events/messages'
import { projectFx } from '../events/project'
import { uninitialized } from '../utils/uninitialized'

export const $api = createStore<Api>(uninitialized())

apiResponse.watch(data => {
  if (isError(data)) {
    logger.error(`Res[${data.status}]: ${data.message}`)
  } else {
    logger.debug(`Res[${data.method}]:`, data.payload)
  }
})

sample({
  clock: socketEstablished,
  target: projectFx
})

const isError = (res: ApiResponse | ApiError): res is ApiError =>
  'error' in res && res.error === 'error'

$api.on(
  socketEstablished,
  (_, sendJsonMessage) =>
    new Proxy(_, {
      get(target, method: ApiMethod) {
        return <T>(payload: T) => {
          if (method in ApiSchema) {
            const id = uuid()
            try {
              const apiCall = ZApiRequest.parse({
                id,
                method,
                payload
              })
              logger.debug(`Sent: ${method}`, apiCall.payload)
              sendJsonMessage(apiCall)
            } catch (e) {
              logger.error('Failed to parse ApiRequest', payload)
              throw e
            }
            return new Promise((resolve, reject) => {
              const unsubscribe = apiResponse.watch(res => {
                if (res.id === id) {
                  unsubscribe()
                  if (isError(res)) {
                    reject(res)
                  } else {
                    resolve(res.payload)
                  }
                }
              })
            })
          } else {
            logger.error(`No ${method} in ApiSchema`, {})
          }
        }
      }
    })
)
