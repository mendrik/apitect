import { createStore, sample } from 'effector'
import { JsonValue } from 'react-use-websocket/dist/lib/types'
import { v4 as uuid } from 'uuid'
import { ApiSchema } from '~shared/api'
import { ZApiRequest } from '~shared/apiRequest'
import { ApiError, ApiResponse, ZApiResponse } from '~shared/apiResponse'
import { Api, ApiMethod } from '~shared/apiTypes'
import { newId } from '~shared/codecs/idCodec'
import { logger } from '~shared/utils/logger'

import { apiResponse, socketEstablished } from '../events/messages'
import { showNotification } from '../events/notifications'
import { projectFx } from '../events/project'
import { uninitialized } from '../utils/uninitialized'

export const $api = createStore<Api>(uninitialized())

apiResponse.watch(data => {
  if (isError(data)) {
    logger.error(`Res[${data.status}]: ${data.message}`)
    if (data.notificationType != null && data.title != null) {
      showNotification({
        id: newId(),
        type: data.notificationType,
        content: data.message,
        title: data.title
      })
    }
  } else {
    console.debug(`Res[${data.method}]:`, data.payload)
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
              console.debug(`Sent: ${method}`, apiCall.payload)
              sendJsonMessage(apiCall as JsonValue)
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
                    try {
                      const parsed = ZApiResponse.parse(res)
                      resolve(parsed.payload)
                    } catch (e) {
                      console.log(e)
                      reject(e)
                    }
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
