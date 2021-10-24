import { createEvent } from 'effector'
import { ServerMessage } from '~shared/types/messages'

export const messageReceived = createEvent<ServerMessage>()
