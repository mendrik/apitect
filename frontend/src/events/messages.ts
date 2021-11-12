import { createEvent } from 'effector'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'

import { ApiResponse } from '../shared/apiResponse'

export const apiResponse = createEvent<ApiResponse>('api response')
export const socketEstablished = createEvent<SendJsonMessage>('socket')
