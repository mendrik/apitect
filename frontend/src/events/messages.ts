import { createEvent } from 'effector'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'

import { ApiError, ApiResponse } from '../shared/apiResponse'

export const apiResponse = createEvent<ApiResponse | ApiError>('api response')
export const socketEstablished = createEvent<SendJsonMessage>('socket')
