import { ServerMessage } from '@ui/messages'
import { createEvent } from 'effector'

export const messageReceived = createEvent<ServerMessage>()
