import { createEvent } from 'effector'
import { ServerMessage } from 'shared/types/serverMessages'

export const messageReceived = createEvent<ServerMessage>()
