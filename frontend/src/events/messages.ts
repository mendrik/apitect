import { createEvent } from 'effector'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import { ServerMessage } from 'shared/types/serverMessages'

export const messageReceived = createEvent<ServerMessage>()
export const socketEstablished = createEvent<SendJsonMessage>()
